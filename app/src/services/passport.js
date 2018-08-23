import axiosApi from '@/http/axiosApi';

export class PassportService {
  async getLoginUserFormInfo () {
    let result = await axiosApi('getLoginUserFormInfo');
    return result;
  }

  async getRegistInfo () {
    let result = await axiosApi('getRegistInfo');
    return result;
  }

  login () {
    document.location.href = '/login';
  }
}
