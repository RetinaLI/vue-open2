import axiosApi from '@/http/axiosApi';

class DetailService {
  static async getDetail (datas) {
    let {data} = await axiosApi('getDetail', datas);
    return data;
  }
  static async getDetailChart (datas) {
    let {data} = await axiosApi('getDetailChart', datas);
    return data;
  }
  static async getDetailMonth (datas) {
    let data = await axiosApi('getDetailMonth', datas);
    return data;
  }
  static async getDetailDay (datas) {
    let data = await axiosApi('getDetailDay', datas);
    return data;
  }
  static async getDetailTable (page) {
    return axiosApi('getDetailTable', page);
  }
  static async getCarList (page) {
    return axiosApi('getCarList', page);
  }
  static async submitFile (params) {
    let data = await axiosApi('submitFile', params);
    return data;
  }
}

export default DetailService;
