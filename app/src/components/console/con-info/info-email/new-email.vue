<template>
  <!--验证新邮箱-->
  <el-form
    :model="newEmailForm"
    :rules="newEmailRules"
    ref="newEmailForm"
    label-width="100px"
    @click.prevent=""
    class="con-form con-form-new newForm">
    <el-form-item
      prop="email"
      label="新邮箱 :"
      class="infoEmail"
    >
      <el-input v-model="newEmailForm.email" placeholder="请填写新邮箱"></el-input>
    </el-form-item>
    <el-form-item
      label="验证码 :"
      prop="code"
    >
      <el-input v-model="newEmailForm.code" class="con-info-code" placeholder="请输入验证码"></el-input>
      <el-button type="primary" plain class="con-info-code-btn" :disabled="getNewCode.disabled" @click="getCode">
        {{getNewCode.text}}
      </el-button>
      <span class="danger font12 code-info" v-show="getNewCode.disabled">验证码发送成功，请在 {{getTimes > 60 ? `${Math.floor(getTimes/60)}分钟` : `${getTimes}秒`}}内输入验证码</span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitNewEmailForm" :disabled="submited" class="save" size="mini">绑定</el-button>
      <el-button @click="cancelNewEmailForm" class="cancle" size="mini">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex';
import ValidateFactory from '@/lib/validate';
import ToastTip from '@/lib/message';

export default {
  name: 'new-email',
  data () {
    return {
      newEmailForm: {
        email: '',
        code: ''
      },
      submited: false,
      newEmailRules: {
        code: [
          {validator: ValidateFactory.identifyCode6, trigger: 'blur'}
        ],
        email: [
          {validator: ValidateFactory.email.fn, trigger: 'blur'},
          {validator: ValidateFactory.email.echeck, trigger: 'blur'}
        ]
      }
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentUser',
      'getTimes',
      'getNewCode',
      'getActived'
    ])
  },
  methods: {
    async submitNewEmailForm () {
      this.submited = false;
      this.$refs.newEmailForm.validate(async (valid) => {
        if (valid) {
          if (this.getActived === 0) {
            ToastTip.error('请先验证原邮箱！');
            return false;
          }
          if (this.newEmailForm.email === this.getCurrentUser.email) {
            ToastTip.warn('请更改邮箱地址');
          } else {
            this.submited = true;
            let code = await this.$store.dispatch('changeNewEmail', {
              email: this.newEmailForm.email,
              emailCode: this.newEmailForm.code
            });
            if (code === 1) {
              let timer = setTimeout(() => {
                clearTimeout(timer);
                this.submited = false;
                this.cancelNewEmailForm();
              }, 1500);
            } else {
              this.submited = false;
            }
          }
        }
      });
    },
    cancelNewEmailForm () {
      this.$store.commit('UPDATE_OLD_EMAIL_ALL');
      this.$store.commit('UPDATE_OLD_ACTIVED', '0');
      this.$refs.newEmailForm.resetFields();
      this.$parent.$parent.cancelChange();
    },
    async getCode () {
      let errText = '';
      let $err = $('.infoEmail .el-form-item__error');
      let $infoEmail = $('.infoEmail');
      let $content = $('.infoEmail .el-form-item__content');
      if (!this.newEmailForm.email) {
        errText = '*邮箱不能为空';
      } else if (this.newEmailForm.email === this.getCurrentUser.email) {
        errText = '*请更改邮箱地址';
      } else {
        let targ = /^[a-zA-Z0-9_.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/;
        if (!targ.test(this.newEmailForm.email)) {
          errText = '*请输入正确邮箱';
        } else {
          errText = '';
        }
      }
      if (!errText) {
        $err.remove();
        $infoEmail.removeClass('is-error');
        this.$store.dispatch('getNewEmailCode', {
          email: this.newEmailForm.email
        });
      } else {
        if (!$err.length) {
          $infoEmail.addClass('is-error');
          $err = `<div class="el-form-item__error">${errText}</div>`;
          $content.append($err);
        } else {
          $err.html(errText);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
  .con-form-new {
    padding-left: 315px;
  }

  .con-info-code {
    width: 120px;
  }

  .code-info {
    position: absolute;
    left: 126px;
    top: 31px;
  }

  .con-info-code-btn {
    vertical-align: middle;
    & > /deep/ * {
      font-size: 14px;
    }
  }
</style>
