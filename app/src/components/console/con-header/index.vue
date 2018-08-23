<template>
  <div class="con-header">
    <div class="con-user-info">
      <!--<el-badge :value="12" :max="99">-->
      <!--<router-link to="/console/news" tag="div">-->
      <!--<el-button-->
      <!--type="primary"-->
      <!--icon="el-icon-message"-->
      <!--size="mini"-->
      <!--class="con-user-info-btn"-->
      <!--circle></el-button>-->
      <!--</router-link>-->
      <!--</el-badge>-->
      <LoginUserTitle/>
    </div>
  </div>
</template>

<script>
import LoginUserTitle from '@/components/login-user-title/index';

export default {
  name: 'conHeader',
  components: {
    LoginUserTitle
  }
};
</script>

<style scoped lang="scss">
  $allColor: #4475FD;
  .con-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    .con-user-info {
      display: flex;
      justify-content: end;
      align-items: center;
      height: 100%;
      .el-badge {
        margin-right: 10px;
      }
      .con-user-info-btn:focus {
        background-color: $allColor;
        border-color: $allColor;
      }
    }
  }
</style>
