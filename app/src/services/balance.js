import axiosApi from '@/http/axiosApi';

export class BalanceService {
  async getTop () {
    let result = await axiosApi('getBalanceTop');
    return result.data;
  }

  async getTabPay (page) {
    return axiosApi('getBalanceTabPay', page);
  }

  async getTabCost (page = {}) {
    return axiosApi('getBalanceTabCost', page);
  }

  async getInterfaceUsage () {
    let result = await axiosApi('getInterfaceUsage');
    return result.data;
  }

  async getHalfMonthIUsage () {
    return axiosApi('getHalfMonthIUsage');
  }
}
