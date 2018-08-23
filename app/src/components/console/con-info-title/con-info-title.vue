<template>
  <p class="con-info-part-title">
    <span>{{title}}</span>
    <el-button
      v-if="isShow"
      type="text danger"
      class="con-info-change"
      @click="changeHandle()"
    >{{changeInfo.title}}
    </el-button>
  </p>
</template>

<script>
export default {
  name: 'ConInfoTitle',
  props: {
    changeInfo: {
      type: Object,
      default: () => {}
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
      console.log(2);
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
