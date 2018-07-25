import axios from 'axios';
import { getCurrentUsersToken } from './auth';

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
        const token = await getCurrentUsersToken();
        const { data } = await axios.post(`${determineUrl()}/translate?text=${text}&lang=${lang}`, { token });

        return data;
    } catch (error) {
        console.error(error);
    }
};