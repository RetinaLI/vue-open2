<template>
  <div class="manage">
    <Banner :bannerdata="bannerData"></Banner>
    <el-carousel :interval="4000" height="800px" arrow="never">
      <el-carousel-item v-for="(item, index) in carouselImg" :key="index">
        <Title :title="carouselTitle[index]"></Title>
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
    <div class="cost">
      <Title :title="costTitle"></Title>
      <div class="main clearfix">
        <div class="item1">
          <img src="../../../assets/images/solution/manage/icon1.png" alt="">
          <h5>驾驶行为管理</h5>
          <p>通过实时获取发动机数据，如刹车、怠速、超速、 加速等，来量化的监控司机驾驶行为，进而来管理和提升司机的驾驶技能，进而降低油耗。
          </p>
        </div>
        <div class="item2">
          <img src="../../../assets/images/solution/manage/icon2.png" alt="">
          <h5>线路油耗管理</h5>
          <p>大数据智能分析生成，贴近实际业务的任务维度管 理方式，以自动化、数据化的方式降低油耗成本。
          </p>
        </div>
        <div class="item3">
          <img src="../../../assets/images/solution/manage/icon3.png" alt="">
          <h5>数据分析&amp;报告</h5>
          <p>将平台车辆运行的数据进行有效的整合、分析； 快速准确的提供有价值的可视化的分析报告； 准确高效定位异常问题，进而为管理层提供决策依据。
          </p>
        </div>
      </div>
    </div>
    <div class="safe">
      <Title :title="safetyTitle"></Title>
      <div class="main">
        <div class="list hc clearfix">
          <div class="clearfix current big">
            <div class="fl img">
              <img src="../../../assets/images/solution/manage/danger.jpg" alt="">
            </div>
            <div class="txt txt1 fr">
              <h5>智能风险预警</h5>
              <p>
                <span>预警事件：</span>车距过近、车道偏离、前碰撞报警；</p>
              <p>
                <span>车辆事件：</span>超速、急刹车、急加速、弯道超速、紧急事件；</p>
              <p>
                <span>司机事件：</span>闭眼、打电话、抽烟、打哈欠、脱离监控、注意力分散；</p>
            </div>
          </div>
          <div class="clearfix big">
            <div class="fl img">
              <img src="../../../assets/images/solution/manage/safe.jpg" alt="">
            </div>
            <div class="txt txt2 fl">
              <h5>安全管理看板</h5>
              <p>3G视频监控、实施安全管理看板，对行驶的</p>
              <p>数据进行分析评估，提前防范安全风险</p>
            </div>
          </div>
          <div class="clearfix big">
            <div class="fl img">
              <img src="../../../assets/images/solution/manage/mobile.jpg" alt="">
            </div>
            <div class="txt txt3 fl">
              <h5>手机同步干预</h5>
              <p>车辆处于高风险状态时，微信公众号实时推送报警提醒，</p>
              <p>可瞬间微信转发或打电话提醒司机。</p>
            </div>
          </div>
          <div class="danger-sm small active">
            <img class="no-grey" src="../../../assets/images/solution/manage/danger-icon.png" alt="">
            <img class="grey" src="../../../assets/images/solution/manage/danger-icon-grey.png" alt="">
            <p>智能风险预警</p>
          </div>
          <div class="safe-sm small">
            <img class="no-grey" src="../../../assets/images/solution/manage/safe-icon.png" alt="">
            <img class="grey" src="../../../assets/images/solution/manage/safe-icon-grey.png" alt="">
            <p>安全管理看板</p>
          </div>
          <div class="mobile-sm small">
            <img class="no-grey" src="../../../assets/images/solution/manage/mobile-icon.png" alt="">
            <img class="grey" src="../../../assets/images/solution/manage/mobile-icon-grey.png" alt="">
            <p>手机同步干预</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import Banner from 'components/banner';
