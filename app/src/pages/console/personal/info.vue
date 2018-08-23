<template>
  <section class="con-info">
    <div class="con-info-user padTop">
      <!--<h3 class="con-info-user-title">账户信息</h3>-->
      <div class="con-info-part">
        <con-title
          :title="title[0]"
          :isShow="true"
          :changeInfo="changeInfo"
          @changeInfoHandle="changeInfoHandle('changeInfo')"
        />
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="con-form">
          <el-form-item label="头像 :" class="con-upload-icon">
            <div class="con-user-icon">
              <img v-if="ruleForm.userIcon" :src="ruleForm.userIcon" class="avatar">
            </div>
            <el-upload
              v-show="changeInfo.changed"
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :auto-upload="false"
              :on-change="handleChange"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="昵称 :" prop="username">
            <span class="con-email" v-show="!changeInfo.changed">{{ruleForm.username || '暂无'}}</span>
            <el-input
              type="text"
              v-show="changeInfo.changed"
              v-model="ruleForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item v-show="changeInfo.changed">
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini">保存</el-button>
            <el-button @click="cancelForm('ruleForm', 'changeInfo')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="con-info-part">
        <con-title
          :title="title[1]"
          :isShow="true"
          :changeInfo="changeEmail"
          @changeInfoHandle="changeInfoHandle('changeEmail')"
        />
        <el-form
          label-width="100px"
          v-show="!changeEmail.changed"
        >
          <el-form-item
            label="邮箱 :"
          >
            <span class="con-email">{{ruleForm2.email || '暂无'}}</span>
          </el-form-item>
        </el-form>
        <el-form
          v-show="changeEmail.changed"
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="con-form">
          <el-form-item
            prop="email"
            label="邮箱 :"
          >
            <el-input v-model="ruleForm2.email"></el-input>
          </el-form-item>
          <el-form-item
            label="验证码 :"
            prop="code"
          >
            <el-input v-model="ruleForm2.code" class="con-info-code"></el-input>
            <el-button type="primary" plain class="con-info-code-btn">获取验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" size="mini">绑定</el-button>
            <el-button @click="cancelForm('ruleForm2', 'changeEmail')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="con-info-part">
        <con-title :title="title[2]"/>
        <el-form
          label-width="100px"
        >
          <el-form-item
            label="当前token :"
          >
            <span class="con-email con-info-dep-code">{{token}}</span>
            <el-button type="primary" plain size="mini" class="con-info-dep-code-btn">重置</el-button>
          </el-form-item>
        </el-form>
        <p class="con-info-dep-danger danger">*** 开发者token是校验开发者身份的密码，具有极高的安全性。切记勿把密码直接交给第三方开发者或直接存储在代码中</p>
      </div>
    </div>
  </section>
</template>

<script>
import ValidateFactory from '@/lib/validate';
import ConTitle from '@/components/console/con-info-title/con-info-title';
import { InfoService } from '@/services/info';

let infoService = new InfoService();
export default {
  name: 'PersonalInfo',
  data () {
    return {
      title: ['个人信息', '绑定的邮箱', '开放者信息'],
      changeInfo: {
        changed: false,
        title: '修改'
      },
      changeEmail: {
        changed: false,
        title: '修改'
      },
      ruleForm: {
        userIcon: '',
        username: ''
      },
      ruleForm2: {
        email: '',
        code: ''
      },
      token: '',
      old: {
        userIcon: '',
        username: '',
        email: ''
      },
      rules: {
        username: [
          {validator: ValidateFactory.nickName, trigger: 'blur'}
        ]
      },
      rules2: {
        code: [
          {validator: ValidateFactory.identifyCode, trigger: 'blur'}
        ],
        email: [
          {validator: ValidateFactory.email, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    changeInfoHandle (type) {
      if (this[type].changed) {
        return false;
      }
      this[type].changed = true;
      this[type].title = '编辑中...';
    },
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
    cancelForm (formName, type) {
      this.$refs[formName].resetFields();
      if (formName === 'ruleForm') {
        this.ruleForm.userIcon = this.old.userIcon;
        this.ruleForm.username = this.old.username;
      } else {
        this.ruleForm2.email = this.old.email;
      }
      this[type].changed = false;
      this[type].title = '修改';
    },
    handleChange (file) {
      this.beforeAvatarUpload(file);
      this.ruleForm.userIcon = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess (res, file) {
      this.ruleForm.userIcon = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    async getInfo () {
      let {icon, username} = await infoService.getInfo();
      this.ruleForm.userIcon = this.old.userIcon = icon;
      this.ruleForm.username = this.old.username = username;
    },
    async getEmail () {
      let {email} = await infoService.getInfoEmail();
      this.ruleForm2.email = this.old.email = email;
    },
    async getToken () {
      let {token} = await infoService.getInfoToken();
      this.token = token;
    }
  },
  mounted: function () {
    this.getInfo();
    this.getEmail();
    this.getToken();
  },
  components: {
    ConTitle
  }
};
</script>

<style scoped lang="scss">
  $iconHeight: 80px;
  .danger {
    color: #F56C6C;
  }

  .con-info {
    .con-info-part {
      .con-info-code {
        width: 120px;
      }
      .con-info-code-btn {
        vertical-align: middle;
        & > /deep/ * {
          font-size: 14px;
        }
      }
      .con-info-dep-danger {
        font-size: 12px;
        padding-left: 15px;
      }
      .con-info-dep-code {
        word-wrap: break-word;
        display: inline-block;
        font-size: 14px;
      }
      .con-info-dep-code-btn {
        margin-left: 15px;
      }
      .con-info-email-btn {
        margin-left: 10px;
        & > /deep/ * {
          font-size: 14px !important;
        }
      }
    }
    .con-form /deep/ {
      .el-form-item > label {
        &:before {
          display: none !important;
        }
      }
      .con-upload-icon {
        & > label {
          line-height: $iconHeight;
        }
        & > div {
          display: flex;
        }
      }
      .con-user-icon {
        width: $iconHeight;
        height: $iconHeight;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #eee;
        margin-right: 25px;
        .avatar {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }

  .el-form {
    padding-right: 15px;
  }

  .el-input {
    width: 300px;
  }
</style>
