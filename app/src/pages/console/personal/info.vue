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
              :action="fileUploadUrl"
              :data="fileUploadData"
              multiple
              name="fileData"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="onFileUploadSuccess">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p class="danger file-info" v-show="changeInfo.changed">上传文件类型:png/jpg/gif,大小不超过2M</p>
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
            <el-button type="primary" @click="submitForm('ruleForm', 'changeInfo')" size="mini">保存</el-button>
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
        <!--验证老邮箱-->
        <div class="email-steps" v-show="changeEmail.changed">
          <el-steps
            :active="actived"
            class="email-el-steps"
            :align-center="Boolean(true)"
            process-status="finish"
            finish-status="success">
            <el-step title="验证原邮箱"></el-step>
            <el-step title="填写新邮箱"></el-step>
          </el-steps>
        </div>
        <el-form
          v-show="changeEmail.changed && showOld"
          :model="ruleForm3"
          :rules="rules3"
          ref="ruleForm3"
          label-width="100px"
          class="con-form">
          <el-form-item
            label="邮箱 :"
            prop="email"
          >
            <span>{{ruleForm2.email}}</span>
          </el-form-item>
          <el-form-item
            label="验证码 :"
            prop="code"
          >
            <el-input v-model="ruleForm3.code" placeholder="请输入验证码" class="con-info-code"></el-input>
            <el-button
              type="primary"
              plain
              class="con-info-code-btn"
              :disabled="oldCode.disabled"
              @click="getOldCode">{{oldCode.text}}
            </el-button>
            <span class="danger font12 code-info" v-show="oldCode.disabled">验证码发送成功，请在 {{oldCode.times > 60 ? `${Math.floor(oldCode.times/60)}分钟` : `${oldCode.times}秒`}}内输入验证码</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.prevent="submitForm('ruleForm3', 'changeEmail')" size="mini">确认</el-button>
            <el-button @click="cancelForm('ruleForm3', 'changeEmail')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
        <!--验证新邮箱-->
        <el-form
          v-show="changeEmail.changed && !showOld"
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          @click.prevent=""
          class="con-form con-form-new">
          <el-form-item
            prop="email"
            label="新邮箱 :"
            class="infoEmail"
          >
            <el-input v-model="ruleForm2.email" placeholder="请填写新邮箱"></el-input>
          </el-form-item>
          <el-form-item
            label="验证码 :"
            prop="code"
          >
            <el-input v-model="ruleForm2.code" class="con-info-code" placeholder="请输入验证码"></el-input>
            <el-button type="primary" plain class="con-info-code-btn" :disabled="newCode.disabled" @click="getCode">
              {{newCode.text}}
            </el-button>
            <span class="danger font12 code-info" v-show="newCode.disabled">验证码发送成功，请在 {{newCode.times > 60 ? `${Math.floor(newCode.times/60)}分钟` : `${newCode.times}秒`}}内输入验证码</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2', 'changeEmail')" size="mini">绑定</el-button>
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
            <el-button type="primary" plain size="mini" class="con-info-dep-code-btn" @click="resetToken">重置</el-button>
          </el-form-item>
        </el-form>
        <p class="con-info-dep-danger danger">*** 开发者token是校验开发者身份的密码，具有极高的安全性。切记勿把密码直接交给第三方开发者或直接存储在代码中</p>
      </div>
    </div>
  </section>
</template>

<script>
import ToastTip from '@/lib/message';
import ValidateFactory from '@/lib/validate';
import Common from '@/lib/common';
import ConTitle from '@/components/console/con-info-title/con-info-title';
import infoService from '@/services/info';
import { mapGetters } from 'vuex';
import { getUrlConfig } from '@/http/http.url.config';

