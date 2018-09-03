import axiosApi from '@/http/axiosApi';

export class BalanceService {
  async getTop () {
    let result = await axiosApi('getBalance');
    return result.data;
  }

  async getTabPay (page) {
    return axiosApi('getBalanceTabPay', page);
  }

  async getTabCost (page = {}) {
    return axiosApi('getBalanceTabCost', page);
  }
}
