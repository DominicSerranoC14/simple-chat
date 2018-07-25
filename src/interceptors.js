import axios from 'axios';

axios.interceptors.request.use(async config => {
    // Add auth token to request data
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});