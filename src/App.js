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

const RecordingsContext = React.createContext({
  recordings: {},
  setRecordings: () => { },
});

const App = () => {

  const [videoText, changeText] = useState('');
  const [streamer, changeStream] = useState(null);

  const startRec = () => {
    console.log('dab');
    mediaRecorder.start();
    console.log('started');
  }

  const stopRec = () => {
    console.log('dab');
    mediaRecorder.stop();
    console.log('stopped');
  }

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
    const stream = await navigator.mediaDevices
      .getUserMedia(constraints);

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

    const { filePath } = await dialog.showSaveDialog({
      buttonLabel: 'Save video',
      defaultPath: `vid-${Date.now()}.webm`
    });

    if (filePath) {
      writeFile(filePath, buffer, () => console.log('video saved successfully!'));
    }

  }

  const [recordings, setRecordings] = React.useState({});

  const startCapture = () => {
    console.log('Started capture');
    startRec();
  };

  const stopCapture = () => {
    console.log('Stopped capture');
    stopRec();
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
    recordings[id] = {
      ...data,
      stage: 'created',
      startTimeout: setTimeout(startRecording(id), timeoutDuration(data.start)),
      endTimeout: setTimeout(endRecording(id), timeoutDuration(data.end)),
    };
    return id;
  };

  const deleteRecording = (id) => {
    interruptRecording(id);
    setRecordings({ ...recordings, [id]: undefined });
  }



  return (
    <div className="App">
      <RecordingsContext.Provider value={{ recordings, createRecording, deleteRecording }}>
        <header className="App-header">
          <h1>Watchr</h1>
        </header>
        <div className="tagline">
          <p id="tagline">Never miss a lecture or livestream again.</p>
        </div>
        {/* <div class="steps">
            <ol>
            <li>Schedule a date and time to record at.</li>
            <li>Pick a window or screen to record.</li>
            <li>Confirm your scheduled recording.</li>
            </ol>
            </div> */}
        <Form onSubmit={createRecording} />
        {Object.entries(recordings).map(([id, recording]) => (
          <div key={id}>
            <p>{recording.filename}</p>
            <p>{recording.start.toString()} to {recording.end.toString()}</p>
            <p>{recording.type}</p>
          </div>
        ))}

        {/* <video autoPlay>
          {/* <source src={streamer}></source> 

        </video> */}

        <Video autoPlay srcObject={streamer} />

        <button id="startBtn" className="button is-primary" onClick={() => startRec()}>Start</button>
        <button id="stopBtn" className="button is-warning" onClick={() => stopRec()}>Stop</button>
        <button id="videoSelectBtn" className="button is-text" onClick={() => getVideoSources()}>
          {videoText.length === 0 ? 'Choose a Video Source' : videoText}
        </button>


      </RecordingsContext.Provider>
    </div >
  );
}

export default App;
