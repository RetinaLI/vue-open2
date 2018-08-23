import axiosApi from '@/http/axiosApi';

export class ProfileService {
  async getCurrentUser () {
    let result = await axiosApi('getCurrentUser');
    return result.data;
  }
}
