import { Message, MessageBox } from 'element-ui';

const MESSAGE_DURATION = 2000;

export const MESSAGE_TYPE_MAP = {
  WARN: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info'
};

/**
 * ToastTip {
 *  统一样式和默认配置的阻断性的操作提示，如“确定提交”、“确定删除”等等
 *  static confirm({content, title, type?, confirmButtonText?, cancelButtonText?, distinguishCancelAndClose?})  return promise
 *  统一样式和默认配置的非阻断提示，如表单验证失败、新消息提醒等等
 *  static success(content, duration?) duration: 毫秒值
 *  static error(content)
 *  static warn(content)
 *  static info(content)
 * }
 */
class ToastTip {
  static confirm ({ content, title, type, confirmButtonText, cancelButtonText, distinguishCancelAndClose } = {
    content: '是否继续',
    title: '提示',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    distinguishCancelAndClose: true,
    type: MESSAGE_TYPE_MAP.WARN
  }) {
    return MessageBox.confirm(content, title, {
      distinguishCancelAndClose: distinguishCancelAndClose,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      type: type
    });
  }

  static success (content, duration) {
    duration = duration || MESSAGE_DURATION;
    content = content || '提交成功';
    Message({
      message: content,
      type: MESSAGE_TYPE_MAP.SUCCESS,
      duration,
      dangerouslyUseHTMLString: true
    });
  }

  static error (content, duration) {
    duration = duration || MESSAGE_DURATION;
    content = content || '提交失败';
    Message({
      message: content,
      type: MESSAGE_TYPE_MAP.ERROR,
      duration,
      dangerouslyUseHTMLString: true
    });
  }

  static warn (content, duration) {
    duration = duration || MESSAGE_DURATION;
    content = content || '警告';
    Message({
      message: content,
      type: MESSAGE_TYPE_MAP.WARN,
      duration,
      dangerouslyUseHTMLString: true
    });
  }

  static info (content, duration) {
    duration = duration || MESSAGE_DURATION;
    content = content || '警告';
    Message({
      message: content,
      type: MESSAGE_TYPE_MAP.INFO,
      duration,
      dangerouslyUseHTMLString: true
    });
  }
}

export default ToastTip;
