<template>
  <section class="con-info">
    <div class="con-info-user padTop">
      <!--<h3 class="con-info-user-title">账户信息</h3>-->
      <div class="con-info-part">
        <ConTitle
          :title="title[0]"
          :isShow="true"
          :changeInfo="changeInfo"
          @changeInfoHandle="changeInfoHandle('changeInfo')"
        />
        <ConInfoUser :changeInfo="changeInfo"/>
      </div>
      <div class="con-info-part">
        <ConTitle
          :title="title[1]"
          :isShow="true"
          :changeInfo="changeEmail"
          @changeInfoHandle="changeInfoHandle('changeEmail')"
        />
        <ConEmail :changeEmail="changeEmail" ref="emails"/>
      </div>
      <div class="con-info-part">
        <con-title :title="title[2]"/>
        <el-form
          label-width="100px"
        >
          <el-form-item
            label="当前token :"
          >
            <span class="con-email con-info-dep-code">{{getCurrentUser.token || '暂无'}}</span>
            <el-button type="primary" v-show="getCurrentUser.token" plain size="mini" class="con-info-dep-code-btn" @click="resetToken">重置</el-button>
          </el-form-item>
        </el-form>
        <p class="con-info-dep-danger danger">*** 开发者token是校验开发者身份的密码，具有极高的安全性。切记勿把密码直接交给第三方开发者或直接存储在代码中</p>
      </div>
    </div>
  </section>
</template>

<script>
import ToastTip from '@/lib/message';
import infoService from '@/services/info';
import { mapGetters } from 'vuex';

import ConTitle from '@/components/console/con-info-title/con-info-title';
import ConInfoUser from '@/components/console/con-info/info-user/index';
import ConEmail from '@/components/console/con-info/info-email/index';

export default {
  name: 'PersonalInfo',
  metaInfo: {
    title: '控制台-账号信息'
  },
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
      }
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentUser'
    ])
  },
  methods: {
    changeInfoHandle (type) {
      if (this[type].changed) {
        return false;
      }
      this[type].changed = true;
      this[type].title = '编辑中...';
      if (type === 'changeEmail' && this.changeEmail.changed) {
        this.$store.dispatch('getOldCodeHander', this.getCurrentUser.email);
      }
    },
    async resetToken () {
      let {code, data, message} = await infoService.getInfoToken();
      if (code === 1) {
        this.$store.commit('UPDATE_TOKEN', data.token);
        ToastTip.success(message);
      } else {
        ToastTip.warn(message);
      }
    }
  },
  components: {
    ConTitle,
    ConInfoUser,
    ConEmail
  }
};
</script>

<style scoped lang="scss">
  $iconHeight: 80px;

  .con-info {
    .con-info-part {
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
      .avatar-uploader {
        height: $iconHeight;
        & .el-upload {
          border: none;
        }
      }
    }
    .con-form /deep/ {
      .el-form-item > label {
        &:before {
          display: none !important;
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
