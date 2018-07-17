import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class App extends Component {
    state = {
        user: null,
        fetchingUsername: false
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
            this.getNewUsername();
        }
    }

    getRandomUsername = async () => {
        try {
            const { data: { results } } = await axios('https://randomuser.me/api/');
            return results[0] ? results[0].login.username : 'whoami';
        } catch (error) {
            console.error(error);
            this.setState({ fetchingUsername: false });
        }
    }

    getNewUsername = async () => {
        this.setState({ fetchingUsername: true });

        const displayName = await this.getRandomUsername();
        await this.state.user.updateProfile({ displayName });

        this.setState({
            fetchingUsername: false,
            user: firebase.auth().currentUser
        });
    }

    render() {
        const { fetchingUsername, user } = this.state;

        if (!this.state.user) return <p>Loading...</p>;

        return (
            <div className="App">
                <div className="header">
                    <h4>Welcome To Simple Chat</h4>
                    {(user && user.displayName) &&
                        (
                            <div>
                                <button
                                    className="btn btn-primary btn-sm"
                                    disabled={fetchingUsername}
                                    onClick={this.getNewUsername}>
                                    New Name
                                    {fetchingUsername && <i className="fa fa-spinner fa-spin ml-2"></i>}
                                </button>

                                <p className="mt-2">username: {this.state.user.displayName}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default App;
