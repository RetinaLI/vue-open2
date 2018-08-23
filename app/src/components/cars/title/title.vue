<template>
  <div class="cars-title">
    <h3 class="cars-title-top" :style="`backgroundImage: url(${title.engImg})`">{{title.name}}</h3>
    <p class="cars-title-detail" v-if="title.detail">{{title.detail}}</p>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: Object,
      default: () => {
        return {
          name: '',
          engImg: '',
          detail: ''
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
  .cars-title {
    text-align: center;
    padding: 60px 0;
    .cars-title-top {
      height: 70px;
      line-height: 70px;
      font-size: 40px;
      color: #333;
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .cars-title-detail {
      padding-top: 15px;
      font-size: 14px;
      color: #666;
      line-height: 18px;
    }
  }
</style>
