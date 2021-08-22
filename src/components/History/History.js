Jackdaw's Cry
#3394
🕵️‍♀️👺
hack gang

narilth — Today at 12: 53 AM
i'll just do it
askanniething — Today at 12: 54 AM
who is that directed towards
narilth — Today at 1: 01 AM
nobody
askanniething — Today at 1: 11 AM
ok i have the save actually working
but what is the file name stored in
    nvm figured it otu
reee the worst thing about testing this is if u have to wait an entire two minutes for this thing to finish capturing
narilth — Today at 1: 18 AM
enjoy
i've dealt with so many merge conflicts that i dont even want to touch my keyboard anymore
cy@
Jackdaw's Cry — Today at 1:20 AM
No touching: warning:
askanniething — Today at 1: 21 AM
wait lol what am i enjoying
Lanxyuu(; '༎ຶД༎ຶ`) — Today at 1:22 AM
skfd just lmk when i can use it for the video LOL
askanniething — Today at 1: 43 AM
ok gamers
nvm
Lanxyuu(; '༎ຶД༎ຶ`) — Today at 1:43 AM
LOL
can I use the current version of the thing dfjdls
askanniething — Today at 1: 43 AM
ok so i disabled history
bro idk what's going on but github desktop wants me to merge node modules
give me 5 minutes
ok this sucks ass
julia hop on call with me
You missed a call from
askanniething
that lasted a few seconds.
— Today at 1: 44 AM
askanniething — Today at 1: 44 AM
@Jackdaw's Cry
Lanxyuu(; '༎ຶД༎ຶ`) — Today at 1:44 AM
gl: pray:
Jackdaw's Cry — Today at 1:45 AM
hi
Jackdaw's Cry — Today at 1:55 AM
@Lanxyuu(; '༎ຶД༎ຶ`) it is done
askanniething — Today at 1: 55 AM
wait
not done yet
Lanxyuu(; '༎ຶД༎ຶ`) — Today at 1:55 AM
oop
Jackdaw's Cry — Today at 1:58 AM
@Lanxyuu(; '༎ຶД༎ຶ`) :thumbsup:
Lanxyuu(; '༎ຶД༎ຶ`) — Today at 1:58 AM
ok lesgo LOL
Jackdaw's Cry — Today at 1:58 AM
wait
im pushing changes now
Lanxyuu(; '༎ຶД༎ຶ`) — Today at 1:58 AM
oh ok ok
Jackdaw's Cry — Today at 1:59 AM
ok good now
so the strat is
you set the time interval for starting in 1 minute
and duration to 1 minute or something
cause you can't record starting this minute apparently
askanniething — Today at 2: 00 AM
i mean it should technically work for any time in the future
Lanxyuu(; '༎ຶД༎ຶ`) — Today at 2:00 AM
ok ok
time to screen record our screen recorder: relieved:
Jackdaw's Cry — Today at 2:00 AM
: ok_hand:
im gonna put a placeholder link in devpost

askanniething — Today at 2: 08 AM
@Lanxyuu(; '༎ຶД༎ຶ`) let us know if u need any help! we're pretty much done the devpost
Jackdaw's Cry
started a call.
— Today at 2: 10 AM
Jackdaw's Cry — Today at 2:42 AM
btw the vid is max 3 mins apparently
https://www.instagram.com/p/CSzkYOTqM1j/?utm_source=ig_web_copy_link
They say life begins at 40… well, not mine.
I am 14, 609 days old today and I am celebrating every one of them.I have spent most of them pursuing dreams, surrounding myself with people I love and supported by all of you… and I know just how incredibly lucky that makes me.

One of my biggest unfulfilled dreams has been to release my own music.Music has been my passion my whole life and after a few false starts 20 years ago, I decided not to pursue it as a career.But today, I am realizing that ambition and announcing the release of my own songs.

I have wanted to create something more personal and intimate, to offer up something joyful, honest, soulful and passionate; I hope that you find some of this on my EP.

‘Songs For You’ will be released on October 15th and the first single, ‘11: 11’ is available for pre - order now!

As you can probably tell, I’m beyond excited to share all this with you.This is a special moment for me.The experience of the past year and a half has offered a fresh perspective to us all and has certainly helped me understand what kind of man I want to be for the next 40 years… and it’s not one who is prepared to let his dreams just be dreams.

‘Your heart knows the way, run in that direction’ - Rumi

❤️

#music #newmusic #dreams #thisis40
📸: @jonnymarlow
Lanxyuu(; '༎ຶД༎ຶ`) — Today at 2:49 AM
https://youtu.be/oov-hE5kwTY
YouTube
Sophie Lan
Watchr Video

askanniething — Today at 2: 50 AM

import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const History = (props) => {
    return (
        Expand
History.js
    3 KB

    import React from 'react'
    import Popup from 'reactjs-popup';
    import 'reactjs-popup/dist/index.css';

    const History = (props) => {
        return (
            <Popup trigger={<button className="btn btn-outline-primary mb-3"> Recording History </button>} modal>
                <div style={{ margin: '15px', overflowY: 'auto', height: '500px' }}>
                    <h2>Recording History</h2>
                    {Object.entries(props.recordings).map(([id, recording]) => (
                        recording && (recording.stage === 'created' && recording.start && recording.end)) ? (
                        <div key={id} style={{ marginBottom: '8px', padding: '10px', borderStyle: 'solid', borderRadius: '5px', borderWidth: '1px' }}>
                            <p>Filename: {recording.filename}</p>
                            <p>Time: {recording.start.toString()} to {recording.end.toString()}</p>
                            <button className="btn btn-outline-secondary" onClick={() => props.deleteRecording(id)}>Remove recording</button>
                        </div>
                    ) : (
                        recording &&
                        <div key={id} style={{ marginBottom: '8px', padding: '10px', borderStyle: 'solid', borderRadius: '5px', borderWidth: '1px' }}>
                            <p>Stage: {recording.stage.toString()}</p>
                            <button className="btn btn-outline-secondary" onClick={() => props.deleteRecording(id)}>Remove recording</button>
                        </div>
                    ))}
                    {console.log(props.recordings)}
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