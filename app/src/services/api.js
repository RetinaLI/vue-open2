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

  async getDynamicIndustry (params = {}) {
    let result = await axiosApi('getDynamicIndustry', params);
    return result.data;
  }

  async getDynamicProducts (params = {}) {
    let result = await axiosApi('getDynamicProducts', params);
    return result.data;
  }

  async getInterfaces (params = {}) {
    let result = await axiosApi('getInterfaces', params);
    return result.data;
  }

  async getApiDetail (params = {}) {
    let result = await axiosApi('getApiDetail', params);
    return result.data;
  }

  async getListAudit (params = {}) {
    let result = await axiosApi('getListAudit', params);
    return result.data;
  }

  async getListApiType (params = {}) {
    let result = await axiosApi('getListApiType', params);
    if (result && result.data) {
      return result.data;
    } else {
      return [];
    }
  }

  async getApiSubscibe (params = {}) {
    let result = await axiosApi('getApiSubscibe', params);
    return result.data;
  }

  async applyData (params = {}) {
    let result = await axiosApi('applyData', params);
    return result;
  }
}