import Title from 'components/cars/title/title';
import t1 from 'project-assets/images/solution/manage/title1.png';
import t2 from 'project-assets/images/solution/manage/title2.png';
import t3 from 'project-assets/images/solution/manage/title3.png';
import t4 from 'project-assets/images/solution/manage/title4.png';
import t5 from 'project-assets/images/solution/manage/title5.png';
export default {
  data () {
    return {
      bannerData: {
        'bgImg': require('project-assets/images/solution/manage/banner.jpg'),
        'h3': '车队管理',
        'p': '车队管理可以帮助企业在成本管理、安全管理上对物流、司机进行有效的管控，从而提升物流效率并且最大化收益'
      },
      carouselTitle: [
        {
          name: '',
          detail: '运输途中实时任务监控、异常信息自动报警灯8大业务场景感知自动化和财务结算自动化',
          engImg: t1
        },
        {
          name: '',
          detail: '定位、轨迹回放、车辆状态信息推动、车辆效率统计等',
          engImg: t2
        },
        {
          name: '',
          detail: '车辆实时使用情况、车辆诊断、跟踪评价、车辆保养、加油记录、服务商查询、服务调度、客服热线等',
          engImg: t3
        }
      ],
      carouselImg: [
        require('project-assets/images/solution/manage/main1.jpg'),
        require('project-assets/images/solution/manage/main2.jpg'),
        require('project-assets/images/solution/manage/main3.jpg')
      ],
      costTitle: {
        name: '',
        detail: '耗油成本管理（驾驶行为管理、路线油耗）、维修保养等',
        engImg: t4
      },
      safetyTitle: {
        name: '',
        detail: '3G视频监控、实施安全管理看板',
        engImg: t5
      }
    };
  },
  methods: {
    safePartCurrent () {
      $('.safe .small').on('mouseover', function () {
        let $this = $(this);
        let i = $this.index() - 3;
        let currentBig = $('.safe .big').eq(i);
        $this.addClass('active').siblings().removeClass('active');
        currentBig.addClass('current').siblings().removeClass('current');
      });
    }
  },
  components: {
    Banner,
    Title
  },
  mounted () {
    this.safePartCurrent();
  }
};
</script>
<style lang="scss" scoped>
.el-carousel /deep/ {
  .el-carousel__item {
    text-align: center;
  }
  .el-carousel__button {
    background-color: #3598e9 !important;
  }
  .el-carousel__indicators {
    bottom: 30px;
  }
}
.cost {
  height: 540px;
  background-color: #f5f5f5;
  .main {
    margin: 50px auto 0;
    width: 1100px;
    & > div {
      float: left;
      width: 360px;
      padding: 0 20px;
      text-align: center;
      h5 {
        margin: 10px 0;
        font-size: 16px;
        color: #333;
        font-weight: bold;
      }
      p {
        line-height: 25px;
        font-size: 14px;
        color: #333;
      }
    }
  }
}
.safe {
  height: 848px;
  .main {
    width: 1030px;
    margin: 60px auto 0;
    position: relative;

    .list {
      position: absolute;
      top: 370px;
      width: 100%;
      .small {
        float: left;
        width: 85px;
        height: 80px;
        margin: 0 50px;
        position: relative;
        img {
          position: absolute;
          top: 0;
          left: 0;
          background-color: #fff;
        }
        .grey {
          z-index: 2;
        }
        .no-grey {
          z-index: 1;
        }
        p {
          position: absolute;
          font-size: 14px;
          color: #999;
          bottom: -25px;
          left: 0;
        }
        &.danger-sm {
          margin-left: 285px;
        }
      }
      .big {
        width: 100%;
        height: 400px;
        position: absolute;
        top: -440px;
        display: none;
        div {
          width: 50%;
        }
        .img {
          text-align: center;
        }
        .txt {
          padding-top: 110px;
          padding-left: 45px;
          h5 {
            margin: 15px 0;
            font-size: 20px;
            color: #2f76df;
          }
          p {
            font-size: 14px;
            color: #333;
            span {
              font-size: 14px;
              color: #333;
              font-weight: bolder;
              line-height: 25px;
            }
          }
        }
        &.current {
          display: block!important;
        }
      }

      .active {
        .no-grey {
          z-index: 2;
        }
        .grey {
          z-index: 1;
        }
        p {
          color: #2f76df;
        }
      }
    }
  }
}
</style>
