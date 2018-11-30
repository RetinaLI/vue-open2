import axios from 'axios';

// get获取方式
function getApi (url, params) {
  // params: 传入数据
  return new Promise((resolve, reject) => {
    axios.get(url, {params})
      .then(res => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default getApi;
