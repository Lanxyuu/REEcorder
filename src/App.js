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
        <div class="tagline">
          <p id="tagline">Never miss a lecture or livestream again.</p>
        </div>
        {/* <div class="steps">
          <ol>
            <li>Schedule a date and time to record at.</li>
            <li>Pick a window or screen to record.</li>
            <li>Confirm your scheduled recording.</li>
          </ol>
        </div> */}
        <Form />
      </body>
    </div>
  );
}

export default App;
