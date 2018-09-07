<!-- 顶部导航组件 -->
<!-- 使用说明：<top-bar></top-bar> -->
<template>
  <div class="footer-bar">
    <div class="wrapper">
      <div class="content clearfix">
        <div class="item">
          <h5>快速入口</h5>
          <p><router-link to="/service/index.html">数据服务</router-link></p>
          <p><router-link to="/dynamic/industry/index.html">产品&amp;行业动态</router-link></p>
          <!-- <p>联系我们</p> -->
        </div>
        <div class="item">
          <h5>车联网产品</h5>
          <p><router-link to="/cars/truck/index.html">中重卡车联网平台</router-link></p>
          <p><router-link to="/cars/energy/index.html">新能源车联网平台</router-link></p>
          <p><router-link to="/cars/mechanics/index.html">工程机械车联网平台</router-link></p>
          <p><router-link to="/cars/bus/index.html">客车车联网平台</router-link></p>
          <p><router-link to="/cars/passenger/index.html">乘用车车联网平台</router-link></p>
        </div>
        <div class="item">
          <h5>解决方案</h5>
          <p><router-link to="/solution/manage/index.html">车队管理系统</router-link></p>
          <p><router-link to="/solution/finance/index.html">金融车联网系统</router-link></p>
          <p><router-link to="/solution/logistic/index.html">物流车联网系统</router-link></p>
          <p><router-link to="/solution/service/index.html">经销/服务商车联网系统</router-link></p>
        </div>
        <div class="item">
          <h5>关注智科</h5>
          <a href="#" class="wechat">
            <img src="../assets/images/footer/wechat-grey.png" alt="">
            <img class="no-grey" src="../assets/images/footer/wechat.png" alt="">
            <img class="qrcode" src="../assets/images/footer/qrcode.png" alt="">
          </a>
          <a href="#" class="sina">
            <img src="../assets/images/footer/sina-grey.png" alt="">
            <img class="no-grey" src="../assets/images/footer/sina.png" alt="">
          </a>
        </div>
        <div class="item">
          <h5>联系我们</h5>
          <p class="phone">4008-199-199</p>
          <p class="email">dongxinshen@foton.com.cn</p>
          <p class="local">北京市昌平区沙河镇沙阳路</p>
        </div>
      </div>
      <div class="footer-bottom clearfix">
        <p class="fl">
          ©北京智科车联科技有限公司&nbsp;&nbsp;京ICP备12004550号
        </p>
        <p class="fr">
          24小时监督热线：010-80722999
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'foot-bar',
  data () {
    return {
    };
  },
  computed: {
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.footer-bar {
  height: 400px;
  background-color: #242637;
  padding: 0;
  .wrapper {
    padding-top: 80px;
    position: relative;
    .content {
      .item {
        float: left;
        h5 {
          color: rgba(255, 255, 255, .9);
          font-size: 14px;
          margin-bottom: 26px;
        }
        p, p a {
          color: rgba(255, 255, 255, .4);
          font-size: 12px;
          line-height: 18px;
          margin-bottom: 10px;
          cursor: pointer;
          &:hover {
            color: #fff;
          }
        }
        &:not(:last-child) {
          margin-right: 120px;
        }
      }
      .wechat {
        position: relative;
        .qrcode {
          opacity: 0;
          position: absolute;
          top: 22px;
          left: -24px;
          transition: opacity .4s;
        }
        &:hover {
          .qrcode, .no-grey {
            opacity: 1;
          }
        }
      }
      .sina {
        position: relative;
        margin-left: 16px;
        &:hover {
          .no-grey {
            opacity: 1;
          }
        }
      }
      .no-grey {
        opacity: 0;
        position: absolute;
        top: -43px;
        left: 0;
        transition: opacity .3s;
      }
      p.phone {
        font-size: 24px;
        color: rgba(255, 255, 255, .8);
      }
      p.email, p.local {
        background-position: left center;
        background-repeat: no-repeat;
        background-size: contain;
        padding-left: 25px;
      }
      p.email {
        background-size: 15px;
        background-image: url('../assets/images/footer/email.png');
      }
      p.local {
        background-size: 12px;
        background-position-x: 2px;
        background-image: url('../assets/images/footer/local.png');
      }
    }
    .footer-bottom {
      position: absolute;
      top: 333px;
      left: 0;
      width: 100%;
      height: 66px;
      border-top: 1px solid rgba(255, 255, 255, .1);
      p {
        font-size: 12px;
        color: rgba(255, 255, 255, .4);
        line-height: 66px;
      }
    }
  }
}
</style>
