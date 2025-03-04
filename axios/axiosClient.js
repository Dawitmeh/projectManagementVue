import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://backend.nilepms.com/api',
})

axiosClient.interceptors.request.use(config => {
    const token = sessionStorage.getItem('TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default axiosClient
