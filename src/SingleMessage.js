import React from 'react';

import firebase from 'firebase/app';
import moment from 'moment';

const alignMessage = (uid) =>
    uid === firebase.auth().currentUser.uid ? 'justify-content-start own-message' : 'justify-content-end';

const SingleMessage = ({ message }) => {
    const { author, text, timestamp, uid } = message;

    return (
        <div className={`d-flex flex-column mt-3 single-message`}>
            <div className={`d-flex ${alignMessage(uid)}`}>
                <p className="m-0 message-text"><strong>{text}</strong></p>
            </div>

            <div className={`d-flex ${alignMessage(uid)}`}>
                <small className="m-0 mr-2"><strong>{author}</strong></small>
                <small>{moment(timestamp).format('hh:mm a')}</small>
            </div>
        </div>
    );
};

export default SingleMessage;