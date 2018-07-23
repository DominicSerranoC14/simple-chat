import React, { Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/database';

import SingleMessage from './SingleMessage';
import { determineCollection } from './services/realtime';

class MessageList extends Component {
    state = {
        messages: []
    };

    componentDidMount() {
        this.setRealtimeListener();

        this.scrollToDiv = React.createRef();
    }

    setRealtimeListener = () => {
        const ref = firebase.database().ref(determineCollection()).orderByChild('count');
        ref.on('value', snapshot => {
            const messages = snapshot.val();
            this.setState({ messages: messages ? Object.values(messages) : [] });
            this.scrollToDiv.current.scrollIntoView({ behavior: 'smooth' });
        });
    }

    render() {
        const { messages } = this.state;
        const { className } = this.props;

        return (
            <div className={className ? className : ''}>
                {!messages.length &&
                    <p>Sorry, no messages for you. Be the the first to send one!</p>
                }

                {messages.map((m, i) =>
                    <SingleMessage message={m} key={i} />
                )}

                <div className="hidden" ref={this.scrollToDiv}></div>
            </div>
        );
    }
}

export default MessageList;
