<template>
  <div class="finance">
    <Banner :bannerdata="bannerData"></Banner>
    <div class="advantage clearfix">
      <div class="adv1">
        <h5>客户图像分析</h5>
        <img src="../../../assets/images/solution/finance/adv1.png" alt="">
        <p class="mhide">分析客户驾驶、个人资信、还款等数据，对客户进行画像分析，把控金融风险。</p>
      </div>
      <div class="adv2">
        <h5>金融风险评估</h5>
        <img src="../../../assets/images/solution/finance/adv2.png" alt="">
        <p>根据车辆与客户信息数据分析，评估金融风险。</p>
      </div>
      <div class="adv3">
        <h5>远程控制车辆</h5>
        <img src="../../../assets/images/solution/finance/adv3.png" alt="">
        <p>发生金融风险，可远程锁定问题车辆。</p>
      </div>
      <div class="adv4">
        <h5>车辆运行监控</h5>
        <img src="../../../assets/images/solution/finance/adv4.png" alt="">
        <p>对车辆的实时监控判断车辆是否会产生金融风险。</p>
      </div>
      <div class="adv5">
        <h5>逾期车辆提醒</h5>
        <img src="../../../assets/images/solution/finance/adv5.png" alt="">
        <p>车辆离线超过3天，系统自动预警并生成评估报告。</p>
      </div>
    </div>
    <div class="lock-car">
      <Title :title="title.lock"></Title>
      <div class="main">
        <img src="../../../assets/images/solution/finance/main1.jpg" alt="">
      </div>
    </div>
    <div class="warning">
      <Title :title="title.warning"></Title>
      <div class="main clearfix">
        <div>
          <div class="img-box">
            <img src="../../../assets/images/solution/finance/main2-1.png" alt="">
          </div>
          <div class="txt txt1">
            <h6>数据来源</h6>
            <p>根据细分车型定义标准工况</p>
          </div>
        </div>
        <div class="arrow">
          <img src="../../../assets/images/solution/finance/main2-4.png" alt="">
        </div>
        <div>
          <div class="img-box">
            <img src="../../../assets/images/solution/finance/main2-2.png" alt="">
          </div>
          <div class="txt txt2">
            <h6>大数据分析</h6>
            <p>根据车辆运行大数据结合标准工况,系统自动生成工况预警风险</p>
          </div>
        </div>
        <div class="arrow">
          <img src="../../../assets/images/solution/finance/main2-4.png" alt="">
        </div>
        <div>
          <div class="img-box">
            <img src="../../../assets/images/solution/finance/main2-3.png" alt="">
          </div>
          <div class="txt txt3">
            <h6>精准推送</h6>
            <p>精准推送消息，业务人员重点关注</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Banner from 'components/banner';
import Title from 'components/cars/title/title';
import t1 from 'project-assets/images/solution/finance/title1.png';
import t2 from 'project-assets/images/solution/finance/title2.png';
export default {
  data () {
    return {
      bannerData: {
        'bgImg': require('project-assets/images/solution/finance/banner.jpg'),
        'h3': '汽车金融',
        'p': '车联网在金融环节应用，将提高客户违约成本，提升风险预判及处置能力，有效管控风险，实现风控模式转型。 通过数据整合并依托大数据中心，开发覆盖贷前审核、贷后监控及风险处置全过程的金融服务车联网平台'
      },
      title: {
        lock: {
          name: '',
          detail: '发生金融风险可远程锁车控车，具备发动机锁车控车能力，可以有效的控制金融风险',
          engImg: t1
        },
        warning: {
          name: '',
          detail: '根据不同车辆型号，设定不同工况、里程标准，通过对车辆的运行情况进行实时监控并且判断车辆是否会产生金融风险，推算用户是否具有还款能力，从而提早介入，降低可能的金融风险',
          engImg: t2
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
.advantage {
  & > div {
    float: left;
    width: 20%;
    height: 400px;
    box-sizing: border-box;
    border-right: 1px solid rgba(79, 141, 234, 0.2);
    text-align: center;
    padding-top: 70px;
    h5 {
      font-size: 18px;
      color: #333;
    }
    p {
      margin: auto;
      width: 70%;
      font-size: 14px;
      color: #999;
    }
    img {
      margin: 40px 0;
    }
  }
  & > div:last-child {
    border-right: none;
  }
}
.lock-car {
  padding-bottom: 90px;
  background-color: #f5f5f5;
  .main {
    margin-top: 60px;
    text-align: center;
  }
}
.warning {
  padding-bottom: 155px;
  .main {
    margin-top: 136px;
    width: 1050px;
    margin-left: auto;
    margin-right: auto;
    & > div {
      float: left;
      width: 250px;
      text-align: center;
      .img-box {
        height: 125px;
      }
      .txt {
        margin: 30px auto;
        h6 {
          margin-bottom: 10px;
          font-size: 20px;
          color: #403f3f;
        }
        p {
          line-height: 25px;
          font-size: 16px;
          color: #999;
        }
      }
    }
    .arrow {
      width: 150px;
    }
  }
}
</style>
