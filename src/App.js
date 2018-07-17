import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/database';

class App extends Component {
    state = {
        counter: 0
    };

    componentDidMount() {
        firebase.database().ref('counter').on('value', snapshot => {
            this.setState({ counter: snapshot.val() });
        });
    }

    increment = async () => {
        await fetch('https://react-hoarder-9fe27.firebaseio.com/counter.json', {
            method: 'PUT', body: JSON.stringify(this.state.counter + 1)
        });
    }

    decrement = () => {
        fetch('https://react-hoarder-9fe27.firebaseio.com/counter.json', {
            method: 'PUT', body: JSON.stringify(this.state.counter - 1)
        });
    }

    render() {
        return (
            <div className="App">
                <div>{this.state.counter}</div>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
            </div>
        );
    }
}

export default App;
