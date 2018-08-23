<template>
  <el-col>
    <div class="con-block" :class="[isWhite ? 'white' : `con-block-bg${index + 1}`]">
      <div class="con-block-info">
        <p>{{block.num}}</p>
        <p>{{block.title}}</p>
      </div>
      <i class="con-block-icon" v-if="block.icon" :style="{backgroundImage: `url(${block.icon})`}"></i>
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'ConBlock',
  props: {
    block: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },
    isWhite: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
  .con-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 15%;
    @media screen and (max-width: 1250px) {
      justify-content: center;
      flex-wrap: wrap;
      .con-block-icon {
        margin-top: 10px;
      }
    }
    &.white {
      background: #fff;
      justify-content: center;
      box-shadow: 0 2px 4px 0 rgba(20, 30, 57, 0.1);
      .con-block-info {
        & > p:nth-of-type(1) {
          color: #333;
        }
        & > p:nth-of-type(2) {
          color: #666;
        }
      }
    }
    &.con-block-bg1 {
      background: linear-gradient(left, #FDC67A, #FCAE33);
      background: -ms-linear-gradient(left, #FDC67A, #FCAE33);
    }
    &.con-block-bg2 {
      background: linear-gradient(left, #B4BFC7, #8E9EAB);
      background: -ms-linear-gradient(left, #B4BFC7, #8E9EAB);
    }
    &.con-block-bg3 {
      background: linear-gradient(left, #8BA2F1, #7B87F2);
      background: -ms-linear-gradient(left, #8BA2F1, #7B87F2);
    }
    &.con-block-bg4 {
      background: linear-gradient(left, #2DCFEB, #2AB9EC);
      background: -ms-linear-gradient(left, #2DCFEB, #2AB9EC);
    }
    .con-block-info {
      color: #fff;
      text-align: center;
      min-width: 114px;
      & > p:nth-of-type(1) {
        font-size: 30px;
      }
      & > p:nth-of-type(2) {
        font-size: 12px;
        padding-left: 16px;
      }
    }
    .con-block-icon {
      width: 52px;
      height: 52px;
      background-size: 100% 100%;
    }
  }
</style>
