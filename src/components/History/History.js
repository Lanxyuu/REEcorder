import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const History = (props) => {
    return (
        <Popup trigger={<button className="btn btn-outline-primary"> Recording History </button>} modal>
            <div>
                <h2>Recording History</h2>
                {Object.entries(props.recordings).map(([id, recording]) => (
                    <div key={id}>
                        <p>File: {recording.filename}</p>
                        <p>Time: {recording.start.toString()} to {recording.end.toString()}</p>
                        <p>Source: {recording.type}</p>
                    </div>
                ))}
            </div>
        </Popup >
        // <div>
        //     <h2>Recording History</h2>
        //     {Object.entries(props.recordings).map(([id, recording]) => (
        //         <div key={id}>
        //             <p>{recording.filename}</p>
        //             <p>{recording.start.toString()} to {recording.end.toString()}</p>
        //             <p>{recording.type}</p>
        //         </div>
        //     ))}
        // </div>
    )
}

export default History