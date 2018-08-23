import axiosApi from '@/http/axiosApi';

class DetailService {
  async getDetail () {
    let {data} = await axiosApi('getDetail');
    return data;
  }
  async getDetailChart () {
    let {data} = await axiosApi('getDetailChart');
    return data;
  }
  async getDetailTable (page = {}) {
    return axiosApi('getDetailTable', page);
  }
}

let detailServer = new DetailService();

export default detailServer;
