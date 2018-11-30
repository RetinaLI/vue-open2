<template>
  <div class="energy">
    <Banner :bannerdata="bannerData" />
    <div class="run_analysis">
      <div class="wrap">
        <div class="img vc">
          <img :src="imgs.part1" alt="">
          <img :src="imgs.part1LabelGreen" v-reveal="revealData" alt="" class="label label-green">
          <img :src="imgs.part1LabelBlue" v-reveal="revealData" alt="" class="label label-blue">
          <img :src="imgs.part1LabelYellow" v-reveal="revealData" alt="" class="label label-yellow">
        </div>
        <Title class="title" :title="title.runAnalysis" />
      </div>
    </div>
    <div class="battery">
      <div class="wrap">
        <Title class="title" :title="title.battery" />
        <div class="content">
          <div class="top-img hc">
            <img src="../../../assets/images/car/energy/part2_1.png" alt="">
          </div>
          <div class="line hc">
            <img src="../../../assets/images/car/energy/part2_2.png" alt="">
          </div>
          <div class="bottom-img hc">
            <div class="item1">
              <img src="../../../assets/images/car/energy/part2_3.png" alt="">
              <p>电量</p>
            </div>
            <div class="item2">
              <img src="../../../assets/images/car/energy/part2_4.png" alt="">
              <p>电压</p>
            </div>
            <div class="item3">
              <img src="../../../assets/images/car/energy/part2_5.png" alt="">
              <p>电流</p>
            </div>
            <div class="item4">
              <img src="../../../assets/images/car/energy/part2_6.png" alt="">
              <p>温度</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="real-time-processing">
      <div class="wrap">
        <Title class="title" :title="title.realTime"></Title>
        <div class="content">
          <div class="img">
            <img src="../../../assets/images/car/energy/part3_1.png" alt="">
          </div>
          <div class="risk high-risk">
            <h5>低风险问题远程处理</h5>
            <p>当车辆发生低风险问题时，可通过车联网平台远程进行解决，减少用户前往服务站进行检查浪费时间</p>
          </div>
          <div class="risk low-risk">
            <h5>高风险故障主动呼叫</h5>
            <p>当车辆发生高风险问题时，呼叫中心会主动联系车主，就近停车，等待服务站人员前往救援</p>
          </div>
        </div>
      </div>
    </div>
    <div class="standard-date">
      <div class="wrap">
        <Title class="title" :title="title.standardDate"></Title>
        <div class="content">
          <div class="img hc">
            <img src="../../../assets/images/car/energy/part4_1.png" alt="">
          </div>
          <p class="label green l1" v-reveal="revealData">电机</p>
          <p class="label green l2" v-reveal="revealData">电池</p>
          <p class="label green l3" v-reveal="revealData">...</p>
          <p class="label yellow l4" v-reveal="revealData">整车</p>
          <p class="label yellow l5" v-reveal="revealData">位置</p>
          <p class="label yellow l6" v-reveal="revealData">报警</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Banner from 'components/banner';
