
<template>
  <div class="wrapper wrapper2" v-show="steps === 1">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="60px" label-position="left" class="form2">
      <h2 class="fill-account">为了您的账号安全，请完成身份验证</h2>
      <p class="mail-check1" ><img :src="emailurl" alt=""> 邮箱验证</p>
      <p class="mail-check2">已发送验证码到邮箱：<span class="email-p1">{{emailStr}}</span></p>
      <el-form-item prop="emailCode">
        <el-input v-model="ruleForm2.emailCode" name="emailCode" class="check-code" placeholder="请输入邮箱验证码" ></el-input>
        <button round class="re-send" v-bind:disabled="bindDisable" :class="{'disable-color': disableC}" @click.prevent="resend">{{resendText}}</button>
      </el-form-item>
      <el-form-item prop="newPassword" >
        <el-input type="password" class="lucencyInput" v-model="ruleForm2.newPassword" name="password" auto-complete="off" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" class="btn-login" @click="submitForm2()">下一步</el-button>
      </el-form-item>
      <p class="kefu">邮箱不可用，可使用客服申诉 </p>
    </el-form>
  </div>
</template>

<script>

import ValidateFactory from '@/lib/validate';
import ToastTip from '@/lib/message.js';
import { getUrlConfig } from '@/http/http.url.config';
import { PassportService } from '@/services/passport';
import { mapGetters } from 'vuex';
let passportService = new PassportService();

export default {
  name: 'retrieve',
  props: {
    steps: {
      type: Number,
      default: 0
    }
    // email: {
    //   type: String,
    //   default: ''
    // }
  },
  data () {
    return {
      passportService: new PassportService(),
      imgurl: null,
      time: 59,
      resendText: '60s',
      disableC: true,
      bindDisable: true,
      emailurl: require('project-assets/images/passport/icon-mail.png'),
      ruleForm2: {
        newPassword: '',
        emailCode: ''
      },
      rules2: {
        newPassword: [
          { validator: ValidateFactory.password.fn, required: true, trigger: 'blur' },
          { min: ValidateFactory.password.min, max: ValidateFactory.password.max, message: ValidateFactory.password.message, trigger: 'blur' }
        ],
        emailCode: [
          { validator: ValidateFactory.identifyCode6, required: true, trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    getActivedStep: function (val) {
      if (val === 1) {
        let timer = setInterval(() => {
          if (this.time === 0) {
            clearInterval(timer);
            this.resendText = '重新发送';
            this.disableC = false;
            this.bindDisable = false;
          } else {
            this.resendText = this.time + 's';
            this.disableC = true;
            this.bindDisable = true;
            this.time--;
          }
        }, 1000);
      }
    }
  },
  computed: {
    ...mapGetters(['getEmail', 'getActivedStep']),
    email () {
      return this.getEmail;
    },
    emailStr () {
      return `${this.getEmail.substr(0, 3)}***${this.getEmail.substr(this.getEmail.indexOf('@'))}`;
    }
  },
  methods: {
    submitForm2 () {
      this.$refs.ruleForm2.validate(async (valid) => {
        if (valid) {
          let {code = 0, message = ''} = await passportService.resetPassword({
            email: this.email,
            emailCode: this.ruleForm2.emailCode,
            password: this.ruleForm2.newPassword
          });
          if (code === 1) {
            ToastTip.success(message, 1000);
            setTimeout(() => {
              this.$store.commit('updateSteps', 2);
              setTimeout(() => {
                this.passportService.redirectToLogin();
                this.$store.commit('updateSteps', 0);
              }, 2000);
            }, 2000);
          } else {
            if (message) {
              ToastTip.error(message, 1000);
            } else {
              ToastTip.error('重置失败', 1000);
            }
          };
        } else {
          return false;
        }
      });
    },
    reGetCode () {
      let url = getUrlConfig('getIdentifyCodeUrl').url;
      this.imgurl = `${url}?t=` + (Date.now());
    },
    async resend () {
      let res = await this.passportService.resendCode({
        email: this.email
      });
      if (res.code === 1) {
        ToastTip.success(res.message, 1000);
        this.time = 59;
        let timer = setInterval(() => {
          if (this.time === 0) {
            clearInterval(timer);
            this.resendText = '重新发送';
            this.disableC = false;
            this.bindDisable = false;
          } else {
            this.resendText = this.time + 's';
            this.disableC = true;
            this.bindDisable = true;
            this.time--;
          }
        }, 1000);
      } else {
        if (res.message) {
          ToastTip.error(res.message, 2000);
        } else {
          ToastTip.error('发送失败', 2000);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper2{
  height:370px;
  .form2 {
    width: 600px;
    margin: 30px auto 0;
    padding-top: 53px;
    .fill-account {
      line-height: 20px;
      text-align: center;
      position: relative;
      font-size:14px;
      color: #333;
      margin-bottom:10px;
      display: inline-block;
      margin: 0 auto;
      transform: translateX(-50%);
      left: 50%;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    .mail-check1{
      padding-left: 187px;
      font-size: 14px;
      color: #4475FD;
      font-weight: bold;
      margin-top: 15px;
    }
    .mail-check2{
      padding-left: 187px;
      font-size: 12px;
      color: #aaa;
      margin-top: 10px;
      margin-bottom:10px;
      span{
        color:#4475FD;
        font-size:12px;
      }
    }

    .kefu{
      line-height: 20px;
      text-align: center;
      position: relative;
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
      display: inline-block;
      margin: 0 auto;
      transform: translateX(-50%);
      left: 50%;
      padding-bottom: 10px;
      a{
        color:#4475FD;
        text-decoration: underline;
        font-size: 12px;
      }
    }

    /deep/ .el-form-item{
      margin-bottom: 10px;
      margin-left: 126px;

      .el-form-item__content{
        margin-left:40px;

        .el-input {
          width: 68%;
        }

        .el-input__inner{
          border-radius: 20px;
          width: 230px;
          height: 30px;
          line-height: 30px;
          border-color:#d5d5d5;
          font-size:12px;
        }

        .check-code .el-input__inner{
          width:130px;
        }

        .check-code{
          width: 31%;
        }

        .check-pic{
          width:30%;
          border:1px solid red;
        }
        .re-send{
          width: 80px;
          height: 30px;
          line-height: 30px;
          border: none;
          border-radius: 15px;
          background: rgba(68,117,253,0.1);
          color: #4475FD;
          font-size: 12px;
          vertical-align: middle;
          margin-left: 19px;
          text-align: center;
          &.disable-color{
            color:#666;
            background: #eee;
            font-weight: bold;
          }
        }

        .check-code &.el-form-item__error{
          left: 42%;
        }

        .check-code > .el-input__suffix{
          right:-143px;
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

        .el-form-item__error {
          top: 11px;
          left: 59%;
        }

        .el-icon-circle-close:before{
          content:''
        }
      }
    }

    .btn{
      margin-left:171px;
      /deep/ .el-form-item__content{
        margin-left: 16px !important;
        margin-top: 3px;
        .btn-login{
          width: 230px;
          height: 40px;
          border-radius: 20px;
          background: #4475FD;
          font-weight: bold;
          margin-top:7px;
        }
      }
    }
  }
}
</style>
