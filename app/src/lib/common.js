import ToastTip from '@/lib/message.js';

class Common {
  static requestMsgHandler (res, obj) {
    if (res.code === 1) {
      let sucMsg = (obj && obj.successMsg) ? obj.successMsg : res.message;
      ToastTip.success(sucMsg);
    } else {
      let errMsg = (obj && obj.errorMsg) ? obj.errorMsg : res.message;
      ToastTip.error(errMsg);
    }
  }
}

export default Common;
