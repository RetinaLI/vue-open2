<template>
  <div class="con-nav">
    <router-link to="/index.html">
      <h1 class="con-logo">
        <img :src="logo" alt="" class="con-nav-logo">
        <span class="con-nav-title">数据开放平台</span>
      </h1>
    </router-link>
    <el-menu
      router
      :defaultActive="getPath"
      textColor="#ccc"
    >
      <!-- <el-menu-item index="/console/index.html">
        <i class="icon icon-look"></i>
        数据看板
      </el-menu-item> -->
      <el-submenu index="/console/data/index.html">
        <template slot="title">
          <i class="icon icon-data"></i>
          数据中心
        </template>
        <el-menu-item index="/console/data/index.html">我的数据</el-menu-item>
        <el-menu-item index="/console/apply_list/index.html">申请数据</el-menu-item>
      </el-submenu>
      <el-submenu index="/console/info/index.html">
        <template slot="title">
          <i class="icon icon-info"></i>
          个人中心
        </template>
        <el-menu-item index="/console/info/index.html">账号信息</el-menu-item>
        <el-menu-item index="/console/auth/index.html">实名认证</el-menu-item>
        <!--<el-menu-item index="/console/balance/index.html">我的余额</el-menu-item>-->
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import logo from '@/assets/logo.png';

export default {
  name: 'conNav',
  data () {
    return {
      logo
    };
  },
  computed: {
    getPath () {
      if (this.$route.path === '/console/pay/index.html') {
        return '/console/balance/index.html';
      } else {
        return this.$route.path;
      }
    }
  }
};
</script>

<style scoped lang="scss">
  $look: './images/icon-look.svg';
  $info: './images/icon-info.svg';
  $data: './images/icon-data.svg';
  $hoverBg: #11182A;
  .icon {
    display: inline-block;
    width: 15px;
    height: 15px;
    vertical-align: middle;
    margin: -3px 15px 0 0;
    opacity: .5;
  }

  .icon-look {
    background-image: url($look);
    background-size: 100% 100%;
  }

  .icon-info {
    background-image: url($info);
    background-size: 100% 100%;
  }

  .icon-data {
    background-image: url($data);
    background-size: 100% 100%;
  }

  .con-logo {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #4475FD;
    cursor: pointer;
    .con-nav-logo {
      width: 76px;
    }
    .con-nav-title {
      font-size: 14px;
      color: #fff;
      line-height: 20px;
      &:before {
        content: '';
        width: 2px;
        height: 16px;
        background: #fff;
        display: inline-block;
        vertical-align: middle;
        margin: -2px 10px 0 10px;
      }
    }
  }

  .el-menu {
    color: #ccc;
    background: transparent;
    border: 0;
    .el-submenu {
      color: #fff;
      &.is-active.is-opened {
        /deep/ .el-submenu__title {
          color: #fff !important;
          .icon {
            opacity: 1;
          }
        }
      }
      /deep/ .el-submenu__title {
        padding-left: 44px !important;
        &:hover {
          background: $hoverBg !important;
          color: #fff !important;
          .icon {
            opacity: 1;
          }
        }
        .el-icon-arrow-down {
          right: 60px;
        }
      }
      .el-menu-item {
        background: #2E3547;
        color: #fff;
        font-size: 12px;
        &:before {
          content: '';
          width: 4px;
          height: 14px;
          display: inline-block;
          background: transparent;
          vertical-align: middle;
          margin: -1px 11px 0 27px;
        }
        &.is-active {
          background-color: #2E3547 !important;
          color: #fff !important;
          position: relative;
          &:before {
            background: #4475FD;
          }
          &:after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);
            border: 6px solid #F6F9FC;
            border-top-color: transparent;
            border-left-color: transparent;
            border-bottom-color: transparent;
          }
        }
      }
    }
    .el-menu-item {
      padding-left: 44px !important;
      &:hover {
        background: $hoverBg !important;
        color: #fff !important;
        .icon {
          opacity: 1;
        }
      }
      &.is-active {
        background-color: $hoverBg !important;
        color: #fff !important;
        position: relative;
        .icon {
          opacity: 1;
        }
        &:after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(0, -50%);
          border: 6px solid #F6F9FC;
          border-top-color: transparent;
          border-left-color: transparent;
          border-bottom-color: transparent;
        }
      }
    }
  }
</style>
