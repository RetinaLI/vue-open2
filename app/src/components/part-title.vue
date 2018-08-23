<template>
  <div class="part-title">
    <h1>{{ cTitle[0] }}</h1>
    <p>{{ cTitle[1] }}</p>
  </div>
</template>
<script>
export default {
  props: ['cTitle']
};
</script>
<style lang="scss" scoped>
div {
  text-align: center;
  h1 {
    font-size: 40px;
    color: #333;
    line-height: 80px;
  }
  p {
    font-size: 14px;
    color: #aaa;
    line-height: 20px;
  }
}
</style>
