<template>
  <div class="logistic">
    <Banner :bannerdata="bannerData"></Banner>
    <div class="logistic">
      <Title :title="title.logistic"></Title>
      <div class="main clearfix">
        <div class="fl">
          <h5>运输预警</h5>
          <div class="main1-sm">
            <img src="../../../assets/images/solution/logistic/main1.jpg" alt="">
          </div>
          <ul class="clearfix">
            <li>·起运未绑定</li>
            <li>·超时绑定</li>
            <li>·超时未起运</li>
            <li>·超时起运</li>
            <li>·超时未到达</li>
            <li>·超时到达</li>
            <li>·到达无轨迹</li>
            <li>·到达轨迹不全</li>
          </ul>
        </div>
        <div class="fr">
          <h5>实时预警</h5>
          <div class="main2-sm">
            <img src="../../../assets/images/solution/logistic/main2.jpg" alt="">
          </div>
          <ul class="clearfix">
            <li>·危险时段</li>
            <li>·油耗异常</li>
            <li>·设备断开</li>
            <li>·疲劳驾驶</li>
            <li>·超速运单</li>
            <li>·运力不足</li>
            <li>·在途无轨迹</li>
            <li>·轨迹不重合</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="result">
      <Title :title="title.result"></Title>
    </div>
    <div class="driver">
      <Title :title="title.driver"></Title>
      <div class="main">
        <img src="../../../assets/images/solution/logistic/main4.jpg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import Banner from 'components/banner';
import Title from 'components/cars/title/title';
import t1 from 'project-assets/images/solution/logistic/title1.png';
import t2 from 'project-assets/images/solution/logistic/title2.png';
import t3 from 'project-assets/images/solution/logistic/title3.png';
export default {
  data () {
    return {
      bannerData: {
        'bgImg': require('project-assets/images/solution/logistic/banner.jpg'),
        'h3': '物流管控',
        'p': '让物流运输过程透明，通过系统管控，实时预警+运输预警，提升物流运输整体质量 通过数据整合并依托大数据中心，开发覆盖贷前审核、贷后监控及风险处置全过程的金融服务车联网平台'
      },
      title: {
        logistic: {
          name: '',
          detail: '通过对运输过程和实时预警，对物流运输进行有效的监管和追溯',
          engImg: t1
        },
        result: {
          name: '',
          detail: '方便查询车辆历史轨迹和出发送达时间，并对运输进行综合评价',
          engImg: t2
        },
        driver: {
          name: '',
          detail: '监控司机是否合理合规驾驶运输车辆，给出相应的评分数据',
          engImg: t3
        }
      }
    };
  },
  components: {
    Banner,
    Title
  }
};
</script>
<style lang="scss" scoped>
.logistic {
  .main {
    height: 560px;
    margin-top: 40px;
    & > div {
      padding-top: 50px;
      height: 100%;
      width: 49.9%;
      background-color: #f5f5f5;
      text-align: center;
      h5 {
        font-size: 20px;
        color: #666;
      }
      & > div {
        margin: 35px auto;
        height: 300px;
        line-height: 300px;
        img {
          vertical-align: middle;
        }
      }
      ul {
        width: 560px;
        margin: 0 auto;
        li {
          float: left;
          width: 140px;
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #999;
          text-align: left;
        }
      }
    }
  }
}
.result {
  height: 600px;
  position: relative;
  background: url("../../../assets/images/solution/logistic/main3.jpg") center
    center no-repeat;
  background-size: cover;
  .cars-title {
    position: absolute;
    top: 220px;
    left: 25%;
    /deep/ p {
      color: #fff;
    }
  }
}
.driver {
  background-color: #f5f5f5;
  padding-bottom: 70px;
  .main {
    max-width: 1470px;
    height: auto;
    margin: auto;
    text-align: center;
    img {
      display: block;
      max-width: 100%;
    }
  }
}
</style>
