// import Vue from 'vue';
import Vuex from 'vuex';
import { mount, createLocalVue } from 'vue-test-utils';
import PersonalInfo from '@/pages/console/personal/info';
import ElementUI from 'element-ui';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Vuex);

describe('控制台-个人中心-账户信息：/console/info/index.html', () => {
  describe('修改基本信息token：', () => {
    let mutations;
    let state;
    let actions;
    let getters;
    let store;
    let wrapper;
    beforeEach(() => {
      state = {
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

      getters = {
        getCurrentUser: () => ({
          counter: 88,
          email: 'ddd@126.com放松放松非公开接受了开机速度就仿佛看见跨境电商斐林试剂分手就分手浪费健康',
          expire: '2016-05-04',
          fee: 15,
          headImageUrl: 'http://localhost:8081/public/img/zfb.png',
          id: 1,
          name: '王小虎dfljgl',
          token: 'jdslkfjdslkfsfkdsklf13221lkjlkjkjkjlkjlkdgdfdfff'
        }),
        getActived: () => {
          return state.actived;
        },
        getNewCode: () => {
          return 1;
        },
        getTimes: () => {
          return 1;
        },
        getOldCode: () => {
          return 1;
        }
      };

      actions = {
        getOldCodeHander: () => {
          return 1;
        }
      };

      mutations = {
        'UPDATE_OLD_EMAIL_ALL' () {
          clearInterval(window.Timing);
          state.oldCode = state.newCode = {
            disabled: false,
            text: '获取验证码'
          };
          state.times = 601;
        },
        'UPDATE_OLD_ACTIVED' (actived) {
          state.actived = parseInt(actived);
        },
        'UPDATE_TOKEN' (token) {
          state.token = token;
        }
      };

      store = new Vuex.Store({
        getters,
        actions,
        mutations
      });
      wrapper = mount(PersonalInfo, {
        store,
        localVue
      });
      let button = wrapper.find('.baseToken .con-info-dep-code-btn');
      button.trigger('click');
    });
    it('初始化：tokenBtn正确', () => {
      expect(wrapper.vm.tokenBtn).to.eql({
        text: '重置',
        disabled: false
      });
    });
    it('按钮文本变为“重置”', () => {
      let button = wrapper.find('.baseToken .con-info-dep-code-btn');

      expect(button.text()).to.equal('重置');
    });
    it('重置按钮-点击时，弹出弹框', () => {
      let vModal = document.querySelector('.el-message-box__wrapper');

      expect(vModal.style.display).to.not.equal('none');
    });
    it('弹出弹框-确认按钮点击时：', async () => {
      let vModalSave = document.querySelectorAll('.el-message-box__wrapper .el-message-box__btns button')[1];
      vModalSave.click();
      await flushPromises();
      let button = wrapper.find('.baseToken .con-info-dep-code-btn');

      expect(button.text()).to.equal('重置');
    });
    it('弹出弹框-取消按钮点击时：', async () => {
      let vModalSave = document.querySelectorAll('.el-message-box__wrapper .el-message-box__btns button')[0];
      vModalSave.click();
      await flushPromises();
      let button = wrapper.find('.baseToken .con-info-dep-code-btn');

      expect(button.text()).to.equal('本月已重置');
    });
  });
});
