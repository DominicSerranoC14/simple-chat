import axios from 'axios';

export const determineUrl = () => {
    const { NODE_ENV, REACT_APP_TRANSLATE_DEV_URL, REACT_APP_TRANSLATE_HOSTED_URL } = process.env;

    if (NODE_ENV === 'development') {
        return REACT_APP_TRANSLATE_DEV_URL;
    } else {
        return REACT_APP_TRANSLATE_HOSTED_URL;
    }
};

export const getTranslation = async ({ lang, text }) => {
    try {
        const data = await axios(`${determineUrl()}/translate`, {
            params: { lang, text }
        });
        return data;
    } catch (error) {
        console.error(error);
    }
};