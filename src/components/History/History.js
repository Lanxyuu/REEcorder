import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const History = (props) => {
    return (
        <Popup trigger={<button className="btn btn-outline-primary mb-3"> Recording History </button>} modal>
            <div style={{ margin: '15px', overflowY: 'auto', height: '500px' }}>
                <h2>Recording History</h2>
                {Object.entries(props.recordings).map(([id, recording]) => (
                    <div key={id} style={{ marginBottom: '8px', padding: '10px', borderStyle: 'solid', borderRadius: '5px', borderWidth: '1px' }}>
                        <p>Filename: {recording.filename}</p>
                        <p>Time: {recording.start.toString()} to {recording.end.toString()}</p>
                        <button className="btn btn-outline-secondary" onClick={() => props.deleteRecording(id)}>Remove recording</button>
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