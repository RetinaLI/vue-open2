import axiosApi from '@/http/axiosApi';

export class InfoService {
  async getInfo () {
    let {data} = await axiosApi('getInfo');
    return data;
  }

  async getInfoEmail () {
    let {data} = await axiosApi('getInfoEmail');
    return data;
  }

  async getInfoToken () {
    let {data} = await axiosApi('getInfoToken');
    return data;
  }
}
