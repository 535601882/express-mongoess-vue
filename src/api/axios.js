import axios from 'axios'

const baseURL = process.env.NODE_ENV === "development" ? '/' : process.env.VUE_APP_BASE_URL
console.log("process.env",process.env);
const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 增加token
  config.headers.Authorization = "token"
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  let data = response.data;
  if (data.status !== 200 ){
    console.log("请求失败",data.message);
  }
  // 对响应数据做点什么
  console.log("对响应数据做点什么",response);
  return data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default instance
