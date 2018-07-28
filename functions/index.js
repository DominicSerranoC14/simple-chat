const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.REACT_APP_FB_DATABASE_URL
});

const translate = require('./translate.js');

module.exports = {
    translate
};