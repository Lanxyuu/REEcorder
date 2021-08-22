import React, { useEffect, useState } from 'react';
import Form from './components/Form/Form'
import History from './components/History/History'
import './App.css';

const electron = window.require("electron");

let mediaRecorder;

let word = '';
const recordedChunks = [];

const { desktopCapturer, remote } = electron;

const { writeFile } = window.require('fs');

const { dialog, Menu } = remote;


export const Video = ({ srcObject, ...props }) => {
  const refVideo = React.useCallback(
    (node) => {
      if (node) node.srcObject = srcObject;
    },
    [srcObject],
  );

  return <video ref={refVideo} {...props} />;
};

const gensym = (() => {
  let n = 0;
  return () => `g${n++}`;
})();

const App = () => {

  const [videoText, changeText] = useState('');
  const [streamer, changeStream] = useState(null);
  const [location, changeLocation] = useState('');
  const [fileNames, changeNames] = useState('ddd');


  useEffect(() => {
    console.log(fileNames);
  })


  const getVideoSources = async () => {
    console.log('dab');
    const inputSources = await desktopCapturer.getSources({
      types: ['window', 'screen']
    });

    const videoOptionsMenu = Menu.buildFromTemplate(
      inputSources.map(source => {
        return {
          label: source.name,
          click: () => selectSource(source)
        };
      })
    );
    videoOptionsMenu.popup();
  }

  async function selectSource(source) {
    console.log('reached');
    console.log(fileNames);
    changeText(source.name);
    console.log(videoText);
    const constraints = {
      audio: false,
      // {
      //   mandatory: {
      //     chromeMediaSource: 'desktop',
      //     chromeMediaSourceId: source.id
      //   }
      // },
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: source.id
        }
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // currentStream = stream;
    changeStream(stream);

    // videoElement.srcObject = stream;
    // videoElement.play();
    const options = { mimeType: 'video/webm; codecs=vp9' };
    mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = handleStop;

  }

  function handleDataAvailable(e) {
    console.log('video data available');
    recordedChunks.push(e.data);
  }

  async function handleStop(e) {
    const blob = new Blob(recordedChunks, {
      type: 'video/webm; codecs=vp9'
    });

    const buffer = Buffer.from(await blob.arrayBuffer());
    console.log(word);
    writeFile(location + '\\' + word + '.webm', buffer, function (err) {
      if (err) throw err;
      console.log('Results Received');
    });

  }

  const [recordings, setRecordings] = React.useState({});

  const startCapture = () => {
    console.log('Started capture');
    mediaRecorder.start();
  };

  const stopCapture = () => {
    console.log('Stopped capture');
    mediaRecorder.stop();
  };

  const timeoutDuration = (start, now) => {
    if (now === undefined)
      now = new Date();
    return start.getTime() - now.getTime();
  };

  const startRecording = (id) => () => {
    setRecordings({ ...recordings, [id]: { ...recordings[id], stage: 'started' } });
    console.log('start', id);
    startCapture();
  };

  const endRecording = (id) => () => {
    setRecordings({ ...recordings, [id]: { ...recordings[id], stage: 'ended' } });
    console.log('end', id);
    stopCapture();
  };

  const interruptRecording = (id) => {
    const { stage, startTimeout, endTimeout } = recordings[id];
    switch (stage) {
      case 'created':
        clearTimeout(startTimeout);
        clearTimeout(endTimeout);
        break;
      case 'started':
        stopCapture();
        clearTimeout(endTimeout);
        break;
      case 'ended':
        break;
      default:
        throw new Error(`Unexpected stage ${stage}`);
    };
  }

  const createRecording = (data) => {
    const id = gensym();
    console.log(data.filename);
    changeNames(data.filename);
    word = data.filename;
    setRecordings({
      ...recordings, [id]: {
        ...data,
        stage: 'created',
        startTimeout: setTimeout(startRecording(id), timeoutDuration(data.start)),
        endTimeout: setTimeout(endRecording(id), timeoutDuration(data.end)),
      }
    });
    console.log(id);
    return id;
  };

  const deleteRecording = (id) => {
    interruptRecording(id);
    const newObject = { ...recordings };
    delete newObject[id];
    setRecordings(newObject);
  }

  const onDo = e => {
    dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory']
    }).then(result => {
      console.log(result.canceled)
      console.log(result.filePaths)
      changeLocation(result.filePaths[0]);
      console.log(location);
      // writeFile(__dirname + './Users/ayqc7/Desktop/Summer/Filament/dumps/result.txt', 'This is my text', function (err) {
      //   if (err) throw err;
      //   console.log('Results Received');
      // });
    }).catch(err => {
      console.log(err)
    });
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Watchr</h1>
      </header>
      <div className="tagline">
        <p id="tagline">Never miss a lecture or livestream again.</p>
      </div>

      <Form onSubmit={createRecording} buttonText={videoText} getSources={getVideoSources} chooseDirectory={onDo} directory={location} />

      {console.log({ recordings })}

      <div>
        <History recordings={recordings} deleteRecording={deleteRecording} />
      </div>
      <div>
        <h2 className="mt-2">Recording Preview</h2>
        <Video autoPlay srcObject={streamer} width="80%" class="mb-5" />
      </div>
    </div>
  );
}

export default App;
