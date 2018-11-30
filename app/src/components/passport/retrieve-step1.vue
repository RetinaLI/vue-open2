
<template>
  <div class="wrapper wrapper1" v-show="steps === 0">
    <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="60px" label-position="left" class="form1">
      <h2 class="fill-account">请填写您需要找回的账号</h2>
      <el-form-item prop="account" >
        <el-input type="text" class="lucencyInput" v-model="ruleForm1.account" auto-complete="off" placeholder="请填写用户名或邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="checkCode">
        <el-input v-model="ruleForm1.checkCode" class="check-code" placeholder="请输入验证码" ></el-input>
        <div class="img-box" @click="reGetCode"><img :src="imgurl" alt=""></div>
        <span></span>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" class="btn-login" @click="submitForm()">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ValidateFactory from '@/lib/validate';
import ToastTip from '@/lib/message.js';
import { getUrlConfig } from '@/http/http.url.config';
import { PassportService } from '@/services/passport';

export default {
  name: 'RetrieveStep1',
  props: {
    steps: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      passportService: new PassportService(),
      imgurl: null,
      ruleForm1: {
        account: '',
        checkCode: ''
      },
      rules1: {
        account: [
          { validator: ValidateFactory.retrieveAccount, required: true, trigger: 'blur' }
        ],
        checkCode: [
          { validator: ValidateFactory.identifyCode4.fn, required: true, trigger: 'blur' },
          { validator: ValidateFactory.identifyCode4.echeck, required: true, trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    let url = getUrlConfig('getIdentifyCodeUrl').url;
    this.imgurl = `${url}?t=` + (Date.now());
    this.steps = this.$store.getters.getActivedStep;
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm1.validate(async (valid) => {
        if (valid) {
          let res = await this.passportService.retrievePassword({
            queryInfo: this.ruleForm1.account,
            zk_captcha: this.ruleForm1.checkCode
          });
          if (res.code === 1) {
            ToastTip.success(res.message);
            setTimeout(() => {
              this.$store.commit('updateEmail', res.data.email);
              this.$store.commit('updateSteps', 1);
            }, 500);
          } else {
            if (res.message) {
              ToastTip.error(res.message, 1000);
            } else {
              ToastTip.error('找回失败', 1000);
            }
          }
        } else {
          return false;
        }
      });
    },
    reGetCode () {
      let url = getUrlConfig('getIdentifyCodeUrl').url;
      this.imgurl = `${url}?t=` + (Date.now());
    },
    toLogin () {
      this.passportService.redirectToLogin();
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper1{
  height:320px;
  .form1 {
    width: 600px;
    margin: 30px auto 0;
    padding-top: 60px;
    .fill-account {
      height:25px;
      line-height: 25px;
      text-align: center;
      position: relative;
      font-size:18px;
      color: #333;
      margin-bottom:10px;
    }
    /deep/ .el-form-item{
      margin-bottom: 10px;
      margin-left: 138px;

      .el-form-item__content{
        margin-left:40px;
        .lucencyInput{
          width: 68%;
        }

        .el-input__inner{
          border-radius: 20px;
          width: 200px;
          height: 30px;
          line-height: 30px;
          border-color:#d5d5d5;
          font-size:12px;
        }

        .check-code .el-input__inner{
          width:115px;
        }

        .check-code{
          width: 31%;
        }

        .check-pic{
          width:30%;
          border:1px solid red;
        }

        .check-code &.el-form-item__error{
          left: 42%;
        }

        .check-code > .el-input__suffix{
          right:-143px;
        }

        .el-form-item__error {
          top: 11px;
          left: 57%;
        }

        .el-icon-circle-close:before{
          content:''
        }

        .img-box{
          width:70px;
          height:29px;
          border:1px solid #d5d5d5;
          display: inline-block;
          vertical-align: middle;
          img{
            width:100%;
            height:100%;
          }
        }
      }
    }

    .btn{
      margin-left:171px;
      /deep/ .el-form-item__content{
        margin-left:30px !important;
        margin-top:10px;
        .btn-login{
          width: 200px;
          height: 40px;
          border-radius: 20px;
          background: #4475FD;
          font-weight: bold;
          margin-top:10px;
        }
      }
    }
  }
}
</style>
