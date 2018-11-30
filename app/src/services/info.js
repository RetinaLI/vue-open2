import axiosApi from '@/http/axiosApi';

class InfoService {
  static async getInfo () {
    let {data} = await axiosApi('getInfo');
    return data;
  }

  static async getCode () {
    let data = await axiosApi('getInfoCode');
    return data;
  }

  static async getInfoToken () {
    let data = await axiosApi('getInfoToken');
    return data;
  }

  static async postEmail (email) {
    let data = await axiosApi('postEmail', email);
    return data;
  }

  static async postOldCode (code) {
    let data = await axiosApi('postOldCode', code);
    return data;
  }

  static async postNewCode (email) {
    let data = await axiosApi('postNewCode', email);
    return data;
  }

  static async postName (name) {
    let data = await axiosApi('postName', name);
    return data;
  }

  static async postImg (formData) {
    let data = await axiosApi('postImg', formData);
    return data;
  }

  static async modifyAvatar (params) {
    let data = await axiosApi('modifyAvatar', params);
    return data;
  }
}

export default InfoService;
