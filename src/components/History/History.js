import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const History = (props) => {
    return (
        <Popup trigger={<button className="button"> Open Modal </button>} modal>
            <div>
                <h2>Recording History</h2>
                <div className="content">
                    {' '}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
                    Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
                    delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
                    commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
                    explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
                </div>
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