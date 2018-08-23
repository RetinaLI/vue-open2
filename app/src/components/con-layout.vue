<template>
  <el-container class="con-main-container">
    <el-aside width="220px">
      <Nav/>
    </el-aside>
    <el-container class="con-container">
      <el-header>
        <Header/>
      </el-header>
      <el-main class="con-main">
        <router-view></router-view>
      </el-main>
      <el-footer height="30px">
        <Footer/>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/components/console/con-header/index';
import Nav from '@/components/console/con-nav/index';
import Footer from '@/components/console/con-footer/index';

export default {
  name: 'conLayout',
  components: {
    Header,
    Nav,
    Footer
  }
};
</script>

<style scoped lang="scss">
  $blackBg: #444;
  $white: #fff;
  $navBg: #2E3547;
  .con-main-container {
    background: #F6F9FC;
    min-height: 100%;
    overflow: hidden;
    .el-header {
      position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 998;
      background: $white;
      color: $white;
      box-shadow:0 2px 8px 0 rgba(20, 30, 57, .1);
      padding: 0;
    }
    .el-aside {
      background: $navBg;
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      z-index: 999;
      .el-menu {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        overflow-y: auto;
        border: 0;
      }
    }
    .con-container {
      .el-main {
        display: block;
        margin: 60px 0 0 220px;
      }
      .con-main {
        height: 100%;
      }
    }
    .el-footer {
      display: none;
      color: $white;
    }
  }
</style>
