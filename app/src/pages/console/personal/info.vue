<template>
  <section class="con-info">
    <div class="con-info-user padTop">
      <!--<h3 class="con-info-user-title">账户信息</h3>-->
      <div class="con-info-part baseinfo">
        <ConTitle
          :title="title[0]"
          :isShow="true"
          :changeInfo="changeInfo"
          @changeInfoHandle="changeInfoHandle('changeInfo')"
        />
        <ConInfoUser :changeInfo="changeInfo" ref="infoUser"/>
      </div>
      <div class="con-info-part baseEmail">
        <ConTitle
          :title="title[1]"
          :isShow="true"
          :changeInfo="changeEmail"
          @changeInfoHandle="changeInfoHandle('changeEmail')"
        />
        <ConEmail :changeEmail="changeEmail" ref="emails"/>
      </div>
      <div class="con-info-part baseToken">
        <con-title :title="title[2]"/>
        <el-form
          label-width="100px"
        >
          <el-form-item
            label="当前token :"
          >
            <span class="con-email con-info-dep-code">{{getCurrentUser.token || '暂无'}}</span>
            <el-button
              type="primary"
              v-show="getCurrentUser.token"
              plain size="mini"
              class="con-info-dep-code-btn"
              @click="resetToken"
              :disabled="tokenBtn.disabled">{{tokenBtn.text}}
            </el-button>
          </el-form-item>
        </el-form>
        <p class="con-info-dep-danger danger">*** 开发者token是校验开发者身份的密码，具有极高的安全性。切记勿把密码直接交给第三方开发者或直接存储在代码中<br/>*** 每月只能重置一次token</p>
      </div>
    </div>
  </section>
</template>

<script>
import ToastTip from '@/lib/message';
import InfoService from '@/services/info';
import { mapGetters } from 'vuex';
import { setLocalStorage, getLocalStorage, removeStorage } from '@/lib/sessionStorage';

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
      title: ['个人信息', '绑定的邮箱', '开发者信息'],
      changeInfo: {
        changed: false,
        title: '修改'
      },
      changeEmail: {
        changed: false,
        title: '修改'
      },
      tokenBtn: {
        text: '重置',
        disabled: false
      },
      tokenTimes: null
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
      if (type === 'changeInfo' && this.changeInfo.changed) {
        this.$refs.infoUser.infoFormValue();
      }
      if (type === 'changeEmail' && this.changeEmail.changed) {
        this.$store.dispatch('getOldCodeHander', this.getCurrentUser.email);
      }
    },
    tokenTime () {
      if (getLocalStorage(this.getCurrentUser.username)) {
        this.tokenBtn.disabled = true;
        this.tokenBtn.text = `本月已重置`;
        let times = parseInt(getLocalStorage(this.getCurrentUser.username));
        if (times !== new Date().getMonth()) {
          this.tokenBtn.text = '重置';
          this.tokenBtn.disabled = false;
          removeStorage(this.getCurrentUser.username);
          // clearInterval(this.tokenTimes);
        } else {
          setLocalStorage(this.getCurrentUser.username, times);
        }
        // this.tokenTimes = setInterval(() => {
        //   times--;
        //   this.tokenBtn.text = `请${times}秒,再次重置`;
        //   if (times <= 0) {
        //     this.tokenBtn.text = '重置';
        //     this.tokenBtn.disabled = false;
        //     removeStorage('times');
        //     clearInterval(this.tokenTimes);
        //   } else {
        //     setStorage('times', times);
        //   }
        // }, 1000);
      } else {
        // clearInterval(this.tokenTimes);
        this.tokenBtn.disabled = false;
        this.tokenBtn.text = '重置';
      }
    },
    resetToken () {
      ToastTip.confirm({
        content: '重置token会导致正在使用的token过期，确认重置吗？'
      })
        .then(async () => {
          // setStorage('times', 60);
          setLocalStorage(this.getCurrentUser.username, new Date().getMonth());
          this.tokenTime();
          let {code, data, message} = await InfoService.getInfoToken();
          if (code === 1) {
            this.$store.commit('UPDATE_TOKEN', data.token);
            ToastTip.success(message);
          } else {
            this.tokenBtn.text = '重置';
            this.tokenBtn.disabled = false;
            // clearInterval(this.tokenTimes);
            removeStorage(this.getCurrentUser.username);
            ToastTip.warn(message);
          }
        })
        .catch(() => {
        });
    }
  },
  mounted: function () {
    this.tokenTime();
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
  $color: #4475FD;

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
  .reset {
    color: $color!important;
  }
</style>
