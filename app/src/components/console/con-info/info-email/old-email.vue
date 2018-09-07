<template>
  <el-form
    :model="oldEmailForm"
    :rules="oldEmailRules"
    ref="oldEmailForm"
    label-width="100px"
    class="con-form">
    <el-form-item
      label="邮箱 :"
      prop="email"
    >
      <span>{{getCurrentUser.email}}</span>
    </el-form-item>
    <el-form-item
      label="验证码 :"
      prop="code"
    >
      <el-input v-model="oldEmailForm.code" placeholder="请输入验证码" class="con-info-code"></el-input>
      <el-button
        type="primary"
        plain
        class="con-info-code-btn"
        :disabled="getOldCode.disabled"
        @click="getOldCodeHandel">{{getOldCode.text}}
      </el-button>
      <span class="danger font12 code-info" v-show="getOldCode.disabled">验证码发送成功，请在 {{getTimes > 60 ? `${Math.floor(getTimes/60)}分钟` : `${getTimes}秒`}}内输入验证码</span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="submitOldEmailForm" size="mini">确认</el-button>
      <el-button @click="cancelOldEmailForm" size="mini">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex';
import ValidateFactory from '@/lib/validate';

export default {
  name: 'old-email',
  data () {
    return {
      oldEmailForm: {
        code: ''
      },
      oldEmailRules: {
        code: [
          {validator: ValidateFactory.identifyCode6, trigger: 'blur'}
        ]
      }
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentUser',
      'getTimes',
      'getOldCode',
      'getActived'
    ])
  },
  watch: {
    getActived: function (val) {
      // 清空验证码表单
      let _self = this;
      if (val !== 0) {
        _self.oldEmailForm.code = '';
      }
    }
  },
  methods: {
    submitOldEmailForm () {
      this.$refs.oldEmailForm.validate(async (valid) => {
        if (valid) {
          this.$store.dispatch('submitOldEmailForm', {
            emailCode: this.oldEmailForm.code
          });
          clearInterval(window.Timing);
        }
      });
    },
    cancelOldEmailForm () {
      this.oldEmailForm.code = '';
      this.$store.commit('UPDATE_OLD_EMAIL_ALL');
      this.$store.commit('UPDATE_OLD_ACTIVED', '0');
      this.$parent.$parent.cancelChange();
    },
    getOldCodeHandel () {
      this.$store.dispatch('getOldCodeHander', this.getCurrentUser.email);
    }
  }
};
</script>

<style scoped lang="scss">
  .con-info-code {
    width: 120px;
  }

  .con-info-code-btn {
    vertical-align: middle;
    & > /deep/ * {
      font-size: 14px;
    }
  }
</style>
