import { default as axiosInstance } from 'axios';

const axios = axiosInstance.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

// axios.interceptors.request.use(config => {
// 	console.log('REQUSET:', config);
// 	return config;
// }, error => {
// 	console.log(error);
// });

export default axios;
