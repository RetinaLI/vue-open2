import axiosApi from '@/http/axiosApi';

class PayService {
  async goPay (pay) {
    let {code} = await axiosApi('postPay', pay);
    return code;
  }
  async postEwm (ewm) {
    let data = await axiosApi('postEwm', ewm);
    return data;
  }
  async postPayRes (time) {
    let data = await axiosApi('postPayRes', time);
    return data;
  }
  async postPaied (code) {
    let data = await axiosApi('postPaied', code);
    return data;
  }
  // async getEwmUrl (data) {
  //   let data = await axiosApi('getEwmUrl', data);
  //   return data;
  // }
}

let payService = new PayService();

export default payService;
