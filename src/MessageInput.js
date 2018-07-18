import React, { Component } from 'react';

import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/database';

class MessageInput extends Component {
    state = {
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
            const token = await firebase.auth().currentUser.getIdToken();
            await axios.post(`${process.env.REACT_APP_FB_DATABASE_URL}/messages.json?auth=${token}`, {
                author: firebase.auth().currentUser.displayName,
                text: message,
                timestamp: new Date()
            });
            this.setState({ message: '' });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const { message } = this.state;

        return (
            <div>
                <input
                    type="text"
                    name="message"
                    className="form-control"
                    placeholder="Type here..."
                    value={message}
                    onChange={this.handleOnChange}
                    onKeyUp={this.handleEnterKeypress}
                />
            </div>
        );
    }
}

export default MessageInput;