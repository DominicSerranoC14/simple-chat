export const determineCollection = () => {
    const { NODE_ENV, REACT_APP_FB_TEST_COLLECTION, REACT_APP_FB_PRODUCTION_COLLECTION } = process.env;

    if (NODE_ENV === 'development') {
        return REACT_APP_FB_TEST_COLLECTION;
    } else {
        return REACT_APP_FB_PRODUCTION_COLLECTION;
    }
};