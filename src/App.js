import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class App extends Component {
    state = {
        user: null
    };

    async componentDidMount() {
        try {
            await firebase.auth().signInAnonymously();
        } catch (error) {
            console.error(error);
        }
        this.removeListener = this.setOnAuthStateListener();
    }

    componentWillUnmount() {
        this.removeListener();
    }

    setOnAuthStateListener = () => {
        return firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
                this.setRealtimeListener();
                this.checkAnonUserDisplayName();
            } else {
                this.setState({ user: null });
            }
        });
    }

    setRealtimeListener = () => {
        firebase.database().ref('counter').on('value', snapshot => {
            this.setState({ counter: snapshot.val() });
        });
    }

    checkAnonUserDisplayName = async () => {
        if (!this.state.user.displayName) {
            const displayName = await this.getRandomUsername();
            this.state.user.updateProfile({ displayName });
        }
    }

    getRandomUsername = async () => {
        try {
            const { data: { results } } = await axios('https://randomuser.me/api/');
            return results[0] ? results[0].login.username : 'whoami';
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        if (!this.state.user) return null;

        return (
            <div className="App">
                <div className="header">
                    <h2>Welcome To Slack</h2>
                    {this.state.user && <p>username: {this.state.user.displayName}</p>}
                </div>
            </div>
        );
    }
}

export default App;
