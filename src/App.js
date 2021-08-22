import React, { useState } from 'react';
import Form from './components/Form/Form'
import History from './components/History/History'
import './App.css';

const electron = window.require("electron");

let mediaRecorder; // MediaRecorder instance to capture footage
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

  const getVideoSources = async () => {
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

  // Change the videoSource window to record
  async function selectSource(source) {
    console.log('reached');
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

    // Create a Stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    // Preview the source in a video element
    // currentStream = stream;
    changeStream(stream);

    // videoElement.srcObject = stream;
    // videoElement.play();

    // Create the Media Recorder
    const options = { mimeType: 'video/webm; codecs=vp9' };
    mediaRecorder = new MediaRecorder(stream, options);

    // Register Event Handlers
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = handleStop;

    // Updates the UI
  }

  // Captures all recorded chunks
  function handleDataAvailable(e) {
    console.log('video data available');
    recordedChunks.push(e.data);
  }

  // Saves the video file on stop
  async function handleStop(e) {
    const blob = new Blob(recordedChunks, {
      type: 'video/webm; codecs=vp9'
    });

    const buffer = Buffer.from(await blob.arrayBuffer());

    const filePath = location;

    // const { filePath } = await dialog.showSaveDialog({
    //   buttonLabel: 'Save video',
    //   defaultPath: `vid-${Date.now()}.webm`
    // });

    if (filePath) {
      writeFile(filePath, buffer, () => console.log('video saved successfully!'));
    }

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
    setRecordings({
      ...recordings, [id]: {
        ...data,
        stage: 'created',
        startTimeout: setTimeout(startRecording(id), timeoutDuration(data.start)),
        endTimeout: setTimeout(endRecording(id), timeoutDuration(data.end)),
      }
    });
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

      <Form onSubmit={createRecording} buttonText = {videoText} getSources = {getVideoSources} chooseDirectory = {onDo} directory = {location} />

      {console.log({ recordings })}

      {Object.entries(recordings).map(([id, recording]) => (
        <div key={id}>
          <p>{recording.filename}</p>
          <p>{recording.start.toString()} to {recording.end.toString()}</p>
          <p>{recording.type}</p>
          <button onClick={() => deleteRecording(id)}>Remove recording</button>
        </div>
      ))}
      <div>
        <History recordings={recordings} />
      </div>
      <Video autoPlay srcObject={streamer} />
    </div>
  );
}

export default App;
