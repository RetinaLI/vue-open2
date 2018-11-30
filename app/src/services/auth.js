import axiosApi from '@/http/axiosApi';

class AuthService {
  static async getAuth () {
    let {data} = await axiosApi('getAuth');
    return data;
  }
  static async postAuth (info) {
    let data = await axiosApi('postAuth', info);
    return data;
  }
  static async postImg (formData) {
    let data = await axiosApi('postAuthImg', formData);
    return data;
  }
}

export default AuthService;
