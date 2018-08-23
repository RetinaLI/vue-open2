<template>
  <el-container class="container-wrapper">
    <el-header><top-bar class="top-bar"></top-bar></el-header>
    <el-main><router-view></router-view></el-main>
    <el-footer><conFooter/></el-footer>
  </el-container>
</template>

<script>
import TopBar from 'components/top-bar';
import conFooter from 'components/console/con-footer/index';

export default {
  name: 'passport-layout',
  components: {
    'top-bar': TopBar,
    'conFooter': conFooter
  }
};
</script>
<style lang="scss" scoped>
.container-wrapper{
  position: relative;
}
.el-header {
  width: 100%;
  height: 64px!important;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  .top-bar {
    height: 100%;
    line-height: 64px;
    background: #4475FD;
  }
}
.el-main {
  overflow: hidden;
  padding: 0;
  display: block;
  height: 100%;
  width: 100%;
  background: #F6F9FC;
}
.el-footer{
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  border-top: 1px solid #eee;
  width:100%;
  height:40px !important;
}
</style>
