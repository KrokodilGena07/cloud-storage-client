import axios from 'axios';

const api = axios.create({
    baseURL: `${__API__}/api`,
    withCredentials: true
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }

        return config;
    }
);

api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {

            return api.request(originalRequest);
        } catch (e) {
            alert('authorize please')
        }
    }
    throw error;
});