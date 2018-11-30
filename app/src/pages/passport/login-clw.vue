<template>
  <div class="wrapper">
    <h2 class="account-login">账号登录</h2>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="form">
      <el-form-item label="账号" prop="account">
        <el-input type="text" class="lucencyInput" v-model="ruleForm2.account" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="checkCode">
        <el-input v-model.number="ruleForm2.checkCode" class="check-code"></el-input>
        <el-input class="check-pic"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('验证码必须大于18'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var account = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.ruleForm2.account !== '') {
          this.$refs.ruleForm2.validateField('account');
        }
        callback();
      }
    };
    var password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        account: '',
        password: '',
        checkCode: ''
      },
      rules2: {
        account: [
          {validator: account, trigger: 'blur'}
        ],
        password: [
          {validator: password, trigger: 'blur'}
        ],
        checkCode: [
          {validator: checkCode, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 326px;
    width: 700px;
    background: #eee;
    box-shadow: 0px 4px 8px 0px rgba(68, 117, 253, 0.1);
    margin: 162px auto 0;
    .account-login {
      height: 33px;
      line-height: 33px;
      border-bottom: 1px solid #eee;
      text-align: center;
      position: relative;
      color: #4475fd;
    }
    .account-login::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 9px;
      width: 4px;
      height: 17px;
      background: #4f91ff;
      transform: translateX(-1200%);
    }

    .form {
      width: 500px;
      margin: 0 auto;
    }
    /deep/ .el-input {
      width: 68%;
    }

    /deep/ .el-input__inner {
      border-radius: 20px;
    }

    /deep/ .el-form-item__error {
      top: 11px;
      left: 70%;
    }

    /deep/ div.check-code {
      width: 40%;
    }

    /deep/ div.check-pic {
      width: 30%;
      border: 1px solid red;
    }

    /deep/ .check-code &.el-form-item__error {
      left: 42%;
    }

    .account {
      width: 58%;
    }
    .lucencyInput.el-form-item__error {
      top: 11px;
      left: 60%;
    }
  }
</style>
