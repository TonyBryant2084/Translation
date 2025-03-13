import axios from 'axios';

// ✅ 设置基础 URL
axios.defaults.baseURL = 'http://127.0.0.1:80';

// ✅ 允许跨域携带 Cookies
axios.defaults.withCredentials = true;

// ✅ 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // 从 localStorage 读取 token
    if (token) {
      config.headers['Authorization'] = `${token}`; // 在请求头中携带 token
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// ✅ 响应拦截器
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('未授权，跳转到登录页面');
        window.location.href = '/login'; // token 失效，跳转到登录页
      } else if (error.response.status === 403) {
        console.error('没有权限');
      } else {
        console.error('响应错误:', error.response.data);
      }
    } else if (error.request) {
      console.error('请求未收到响应:', error.request);
    } else {
      console.error('请求配置错误:', error.message);
    }
    return Promise.reject(error);
  }
);


export default axios;
