import React, { Component } from 'react';
import ToggleSwitch from 'react-toggle-switch';
import Select from 'react-select';

import firebase from 'firebase/app';
import 'firebase/database';
import _ from 'lodash';

import { getTranslation } from './services/translate';
import { determineCollection } from './services/realtime';
import languageList from './constants/languages';

class MessageInput extends Component {
    state = {
        isPosting: false,
        isTranslating: false,
        message: '',
        showTranslator: false,
        translatedMessage: '',
        translateToLanguage: { label: 'Spanish', value: 'es' }
    }

    componentDidMount() {
        this.translateDebounce = _.debounce(this.translate, 1000);
    }

    handleTranslateDebounce = () => {
        this.setState({ isTranslating: true });
        this.translateDebounce();
    }

    translate = async () => {
        const data = await getTranslation({ lang: this.state.translateToLanguage.value, text: this.state.message });
        const text = (data && data.text && data.text.length) ? data.text[0] : 'Whoops, try another phrase!';

        this.setState({
            isTranslating: false,
            translatedMessage: text
        });
    };

    handleOnChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
        // Do not trigger translation if target.value is null
        if (this.state.showTranslator && target.value) this.handleTranslateDebounce();
    }

    handleSelectOnchange = (option) => {
        this.setState({ translateToLanguage: option });
    }

    handleEnterKeypress = ({ keyCode, target }) => {
        if (keyCode === 13) {
            this.handlePostMessage(target.value);
        }
    }

    toggleTranslator = () =>
        this.setState(state => ({ showTranslator: !state.showTranslator }));

    handlePostMessage = async () => {
        if (!this.state.message || this.state.message.length > 100) return;

        try {
            this.setState({ isPosting: true });
            await this.postMessage();

            this.setState({ isPosting: false, message: '', translatedMessage: '' });
        } catch (error) {
            console.error(error);
            this.setState({ isPosting: false });
        }
    }

    postMessage = () => {
        const { message, translatedMessage, translateToLanguage } = this.state;
        const newPostKey = firebase.database().ref().child(determineCollection()).push().key;
        firebase.database().ref(determineCollection()).update({
            [newPostKey]: {
                author: firebase.auth().currentUser.displayName,
                text: message,
                translatedLanguage: translateToLanguage.label,
                translatedText: translatedMessage,
                timestamp: new Date(),
                uid: firebase.auth().currentUser.uid
            }
        });
    };

    render() {
        const { isPosting, isTranslating, message, showTranslator, translatedMessage, translateToLanguage } = this.state;

        return (
            <div className="row d-flex align-items-center">
                <div className="col-md-11">
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
                            title="Send Message"
                            className="btn btn-primary"
                            disabled={isPosting}
                            onClick={this.handlePostMessage}>
                            {!isPosting && <i className="fa fa-send"></i>}
                            {isPosting && <i className="fa fa-spinner fa-spin"></i>}
                        </button>
                    </div>

                    {showTranslator && <div className="d-flex justify-content-between row no-gutters mt-2">
                        <div className="col-md-3">
                            <Select
                                value={translateToLanguage}
                                name="language"
                                placeholder="Translate to..."
                                onChange={this.handleSelectOnchange}
                                options={languageList}
                            />
                        </div>

                        <div className="col-md-9">
                            <div className="d-flex">
                                <input
                                    type="text"
                                    name="message"
                                    className="form-control"
                                    placeholder="Translation will go here!"
                                    value={translatedMessage}
                                    disabled={true} />

                                <button
                                    title="Send Translation"
                                    className="btn btn-primary"
                                    onClick={this.handlePostMessage}
                                    disabled={isTranslating}>
                                    {!isTranslating && <i className="fa fa-send"></i>}
                                    {isTranslating && <i className="fa fa-spinner fa-spin"></i>}
                                </button>
                            </div>
                        </div>
                    </div>}
                </div>

                <div className="col-md-1">
                    <small>{showTranslator ? 'Hide' : 'Translate'}</small>

                    <ToggleSwitch onClick={this.toggleTranslator} on={showTranslator}>
                    </ToggleSwitch>
                </div>
            </div>
        );
    }
}

export default MessageInput;