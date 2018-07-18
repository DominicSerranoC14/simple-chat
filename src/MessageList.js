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

        this.scrollToDiv = React.createRef();
    }

    setRealtimeListener = () => {
        firebase.database().ref('messages').on('value', snapshot => {
            const messages = snapshot.val();
            this.setState({ messages: messages ? Object.values(messages) : [] });
            this.scrollToDiv.current.scrollIntoView({ behavior: 'smooth' });
        });
    }

    render() {
        const { messages } = this.state;
        const { className } = this.props;

        if (!messages.length) return <p>Sorry, no messages for you. Be the the first to send one!</p>

        return (
            <div className={className ? className : ''}>
                {messages.map(m =>
                    <SingleMessage message={m} key={m.timestamp} />
                )}

                <div className="hidden" ref={this.scrollToDiv}></div>
            </div>
        );
    }
}

export default MessageList;