import Title from 'components/cars/title/title';
import bannerImg from 'project-assets/images/car/energy/banner.jpg';
import part1 from 'project-assets/images/car/energy/part1_1.png';
import title1 from 'project-assets/images/car/energy/t1.png';
import title2 from 'project-assets/images/car/energy/t2.png';
import title3 from 'project-assets/images/car/energy/t3.png';
import title4 from 'project-assets/images/car/energy/t4.png';
import part1LabelBlue from 'project-assets/images/car/energy/label-blue.png';
import part1LabelGreen from 'project-assets/images/car/energy/label-green.png';
import part1LabelYellow from 'project-assets/images/car/energy/label-yellow.png';
export default {
  data () {
    return {
      revealData: {
        delay: 200,
        origin: 'bottom',
        offset: '40px'
      },
      imgs: {
        part1,
        part1LabelBlue,
        part1LabelGreen,
        part1LabelYellow
      },
      bannerData: {
        bgImg: bannerImg,
        title: '新能源车联网平台',
        text: '福田汽车新能源车联网平台，主要对欧辉、欧马可、奥铃等福田体系新能源车辆，除满足法规要求完成与国家、地方国标数据对接外，还进一步分析车辆运行数据，监控电池、故障数据并及时进行处理'
      },
      title: {
        runAnalysis: {
          name: '运行分析',
          detail: '通过车辆充电、耗电、停留、运行的速度、区域、里程等数据信息，分析车辆在日常运营的整体情况和特殊情况',
          engImg: title1
        },
        battery: {
          name: '电池监控',
          detail: '监测车辆电池组各块电池的电压、电流、温度情况，保证电池正常安全使用，降低车辆因电池产生的安全性问题',
          engImg: title2
        },
        realTime: {
          name: '实时故障',
          detail: '车辆故障实时上报，对紧急故障提供信息提醒和主动呼叫服务，一般故障提供远程诊断、处理服务，减少用户等待时间',
          engImg: title3
        },
        standardDate: {
          name: '国际数据对接',
          detail: '满足法规数据要求，对国家及地方新能源监管平台提供车辆实时准确数据',
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
.banner {
  /deep/ .txt-box {
    top: 360px;
  }
}
.run_analysis {
  height: 640px;
  .img {
    left: 140px;
    .label {
      position: absolute;
      &.label-green {
        top: -35px;
        left: -20px;
      }
      &.label-blue {
        top: 70px;
        left: -75px;
      }
      &.label-yellow {
        top: 65px;
        left: 15px;
      }
    }
  }
  .title {
    position: absolute;
    top: 160px;
    left: 570px;
    width: 512px;
    /deep/ {
      h3 {
        height: 93px;
        line-height: 93px;
      }
    }
  }
}
.battery {
  height: 720px;
  background-color: #f7f7f8;
  .title {
    /deep/ h3 {
      margin: auto;
      width: 379px;
      height: 117px;
      line-height: 117px;
    }
  }
  .content > div {
    position: absolute;
    &.top-img {
      top: 265px;
    }
    &.line {
      top: 355px;
    }
    &.bottom-img {
      top: 455px;
      width: 1054px;
      height: 160px;
      & > div {
        position: absolute;
        top: 0;
        width: 160px;
        height: 160px;
        background-color: #fff;
        text-align: center;
        p {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 14px;
          color: #666;
          font-size: 12px;
        }
        &.item1 {
          left: 8px;
          img {
            margin-top: 43px;
          }
        }
        &.item2 {
          left: 300px;
          img {
            margin-top: 42px;
          }
        }
        &.item3 {
          left: 597px;
          img {
            margin-top: 36px;
          }
        }
        &.item4 {
          left: 892px;
          img {
            margin-top: 31px;
          }
        }
      }
    }
  }
}
.real-time-processing {
  height: 720px;
  .title {
    padding-top: 83px;
    /deep/ h3 {
      margin: auto;
      width: 641px;
    }
  }
  .content > div {
    position: absolute;
    &.img {
      left: 60px;
      top: 314px;
    }
    &.risk {
      position: absolute;
      width: 600px;
      left: 528px;
      height: 90px;
      padding-left: 110px;
      h5 {
        padding: 10px 0;
        font-size: 16px;
        color: #333;
      }
      p {
        font-size: 14px;
        color: #aaa;
      }
      &.high-risk {
        top: 337px;
        background: url(../../../assets/images/car/energy/part3_2.png) 0 center
          no-repeat;
      }
      &.low-risk {
        top: 470px;
        background: url(../../../assets/images/car/energy/part3_3.png) 0 center
          no-repeat;
      }
    }
  }
}
.standard-date {
  height: 620px;
  background-color: #f7f7f8;
  .title {
    margin: auto;
    width: 596px;
    /deep/ {
      h3 {
        height: 93px;
        line-height: 93px;
      }
    }
  }
  .content {
    .img {
      top: 253px;
    }
    .label {
      position: absolute;
      width: 64px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      &.green {
        background: url(../../../assets/images/car/energy/part4_2.png) center
          center no-repeat;
      }
      &.yellow {
        background: url(../../../assets/images/car/energy/part4_3.png) center
          center no-repeat;
      }
      &.l1 {
        top: 319px;
        left: 196px;
      }
      &.l2 {
        top: 335px;
        left: 869px;
      }
      &.l3 {
        top: 420px;
        left: 837px;
      }
      &.l4 {
        top: 406px;
        left: 318px;
      }
      &.l5 {
        top: 468px;
        left: 233px;
      }
      &.l6 {
        top: 484px;
        left: 883px;
      }
    }
  }
}
.wrap {
  position: relative;
  height: 100%;
}
</style>
