import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Card = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div style = {{ width: '33%'}}>
            <h1>{props.title}</h1>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} popperPlacement="bottom" />
        </div>
    );
}

export default Card;