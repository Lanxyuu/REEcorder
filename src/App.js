import React from 'react';
import Card from "./components/Card/Card"
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Watchr</h1>
      </header>
      <body>
        <p>Wow Watchr is such a cool app</p>
        <ol>
          <li>Schedule a date and time to record at.</li>
          <li>Pick a window or screen to record.</li>
          <li>Confirm your scheduled recording.</li>
        </ol>
        <div style = {{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Card title="Select Time" />
          <Card title="Select Other Options" />
          <Card title="Confirm" />
        </div>
        
      </body>
    </div>
  );
}

export default App;
