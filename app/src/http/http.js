/**
 * http配置
 */

import axios from 'axios';
import router from '@/router';

// axios 配置

axios.defaults.timeout = 300000;
// 映射时，后端接口服务器
// axios.defaults.baseURL = `http://localhost:3000`;
// http request 拦截器
let token = true;
axios.interceptors.request.use(
  config => {
    if (token) {
      // config.headers.Authorization = `BasicAuth ${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response)
    // if (response.data.errno) {
    //   response.data.
    // }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // console.log(error.response);
          // 登录超时, token超时
          // 401 清除token信息并跳转到登录页面
          router.replace({
            name: '/',
            query: {redirect: router.currentRoute.fullPath}
          });
          break;
        default:
          // console.log('err-login')
          /* 普通401拦截直接返回到登录页面 */
          // store.commit(types.LOGOUT);
          // router.push('/');
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data);
  });

export default axios;
