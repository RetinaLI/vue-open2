
<template>
    <div class="content">
      <div class="wrapper">
        <h2 class="account-login">注册账号</h2>
        <el-form :model="registForm" @keyup.enter.native="submitForm" status-icon :rules="rules" ref="registForm" label-width="72px" label-position="left" class="form">
          <el-form-item label="用户名：" prop="userName" >
            <el-input type="text"  class="lucencyInput" v-model="registForm.userName" name="userName" auto-complete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="zk_captcha" >
            <el-input v-model="registForm.zk_captcha" name="zk_captcha" class="check-code" placeholder="请输入验证码" ></el-input>
            <div class="img-box" @click="reGetCode"><img :src="imgurl" alt=""></div>
            <span></span>
          </el-form-item>
          <el-form-item label="输入密码：" prop="password">
            <el-input type="password" v-model="registForm.password" name="password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="您的邮箱：" prop="email">
            <el-input type="email" v-model="registForm.email" auto-complete="off" placeholder="请输入您的邮箱"></el-input>
          </el-form-item>
          <el-form-item class="protical" prop="check">
          <el-checkbox v-model="registForm.check" id="read">我已经阅读并同意<a href="/passport/protocol/index.html" target="_blank"> &nbsp;服务条款</a> 和 <a href="/passport/protocol/index.html" target="_blank">隐私政策</a></el-checkbox>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" class="btn-login" @click="submitForm">同意条款并注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
import ValidateFactory from '@/lib/validate';
import ToastTip from '@/lib/message.js';
import { PassportService } from '@/services/passport';
import { getUrlConfig } from '@/http/http.url.config';
let passportService = new PassportService();

export default {
  name: 'regist',
  data () {
    let check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('*需同意本协议'));
      } else {
        callback();
      }
    };
    return {
      passportService: new PassportService(),
      imgurl: null,
      registForm: {
        userName: '',
        password: '',
        zk_captcha: '',
        email: '',
        check: ''
      },
      rules: {
        userName: [
          { validator: ValidateFactory.account.fn, required: true, trigger: 'blur' },
          { validator: ValidateFactory.account.echeck, required: true, trigger: 'blur' }
        ],
        password: [
          { validator: ValidateFactory.password.fn, required: true, trigger: 'blur' },
          { min: ValidateFactory.password.min, max: ValidateFactory.password.max, message: ValidateFactory.password.message, trigger: 'blur' }
        ],
        zk_captcha: [
          { validator: ValidateFactory.identifyCode4.fn, required: true, trigger: 'blur' },
          { validator: ValidateFactory.identifyCode4.echeck, required: true, trigger: 'blur' }
        ],
        email: [
          { validator: ValidateFactory.email.fn, required: true, trigger: 'blur' },
          { validator: ValidateFactory.email.echeck, required: true, trigger: 'blur' }
        ],
        check: [
          { validator: check, required: true }
        ]
      }
    };
  },
  created () {
    this.reGetCode();
    // let url = getUrlConfig('getIdentifyCodeUrl').url;
    // this.imgurl = `${url}?t=` + (Date.now());
  },
  methods: {
    submitForm () {
      this.$refs.registForm.validate(async (valid) => {
        if (valid) {
          let {code = 0, message = ''} = await passportService.regist({
            username: this.registForm.userName,
            password: this.registForm.password,
            zk_captcha: this.registForm.zk_captcha,
            email: this.registForm.email
          });
          if (code === 1) {
            ToastTip.success('注册成功', 1000);
            this.resetForm();
            setTimeout(() => {
              this.passportService.redirectToLogin();
            }, 2000);
          } else {
            this.reGetCode();
            if (message) {
              ToastTip.error(message, 1000);
            } else {
              ToastTip.error('注册失败', 1000);
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
    resetForm () {
      this.$refs.registForm.resetFields();
    }
  },
  metaInfo: {
    title: '用户注册-车联网数据开放平台'
  }
};
</script>

<style lang="scss" scoped>
.body{
  background: #F6F9FC;
  height: 100%;
  .content{
    margin: 0 auto;
    position: relative;
    height: 100%;
  }
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
.wrapper {
  height: 377px;
  width: 700px;
  background: #fff;
  box-shadow: 0px 4px 8px 0px rgba(68, 117, 253, 0.1);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .account-login {
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #eee;
    text-align: center;
    position: relative;
    font-size:14px;
    font-weight:bold;
    color: #4475fd;
  }

  .form {
    width: 600px;
    margin: 30px auto 0;
  }
  /deep/ .el-form-item {
    margin-bottom: 7px;
    margin-left: 168px;
  }
  .el-form-item.is-required /deep/ .el-form-item__label{
    &::before{
      content:'';
      margin-right:0px;
    }
  }

  /deep/ .protical .el-form-item__content{
    margin-left:28px !important;
  }

  /deep/ .protical .el-form-item__error{
    left: 62% !important;
  }

  /deep/ .el-form-item__label{
    color:#666;
    font-size:12px;
     &::before{
      content:'';
      margin-right:0px;
    }
  }

  /deep/ .el-form-item__content{
    margin-left:40px;
    label{
      font-size:12px;
      color:#aaa;
      a{
        color:#4475FD;
        font-size:12px;
      }
    }
  }
  /deep/ .el-input {
    width: 68%;
  }

  /deep/ #read{
    .el-checkbox__label{
      font-size:12px;
    }
    .el-checkbox__inner{
      height: 14px;
      width: 14px;
      border-radius: 50%;
      border: 1px solid #409eff;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label{
      color:#aaa;
    }
  }

  /deep/ .el-input__inner{
    border-radius: 20px;
    width: 200px;
    height: 30px;
    line-height: 30px;
    border-color:#d5d5d5;
    font-size:12px;
  }

  /deep/ .check-code .el-input__inner{
    width:115px;
  }

  /deep/ .el-form-item__error {
    top: 11px;
    left: 57%;
  }

  /deep/ div.check-code{
    width: 34%;
  }

  /deep/ div.check-pic{
    width:30%;
    border:1px solid red;
  }

  /deep/ .check-code &.el-form-item__error{
    left: 42%;
  }

  /deep/ .check-code > .el-input__suffix{
    right:-120px;
  }

  /deep/ .el-icon-circle-close:before{
    content:''
  }

  .account {
    width: 58%;
  }
  .lucencyInput.el-form-item__error {
    top: 11px;
    left: 60%;
  }
  .img-box{
    width:70px;
    height:29px;
    border:1px solid #d5d5d5;
    display: inline-block;
    vertical-align: middle;
  }
  img{
    width:100%;
    height:100%;
  }
  .btn /deep/ .el-form-item__content{
    margin-left:30px !important;
  }
  .btn-login{
    width: 200px;
    height: 40px;
    border-radius: 20px;
    background: #4475FD;
    font-weight: bold;
    border-color: #4475fd;
  }
  .box-right{
    float: right;
    margin-right: 25px;
    margin-top: 10px;
    a{
      color: #aaa;
      font-size:12px;
      display: inline-block;
      text-decoration: underline;
    }
    a:first-child{
      margin-right: 10px;
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
</style>
