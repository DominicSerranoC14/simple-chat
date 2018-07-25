const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://react-hoarder-9fe27.firebaseio.com'
});

const translate = require('./translate.js');

module.exports = {
    translate
};