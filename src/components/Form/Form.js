import React, { useState } from 'react'
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import { useForm } from "react-hook-form";
import "./Form.css";

const Form = ({ onSubmit, buttonText, getSources }) => {
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
                    <input className="formInput" type="text" placeholder="File Name" {...register("filename", { required: true })} /><br />
                    <button className="btn btn-outline-secondary formInput" {...register("path")}>Choose folder</button><br />
                    <button className="btn btn-outline-secondary formInput" onClick={() => getSources()}>
                        {buttonText.length === 0 ? 'Choose a Video Source' : buttonText}
                    </button>
                    <br />
                    <input className="btn btn-outline-primary formInput" type="submit" value="Confirm" />
                </form>
            </div>
        </div >
    );
}

export default Form;
