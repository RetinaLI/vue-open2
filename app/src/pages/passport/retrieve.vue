
<template>
  <div class="body">
    <div class="content vhc">
      <div class="step-box">
        <div class="steps">
          <div class="step step1">
            <div class="circle active" >
              1
              <p>确认账号</p>
            </div>
            <div class="rline"></div>
          </div>
          <div class="step step2">
            <div class="circle" :class="{'active': step2}">
              2
              <p>安全验证</p>
            </div>
            <div class="rline"></div>
          </div>
          <div class="step step3">
            <div class="circle"  :class="{'active': step3}">
              3
              <p>完成</p>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper wrapper1" v-show="form1">
        <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="60px" label-position="left" class="form1">
          <h2 class="fill-account">请填写您需要找回的账号</h2>
          <el-form-item prop="account" >
            <el-input type="text" class="lucencyInput" v-model="ruleForm1.account" auto-complete="off" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="checkCode">
            <el-input v-model.number="ruleForm1.checkCode" class="check-code" placeholder="请输入验证码" ></el-input>
            <div class="img-box"><img :src="imgurl" alt=""></div>
            <span></span>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" class="btn-login" @click="submitForm('ruleForm1')">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="wrapper wrapper2" v-show="form2">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="60px" label-position="left" class="form2">
          <h2 class="fill-account">为了您的账号安全，请完成身份验证</h2>
          <p class="mail-check1" ><img :src="emailurl" alt=""> 邮箱验证</p>
          <p class="mail-check2">已发送验证码到邮箱：<span class="email-p1">223</span><span>***</span><span class="email-p2">126.com</span> </p>
          <el-form-item prop="checkCode">
            <el-input v-model.number="ruleForm2.checkCode" class="check-code" placeholder="请输入验证码" ></el-input>
            <button round class="re-send" @click="resend()">重新发送</button>
          </el-form-item>
          <el-form-item prop="newPassword" >
            <el-input type="text" class="lucencyInput" v-model="ruleForm2.newPassword" auto-complete="off" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" class="btn-login" @click="submitForm2('ruleForm2')">下一步</el-button>
          </el-form-item>
          <p class="kefu">邮箱不可用，可使用客服申诉 </p>
        </el-form>
      </div>
      <div class="wrapper wrapper3" v-show="form3">
        <h2>密码修改成功</h2>
        <div class="circle"><i class="el-icon-check"></i></div>
        <p>密码修改成功，即将跳转至 <a href="/login">登录页面</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import ValidateFactory from '@/lib/validate';
import ToastTip from '@/lib/message.js';

export default {
  name: 'retrieve',
  data () {
    return {
      imgurl: require('project-assets/images/home/bigdata1.png'),
      emailurl: require('project-assets/images/passport/icon-mail.png'),
      step2: false,
      step3: false,
      form1: true,
      form2: false,
      form3: false,
      ruleForm1: {
        account: '',
        checkCode: ''
      },
      ruleForm2: {
        newPassword: '',
        checkCode: ''
      },
      rules1: {
        account: [
          { validator: ValidateFactory.account, trigger: 'blur' }
        ],
        checkCode: [
          { validator: ValidateFactory.identifyCode, trigger: 'blur' }
        ]
      },
      rules2: {
        newPassword: [
          { validator: ValidateFactory.password, trigger: 'blur' }
        ],
        checkCode: [
          { validator: ValidateFactory.identifyCode, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm (ruleForm1) {
      this.$refs.ruleForm1.validate((valid) => {
        if (valid) {
          // 表单提交
          // axiosApi('getLoginUserFormInfo', {
          //   data: {
          //     userName : this.ruleForm1.account,
          //     userPassword : this.ruleForm1.password,
          //   }
          // })
          //   .then(res => {
          //     console.log(res);
          //   });
          ToastTip.success('成功');
          setTimeout(() => {
            // let redirect = decodeURIComponent(this.$route.query.redirect || '/');
            // document.location.href = redirect;
            this.step2 = true;
            this.form1 = false;
            this.form2 = true;
          }, 2000);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForm2 (ruleForm2) {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          // 表单提交
          // axiosApi('getLoginUserFormInfo', {
          //   data: {
          //     userName : this.ruleForm1.account,
          //     userPassword : this.ruleForm1.password,
          //   }
          // })
          //   .then(res => {
          //     console.log(res);
          //   });
          ToastTip.success('成功');
          setTimeout(() => {
            // let redirect = decodeURIComponent(this.$route.query.redirect || '/');
            // document.location.href = redirect;
            this.step3 = true;
            this.form2 = false;
            this.form3 = true;
          }, 2000);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }

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
    &.wrapper1{
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

          /deep/ .el-form-item__content{
            margin-left:40px;

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

            /deep/ .check-code{
              width: 31%;
            }

            /deep/ .check-pic{
              width:30%;
              border:1px solid red;
            }

            /deep/ .check-code &.el-form-item__error{
              left: 42%;
            }

            /deep/ .check-code > .el-input__suffix{
              right:-143px;
            }

            /deep/ .el-form-item__error {
              top: 11px;
              left: 57%;
            }

            /deep/ .el-icon-circle-close:before{
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

    &.wrapper2{
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

          /deep/ .el-form-item__content{
            margin-left:40px;

            /deep/ .el-input {
              width: 68%;
            }

            /deep/ .el-input__inner{
              border-radius: 20px;
              width: 230px;
              height: 30px;
              line-height: 30px;
              border-color:#d5d5d5;
              font-size:12px;
            }

            /deep/ .check-code .el-input__inner{
              width:130px;
            }

            /deep/ .check-code{
              width: 31%;
            }

            /deep/ .check-pic{
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
            }

            /deep/ .check-code &.el-form-item__error{
              left: 42%;
            }

            /deep/ .check-code > .el-input__suffix{
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

            /deep/ .el-form-item__error {
              top: 11px;
              left: 59%;
            }

            /deep/ .el-icon-circle-close:before{
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
