import axios from 'axios';
import { getCurrentUsersToken } from './services/auth';

axios.interceptors.request.use(async config => {
    // Add auth token to request data
    // const token = await getCurrentUsersToken();
    // config.data = { token };
    console.log('try')
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});