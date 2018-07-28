import React, { Component } from 'react';

import firebase from 'firebase/app';
import moment from 'moment';

const alignMessage = (uid) =>
    uid === firebase.auth().currentUser.uid ? 'justify-content-start own-message' : 'justify-content-end';

class SingleMessage extends Component {
    state = {
        showOriginalText: false
    };

    toggleShowOriginal = () => {
        this.setState(state => ({ showOriginalText: !state.showOriginalText }));
    };

    render() {
        const { author, text, timestamp, translatedText, translatedLanguage, uid } = this.props.message;
        const { showOriginalText } = this.state;

        return (
            <div className={`d-flex flex-column mt-3 single-message`}>
                <div className={`d-flex ${alignMessage(uid)}`}>
                    <p className="m-0 message-text">
                        <strong>
                            {translatedText ? translatedText : text}
                        </strong>
                    </p>
                </div>

                {translatedText && <div className={`d-flex align-items-center ${alignMessage(uid)}`}>
                    {showOriginalText && (
                        <span className="mr-2">
                            <small>{text} ({translatedLanguage})</small>
                        </span>
                    )}

                    <small className="show-original" onClick={this.toggleShowOriginal}>
                        {showOriginalText ? 'Hide' : 'Show original'}
                    </small>
                </div>}

                <div className={`d-flex ${alignMessage(uid)}`}>
                    <small className="m-0 mr-2"><strong>{author}</strong></small>
                    <small>{moment(timestamp).format('hh:mm a MMM DD')}</small>
                </div>
            </div>
        )
    };
};

export default SingleMessage;