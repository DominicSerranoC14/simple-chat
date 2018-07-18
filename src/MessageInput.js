import React, { Component } from 'react';

import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/database';

class MessageInput extends Component {
    state = {
        isPosting: false,
        message: ''
    }

    handleOnChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    }

    handleEnterKeypress = ({ keyCode }) => {
        if (keyCode === 13) {
            this.postMessage();
        }
    }

    postMessage = async () => {
        const { message } = this.state;

        if (!message) return;

        try {
            this.setState({ isPosting: true });

            const token = await firebase.auth().currentUser.getIdToken();
            await axios.post(`${process.env.REACT_APP_FB_DATABASE_URL}/messages.json?auth=${token}`, {
                author: firebase.auth().currentUser.displayName,
                text: message,
                timestamp: new Date(),
                uid: firebase.auth().currentUser.uid
            });

            this.setState({ message: '' });
            this.setState({ isPosting: false });
        } catch (error) {
            console.error(error);
            this.setState({ isPosting: false });
        }
    }

    render() {
        const { isPosting, message } = this.state;

        return (
            <div className="d-flex">
                <input
                    type="text"
                    name="message"
                    className="form-control"
                    placeholder="Type here..."
                    value={message}
                    onChange={this.handleOnChange}
                    onKeyUp={this.handleEnterKeypress}
                />

                <button
                    className="btn btn-primary"
                    disabled={isPosting}
                    onClick={this.postMessage}>
                    {!isPosting && <i className="fa fa-send"></i>}
                    {isPosting && <i className="fa fa-spinner fa-spin"></i>}
                </button>
            </div>
        );
    }
}

export default MessageInput;