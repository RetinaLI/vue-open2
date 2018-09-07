
<template>
  <div class="body">
    <div class="content vhc">
      <div class="step-box">
        <div class="steps">
          <div class="step step1">
            <div class="circle " :class="{'active': steps === 0 || steps === 1 || steps === 2}" >
              1
              <p>确认账号</p>
            </div>
            <div class="rline"></div>
          </div>
          <div class="step step2">
            <div class="circle" :class="{'active': steps === 1 || steps === 2}">
              2
              <p>安全验证</p>
            </div>
            <div class="rline"></div>
          </div>
          <div class="step step3">
            <div class="circle"  :class="{'active': steps === 2}">
              3
              <p>完成</p>
            </div>
          </div>
        </div>
      </div>

      <RetrieveStep1 :steps="steps"/>
      <RetrieveStep2 :steps="steps"/>

      <div class="wrapper wrapper3" v-show="steps === 2">
        <h2>密码修改成功</h2>
        <div class="circle"><i class="el-icon-check"></i></div>
        <p>密码修改成功，即将跳转至 <router-link to="/index.html" @click="toLogin" class="to-login">登录页面</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import RetrieveStep1 from '@/components/passport/retrieve-step1';
import RetrieveStep2 from '@/components/passport/retrieve-step2';
import { mapGetters } from 'vuex';

export default {
  name: 'retrieve',
  computed: {
    ...mapGetters(['getActivedStep']),
    steps () {
      return this.getActivedStep;
    }
  },
  methods: {
    toLogin () {
      this.passportService.redirectToLogin();
      setTimeout(() => {
        this.$store.commit('updateSteps', 0);
      }, 0);
    }
  },
  components: {
    RetrieveStep1,
    RetrieveStep2
  },
  metaInfo: {
    title: '找回密码-车联网数据开放平台'
  }
};
</script>

<style lang="scss" scoped>
.body{
  background: #F6F9FC;
  height: 100%;
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
    .content{
      position: relative;
    }
  }
  .step-box {
    width:700px;
    margin:0 auto;
    .steps{
      width: 80%;
      margin: 0 auto;
      display:flex;
      flex-direction: row;
      .step{
        flex:1;
        display:flex;
        flex-direction: row;
        .circle{
          width:48px;
          height: 48px;
          line-height: 41px;
          text-align:center;
          border-radius: 50%;
          position: relative;
          background:#d5d5d5;
          border:4px solid #eee;
          color:#aaa;
          &.active{
            background:#4475FD;
            border:4px solid #D9E3FF;
            color:#fff;
          }
          p{
            text-align: center;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            color:#666;
            font-size:12px;
          }
        }

        .rline{
          flex: 1;
          height: 6px;
          background: #eee;
          display: inline-block;
          margin-top:20px;
        }
      }
      .step3{
        width: 48px;
        flex: none;
      }
    }
  }

  .wrapper {
    width: 700px;
    background: #fff;
    box-shadow: 0px 4px 8px 0px rgba(68, 117, 253, 0.1);
    margin: 90px auto 0;
    &.wrapper3{
      height:320px;
      h2{
        text-align: center;
        font-size:16px;
        color:#333;
        font-weight: bold;
        padding-top: 72px;
      }
      div{
        width:68px;
        height:68px;
        line-height: 68px;
        text-align: center;
        background:rgba(27,205,147,1);
        border:4px solid #DDF8EF;
        border-radius: 50%;
        margin-left: 50%;
        transform: translateX(-50%);
        margin-top: 40px;
        i{
          font-size: 49px;
          color: #fff;
          padding-top:4px;
        }
      }
      p{
        text-align: center;
        font-size:12px;
        color:#333;
        margin-top:30px;
        a{
          font-size:12px;
          text-decoration: underline;
          color:#4475FD;
          &:hover{
            cursor: pointer;
            color: #1BCD93;
          }
        }
      }
    }
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
}

</style>
