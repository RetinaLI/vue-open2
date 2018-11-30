<template>
  <div>
    <banner :bannerdata="banner" class="ba"></banner>
    <div class="forecast item">
      <div class="title">
        <h3>市场预测</h3>
        <p>预测市场变化，预估市场风险</p>
      </div>
      <div class="wrapper">
        <div class="icons clearfix">
          <div>
            <img src="../../../assets/images/solution/icon5.png" alt="">
            <p>运营动态</p>
          </div>
          <div>
            <img src="../../../assets/images/solution/icon6.png" alt="">
            <p>数据分析</p>
          </div>
          <div>
            <img src="../../../assets/images/solution/icon7.png" alt="">
            <p>市场预估</p>
          </div>
        </div>
      </div>
    </div>
    <div class="inventory item">
      <div class="box vhc">
        <div class="img vc">
          <img src="../../../assets/images/solution/item2.png" alt="">
        </div>
        <div class="title">
          <h3>库存管理</h3>
          <p>动态调整库存，满足市场需求</p>
        </div>
        <div class="desc clearfix">
          <div>
            <img src="../../../assets/images/solution/icon1.png" alt="">
            <p>准确</p>
          </div>
          <div>
            <img src="../../../assets/images/solution/icon2.png" alt="">
            <p>及时</p>
          </div>
          <div>
            <img src="../../../assets/images/solution/icon3.png" alt="">
            <p>便捷</p>
          </div>
        </div>
      </div>
    </div>
    <div class="service item">
      <div class="title">
        <h3>主动服务</h3>
        <p>自动感知车辆故障，主动推送服务信息</p>
      </div>
      <div class="wrapper">
        <img src="../../../assets/images/solution/item3.jpg" alt="">
        <div class="t">
          <img src="../../../assets/images/solution/icon8.png" alt="">
          <p class="msg">
            您的车辆存在安全隐患，请及时靠边停车，等待救援！
          </p>
          <h6>主动推送服务信息</h6>
        </div>
      </div>
    </div>
    <div class="rescue item">
      <div class="title">
        <h3>精准救援</h3>
        <p>预先准备零配件，规划救援路径</p>
      </div>
      <div class="wrapper">
        <img src="../../../assets/images/solution/item4.png" alt="">
        <img src="../../../assets/images/solution/tip1.png" alt="" class="tip1">
        <img src="../../../assets/images/solution/tip2.png" alt="" class="tip2">
        <img src="../../../assets/images/solution/tip3.png" alt="" class="tip3">
      </div>
    </div>
    <div class="detection item">
      <div class="title">
        <h3>远程诊断</h3>
        <p>远程诊断车辆故障，第一时间处理故障</p>
      </div>
      <div class="wrapper">
        <div class="a1">
          <img src="../../../assets/images/solution/item5-1.png" alt="">
        </div>
        <div class="a2">
          <img class="b1" src="../../../assets/images/solution/item5-2.png" alt="">
          <div class="mask"></div>
          <img class="b2 vhc" src="../../../assets/images/solution/icon4.png" alt="">
        </div>
        <div class="a3">
          <img src="../../../assets/images/solution/item5-3.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Banner from 'components/banner';
export default {
  data () {
    return {
      banner: {
        bgImg: require('project-assets/images/solution/banner.jpg'),
        title: '经销/服务商车联网系统',
        text: '精准市场预测、准确库存管理、优化服务流程'
      }
    };
  },
  components: {
    Banner
  },
  metaInfo: {
    title: '解决方案-车联网数据开放平台'
  }
};
</script>
<style lang="scss" scoped>
.ba.banner {
  height: 550px !important;
  /deep/ .wrapper .txt-box {
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
}
.item {
  height: 720px;
  &:nth-child(odd) {
    background-color: #f7f7f8;
  }
  .title {
    padding-top: 50px;
    text-align: center;
    h3 {
      font-size: 40px;
      color: #333;
      line-height: 73px;
      height: 73px;
      background: url("../../../assets/images/solution/font-1.png") center
        center no-repeat;
    }
    p {
      margin-top: 15px;
      font-size: 14px;
      color: #666;
    }
  }
}
.forecast .wrapper {
  position: relative;
  height: 563px;
  background: url("../../../assets/images/solution/item1.png") 50px 60px
    no-repeat;
  .icons {
    position: absolute;
    top: 220px;
    right: 244px;
    & > div {
      float: left;
      margin: 0 60px;
      text-align: center;
      color: #fff;
      font-size: 12px;
    }
  }
}
.inventory {
  position: relative;
  .box {
    margin-left: 58px;
    width: 1072px;
    height: 480px;
    background-color: #fff;
    & > div {
      position: absolute;
    }
    .img {
      margin-left: -100px;
    }
    .title {
      padding-top: 0;
      width: 500px;
      right: 67px;
      top: 64px;
      h3 {
        background-image: url("../../../assets/images/solution/font-2.png");
      }
    }
  }
  .desc {
    top: 280px;
    right: 67px;
    & > div {
      float: left;
      margin: 0 50px;
      text-align: center;
      p {
        margin-top: 17px;
        color: #666;
        font-size: 16px;
      }
    }
  }
}
.service {
  .title>h3 {
    background-image: url("../../../assets/images/solution/font-3.png");
  }
  .wrapper {
    position: relative;
    &>img {
      margin-top: 50px;
    }
    .t {
      position: absolute;
      top: 117px;
      right: 92px;
      width: 400px;
      height: 286px;
      &>img {
        position: absolute;
        top: 31px;
        left: 26px;
      }
      &>.msg {
        position: absolute;
        top: 25px;
        left: 75px;
        padding: 16px;
        width: 158px;
        height: auto;
        border-radius: 6px;
        background-color: #F7F7F8;
        font-size: 10px;
        color: #666;
        transform: rotate(-3deg);
        &::before {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          top: 10px;
          left: -15px;
          border-width: 8px;
          border-color: transparent;
          border-style: solid;
          border-right-color: #F7F7F8;
        }
      }
      &>h6 {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 400px;
        height: 50px;
        line-height: 50px;
        font-size: 12px;
        color: #666;
        text-align: center;
      }
    }
  }
}
.rescue {
  .title h3 {
    background-image: url("../../../assets/images/solution/font-4.png");
  }
  .wrapper {
    width: 1373px;
    margin-top: 110px;
    position: relative;
    .tip1,
    .tip2,
    .tip3 {
      position: absolute;
    }
    .tip1 {
      top: 130px;
      left: 290px;
    }
    .tip2 {
      top: 30px;
      left: 590px;
    }
    .tip3 {
      top: 193px;
      left: 977px;
    }
  }
}
.detection {
  .title h3 {
    background-image: url("../../../assets/images/solution/font-5.png");
  }
  .wrapper {
    position: relative;
    & > div {
      position: absolute;
    }
    .a1 {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .a2 {
      top: 244px;
      left: 174px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid;
      .b1 {
        display: block;
        height: 100%;
      }
      .mask {
        position: absolute;
        top: 0;
        left: -50px;
        width: 100%;
        height: 100%;
        border-right: 1px solid rgba(68, 117, 253, 0.3);
        // background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(),#ffffff 100%);
        background: linear-gradient(
          90deg,
          rgba(123, 244, 253, 0),
          rgba(68, 117, 253, 0.3)
        );
        animation: saomiao 1.5s linear 0s infinite alternate;
      }
    }
    .a3 {
      top: 244px;
      left: 764px;
    }
  }
}
@keyframes saomiao {
  0% {
    left: -100%;
  }
  100% {
    left: 0;
  }
}
</style>
