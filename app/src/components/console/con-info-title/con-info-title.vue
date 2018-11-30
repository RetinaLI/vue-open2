<template>
  <p class="con-info-part-title">
    <span>{{title}}</span>
    <span class="title-auth" :class="info[parseInt(showAuth.authStatus)]" v-if="showAuth.bool">{{auth[parseInt(showAuth.authStatus)]}}<i class="title-auth-info" v-if="showAuth.authStatus === '2' && showAuth.reason.length > 0">——&nbsp;&nbsp;{{showAuth.reason}}</i></span>
    <el-button
      v-if="isShow"
      v-show="!Boolean(showAuth.authStatus === '0' || showAuth.authStatus === '1')"
      type="text danger"
      class="con-info-change"
      @click="changeHandle()"
    >{{changeInfo.title}}
    </el-button>
  </p>
</template>

<script>
const AUTH = [
  '申请中...',
  '审核成功',
  '审核失败',
  '未申请认证'
];
const INFO = [
  'info',
  'success',
  'err',
  'gray'
];
export default {
  name: 'ConInfoTitle',
  data () {
    return {
      auth: AUTH,
      info: INFO
    };
  },
  props: {
    changeInfo: {
      type: Object,
      default: () => {}
    },
    showAuth: {
      type: Object,
      default: () => {
        return {
          bool: false,
          authStatus: '3',
          reason: ''
        };
      }
    },
    title: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    formName: {
      type: String,
      default: 'ruleForm'
    }
  },
  methods: {
    changeHandle () {
      if (this.changeInfo.changed) {
        return false;
      }
      this.$emit('changeInfoHandle');
    }
  }
};
</script>

<style scoped lang="scss">
  $hoveColor: #409EFF;
  $allColor: #4475FD;
  .danger {
    color: #4475FD;
    &:hover {
      color: $hoveColor;
    }
  }

  .con-info-part-title {
    color: $allColor;
    height: 40px;
    line-height: 40px;
    margin: 20px 0;
    border-bottom: 1px solid #eee;
    position: relative;
    .title-auth {
      font-size: 12px;
      margin-left: 10px;
      &.gray {
        color: #909399;
      }
      &.success {
        color: #67C23A;
      }
      &.err {
        color: #F56C6C;
      }
      &.info {
        color: #409EFF;
      }
    }
    .title-auth-info {
      font-size: 12px;
      padding-left: 5px;
    }
    &:before {
      content: '';
      width: 4px;
      height: 14px;
      display: inline-block;
      vertical-align: middle;
      background: $allColor;
      margin: -1px 10px 0 0;
    }
    .con-info-change {
      float: right;
      margin-right: 10px;
      & /deep/ > * {
        font-size: 14px;
      }
    }
  }
</style>
