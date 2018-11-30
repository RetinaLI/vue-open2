<template>
  <div class="passenger">
    <Banner :bannerdata="bannerData" />
    <div class="control">
      <div class="wrap">
        <Title class="title" :title="title.control" />
        <div class="img">
          <img src="../../../assets/images/car/passenger/control-img.png" alt="">
        </div>
        <ul>
          <li v-for="(item,index) in controlData" :key="index">
            <img :src="item.controlImg" alt="">
          </li>
        </ul>
      </div>
    </div>
    <div class="audio">
      <div class="wrap">
        <Title class="title" :title="title.audio" />
        <div class="content">
          <ul class="clearfix">
            <li v-for="(item,index) in audioData" :key="index">
              <img class="vhc" :src="item.audioImg" alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="breakdown">
      <div class="wrap">
        <Title class="title" :title="title.breakdown" />
        <div class="content">
          <div class="img">
            <img src="../../../assets/images/car/passenger/breakdown-img.png" alt="">
          </div>
          <div class="solution location">
            <h5>快速定位问题</h5>
            <p>当用户出现问题时，可通过远程查看车辆上报故障信息，迅速诊断故障内容，快速给出解决方案，减少用户等待时间</p>
          </div>
          <div class="solution dispatch">
            <h5>高效派工服务</h5>
            <p>定位的问题发往就近服务站，并对服务人员提供故障信息及解决方案，为服务做好充分准备</p>
          </div>
        </div>
      </div>
    </div>
    <div class="upgrade">
      <div class="wrap">
        <Title class="title" :title="title.upgrade" />
        <div class="img vc">
          <img src="../../../assets/images/car/passenger/upgrade-img.png" alt="">
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Banner from 'components/banner';
import Title from 'components/cars/title/title';
import bannerImg from '@/assets/images/car/passenger/banner.jpg';

export default {
  data () {
    return {
      bannerData: {
        bgImg: bannerImg,
        title: '乘用车车联网平台',
        text: '福田汽车乘用车车联网平台，主要对福田旗下图雅诺、蒙派克、迦途的功能扩展提供联网功能， 为车辆提供更多人性化的功能服务，提升产品卖点'
      },
      title: {
        control: {
          name: '远程控制',
          detail: '通过手机APP远程查看车辆状态，远程启动车辆，控制车门窗空调等',
          engImg: require('project-assets/images/car/passenger/t1.png')
        },
        audio: {
          name: '影音娱乐',
          detail: '整合海量影音娱乐内容，语音控制播放，令您的驾驶生活更丰富',
          engImg: require('project-assets/images/car/passenger/t2.png')
        },
        breakdown: {
          name: '故障诊断',
          detail: '远程诊断当前车辆故障，提升服务效率，小问题远程修复，大问题快速派工',
          engImg: require('project-assets/images/car/passenger/t3.png')
        },
        upgrade: {
          name: '远程升级',
          detail: '车辆配置、车载系统定期静默升级服务，为您无形提升使用体验',
          engImg: require('project-assets/images/car/passenger/t4.png')
        }
      },
      controlData: [
        {controlImg: require('project-assets/images/car/passenger/control1.png')},
        {controlImg: require('project-assets/images/car/passenger/control2.png')},
        {controlImg: require('project-assets/images/car/passenger/control3.png')},
        {controlImg: require('project-assets/images/car/passenger/control4.png')}
      ],
      audioData: [
        {audioImg: require('project-assets/images/car/passenger/audio1.png')},
        {audioImg: require('project-assets/images/car/passenger/audio2.png')},
        {audioImg: require('project-assets/images/car/passenger/audio3.png')},
        {audioImg: require('project-assets/images/car/passenger/audio4.png')}
      ]
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
  .wrap {
    position: relative;
    height: 100%;
  }
  .control {
    height: 620px;
    .title{
      padding: 61px 0 66px;
      /deep/ h3 {
        margin: auto;
        width: 331px;
        height: 93px;
        line-height: 93px;
      }
      /deep/ p {
        padding-top: 0;
      }
    }
    .img {
      margin-left: 229px;
    }
    ul {
      position: absolute;
      left: 791px;
      top: 258px;
      li {
        margin-bottom: 30px;
      }
    }
  }
  .audio {
    height: 620px;
    background-color: #F7F7F8;
    .title{
      padding: 68px 0 130px;
      /deep/ h3 {
        margin: auto;
        width: 590px;
        height: 93px;
        line-height: 93px;
      }
      /deep/ p {
        padding-top: 0;
      }
    }
    ul {
      padding: 0 112px;
      li {
        position: relative;
        float: left;
        margin-right: 105px;
        width: 160px;
        height: 160px;
        border-radius: 8px;
        &:nth-child(1) {
          background: -webkit-linear-gradient(#FFDF8B, #FFBC53);
          background: -moz-linear-gradient(#FFDF8B, #FFBC53);
          background: linear-gradient(#FFDF8B, #FFBC53);
        }
        &:nth-child(2) {
          background: -webkit-linear-gradient(#FBA5A5, #F56C6C);
          background: -moz-linear-gradient(#FBA5A5, #F56C6C);
          background: linear-gradient(#FBA5A5, #F56C6C);
        }
        &:nth-child(3) {
          background: -webkit-linear-gradient(#00F1C9, #00DE98);
          background: -moz-linear-gradient(#00F1C9, #00DE98);
          background: linear-gradient(#00F1C9, #00DE98);
        }
        &:last-child {
          margin-right: 0;
          background: -webkit-linear-gradient(#87C4FF, #4F91FF);
          background: -moz-linear-gradient(#87C4FF, #4F91FF);
          background: linear-gradient(#87C4FF, #4F91FF);
        }
      }
    }
  }
  .breakdown {
    height: 720px;
    .title{
      padding: 73px 0 60px;
      /deep/ h3 {
        width: 461px;
        margin: auto;
        height: 93px;
        line-height: 93px;
      }
      /deep/ p {
        padding-top: 1px;
      }
    }
    .content > div {
      position: absolute;
      &.img {
        left: 34px;
        top: 297px;
      }
      &.solution {
        position: absolute;
        left: 511px;
        width: 586px;
        height: 90px;
        padding-left: 118px;
        h5 {
          padding: 17px 0 11px;
          line-height: 16px;
          font-size: 16px;
          color: #333;
          font-family:SourceHanSansCN-Medium;
          font-weight:500;
        }
        p {
          font-size: 14px;
          color: #aaa;
          line-height: 20px;
        }
        &.location {
          top: 343px;
          background: url(../../../assets/images/car/passenger/solution1.png) 0 center no-repeat;
        }
        &.dispatch {
          top: 476px;
          background: url(../../../assets/images/car/passenger/solution2.png) 0 center no-repeat;
        }
      }
    }
  }
  .upgrade {
    height: 520px;
    background-color: #F7F7F8;
    .title{
      padding: 203px 0 60px;
      margin-left: 86px;
      width: 448px;
      /deep/ h3 {
        height: 96px;
        line-height: 96px;
      }
      /deep/ p {
        padding-top: 0;
      }
    }
    .img {
      position: absolute;
      left: 703px;
    }
  }

</style>
