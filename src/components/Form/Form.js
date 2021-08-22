import React, { useState } from 'react'
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import { useForm } from "react-hook-form";
import "./Form.css"

const Form = ({ onSubmit }) => {
    const [value, onChange] = useState([new Date(), new Date()]);
    const { register, handleSubmit } = useForm();

    return (
        <div style={{
            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px'
        }}>
            <div class="mb-4" style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <h2>Select Time</h2>
                <DateTimeRangePicker
                    value={value}
                    onChange={onChange}
                />
            </div>
            <div style={{ width: '60%' }} >
                <h2>Select Options</h2>
                <form onSubmit={handleSubmit((data) => {
                    const newData = { ...data, start: value[0], end: value[1] };
                    onSubmit(newData);
                })}>
                    <input id="form" type="text" placeholder="File Name" {...register("filename", { required: true })} /><br />
                    <button class="btn btn-outline-secondary" id="form" {...register("path")}>Choose folder</button><br />
                    <select id="form" name="type"  {...register("type", { required: true })}>
                        <option value="Window">Window</option>
                        <option value="Screen">Screen</option>
                    </select><br />
                    <input class="btn btn-outline-dark" id="form" type="submit" value="Confirm" />
                </form>
            </div>
        </div >
    );
}

export default Form;
