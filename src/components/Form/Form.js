import React, { useState } from 'react'
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import "./Form.css";

const Form = ({ onSubmit, buttonText, getSources, chooseDirectory, directory }) => {
    const [value, onChange] = useState([new Date(), new Date()]);
    const [filename, setFilename] = useState("");

    const handleSubmit = () => {
        console.log("abc");
        const newData = { filename: filename, start: value[0], end: value[1] };
        onSubmit(newData);
    }

    return (
        <div style={{
            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px 0'
        }}>
            <div className="mb-3" style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <h2>Select Time</h2>
                <DateTimeRangePicker
                    value={value}
                    onChange={onChange}
                />
            </div>
            <div style={{ width: '60%' }} >
                <h2>Select Options</h2>
                <input className="formInput" type="text" placeholder="File Name" required value={filename} onChange={(e) => setFilename(e.target.value)} />
                <button className="btn btn-outline-secondary formInput" placeholder="Choose File Directory" onClick={chooseDirectory}>
                    {!directory || directory.length === 0 ? 'Choose File Directory' : directory}
                </button>
                <button className="btn btn-outline-secondary formInput" onClick={() => getSources()}>
                    {buttonText.length === 0 ? 'Choose a Video Source' : buttonText}
                </button>
                <input className="btn btn-outline-primary formInput" type="submit" value="Confirm" onClick={handleSubmit} />
            </div>
        </div >
    );
}

export default Form;
