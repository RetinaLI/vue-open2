<template>
  <div class="mechanics">
    <Banner :bannerdata="bannerData" />
    <div class="server">
      <div class="wrap">
        <Title class="title" :title="title.active_server" />
        <div class="content">
          <template>
            <el-carousel trigger="click" height="240px" arrow="always" width="492px">
              <el-carousel-item v-for="(item,index) in serverData" :key="index">
                <div class="server_item">
                  <div class="img">
                    <img :src="item.serveImg" alt="">
                  </div>
                  <div class="server_right">
                    <div class="server_title">{{item.serveTitle}}</div>
                    <div class="info">{{item.serveInfo}}</div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </template>
        </div>
      </div>
    </div>
    <div class="work">
      <div class="wrap">
        <Title class="title" :title="title.work" />
        <div class="content">
          <template>
            <el-carousel :interval="3000" type="card" height="350px" indicator-position="none">
              <el-carousel-item v-for="(item,index) in workData" :key="index">
                <div class="work_item">
                  <img :src="item.workImg" alt="">
                </div>
              </el-carousel-item>
            </el-carousel>
          </template>
        </div>
      </div>
    </div>
    <div class="condition">
      <div class="wrap">
        <div class="img">
          <img src="../../../assets/images/car/mechanics/condition_icon.png" alt="">
        </div>
        <div class="content">
          <Title class="title" :title="title.condition" />
          <ul>
            <li v-for="(item,index) in conditionData" :key="index">
              <span class="line"></span>
              <i class="vc"></i><strong><b>{{item.num}}&nbsp;</b>项</strong> <span>{{item.info}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="configuration">
      <div class="wrap">
        <Title class="title" :title="title.configuration" />
        <div class="content">
          <div class="left">
            <img src="../../../assets/images/car/mechanics/config1.png" alt="">
            <div class="arrow" v-reveal="leftData">
              <img src="../../../assets/images/car/mechanics/config_arrow_right.png" alt="">
            </div>
          </div>
          <div class="right">
            <div class="arrow" v-reveal="rightData">
              <img src="../../../assets/images/car/mechanics/config_arrow_left.png" alt="">
            </div>
            <img src="../../../assets/images/car/mechanics/config2.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Banner from 'components/banner';
import Title from 'components/cars/title/title';
import bannerImg from '@/assets/images/car/mechanics/banner.jpg';

export default {
  data () {
    return {
      leftData: {
        delay: 200,
        origin: 'left',
        offset: '70px'
      },
      rightData: {
        delay: 200,
        origin: 'right',
        offset: '70px'
      },
      bannerData: {
        bgImg: bannerImg,
        title: '工程机械车联网平台',
        text: '福田汽车工程机械车联网平台，主要对雷萨搅拌车、起重机、泵车车型的底盘数据和上装机械数据进行数据监控，为产品改进提供数据依据，针对车辆使用的特殊性，对车辆参数进行远程设置从而达到更加适用场景的工况设置'
      },
      title: {
        active_server: {
          name: '主动服务',
          detail: '车况数据实时监测，智能预判故障等级，主动服务用户，减少用户等待时间',
          engImg: require('project-assets/images/car/mechanics/t1.png')
        },
        work: {
          name: '工作监控',
          detail: '远程监控工程机械车辆工作状态，对车主提供车内视频、车辆状况、车外环境等监控内容',
          engImg: require('project-assets/images/car/mechanics/t2.png')
        },
        condition: {
          name: '工况分析',
          detail: '分析工程机械的工况数据，对工作油耗、时长、承受力进行有限元分析，改进产品适应能力',
          engImg: require('project-assets/images/car/mechanics/t3.png')
        },
        configuration: {
          name: '远程配置',
          detail: '远程监控工程机械运行环境，智能配置上装参数，提升机械运行性能、提高工作效率',
          engImg: require('project-assets/images/car/mechanics/t4.png')
        }
      },
      serverData: [
        {
          serveImg: require('project-assets/images/car/mechanics/serve1.png'),
          serveTitle: '故障预知',
          serveInfo: '通过车联网平台实时采集车辆故障数据（DTC），结合车联网平台故障数据库以及处理方式，有效识别故障严重程度，为客户提供故障提醒及主动服务，完成故障码采集，实现故障诊断功能'
        },
        {
          serveImg: require('project-assets/images/car/mechanics/serve2.png'),
          serveTitle: '精准救援',
          serveInfo: '基于车联网车辆定位信息，选取周边服务商就近派工，通过服务商APP中车辆位置实现服务商精准救援'
        },
        {
          serveImg: require('project-assets/images/car/mechanics/serve3.png'),
          serveTitle: '提升体验',
          serveInfo: '通过车联网智能救援体系，客户救援平均时长缩短近30分钟，救援效率提升近25%'
        }
      ],
      workData: [
        {workImg: require('project-assets/images/car/mechanics/work1.png')},
        {workImg: require('project-assets/images/car/mechanics/work2.png')},
        {workImg: require('project-assets/images/car/mechanics/work3.png')}
      ],
      conditionData: [
        {
          num: 14,
          info: '燃油消耗数据'
        },
        {
          num: 23,
          info: '上装数据'
        },
        {
          num: 4,
          info: '里程数据'
        }
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
  .server {
    height: 580px;
    .title{
      padding: 67px 0 83px;
      /deep/ h3 {
        width: 553px;
        margin: auto;
        height: 93px;
        line-height: 93px;
      }
      /deep/ p {
        padding-top: 0;
      }
    }
    .content {
      width: 884px;
      margin: auto;
      /deep/ .el-carousel__container {
        .el-carousel__arrow {
          height: 32px;
          width: 32px;
          background-color: #fff;
          color: #4475FD;
          border: 1px solid #4475FD;
          top: 75%;
        }
        .el-carousel__arrow--right {
          right: 45%;
        }
        .el-carousel__arrow--left {
          left: 45%;
        }
      }
      .server_item > div {
        position: absolute;
        &.img {
          width: 391px;
          height: 204px;
          line-height: 204px;
          text-align: center;
          margin-right: 5px;
          img {
            vertical-align: middle;
          }
        }
        &.server_right {
          width: 488px;
          right: 0;
          .server_title {
            color: #4475FD;
            line-height: 25px;
            font-size: 18px;
            margin-bottom: 20px;
          }
          .info {
            color: #666;
            line-height: 32px;
            font-size: 16px;
          }
        }
      }
    }
  }
  .work {
    height: 720px;
    background-color: #F7F7F8;
    .title{
       padding: 63px 0 60px;
      /deep/ h3 {
        width: 269px;
        margin: auto;
        height: 98px;
        line-height: 98px;
      }
      /deep/ p {
        padding-top: 0;
      }
    }
  }
  .condition {
    height: 620px;
    .img {
      position: absolute;
      left: 160px;
      top: 105px;
    }
    .content {
      position: absolute;
      top: 108px;
      right: 100px;
      width: 472px;
      .title {
        padding: 0 0 69px;
        /deep/ h3 {
          width: 288px;
          height: 70px;
          line-height: 70px;
        }
        /deep/ p {
          text-align: left;
          padding-top: 7px;
        }
      }
      ul li {
        position: relative;
        margin-bottom: 34px;
        font-size: 14px;
        color: #333;
        .line {
          position: absolute;
          left: 5px;
          top: 29px;
          display: inline-block;
          height: 72px;
          width: 1px;
          background-color: #4475FD;
        }
        &:last-child .line {
          display: none;
        }
        i {
          display: inline-block;
          border: 1px solid #4475FD;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 40px;
          line-height: 47px;
        }
        /deep/ strong {
          margin: 0 10px 0 50px;
          color: #4475FD;
          font-weight: 500;
          font-size: 24px;
          line-height: 36px;
          font-family: SourceHanSansCN-Medium;
          b {
            font-size: 40px;
            line-height: 47px;
            font-family: DINAlternate-Bold;
          }
        }
      }
    }
  }
  .configuration {
    height: 580px;
    background-color: #F7F7F8;
    .title{
      padding: 67px 0 96px;
      /deep/ h3 {
        width: 586px;
        margin: auto;
        height: 93px;
        line-height: 93px;
      }
      /deep/ p {
        padding-top: 0;
      }
    }
    .content > div {
      position: relative;
      display: inline-block;
      .arrow {
        position: absolute;
      }
      &.left {
        width: 383px;
        margin-left: 200px;
        .arrow {
          right: 0;
          top: 44px;
        }
      }
      &.right {
        width: 463px;
        text-align: right;
        margin-left: -156px;
        .arrow {
          left: 0;
          bottom: 56px;
        }
      }
    }
  }
</style>
