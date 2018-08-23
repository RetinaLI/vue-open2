import axios from 'axios';
import { getUrlConfig, REQUEST_METHOD_MAP } from './http.url.config';
/**
 * 异步请求
 * @param action: http.url.config.js下HTTP_URL_MAP配置下的别名
 * @param data={}: 请求-->传递的参数
 * @returns {*}: 返回值 -> Promise
 */
/*
 {
   totalCount: 0,
   list: []
 }

 {
   data: {
     id: 1
   }
 }

 {
   code: ,
   message: ''
 }
*/
let axiosApi = (action, data = {}) => {
  // params: 传入数据
  if (!action) {
    return false;
  }
  // 解构出对应的值;
  let {url, method, isList, delay} = getUrlConfig(action);
  // get 请求参数
  let params = method === REQUEST_METHOD_MAP.GET ? data : {};
  // post 请求参数
  data = method === REQUEST_METHOD_MAP.GET ? {} : data;
  // 具体的请求
  return new Promise((resolve) => {
    setTimeout(() => {
      axios({
        url,
        method,
        params,
        data
      })
        .then(res => {
          // 解构数据
          let {data: resData = undefined} = res;
          // resData是否是字符串json数据
          resData = typeof resData === 'string' ? JSON.parse(resData) : resData;
          let {
            errno: code = 0,
            data = undefined,
            msg: message = '',
            totalCount = 0
          } = resData;
          // 如果没有data,说明使用的是其他数据字段:看情况拓展此方法
          if (!data) {
            return resData;
          }
          // 是否需要是列表
          if (isList) {
            let {count = 0, list = []} = data;
            data = list;
            totalCount = count;
          } else {
            data = data || {};
          }
          // 返回的数据解构 -- 字段
          let resDatas = {
            code,
            data,
            totalCount,
            message
          };
          resolve(resDatas);
        })
        .catch((error) => {
          console.log(error);
          // 是否需要是列表
          let data = isList ? [] : {};
          // 报错--》返回的-- 字段
          let resData = {
            code: 0,
            data,
            totalCount: 0,
            message: ''
          };
          resolve(resData);
        });
    }, delay);
  });
};

export default axiosApi;
