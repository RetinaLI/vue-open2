<template>
  <div class="wrapper">
    <div class="box vhc">
      <img :src="imgUrl" alt="">
      <h1>404</h1>
      <p>This page is missing</p>
      <a href="/" class="go">
            GO HOME
          </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page404',
  data () {
    return {
      imgUrl: require('project-assets/images/404.png')
    };
  }
};
</script>

<style lang="scss" scoped>
  .box{
    width: 400px;
    padding-bottom: 60px;
    img{
      margin: 0 auto;
      display: inherit;
      margin-bottom:12px;
    }
    h1, p{
      text-align: center;
    }
    h1{
      font-size: 66px;
      font-weight: bold;
      margin-bottom: 16px;
    }
    p{
      margin-bottom: 25px;
    }
    a{
      display: inline-block;
      width: 200px;
      height:40px;
      line-height: 40px;
      border-radius: 20px;
      color: #fff;
      text-align: center;
      background: #4475fd;
      margin-left: 100px;
    }
  }
</style>
