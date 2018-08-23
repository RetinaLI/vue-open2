import axiosApi from '@/http/axiosApi';

export class ApiService {
  async getListByKeywords (params = {
    pageIndex: 0,
    pageSize: 1,
    keywords: ''
  }) {
    let result = await axiosApi('getApiListByKeywords', params);
    return result.data;
  }

  async getBaseDetail (params = { id: null }) {
    let result = await axiosApi('getApiBaseDetail', params);
    return result.data;
  }
}
