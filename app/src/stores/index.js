import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
// 引入单独模块
import * as types from './mutation-types';
import info from './modules/info';
import passport from './modules/passport';
import { ProfileService } from '@/services/profile';
import NewsService from '@/services/news';

Vue.use(Vuex);

// 开放环境:打印store
const debug = process.env.NODE_ENV !== 'production';
let profileService = new ProfileService();
let newsService = new NewsService();
export const STORE_MUTATION_MAP = {
  UPDATE_CURRENT_USER: 'UPDATE_CURRENT_USER',
  UPDATE_VALID_MENUS: 'UPDATE_VALID_MENUS',
  UPDATE_HEADIMG: 'UPDATE_HEADIMG',
  UPDATE_TOKEN: 'UPDATE_TOKEN',
  UPDATE_NAME: 'UPDATE_NAME'
};

export const store = new Vuex.Store({
  state: {
    currentUser: {},
    validMenus: [],
    news: { // 我的消息
      total: 0,
      data: [],
      isReadLen: 0
    }
  },
  getters: {
    getCurrentUser (state) {
      return state.currentUser;
    },
    getNewsLength (state) { // 我的消息未读个数
      return state.news.isReadLen;
    },
    getNews (state) { // 我的消息数据
      return state.news;
    }
  },
  actions: {
    // 只用于异步/请求
    async initCurrentUser ({commit, state}) {
      let user = await profileService.getCurrentUser();
      if (user.name) {
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
    [STORE_MUTATION_MAP.UPDATE_TOKEN] (state, token) {
      state.currentUser.token = token;
    },
    [STORE_MUTATION_MAP.UPDATE_NAME] (state, name) {
      state.currentUser.name = name;
    },
    [STORE_MUTATION_MAP.UPDATE_HEADIMG] (state, img) {
      state.currentUser.headImageUrl = img;
    },
    // 我的消息state
    [types.NEWS] (state, news) {
      state.news.total = news.data.count || 0;
      state.news.data = news.data.list;
      state.news.isReadLen = news.data.noReadCount || 0;
    },
    [types.NEWS_IS_READ] (state, id) {
      state.news.data.find(ele => {
        if (ele.id === id) {
          ele.isRead = 1;
          state.news.isReadLen--;
        }
      });
    },
    [STORE_MUTATION_MAP.UPDATE_VALID_MENUS] (state, menus) {
      state.validMenus = menus;
    }
  },
  modules: {
    info,
    passport
  },
  strict: debug, // 开发环境下使用严格模式
  plugins: debug ? [createLogger()] : [] // 开发环境输出log
});
