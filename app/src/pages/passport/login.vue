
<template>
    <div class="content">
      <div class="wrapper">
        <h2 class="account-login">账号登录</h2>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="60px" label-position="left" class="form">
          <el-form-item label="账号：" prop="account" >
            <el-input type="text" class="lucencyInput" v-model="ruleForm2.account" auto-complete="off" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="checkCode">
            <el-input v-model.number="ruleForm2.checkCode" class="check-code" placeholder="请输入验证码" ></el-input>
            <div class="img-box"><img :src="imgurl" alt=""></div>
            <span></span>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" class="btn-login" @click="submitForm('ruleForm2')">登录</el-button>
          </el-form-item>
        </el-form>

        <div class="box-right">
          <a href="/passport/regist">免费注册</a>
          <a href="/passport/retrieve">忘记密码？</a>
        </div>
      </div>
    </div>
</template>

<script>

import { PassportService } from '@/services/passport';
import ValidateFactory from '@/lib/validate';
import ToastTip from '@/lib/message';
import { getUrlConfig } from '@/http/http.url.config';

let passportService = new PassportService();

export default {
  name: 'login',
  data () {
    return {
      imgurl: null,
      ruleForm2: {
        account: '',
        password: '',
        checkCode: ''
      },
      rules2: {
        account: [
          { validator: ValidateFactory.account, trigger: 'blur' }
        ],
        password: [
          { validator: ValidateFactory.password, trigger: 'blur' },
          { min: 1, max: 20, message: '密码长度8-20位', trigger: 'blur' }
        ],
        checkCode: [
          { validator: ValidateFactory.identifyCode, trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.imgurl = getUrlConfig('getIdentifyCodeUrl').url;
  },
  methods: {
    submitForm (ruleForm2) {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          // 表单提交
          passportService.getLoginUserFormInfo({
            username: this.ruleForm2.account,
            password: this.ruleForm2.password,
            zk_captcha: this.ruleForm2.checkCode
          })
            .then(res => {
              // ToastTip.success('登录成功', 1000);
              // setTimeout(() => {
              //   let redirect = decodeURIComponent(this.$route.query.redirect || '/');
              //   document.location.href = redirect;
              // }, 2000);
            });
        } else {
          ToastTip.error('失败');
          return false;
        }
      });
    },
    resetForm (ruleForm2) {
      this.$refs[ruleForm2].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.body{
  background: #F6F9FC;
  height: 100%;
  position: relative;
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
  height: 326px;
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
  /deep/ .el-form-item{
    margin-bottom: 10px;
    margin-left: 168px;
  }

  /deep/ .el-form-item__label{
    color:#666;
    font-size:12px;
  }

  /deep/ .el-form-item__content{
    margin-left:40px;
  }
  /deep/ .el-input {
    width: 68%;
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
    margin-top:10px;
  }
  .btn-login{
    width: 200px;
    height: 40px;
    border-radius: 20px;
    background: #4475FD;
    font-weight: bold;
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
