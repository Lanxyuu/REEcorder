import React from 'react';
import Form from './components/Form/Form'
import './App.css';

const gensym = (() => {
  let n = 0;
  return () => `g${n++}`;
})();

const RecordingsContext = React.createContext({
  recordings: {},
  setRecordings: () => { },
});

const App = () => {
  const [recordings, setRecordings] = React.useState({});

  const startCapture = () => {
    console.log('Started capture');
  };

  const stopCapture = () => {
    console.log('Stopped capture');
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
      </RecordingsContext.Provider>
    </div >
  );
}

export default App;
