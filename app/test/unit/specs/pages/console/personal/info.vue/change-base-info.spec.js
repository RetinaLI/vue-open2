// import Vue from 'vue';
import Vuex from 'vuex';
import { mount, createLocalVue } from 'vue-test-utils';
import PersonalInfo from '@/pages/console/personal/info';
import ElementUI from 'element-ui';
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Vuex);

describe('控制台-个人中心-账户信息：/console/info/index.html', () => {
  describe('修改基本信息：', () => {
    let getters;
    let store;
    let wrapper;
    beforeEach(() => {
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
          return 1;
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

      store = new Vuex.Store({
        getters
      });
      wrapper = mount(PersonalInfo, {
        store,
        localVue
      });
      let button = wrapper.find('div.baseinfo .con-info-part-title button');
      button.trigger('click');
    });
    it('按钮文本变为“编辑中...”', () => {
      let button = wrapper.find('div.baseinfo .con-info-part-title button');
      expect(button.text()).to.equal('编辑中...');
    });
    it('基本信息模块变为修改状态', () => {
      let $viewWrapper = wrapper.find('div.baseinfo .view-wrapper');
      let $editWrapper = wrapper.find('div.baseinfo .edit-wrapper');
      expect($viewWrapper.attributes().style).to.equal('display: none;');
      expect($editWrapper.attributes().style).to.not.equal('display: none;');
    });
    it('取消编辑成功', () => {
      let $button = wrapper.find('div.baseinfo .edit-wrapper button.cancel');
      $button.trigger('click');
      let $viewWrapper = wrapper.find('div.baseinfo .view-wrapper');
      let $editWrapper = wrapper.find('div.baseinfo .edit-wrapper');
      let $editButton = wrapper.find('div.baseinfo .con-info-part-title button');

      expect($viewWrapper.attributes().style).to.not.equal('display: none;');
      expect($editWrapper.attributes().style).to.equal('display: none;');
      expect($editButton.text()).to.equal('修改');
    });
    it('保存编辑成功', () => {
      let $button = wrapper.find('div.baseinfo .edit-wrapper button.save');
      $button.trigger('click');
      let $viewWrapper = wrapper.find('div.baseinfo .view-wrapper');
      let $editWrapper = wrapper.find('div.baseinfo .edit-wrapper');
      let $editButton = wrapper.find('div.baseinfo .con-info-part-title button');

      expect($viewWrapper.attributes().style).to.not.equal('display: none;');
      expect($editWrapper.attributes().style).to.equal('display: none;');
      expect($editButton.text()).to.equal('修改');
    });

    // todo: 用户名验证
  });
  describe('修改基本信息：', () => {
    let getters;
    let store;
    let wrapper;
    beforeEach(() => {
      getters = {
        getCurrentUser: () => ({
          counter: 88,
          email: 'ddd@126.com放松放松非公开接受了开机速度就仿佛看见跨境电商斐林试剂分手就分手浪费健康',
          expire: '2016-05-04',
          fee: 15,
          headImageUrl: 'http://localhost:8081/public/img/zfb.png',
          id: 1,
          name: '王',
          token: 'jdslkfjdslkfsfkdsklf13221lkjlkjkjkjlkjlkdgdfdfff'
        }),
        getActived: () => {
          return 1;
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

      store = new Vuex.Store({
        getters
      });
      wrapper = mount(PersonalInfo, {
        store,
        localVue
      });
      let button = wrapper.find('div.baseinfo .con-info-part-title button');
      button.trigger('click');
    });
    // todo: 用户名验证
    it('保存编辑-用户名小于2位时:显示错误提示', () => {
      let $button = wrapper.find('div.baseinfo .edit-wrapper button.save');
      $button.trigger('click');
      let $editWrapperInputErr = wrapper.find('div.baseinfo .edit-wrapper .edit-input');

      expect($editWrapperInputErr.classes()).to.include('is-error');
    });
  });
  describe('修改基本信息：', () => {
    let getters;
    let store;
    let wrapper;
    beforeEach(() => {
      getters = {
        getCurrentUser: () => ({
          counter: 88,
          email: 'ddd@126.com放松放松非公开接受了开机速度就仿佛看见跨境电商斐林试剂分手就分手浪费健康',
          expire: '2016-05-04',
          fee: 15,
          headImageUrl: 'http://localhost:8081/public/img/zfb.png',
          id: 1,
          name: '12341234123412341',
          token: 'jdslkfjdslkfsfkdsklf13221lkjlkjkjkjlkjlkdgdfdfff'
        }),
        getActived: () => {
          return 1;
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

      store = new Vuex.Store({
        getters
      });
      wrapper = mount(PersonalInfo, {
        store,
        localVue
      });
      let button = wrapper.find('div.baseinfo .con-info-part-title button');
      button.trigger('click');
    });
    // todo: 用户名验证
    it('保存编辑-用户名大于16位时:显示错误提示', () => {
      let $button = wrapper.find('div.baseinfo .edit-wrapper button.save');
      $button.trigger('click');
      let $editWrapperInputErr = wrapper.find('div.baseinfo .edit-wrapper .edit-input');

      expect($editWrapperInputErr.classes()).to.include('is-error');
    });
  });
  describe('修改基本信息：', () => {
    let getters;
    let store;
    let wrapper;
    beforeEach(() => {
      getters = {
        getCurrentUser: () => ({
          counter: 88,
          email: 'ddd@126.com放松放松非公开接受了开机速度就仿佛看见跨境电商斐林试剂分手就分手浪费健康',
          expire: '2016-05-04',
          fee: 15,
          headImageUrl: 'http://localhost:8081/public/img/zfb.png',
          id: 1,
          name: '1234123#/-ssdf',
          token: 'jdslkfjdslkfsfkdsklf13221lkjlkjkjkjlkjlkdgdfdfff'
        }),
        getActived: () => {
          return 1;
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

      store = new Vuex.Store({
        getters
      });
      wrapper = mount(PersonalInfo, {
        store,
        localVue
      });
      let button = wrapper.find('div.baseinfo .con-info-part-title button');
      button.trigger('click');
    });
    // todo: 用户名验证
    it('保存编辑-用户名包涵特殊字符时:显示错误提示', () => {
      let $button = wrapper.find('div.baseinfo .edit-wrapper button.save');
      $button.trigger('click');
      let $editWrapperInputErr = wrapper.find('div.baseinfo .edit-wrapper .edit-input');

      expect($editWrapperInputErr.classes()).to.include('is-error');
    });
  });
});