export default {
  name: 'PersonalInfo',
  metaInfo: {
    title: '控制台-账号信息'
  },
  data () {
    return {
      title: ['个人信息', '绑定的邮箱', '开放者信息'],
      fileUploadUrl: getUrlConfig('postImg').url,
      actived: 0,
      fileUploadData: {
        moduleId: 'api'
      },
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
      ruleForm3: {
        code: ''
      },
      showOld: true,
      oldCode: {
        disabled: false,
        text: '获取验证码',
        timer: null,
        times: 601
      },
      newCode: {
        disabled: false,
        text: '获取验证码',
        timer: null,
        times: 601
      },
      token: '',
      rules: {
        username: [
          {validator: ValidateFactory.nickName, trigger: 'blur'}
        ]
      },
      rules2: {
        code: [
          {validator: ValidateFactory.identifyCode6, trigger: 'blur'}
        ],
        email: [
          {validator: ValidateFactory.email, trigger: 'blur'}
        ]
      },
      rules3: {
        code: [
          {validator: ValidateFactory.identifyCode6, trigger: 'blur'}
        ]
      },
      file: ''
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentUser'
    ])
  },
  methods: {
    async getOldCode () {
      if (this.getCurrentUser.email && this.ruleForm2.email) {
        this.oldCode.times = 601;
        this.oldCode.disabled = true;
        this.oldCode.text = '重新获取验证码';
        let {code, message} = await infoService.getCode();
        if (code === 1) {
          ToastTip.success(message);
          this.oldCode.timer = setInterval(() => {
            this.oldCode.times -= 1;
            if (this.oldCode.times <= 0) {
              clearInterval(this.oldCode.timer);
              this.oldCode.disabled = false;
            }
          }, 1000);
        } else {
          ToastTip.error(message);
        }
      }
    },
    async getCode () {
      let errText = '';
      let $err = $('.infoEmail .el-form-item__error');
      let $infoEmail = $('.infoEmail');
      let $content = $('.infoEmail .el-form-item__content');
      if (!this.ruleForm2.email) {
        errText = '*邮箱不能为空';
      } else if (this.ruleForm2.email === this.getCurrentUser.email) {
        errText = '*请更改邮箱地址';
      } else {
        let targ = /^[a-zA-Z0-9_.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/;
        if (!targ.test(this.ruleForm2.email)) {
          errText = '*请输入正确邮箱';
        } else {
          errText = '';
        }
      }
      if (!errText) {
        this.newCode.times = 601;
        $err.remove();
        $infoEmail.removeClass('is-error');
        let {code, message} = await infoService.postNewCode({
          email: this.ruleForm2.email
        });
        if (code === 1) {
          ToastTip.success(message);
          this.newCode.disabled = true;
          this.newCode.text = '重新获取验证码';
          this.newCode.timer = setInterval(() => {
            this.newCode.times -= 1;
            if (this.newCode.times <= 0) {
              clearInterval(this.newCode.timer);
              this.newCode.disabled = false;
            }
          }, 1000);
        } else {
          ToastTip.error(message);
        }
      } else {
        if (!$err.length) {
          $infoEmail.addClass('is-error');
          $err = `<div class="el-form-item__error">*${errText}</div>`;
          $content.append($err);
        } else {
          $err.html(errText);
        }
      }
    },
    changeInfoHandle (type) {
      if (this[type].changed) {
        return false;
      }
      this[type].changed = true;
      this[type].title = '编辑中...';
      if (type === 'changeEmail' && this.showOld && this.changeEmail.changed) {
        this.getOldCode();
      }
    },
    async changeName () {
      let res = await infoService.postName({
        name: this.ruleForm.username
      });
      Common.requestMsgHandler(res);
      if (res.code === 1) {
        this.$store.commit('UPDATE_NAME', this.ruleForm.username);
      }
      return res;
    },
    async changeAvatar () {
      if (this.file) {
        let res = await infoService.modifyAvatar({
          headImageUrl: this.file[0].filePath
        });
        if (res.code === 1) {
          this.$store.commit('UPDATE_HEADIMG', this.ruleForm.userIcon);
        }
        Common.requestMsgHandler(res);
        return res;
      }
    },
    submitForm (formName, type) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (formName === 'ruleForm') {
            if (this.ruleForm.username !== this.getCurrentUser.name || this.ruleForm.userIcon !== this.getCurrentUser.headImageUrl) {
              let nameRes = await this.changeName();
              let avatarRes = await this.changeAvatar();
              // let data = await this.uploadImg();
              if (nameRes.code === 1 || avatarRes.code === 1) {
                this.cancelForm(formName, type);
              }
            } else {
              this[type].changed = false;
              this[type].title = '修改';
            }
          } else if (formName === 'ruleForm2') {
            if (this.actived !== 1) {
              ToastTip.error('请先验证原邮箱！');
              return false;
            }
            if (this.ruleForm2.email === this.getCurrentUser.email) {
              ToastTip.warn('请更改邮箱地址');
            } else {
              let {code = -1, message = ''} = await infoService.postEmail({
                email: this.ruleForm2.email,
                emailCode: this.ruleForm2.code
              });
              if (code === 1) {
                this.$store.commit('UPDATE_EMAIL', this.ruleForm2.email);
                ToastTip.success(`${message},稍后自动关闭修改`);
                this.newCode.timer = null;
                let timeOut = setTimeout(() => {
                  clearTimeout(timeOut);
                  this[type].changed = false;
                  this[type].title = '修改';
                  this.cancelForm(formName, type);
                }, 2000);
              } else {
                ToastTip.error(message);
              }
            }
          } else if (formName === 'ruleForm3') {
            let {code = 0, message = ''} = await infoService.postOldCode({
              emailCode: this.ruleForm3.code
            });
            if (code === 1) {
              ToastTip.success(message);
              let timeOut = setTimeout(() => {
                clearTimeout(timeOut);
                this.oldCode.timer = null;
                this.actived = 1;
                this.showOld = false;
                this.ruleForm2.email = '';
              }, 1000);
            } else {
              ToastTip.error(message);
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
    },
    cancelForm (formName, type) {
      if (formName !== 'ruleForm3') {
        this.$refs[formName].resetFields();
      }
      if (formName === 'ruleForm') {
        this.ruleForm.userIcon = this.getCurrentUser.headImageUrl;
        this.ruleForm.username = this.getCurrentUser.name;
      } else {
        this.ruleForm2.email = this.getCurrentUser.email;
        this.newCode.timer = this.oldCode.timer = null;
        this.newCode.times = this.oldCode.times = 601;
        this.newCode.disabled = this.oldCode.disabled = false;
        this.newCode.text = this.oldCode.text = '获取验证码';
        this.ruleForm3.code = '';
        this.showOld = true;
      }
      this[type].changed = false;
      this[type].title = '修改';
    },
    async uploadImg () {
      // this.ruleForm.userIcon = URL.createObjectURL(file.raw);
      let form = new FormData();
      form.append('file', this.file);
      return infoService.postImg({
        moduleId: 'api',
        fileData: form
      });
    },
    onFileUploadSuccess (response, file) {
      // this.$store.dispatch('initCurrentUser');
      // console.log(response);
      if (response.success) {
        this.ruleForm.userIcon = response.fileBeans[0].filePath;
        this.file = response.fileBeans;
      } else {
        this.file = '';
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        ToastTip.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
      }
      if (!isLt2M) {
        ToastTip.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    getInfo () {
      let {name = '', email = '', headImageUrl = '', token = ''} = this.getCurrentUser;
      this.ruleForm.userIcon = headImageUrl;
      this.ruleForm.username = name;
      this.ruleForm2.email = email;
      this.token = token;
    },
    // async getEmail () {
    //   let {email} = await infoService.getInfoEmail();
    //   this.ruleForm2.email = this.old.email = email;
    // },
    async resetToken () {
      let {code, data, message} = await infoService.getInfoToken();
      if (code === 1) {
        this.token = data.token;
        ToastTip.success(message);
      } else {
        ToastTip.warn(message);
      }
    }
  },
  mounted: function () {
    this.getInfo();
    // this.getEmail();
    // this.getToken();
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
      .email-steps {
        margin: 0 auto 40px;
        width: 600px;
      }
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
      .file-info {
        line-height: $iconHeight;
        font-size: 12px;
        margin-left: 10px;
      }
      .avatar-uploader {
        height: $iconHeight;
        & .el-upload {
          border: none;
        }
      }
    }
    .con-form-new {
      padding-left: 315px;
    }
    .code-info {
      position: absolute;
      left: 126px;
      top: 31px;
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
