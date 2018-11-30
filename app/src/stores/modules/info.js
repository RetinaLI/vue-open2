// import * as types from '../mutation-types'
import Common from '@/lib/common';
import InfoService from '@/services/info';

const STORE_INFO_MUTATION_MAP = {
  UPDATE_ROOT_EMAIL: 'UPDATE_ROOT_EMAIL',
  UPDATE_OLD_CODE: 'UPDATE_OLD_CODE',
  UPDATE_NEW_CODE: 'UPDATE_NEW_CODE',
  UPDATE_TIME: 'UPDATE_TIME',
  UPDATE_OLD_EMAIL_ALL: 'UPDATE_OLD_EMAIL_ALL',
  UPDATE_OLD_ACTIVED: 'UPDATE_OLD_ACTIVED'
};
// state
const state = {
  actived: 0,
  oldCode: {
    disabled: false,
    text: '获取验证码'
  },
  newCode: {
    disabled: false,
    text: '获取验证码'
  },
  times: 601
};

// getters
const getters = {
  getActived (state) {
    return state.actived;
  },
  getNewCode (state) {
    return state.oldCode;
  },
  getTimes (state) {
    return state.times;
  },
  getOldCode (state) {
    return state.oldCode;
  }
};

// actions
const actions = {
  async httpCode ({commit}, medths) {
    let name = '';
    let data = '';
    if (typeof medths === 'object') {
      name = medths.name;
      data = medths.data;
    } else {
      name = medths;
    }
    let res = await InfoService[name](data);
    Common.requestMsgHandler(res);
    return res;
  },
  // 修改邮箱第二步
  async changeNewEmail ({dispatch, commit, rootState}, email) {
    if (email) {
      let {code = 0} = await dispatch('httpCode', {
        name: 'postEmail',
        data: email
      });
      if (code === 1) {
        commit(STORE_INFO_MUTATION_MAP.UPDATE_ROOT_EMAIL,
          {rootState, email: email.email});
      }
      return code;
    }
  },
  async getNewEmailCode ({dispatch, commit}, email) {
    if (email) {
      commit(STORE_INFO_MUTATION_MAP.UPDATE_NEW_CODE);
      let {code} = await dispatch('httpCode', {
        name: 'postNewCode',
        data: email
      });
      if (code === 1) {
        dispatch('startTime');
      }
    }
  },
  // 修改邮箱第一步
  async getOldCodeHander ({dispatch, commit}, email) {
    if (email) {
      commit(STORE_INFO_MUTATION_MAP.UPDATE_OLD_CODE);
      let {code} = await dispatch('httpCode', 'getCode');
      if (code === 1) {
        dispatch('startTime');
      }
    }
  },
  async submitOldEmailForm ({dispatch, commit}, emailCode) {
    if (emailCode) {
      let {code = 0} = await dispatch('httpCode', {
        name: 'postOldCode',
        data: emailCode
      });
      if (code === 1) {
        let timeOut = setTimeout(() => {
          clearTimeout(timeOut);
          commit(STORE_INFO_MUTATION_MAP.UPDATE_OLD_ACTIVED, '1');
          commit(STORE_INFO_MUTATION_MAP.UPDATE_OLD_EMAIL_ALL);
        }, 1000);
      }
    }
  },
  startTime ({commit}) {
    if (window.Timing) {
      clearInterval(window.Timing);
    }
    let times = 601;
    let timers = () => {
      times -= 1;
      if (times <= 0) {
        clearInterval(window.Timing);
        commit(STORE_INFO_MUTATION_MAP.UPDATE_OLD_EMAIL_ALL);
      }
      commit(STORE_INFO_MUTATION_MAP.UPDATE_TIME, times);
    };
    window.Timing = setInterval(timers, 1000);
  }
};
// mutations
const mutations = {
  [STORE_INFO_MUTATION_MAP.UPDATE_ROOT_EMAIL] (state, data) {
    data.rootState.currentUser.email = data.email;
  },
  [STORE_INFO_MUTATION_MAP.UPDATE_OLD_ACTIVED] (state, actived) {
    state.actived = parseInt(actived);
  },
  [STORE_INFO_MUTATION_MAP.UPDATE_NEW_CODE] (state) {
    state.times = 601;
    state.newCode.disabled = true;
    state.newCode.text = '重新获取验证码';
  },
  [STORE_INFO_MUTATION_MAP.UPDATE_OLD_CODE] (state) {
    state.times = 601;
    state.oldCode.disabled = true;
    state.oldCode.text = '重新获取验证码';
  },
  [STORE_INFO_MUTATION_MAP.UPDATE_TIME] (state, time) {
    state.times = time;
  },
  [STORE_INFO_MUTATION_MAP.UPDATE_OLD_EMAIL_ALL] (state) {
    clearInterval(window.Timing);
    state.oldCode = state.newCode = {
      disabled: false,
      text: '获取验证码'
    };
    state.times = 601;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
