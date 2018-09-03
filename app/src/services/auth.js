import axiosApi from '@/http/axiosApi';

class AuthService {
  async getAuth () {
    let {data} = await axiosApi('getAuth');
    return data;
  }
  async postAuth (info) {
    let data = await axiosApi('postAuth', info);
    return data;
  }
  async postImg (formData) {
    let data = await axiosApi('postAuthImg', formData);
    return data;
  }
}

let authService = new AuthService();

export default authService;
