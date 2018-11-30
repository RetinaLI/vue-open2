<template>
  <div class="bus">
    <Banner :bannerdata="bannerData" />
    <div class="monitor">
      <Title :title="title.monitor" />
      <div class="wrap">
        <div class="t1">
          <h6>车内监控</h6>
          <p>车内司机动态和车上人员动态监控</p>
        </div>
        <div class="t2">
          <h6>车外监控</h6>
          <p>车外环境和行驶道路状态监控</p>
        </div>
      </div>
    </div>
    <div class="operation">
      <Title :title="title.operation" />
      <div class="wrap">
        <div class="green">
          <div class="circle"></div>
        </div>
        <div class="yellow">
          <div class="circle"></div>
        </div>
      </div>
    </div>
    <div class="fatioue">
      <Title :title="title.fatioue" />
      <div class="wrap">
        <div class="tip">
          <h6>实时报警提醒</h6>
          <p>识别司机疲劳状态，持续发出报警音，语音提醒司机靠边休息</p>
        </div>
        <div class="push">
          <h6>推送至管理端</h6>
          <p>推送短信和消息通知管理端，疲劳驾驶的车辆的位置及相关信息</p>
        </div>
      </div>
    </div>
    <div class="analyze">
      <Title :title="title.analyze" />
      <div class="wrap">
        <div class="content">
          <div class="data">
            <h6>数据监控</h6>
            <p class="line"></p>
            <p class="txt">运行、视频、位置全方位监控，车辆发生故障时，平台提示车辆出现的故障内容及所在位置，便于调度处理</p>
          </div>
          <div class="car">
            <h6>车辆画像</h6>
            <p class="line"></p>
            <p class="txt">通过大数据分析,从天气、温度、海拔、位置等多维度对车辆的运行特性进行分析，精准定位车辆用途</p>
          </div>
          <div class="report">
            <h6>行车报告</h6>
            <p class="line"></p>
            <p class="txt">对车辆行驶车速、里程、时长、油耗和驾驶行为等进行分析统计，为司机驾驶提供修正建议</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Banner from 'components/banner';
