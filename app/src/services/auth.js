import axiosApi from '@/http/axiosApi';

export class AuthService {
  async getAuth () {
    let {data} = await axiosApi('getAuth');
    return data;
  }
}
