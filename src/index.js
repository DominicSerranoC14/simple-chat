import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';
import config from './config';
import './interceptors';
initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
