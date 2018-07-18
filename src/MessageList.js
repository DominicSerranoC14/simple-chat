import React, { Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/database';

import SingleMessage from './SingleMessage';

class MessageList extends Component {
    state = {
        messages: []
    };

    componentDidMount() {
        this.setRealtimeListener();
    }

    setRealtimeListener = () => {
        firebase.database().ref('messages').on('value', snapshot => {
            const messages = snapshot.val();
            this.setState({ messages: messages ? Object.values(messages) : [] });
        });
    }

    render() {
        const { messages } = this.state;

        if (!messages.length) return <p>Sorry, no messages for you. Be the the first to send one!</p>

        return messages.map(m =>
            <SingleMessage message={m} key={m.timestamp} />
        );
    }
}

export default MessageList;
