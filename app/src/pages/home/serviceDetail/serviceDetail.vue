<template>
  <div class="box">
    <navbg></navbg>
    <div class="content wrap clearfix">
      <service-side-nav v-bind:current="apiType"></service-side-nav>
      <div class="api fl">
        <h3>{{ api.name }}</h3>
        <div class="detail">
          <mavon-editor class="my-markdown-editor" v-bind:value="api.detail" v-bind="mdData"></mavon-editor>
        </div>
      </div>
      <div class="buy-box fr">
        <h3>{{ api.name }}</h3>
        <p class="abstract">{{ api.abstract }}</p>
        <p class="price">
          <span class="money">{{ '￥' + api.price*100000 }}</span>
          <span class="count">/100000次</span>
        </p>
        <p class="limit">每月上限{{ api.limit }}元</p>
        <div class="apply" @click="checkUser">
          <img src="./img/icon_buy.svg" alt="">
          <span>立即购买</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbg from 'components/navbg/navbg';
import serviceSideNav from 'components/serviceSideNav/serviceSideNav';
import axiosApi from '@/http/axiosApi';
import ToastTip from '@/lib/message.js';
export default {
  data () {
    return {
      apiType: '',
      api: {
        detail: '***暂无数据***'
      },
      mdData: {
        toolbarsFlag: false,
        subfield: false,
        defaultOpen: 'preview'
      },
      userInfo: {}
    };
  },
  created () {
    this.userInfo = this.$store.getters.getCurrentUser;
    var { apiType, id } = this.$route.query;
    this.apiType = apiType;
    axiosApi('getApiDetail', {
      data: {
        id
      }
    })
      .then(res => {
        this.api = res.data;
      });
  },
  components: {
    Navbg,
    serviceSideNav
  },
  methods: {
    checkUser () {
      if (this.userInfo && this.userInfo.id) {
        let isSureGet = ToastTip.confirm({
          content: `你将购买<b>${this.api.name}</b>接口`
        });
        isSureGet.then(() => {
          ToastTip.info('确认购买，跳转到购买页面！');
        }).catch(() => {});
      } else {
        ToastTip.warn('请先登录，3秒后自动跳转');
        window.setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      }
    },
    handleSure () {
      this.showDialog = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  background-color: #f6f9fc;
}
.api {
  margin-left: 20px;
  width: 700px;
  height: 609px;
  padding: 15px 32px;
  background-color: #fff;
  h3 {
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
    margin-bottom: 20px;
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
    margin: 0 auto;
    width: 200px;
    height: 40px;
    border-radius: 40px;
    background-color: #4475fd;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }
}
</style>
