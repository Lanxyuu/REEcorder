import React, { useState } from 'react'
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import "./Form.css";

<<<<<<< HEAD
const Form = ({ onSubmit, buttonText, getSources }) => {
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
            <div className="mb-4" style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <h2>Select Time</h2>
                <DateTimeRangePicker
                    value={value}
                    onChange={onChange}
                />
            </div>
            <div style={{ width: '60%' }} >
                <h2>Select Options</h2>
<<<<<<< Updated upstream
                <input className="formInput" type="text" placeholder="File Name" required value={filename} onChange={(e) => setFilename(e.target.value)} />
                <button className="btn btn-outline-secondary formInput" >Choose folder</button>
                <button className="btn btn-outline-secondary formInput" onClick={() => getSources()}>
                    {buttonText.length === 0 ? 'Choose a Video Source' : buttonText}
                </button>
                <button className="btn btn-outline-primary formInput" onClick={handleSubmit}>Confirm</button>
=======
                <form onSubmit={handleSubmit((data) => {
                    const newData = { ...data, start: value[0], end: value[1] };
                    onSubmit(newData);
                })}>
                    <input className="formInput" type="text" placeholder="File Name" {...register("filename", { required: true })} /><br />
                    <button class="btn btn-outline-secondary formInput" id="form" {...register("path")}>Choose folder</button><br />
                    <button className="btn btn-outline-secondary formInput" onClick={() => getSources()}>
                        {buttonText.length === 0 ? 'Choose a Video Source' : buttonText}
                    </button>
                    <br />
                    <input class="btn btn-outline-primary formInput" type="submit" value="Confirm" />
                </form>
>>>>>>> Stashed changes
            </div>
        </div >
    );
=======
const Form = ({ onSubmit, buttonText, getSources, chooseDirectory, directory }) => {
  const [value, onChange] = useState([new Date(), new Date()]);
  const { register, handleSubmit } = useForm();

  return (
    <div style={{
      width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px 0'
    }}>
      <div className="mb-4" style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <h2>Select Time</h2>
        <DateTimeRangePicker
          value={value}
          onChange={onChange}
        />
      </div>
      <div style={{ width: '60%' }} >
        <h2>Select Options</h2>
        <form onSubmit={handleSubmit((data) => {
          console.log("abc");
          const newData = { ...data, start: value[0], end: value[1] };
          onSubmit(newData);
        })}>
          <input type="text" placeholder="File Name" {...register("filename", { required: true })} /><br />


          {/* <button className="btn btn-outline-secondary" {...register("path")}>Choose folder</button> */}
          <button placeholder="Choose File Directory" onClick = {chooseDirectory}>
            {!directory || directory.length === 0 ? 'Choose File Directory' : directory}
          </button>
          
          <br />
          <button id="videoSelectBtn" className="button is-text" onClick={() => getSources()}>
            {buttonText.length === 0 ? 'Choose a Video Source' : buttonText}
          </button>
          <br />
          <input className="btn btn-outline-dark" type="submit" value="Confirm" />
        </form>
      </div>
    </div >
  );
>>>>>>> 4425ffcd251282105ae00daaae3102629ca685e4
}

export default Form;
