<template>
  <div class="con-footer hc">
    <span>©北汽福田汽车股份有限公司版权所有</span>
    <span>京ICP备12004550号</span>
    <span>地址：北京市昌平区沙河镇沙阳路</span>
    <span>24小时监督热线：010-80722999</span>
  </div>
</template>

<script>
export default {
  name: 'conFooter'
};
</script>

<style scoped lang="scss">
.con-footer {
  width: 950px;
  height: 100%;
  line-height:40px;
  color: #999;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  max-width: 1000px;
  margin: 0 auto;
  & > span {
    font-size: 12px;
    display: block;
    flex:1;
    text-align: center;
  }
}
</style>
