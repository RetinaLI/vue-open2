<template>
  <div class="box">
    <navbg></navbg>
    <div class="content wrap clearfix">
      <service-side-nav v-bind:navData="listApiType" v-bind:currentNav="apiType"></service-side-nav>
      <div class="api fl">
        <div class="detail" id="markdown"></div>
      </div>
      <div class="buy-box fr">
        <h3>{{ api.name }}</h3>
        <p class="abstract">{{ api.abstract }}</p>
        <p class="price">
          <span class="money">{{ '￥' + api.price*100000 }}</span>
          <span class="count">/100000次</span>
        </p>
        <p class="limit">每月上限{{ api.monthlyCapPrice }}元</p>
        <div>
          <div v-if="api.applyStatus === 0" class="apply ing">
            <img src="./img/icon_buy.svg" alt="">
            <span>审核中</span>
          </div>
          <div v-else-if="api.applyStatus === 1" class="apply ed">
            <img src="./img/icon_buy.svg" alt="">
            <span class="ed">已申请</span>
          </div>
          <div v-else class="apply" @click="checkLogin(api)">
            <img src="./img/icon_buy.svg" alt="">
            <span>立即申请</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbg from 'components/navbg/navbg';
import serviceSideNav from 'components/serviceSideNav/serviceSideNav';
import { ApiService } from '@/services/api.js';
import ToastTip from '@/lib/message.js';
import common from '@/lib/common.js';
// for markdown
import '@/lib/editormd/editormd.preview.css';
import '@/lib/editormd/marked.min.js';
import '@/lib/editormd/prettify.min.js';
import '@/lib/editormd/editormd.js';

export default {
  data () {
    return {
      apiService: new ApiService(),
      listApiType: [],
      apiType: 0,
      api: {
        detail: '***暂无数据***'
      },
      userInfo: {}
    };
  },
  created () {
    this.getApiDetail();
    this.getListApiType();
  },
  components: {
    Navbg,
    serviceSideNav
  },
  methods: {
    async getApiDetail () {
      var { id } = this.$route.query;
      let res = await this.apiService.getApiDetail({ id });
      this.api = res;
      this.apiType = res.apiType.id;
      this.apiTypeStatus = res.applyStatus;
      /* eslint-disable */
        editormd.markdownToHTML('markdown', {
          markdown: res.intro
        });
        /* eslint-enable */
    },
    async getListApiType () {
      let res = await this.apiService.getListApiType();
      if (Array.isArray(res) && res.length !== 0) {
        this.listApiType = res;
      }
    },
    async checkLogin (api) {
      this.userInfo = this.$store.getters.getCurrentUser;
      if (this.userInfo && this.userInfo.name) {
        let confirm = await ToastTip.confirm({
          content: '请确认购买此数据接口'
        });
        if (confirm) {
          let res = await this.apiService.applyData({ id: api.id });
          common.requestMsgHandler(res);
          if (res.code === 1) api.applyStatus = 0;
        }
      } else {
        ToastTip.warn('请先登录！');
      }
    }
  },
  metaInfo: {
    title: '数据详情-车联网数据开放平台'
  }
};
</script>
<style lang="scss" scoped>

.box {
  background-color: #f6f9fc;
}
.api {
  margin-left: 20px;
  margin-bottom: 50px;
  width: 700px;
  padding: 15px 22px;
  background-color: #fff;
  &>h3 {
    font-size: 16px;
    color: #333;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
}
.buy-box {
  padding: 15px 20px;
  width: 260px;
  height: 250px;
  background-color: #fff;
  h3 {
    font-size: 16px;
    color: #4475fd;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  .abstract {
    margin-bottom: 30px;
    font-size: 12px;
    color: #aaa;
  }
  .price {
    text-align: center;
    .money {
      color: #f56c6c;
      font-size: 24px;
    }
    .count {
      color: #333;
      font-size: 14px;
    }
  }
  .limit {
    margin-top: 3px;
    margin-bottom: 20px;
    text-align: center;
    color: #999;
    font-size: 12px;
  }
  .apply {
    margin: 40px auto 0;
    width: 200px;
    height: 40px;
    border-radius: 40px;
    background-color: #4475fd;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    &.ed {
      background-color: #dbf7cd !important;
      color: #67c23a;
      cursor: inherit;
    }
    &.ing {
      background-color: #f3e3c6 !important;
      cursor: inherit;
      color: #cca264;
    }
    &.ed,
    &.ing {
      img {
        display: none;
      }
    }
  }
}
</style>
