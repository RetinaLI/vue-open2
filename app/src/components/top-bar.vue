<!-- 顶部导航组件 -->
<!-- 使用说明：<top-bar></top-bar> -->
<template>
  <div id="topbar-wrap">
    <div class="row clearfix">
      <div class="fl logobox">
        <div class="logo">
          <img src="../assets/logo.png" alt="">
          <span class="line"></span>
          <span class="name">数据开放平台</span>
        </div>
      </div>
      <div class="fl">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-top"
          mode="horizontal"
          text-color="#fff"
          background-color="transparent">
          <el-menu-item class="menu-item item0" index="/">
            <a href="/index.html">首页</a>
          </el-menu-item>
          <el-menu-item class="menu-item item1" index="service">
            <a href="/service/index.html">数据服务</a>
          </el-menu-item>
          <el-menu-item class="menu-item item2" index="products">
            <a href="/products/index.html">车联网产品</a>
          </el-menu-item>
          <el-menu-item class="menu-item item3" index="solution">
            <a href="/solution/index.html">解决方案</a>
          </el-menu-item>
          <el-menu-item class="menu-item item4" index="dynamic">
            <a href="/dynamic/industry/index.html">行业&amp;产品动态</a>
          </el-menu-item>
          <div class="border"></div>
        </el-menu>
      </div>
    </div>
    <div class="operation clearfix">
      <div>
        <a href="/console/index.html" tag="span" class="ctrl">控制台</a>
        <div v-if="!getCurrentUser.name" class="logins">
          <a tag="div" class="login" index="login" @click="toLogin">
            登录
          </a>
          <a href="/passport/regist/index.html" tag="div" class="regist" index="regist">
            注册
          </a>
        </div>
        <LoginUserTitle :isIndex="Boolean(true)" v-else/>
      </div>
      <router-link to="/index.html" tag="div" class="login-clw">
        登录车联网平台
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import LoginUserTitle from '@/components/login-user-title';
import { PassportService } from '@/services/passport';

export default {
  name: 'top-bar',
  data () {
    return {
      passportService: new PassportService(),
      activeIndex: '/',
      isRouter: true,
      menus: {
        'index': 0,
        'service': 1,
        'serviceDetail': 1,
        'products': 2,
        'cars': 2,
        'solution': 3,
        'dynamic': 4
      },
      login: false
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentUser'
    ])
  },
  mounted () {
    this.initBorderPos();
  },
  methods: {
    initBorderPos () {
      // 注意这里用的是name
      let p = this.$route.name;
      let n = 0;
      let menus = this.menus;
      for (let x in menus) {
        if (p.indexOf(x) > -1) {
          n = menus[x];
          break;
        }
      }
      $('.top-bar .border').removeClass('pos0 pos1 pos2 pos3 pos4').addClass('pos' + n);
      if (n === 4 || n === 1) $('.top-bar .border').css('backgroundColor', '#fff');
    },
    toLogin () {
      this.passportService.redirectToLogin();
    }
  },
  watch: {
    '$route': 'initBorderPos'
  },
  components: {
    LoginUserTitle
  }
};
</script>
<style scoped lang="scss">
.font14 {
  font-size: 14px !important;
}
.logins {
  margin-right: 20px;
}
#topbar-wrap {
  position: relative;
  color: #fff;
  .logobox {
    margin-right: 185px;
    .logo > img {
      height: 20px;
      @extend .font14;
    }
    .logo > .name {
      @extend .font14;
    }
    .line {
      display: inline-block;
      width: 2px;
      height: 14px;
      background-color: rgba(68, 117, 253, 1);
    }
  }
  .row {
    width: 1200px;
    margin: auto;

    .el-menu-top {
      border: none;
      .menu-item {
        height: 64px;
        padding: 0;
        text-align: center;
        line-height: 65px;
        color: #fff;
        border-bottom: none;

        &:hover,
        &:focus {
          background-color: transparent !important;
        }
        & > a {
          @extend .font14;
          padding: 12px 16px;
        }
      }
      .item0:hover ~ .border {
        @extend .pos0;
      }
      .item1:hover ~ .border {
        @extend .pos1;
      }
      .item2:hover ~ .border {
        @extend .pos2;
      }
      .item3:hover ~ .border {
        @extend .pos3;
      }
      .item4:hover ~ .border {
        @extend .pos4;
      }
    }
  }
  .operation {
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    height: 100%;
    padding-left: 45px;
    div {
      float: left;
      cursor: pointer;
      @extend .font14;
      a{
        color:#fff;
        font-size:14px;
        &.ctrl{
          padding: 3px 5px;
          border: 1px solid #fff;
        }
        &.regist{
          &::before{
            content: '';
            width: 1px;
            height: 14px;
            background: #fff;
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
          }
        }
      }
    }

    .ctrl > span {
      padding: 3px 5px;
      border: 1px solid rgba(277, 277, 277, 0.6);
      border-radius: 2px;
      @extend .font14;
    }
    .line {
      margin-left: 12px;
      margin-top: 25px;
    }
    .login {
      margin: 0 8px;
    }
    .register {
      margin-right: 44px;
    }
    .login-clw {
      background-color: rgba(68, 117, 253, 0.8);
      padding: 0 11px;
      margin-left:25px;
    }
  }

  .border {
    width: 56px;
    height: 2px;
    position: absolute;
    top: 62px;
    left: 0px;
    background-color: rgba(68, 117, 253, 1);
    transition: left 0.3s ease-in, width 0.3s ease-in;
  }
  .pos0 {
    left: 0;
  }
  .pos1 {
    left: 77px;
  }
  .pos2 {
    left: 170px;
  }
  .pos3 {
    left: 267px;
  }
  .pos4 {
    left: 376px;
  }
}
</style>
