import React from 'react';
import Form from './components/Form/Form'
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Watchr</h1>
      </header>
      <body>
        <p>Never miss a lecture or livestream again.</p>
        <ol>
          <li>Schedule a date and time to record at.</li>
          <li>Pick a window or screen to record.</li>
          <li>Confirm your scheduled recording.</li>
        </ol>
        <Form />
      </body>
    </div>
  );
}

export default App;
