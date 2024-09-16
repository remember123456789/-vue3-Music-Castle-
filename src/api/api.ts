import axios from 'axios';
import { type AxiosResponse } from 'axios'

// 创建一个 Axios 实例  
const service = axios.create({
    baseURL: 'http://1.94.195.239:3000', // 设置请求的基础 URL  
    timeout: 5000, // 设置请求超时时间（单位：毫秒）  
});

// 请求拦截器  
service.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么  
        // 例如：添加请求头、身份验证等  

        return config;
    },
    (error) => {
        // 对请求错误做些什么  
        return Promise.reject(error);
    }
);

// 响应拦截器  
service.interceptors.response.use(
    (response): AxiosResponse<any> => {
        // 对响应数据做些什么  
        
        return response.data;
    },
    (error) => {
        // 对响应错误做些什么  
        return Promise.reject(error);
    }
);

export default service;

