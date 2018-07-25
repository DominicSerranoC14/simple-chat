const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const axios = require('axios');

const translate = (req, res, next) => {
    const { body, query: { lang, text } } = req;
    const API_KEY = functions.config().yandex.apikey;

    // Return - cant figure out why cloud function is being called twice
    if (!body.token) return;

    admin.auth().verifyIdToken(body.token)
        .then(() => {
            return axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY}&text=${text}&lang=${lang}`);
        })
        .then(({ data }) => res.send(data))
        .catch(error => {
            console.error(error);
            res.json({ message: 'Unauthorized' });
        });
};

module.exports = functions.https.onRequest((req, res) => {
    cors(req, res, () => { });
    // res.header("Access-Control-Allow-Origin", "*");
    translate(req, res);
});