import React from 'react';

import moment from 'moment';

const alignMessage = index =>
    index % 2 === 0 ? 'justify-content-start' : 'justify-content-end';

const SingleMessage = ({ index, message }) => {
    const { author, text, timestamp } = message;

    return (
        <div className={`d-flex flex-column ${index % 2 === 0 ? 'justify-content-start' : 'justify-content-end'}`}>
            <div className={`d-flex ${alignMessage(index)}`}>
                <p className="m-0"><strong>{text}</strong></p>
            </div>

            <div className={`d-flex ${alignMessage(index)}`}>
                <small className="m-0 mr-2"><strong>{author}</strong></small>
                <small>{moment(timestamp).format('hh:mm a')}</small>
            </div>
        </div>
    );
};

export default SingleMessage;