<template>
  <el-container class="container-wrapper">
    <el-header><top-bar class="top-bar"></top-bar></el-header>
    <el-main><router-view></router-view></el-main>
    <el-footer><foot-bar></foot-bar></el-footer>
  </el-container>
</template>

<script>
import TopBar from 'components/top-bar';
import FootBar from 'components/foot-bar';
export default {
  name: 'static-layout',
  components: {
    'top-bar': TopBar,
    'foot-bar': FootBar
  }
};
</script>
<style lang="scss" scoped>
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
  }
}
.el-main {
  overflow: hidden;
  padding: 0;
}
.el-footer {
  height: 400px!important;
  padding: 0;
}
</style>
