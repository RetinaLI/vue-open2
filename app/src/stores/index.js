import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
// 引入单独模块
import * as types from './mutation-types';
import login from './modules/login';
import { ProfileService } from '@/services/profile';
import newsService from '@/services/news';

Vue.use(Vuex);

// 开放环境:打印store
const debug = process.env.NODE_ENV !== 'production';
let profileService = new ProfileService();

export const STORE_MUTATION_MAP = {
  UPDATE_CURRENT_USER: 'UPDATE_CURRENT_USER',
  UPDATE_VALID_MENUS: 'UPDATE_VALID_MENUS'
};

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    news: { // 我的消息
      total: 0,
      data: []
    }
  },
  getters: {
    // getCurrentUser (state) {
    //   return state.currentUser;
    // }
    getCurrentUser (state) {
      return state.currentUser;
    },
    getNewsLength (state) { // 我的消息未读个数
      let newArr = state.news.data.filter(ele => ele.news);
      return newArr.length;
    },
    getNews (state) { // 我的消息数据
      return state.news;
    }
  },
  actions: {
    // 只用于异步/请求
    async initCurrentUser ({commit, state}) {
      let user = await profileService.getCurrentUser();
      if (user.id) {
        commit(STORE_MUTATION_MAP.UPDATE_CURRENT_USER, user);
      }
    },
    // 我的消息请求
    async getNewsList ({commit, state}, page) {
      let news = await newsService.getNews(page);
      commit(types.NEWS, news);
    }
  },
  mutations: {
    // [STORE_MUTATION_MAP.UPDATE_CURRENT_USER] (state, user) {
    //   state.currentUser = { ...state.currentUser, ...user };
    // },
    [STORE_MUTATION_MAP.UPDATE_CURRENT_USER] (state, user) {
      state.currentUser = { ...state.currentUser, ...user };
    },
    // 我的消息state
    [types.NEWS] (state, news) {
      state.news.total = news.totalCount;
      state.news.data = news.data;
    },
    [STORE_MUTATION_MAP.UPDATE_VALID_MENUS] (state, menus) {
      state.validMenus = menus;
    }
  },
  modules: {
    login
  },
  strict: debug, // 开发环境下使用严格模式
  plugins: debug ? [createLogger()] : [] // 开发环境输出log
});
