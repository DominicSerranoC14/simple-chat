const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const axios = require('axios');

const translate = ({ query: { lang, text } }, res, next) => {
    const API_KEY = functions.config().yandex.apikey;

    axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY}&text=${text}&lang=${lang}`)
        .then(({ data }) => {
            res.send(data);
        })
        .catch((error) => {
            res.send({ error });
        });
};

module.exports = functions.https.onRequest((req, res) => {
    cors(req, res, () => { });
    // res.header("Access-Control-Allow-Origin", "*");
    translate(req, res);
});