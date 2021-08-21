import React, { useState } from 'react'
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import { useForm } from "react-hook-form";
import "./Form.css"

const Form = () => {
    const [value, onChange] = useState([new Date(), new Date()]);

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div style={{
            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px'
        }}>
            <div class="mx-auto mb-4" style={{ width: '50%' }} >
                <h2>Select Time</h2>
                <DateTimeRangePicker
                    value={value}
                    onChange={onChange}
                />
            </div>
            <div style={{ width: '50%' }} >
                <h2>Select Options</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input id="form" type="text" placeholder="File Name" {...register("filename", { required: true })} /><br />
                    <input id="file" type="file" webkitdirectory="true" /><br />
                    <select id="form" name="type"  {...register("type", { required: true })}>
                        <option value="Window">Window</option>
                        <option value="Screen">Screen</option>
                    </select><br />
                    <input id="form" type="submit" value="Confirm" />
                </form>
            </div>
        </div >
    );
}

export default Form;