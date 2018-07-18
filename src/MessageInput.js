import React, { Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/database';

import { determineCollection } from './services/realtime';

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
            this.handlePostMessage();
        }
    }

    handlePostMessage = async () => {
        const { message } = this.state;
        if (!message) return;

        try {
            this.setState({ isPosting: true });
            await this.postMessage();

            this.setState({ message: '' });
            this.setState({ isPosting: false });
        } catch (error) {
            console.error(error);
            this.setState({ isPosting: false });
        }
    }

    postMessage = () => {
        const newPostKey = firebase.database().ref().child(determineCollection()).push().key;
        firebase.database().ref(determineCollection()).update({
            [newPostKey]: {
                author: firebase.auth().currentUser.displayName,
                text: this.state.message,
                timestamp: new Date(),
                uid: firebase.auth().currentUser.uid
            }
        });
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
                    onClick={this.handlePostMessage}>
                    {!isPosting && <i className="fa fa-send"></i>}
                    {isPosting && <i className="fa fa-spinner fa-spin"></i>}
                </button>
            </div>
        );
    }
}

export default MessageInput;