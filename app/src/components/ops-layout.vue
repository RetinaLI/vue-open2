<template>
  <el-container class="container-wrapper">
    <el-header><top-bar></top-bar></el-header>
    <el-container>
      <el-aside><ops-side-bar></ops-side-bar></el-aside>
      <el-container><el-main><router-view></router-view></el-main></el-container>
    </el-container>
  </el-container>
</template>
<script>
import TopBar from 'components/top-bar';
import OpsSideBar from 'components/ops-side-bar';

export default {
  name: 'ops-layout',
  computed: {
    isCollapse () {
      return false;
      // return this.$store.state.common.isCollapse;
    }
  },
  components: {
    'top-bar': TopBar,
    'ops-side-bar': OpsSideBar
  }
};
</script>
