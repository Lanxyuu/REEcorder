import React, { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './App.css';

const App = () => {
  const [startDate, setStartDate] = useState(new Date());
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
      </body>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    </div>
  );
}

export default App;
