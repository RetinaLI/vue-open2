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
          :default-active="$route.path"
          class="el-menu-top"
          mode="horizontal"
          active-text-color="#fff"
          background-color="transparent"
          :router="true">
          <el-menu-item class="menu-item item0" index="/index.html">
            首页
          </el-menu-item>
          <el-menu-item class="menu-item item1" index="/service/index.html">
            数据服务
          </el-menu-item>
          <el-submenu class="menu-item item2" index="/products/index.html" popper-class="sub-products elNavSubMenu" :popper-append-to-body="false">
            <template slot="title">
              <span @click="diyMenu('sub-products')">车联网产品</span>
            </template>
            <el-menu-item index="/products/index.html" class="hide">
              products
            </el-menu-item>
            <el-menu-item index="/cars/truck/index.html">
              中重卡车联网平台
            </el-menu-item>
            <el-menu-item index="/cars/energy/index.html">
              新能源车联网平台
            </el-menu-item>
            <el-menu-item index="/cars/mechanics/index.html">
              工程机械车联网平台
            </el-menu-item>
            <el-menu-item index="/cars/bus/index.html">
              客车车联网平台
            </el-menu-item>
            <el-menu-item index="/cars/passenger/index.html">
              乘用车车联网平台
            </el-menu-item>
          </el-submenu>
          <el-submenu class="menu-item item3" index="/solution.html" popper-class="sub-solutions elNavSubMenu" :popper-append-to-body="false">
            <template slot="title">
              <span @click="diyMenu('sub-solutions')">解决方案</span>
            </template>
            <el-menu-item index="/solution/manage/index.html">
              车队管理
            </el-menu-item>
            <el-menu-item index="/solution/finance/index.html">
              金融服务
            </el-menu-item>
            <el-menu-item index="/solution/logistic/index.html">
              物流管控
            </el-menu-item>
            <el-menu-item index="/solution/sell/index.html">
              经销/服务商
            </el-menu-item>
          </el-submenu>
          <el-menu-item class="menu-item item4" index="/dynamic/industry/index.html">
            行业&amp;产品动态
          </el-menu-item>
          <div class="border" :class="[`pos${num}`, {white: (num === 1 || num === 4)}]"></div>
        </el-menu>
      </div>
    </div>
    <div class="operation clearfix">
      <div>
        <router-link to="/console/index.html" v-if="getCurrentUser.name" tag="span" class="ctrl">控制台</router-link>
        <div v-if="!getCurrentUser.name" class="logins">
          <a tag="div" class="login" index="login" @click="toLogin">
            登录
          </a>
          <router-link to="/passport/regist/index.html" class="regist" index="regist">
            注册
          </router-link>
        </div>
        <LoginUserTitle :isIndex="Boolean(true)" v-else/>
      </div>
      <a href="http://saas.ifoton.com.cn/" target="_blank" class="login-clw">
        登录车联网平台
      </a>
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
      isRouter: true,
      menus: {
        index: 0,
        service: 1,
        serviceDetail: 1,
        products: 2,
        cars: 2,
        solution: 3,
        dynamic: 4
      },
      num: 0
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
      let name = this.$route.name;
      let menus = this.menus;
      for (let x in menus) {
        if (name.indexOf(x) > -1) {
          this.num = menus[x];
          break;
        }
      }
    },
    toLogin () {
      this.passportService.redirectToLogin();
    },
    diyMenu (cla) {
      // 二级菜单 模拟点击
      $('.' + cla).find('li').first().trigger('click');
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
.hide {
  display: none;
}

.font14 {
  font-size: 14px !important;
}
.logins {
  margin-right: 20px;
}
#topbar-wrap {
  position: relative;
  color: rgba(255, 255, 255, 1);
  .logobox {
    margin-right: 16%;
    @media screen and (max-width: 1345px) {
      margin-right: 9%;
    }
    .logo > img {
      transform: translateY(1px);
      height: 20px;
      @extend .font14;
    }
    .logo > .name {
      @extend .font14;
    }
    .line {
      transform: translateY(1px);
      display: inline-block;
      width: 2px;
      height: 14px;
      background-color: #fff;
    }
  }
  .row {
    width: 1200px;
    margin: auto;

    .el-menu-top {
      border: none;
      .menu-item {
        height: 64px;
        padding: 0 20px;
        text-align: center;
        line-height: 64px;
        border-bottom: none;
        color: rgba(255, 255, 255, 0.7);
        background-color: transparent !important;
        &:hover,
        &:focus {
          background-color: transparent !important;
          color: #ffffff !important;
          span {
            color: #fff !important;
          }
        }

        /deep/ .el-submenu__title {
          padding: 0;
          height: 100%;
          line-height: 65px;
          background-color: transparent !important;
          border: 0;
          i {
            display: none;
          }
          span {
            display: block;
            height: 100%;
            color: rgba(255, 255, 255, 0.7);
            font-size: 14px;
          }
        }
        &.is-active {
          span {
            color: #fff;
          }
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
      a {
        color: #fff;
        font-size: 14px;
        .ctrl {
          padding: 3px 5px;
          font-size: 14px;
          border: 1px solid #fff;
        }
        &.regist {
          &::before {
            content: "";
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

    span.ctrl {
      padding: 3px 5px;
      border: 1px solid rgba(277, 277, 277, 0.6);
      border-radius: 2px;
      @extend .font14;
      transition: all .3s;
      &:hover {
        background: #1f55ec;
        border-color: #1f55ec;
      }
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
      margin-left: 25px;
      color: white;
      font-size: 14px;
      float: left;
    }
  }

  .border {
    width: 28px;
    height: 2px;
    position: absolute;
    top: 50px;
    left: 0px;
    background-color: rgba(68, 117, 253, 1);
    transition: left 0.3s ease-in, width 0.3s ease-in;
    &.white {
      background-color: #fff;
    }
  }
  .pos0 {
    left: 20px;
  }
  .pos1 {
    left: 102px;
  }
  .pos2 {
    left: 206px;
  }
  .pos3 {
    left: 309px;
  }
  .pos4 {
    left: 423px;
  }
}

// 顶部导航二级菜单样式
.top-bar {
  min-width: 1200px;
}
.top-bar /deep/ .elNavSubMenu  {
  background-color: #fff !important;
  box-shadow:0px 4px 12px 0px rgba(0,0,0,0.1);
  min-width: 20px;
  &.sub-products {
    transform: translateX(-19px);
  }
  &.sub-solutions {
    transform: translateX(-6px);
  }
  ul {
    min-width: 20px;
    li {
      min-width: 20px;
      font-size: 12px;
      color: #666;
      text-align: left;
      padding: 0 20px !important;
      &:hover {
        color: #4475FD !important;
        background-color: transparent!important;
      }
      &.is-active {
        color: #4475FD !important;
      }
    }
  }
}
</style>