import Title from 'components/cars/title/title';
import BannerImg from 'project-assets/images/car/bus/banner.jpg';
import title1 from 'project-assets/images/car/bus/t1.png';
import title2 from 'project-assets/images/car/bus/t2.png';
import title3 from 'project-assets/images/car/bus/t3.png';
import title4 from 'project-assets/images/car/bus/t4.png';
export default {
  data () {
    return {
      bannerData: {
        bgImg: BannerImg,
        title: '客车车联网平台',
        text: '福田汽车客车车联网平台，主要对欧辉客车的车载视频和车辆数据进行功能开发和数据分析，为指导司机安全驾驶和最大化降低运营成本提供帮助'
      },
      title: {
        monitor: {
          name: '视频监控',
          detail: '利用媒体流实时存储播放车内外视频监控录像，监控司机工作状态，保证行车安全',
          engImg: title1
        },
        operation: {
          name: '运营调度',
          detail: '大数据分析车辆运行状态，通过车辆场景智能调动车辆运营',
          engImg: title2
        },
        fatioue: {
          name: '疲劳驾驶',
          detail: '识别面部特征，疲劳驾驶报警提醒，远程告知管理端，杜绝潜在危险',
          engImg: title3
        },
        analyze: {
          name: '运营分析',
          detail: '分析车辆经常行驶区域、油耗、速度、单次里程、载客人数等数据，为合理化分配车辆提供依据',
          engImg: title4
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
.monitor {
  height: 620px;
  .wrap {
    position: relative;
    height: 400px;
    background: url(../../../assets/images/car/bus/part1.png) center 13px
      no-repeat;
    & > div {
      position: absolute;
      bottom: 146px;
      left: 200px;
      padding: 8px 16px;
      width: 216px;
      height: 56px;
      color: #666;
      background-color: #f7f7f8;
      box-sizing: border-box;
      &.t2 {
        width: 200px;
        bottom: 244px;
        left: 780px;
      }
      h6 {
        font-size: 12px;
        font-weight: bold;
        line-height: 23px;
      }
      p {
        font-size: 12px;
      }
    }
  }
}
.operation {
  height: 720px;
  background-color: #f7f7f8;
  .wrap {
    position: relative;
    height: 500px;
    background: url(../../../assets/images/car/bus/part2.png) center 13px no-repeat;
    & > div {
      position: absolute;
      bottom: 205px;
      left: 350px;
      width: 135px;
      padding-top: 35px;
      background: url(../../../assets/images/car/bus/image-2.2.png) center 0 no-repeat;
      .circle {
        margin: 20px auto 0;
        position: relative;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #4475fd;
        /* box-shadow: 0 0 0 10px rgba(68, 117, 253, 0.3),
          0 0 0 20px rgba(68, 117, 253, 0.13); */
        animation: waveSmall 2s ease 0s infinite;
      }
      &.yellow {
        left: 750px;
        bottom: 320px;
        background: url(../../../assets/images/car/bus/image-2.3.png) center 0 no-repeat;
        .circle {
          animation: waveSmall 1.5s ease 0s infinite;
        }
      }
    }
  }
}
.fatioue {
  height: 620px;
  .wrap {
    position: relative;
    height: 400px;
    background: url(../../../assets/images/car/bus/image-3.1.png) 208px 40px no-repeat;
    & > div {
      position: absolute;
      bottom: 244px;
      left: 487px;
      height: 91px;
      padding-left: 132px;
      padding-top: 15px;
      background-position: 10px center;
      background-repeat: no-repeat;
      background-image: url(../../../assets/images/car/bus/icon-3.1.png);
      &.push {
        bottom: 118px;
        background-image: url(../../../assets/images/car/bus/icon-3.2.png);
      }
      h6 {
        font-size: 16px;
        color: #333;
        line-height: 34px;
      }
      p {
        font-size: 14px;
        color: #aaa;
      }
    }
  }
}
.analyze {
  height: 620px;
  background-color: #f7f7f8;
  .content {
    width: 100%;
    height: 357px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    background-color: #fff;
    & > div {
      flex: 1;
      border-right: 1px solid #ddd;
      padding-top: 193px;
      text-align: center;
      &.data {
        background: url(../../../assets/images/car/bus/icon-4.1.png) center 56px no-repeat;
      }
      &.car {
        background: url(../../../assets/images/car/bus/icon-4.2.png) center 34px no-repeat;
      }
      &.report {
        border-right: none;
        background: url(../../../assets/images/car/bus/icon-4.3.png) center 54px no-repeat;
      }
      h6 {
        font-size: 16px;
        color: #4475fd;
      }
      p.line {
        margin: 21px auto 13px;
        width: 17px;
        height: 4px;
        background-color: #d5d5d5;
      }
      p.txt {
        width: 212px;
        margin: auto;
        font-size: 12px;
        color: #aaa;
      }
    }
  }
}

@keyframes waveSmall {
  0% {
    box-shadow: 0 0 0 1px rgba(68, 117, 253, 0.3),
      0 0 0 1px rgba(68, 117, 253, 0.13);
  }
  100% {
    box-shadow: 0 0 0 10px rgba(68, 117, 253, 0.3),
      0 0 0 20px rgba(68, 117, 253, 0.13);
  }
}
@keyframes waveBig {
  0% {
    box-shadow: 0 0 0 1px rgba(68, 117, 253, 0.3),
      0 0 0 1px rgba(68, 117, 253, 0.13);
  }
  100% {
    box-shadow: 0 0 0 14px rgba(68, 117, 253, 0.3),
      0 0 0 26px rgba(68, 117, 253, 0.13);
  }
}
</style>
