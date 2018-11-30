<template>
  <section class="home-truck">
    <Banner :bannerdata="bannerData"/>
    <div class="home-truck-part cars-bg height640">
      <Title :title="location"/>
      <div class="home-truck-phone">
        <div class="home-truck-phone-block"
             :class="`block0${i + 1}`"
             v-reveal="{delay: 200 + 150 * i}"
             :key="i" v-for="(item, i) in info">
          <p class="home-truck-phone-info">
            <i class="truck-icon"></i>
            <span>{{item}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="height640">
      <Title :title="fuel"/>
      <div class="home-truck-list">
        <div class="home-truck-list-img list01">
          <p class="fuel-title">
            <span>采集</span>
            <span>实时油耗采集</span>
          </p>
        </div>
        <i class="el-icon-arrow-right list-icon"></i>
        <div class="home-truck-list-img list02">
          <p class="fuel-title">
            <span>分析</span>
            <span>多维度分析</span>
          </p>
        </div>
        <i class="el-icon-arrow-right list-icon"></i>
        <div class="home-truck-list-img list03">
          <p class="fuel-title">
            <span>报告</span>
            <span>指导性报告</span>
          </p>
        </div>
      </div>
    </div>
    <div class="height640 cars-bg">
      <Title :title="drive"/>
      <template>
        <div class="home-truck-drive">
          <el-carousel class="home-truck-drive-car">
            <el-carousel-item v-for="(item, i) in drives" :key="i">
              <ul class="drive-row">
                <li v-for="(list, k) in item" :key="k">
                  <p class="drive-name">{{list}}</p>
                </li>
              </ul>
            </el-carousel-item>
          </el-carousel>
        </div>
      </template>
    </div>
    <div class="height640">
      <Title :title="load"/>
      <el-row class="home-truck-load">
        <el-col :span="8" :key="i" v-for="(item, i) in loads">
          <div class="home-truck-load-list" :class="`load${i + 1}`">
            <i class="load-icon"></i>
            <p class="load-title">{{item.title}}</p>
            <p class="load-content">{{item.content}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import Banner from '@/components/banner';
import Title from '@/components/cars/title/title';

import bannerImg from '@/assets/images/car/truck/banner.jpg';
import t1 from '@/assets/images/car/truck/truck-t1.png';
import t2 from '@/assets/images/car/truck/truck-t2.png';
import t3 from '@/assets/images/car/truck/truck-t3.png';
import t4 from '@/assets/images/car/truck/truck-t4.png';

export default {
  name: 'Truck',
  data () {
    return {
      img: bannerImg,
      bannerData: {
        bgImg: bannerImg,
        title: '中重卡车联网平台',
        text: '福田汽车中重卡车联网平台，包含：欧曼、欧马可等品牌车辆，针对各品牌车辆进行特定的数据分析为市场、销售、售后等服务环节提供强有力的数据分析价值'
      },
      info: [
        '实时位置',
        '气温环境',
        '运行区域',
        '海拔信息',
        '速度&方向',
        '环境信息'
      ],
      location: {
        name: '位置服务',
        detail: '精准定位车辆实时位置，实时掌握车辆运行区域、速度、方向、气温、海拔等车辆及环境信息，为车主用户提供更加便捷的数据服务',
        engImg: t1
      },
      fuel: {
        name: '油耗分析',
        detail: '实时油耗采集（体现实时性）多维度分析（油耗数据结合别的数据）指导性报告（意见与建议）',
        engImg: t2
      },
      drive: {
        name: '驾驶行为',
        detail: '车联网监测车辆17项不良驾驶行为，分析评估司机驾驶习惯可能引发的风险，从而指导司机更好的改进驾驶方式，提高安全意识',
        engImg: t3
      },
      load: {
        name: '载重监测',
        detail: '实时监测载重质量和荷载情况，分析车辆在指定时间内的运输，为物流运输合规性及车辆安全和车辆耐久性改进提供依据',
        engImg: t4
      },
      loads: [
        {
          title: '载重地图',
          content: '打造实时载重监控平台，车辆发生超载情况则在地图上显示出车辆的相关信息，方便管理员实时监管'
        },
        {
          title: '载重分析',
          content: '通过大数据分析，从载重常发区域、载重车辆、载重企业、载重司机、载重货物排名等各维度进行统计分析'
        },
        {
          title: '即时管理',
          content: '当车辆发生超载时，监管人员可以远程限制车辆转速、甚至锁车。采取有效的措施，对司机进行管理'
        }
      ],
      drives: [
        [
          '急加速',
          '急刹车',
          '空挡滑行',
          '普通超速',
          '严重超速',
          '过长怠速',
          '疲劳驾驶',
          '粘离合',
          '长时间离合',
          '长时间刹车'
        ],
        [
          '停车立即熄火',
          '冷车行驶',
          '停车踩踏油门',
          '超转行驶',
          '安全带未系报警',
          '带手刹行驶',
          '大油门行驶（猛踩油门）'
        ]
      ]
    };
  },
  components: {
    Banner,
    Title
  }
};
</script>

<style scoped lang="scss">
  $bgTop: '~@/assets/images/car/truck/bg-01.png';
  $icon-01: '~@/assets/images/car/truck/icon-01.png';
  $icon-02: '~@/assets/images/car/truck/icon-02.png';
  $icon-03: '~@/assets/images/car/truck/icon-03.png';
  $icon-04: '~@/assets/images/car/truck/icon-04.png';
  $icon-05: '~@/assets/images/car/truck/icon-05.png';
  $icon-06: '~@/assets/images/car/truck/icon-06.png';
  $img-01: '~@/assets/images/car/truck/image-2.1.png';
  $img-02: '~@/assets/images/car/truck/image-2.2.png';
  $img-03: '~@/assets/images/car/truck/image-2.3.png';
  $icon-1: '~@/assets/images/car/truck/icon-4.1.png';
  $icon-2: '~@/assets/images/car/truck/icon-4.2.png';
  $icon-3: '~@/assets/images/car/truck/icon-4.3.png';
  $height640: 640px;
  $width1000: 1000px;
  $scal: .6;
  .home-truck-part {
    background: url($bgTop) no-repeat center center;
    background-size: cover;
    .home-truck-phone {
      width: 480px;
      height: 380px;
      margin: 0 auto;
      position: relative;
      .home-truck-phone-block {
        position: absolute;
        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
        width: 200px;
        height: 60px;
        padding: 0 25px;
        background: #fff;
        &.block01 {
          left: -220px;
          top: 55px;
          .truck-icon {
            width: 32px * $scal;
            height: 50px * $scal;
            background-image: url($icon-01);
            background-size: 100% 100%;
          }
        }
        &.block02 {
          right: -60px;
          top: 55px;
          .truck-icon {
            width: 36px * $scal;
            height: 31px * $scal;
            background-image: url($icon-02);
            background-size: 100% 100%;
          }
        }
        &.block03 {
          left: -150px;
          top: 145px;
          .truck-icon {
            width: 42px * $scal;
            height: 34px * $scal;
            background-image: url($icon-03);
            background-size: 100% 100%;
          }
        }
        &.block04 {
          right: -130px;
          top: 145px;
          .truck-icon {
            width: 48px * $scal;
            height: 48px * $scal;
            background-image: url($icon-04);
            background-size: 100% 100%;
          }
        }
        &.block05 {
          left: -80px;
          top: 235px;
          .truck-icon {
            width: 49px * $scal;
            height: 51px * $scal;
            background-image: url($icon-05);
            background-size: 100% 100%;
          }
        }
        &.block06 {
          right: -200px;
          top: 235px;
          .truck-icon {
            width: 44px * $scal;
            height: 35px * $scal;
            background-image: url($icon-06);
            background-size: 100% 100%;
          }
        }
        .home-truck-phone-info {
          display: flex;
          height: 100%;
          justify-content: space-around;
          align-items: center;
          & > span {
            font-size: 14px;
            color: #333;
          }
        }
        .truck-icon {
          display: inline-block;
          vertical-align: middle;
          background-repeat: no-repeat;
        }
      }
    }
  }

  .home-truck-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: $width1000;
    margin: 0 auto;
    .home-truck-list-img {
      width: 250px;
      height: 350px;
      position: relative;
      &.list01 {
        background: url($img-01) no-repeat;
        background-size: 100% 100%;
      }
      &.list02 {
        background: url($img-02) no-repeat;
        background-size: 100% 100%;
      }
      &.list03 {
        background: url($img-03) no-repeat;
        background-size: 100% 100%;
      }
      .fuel-title {
        position: absolute;
        top: 0;
        left: 120px;
        color: #fff;
        &>span {
          display: block;
        }
        &> span:nth-of-type(1) {
          font-size: 18px;
          line-height: 34px;
          font-weight: 600;
        }
        &> span:nth-of-type(2) {
          font-size: 14px;
          line-height: 18px;
        }
      }
    }
    .list-icon {
      font-size: 100px;
      font-weight: bold;
      color: #eee;
    }
  }

  .home-truck-drive {
    width: 1100px;
    margin: 0 auto;
    /deep/ .el-carousel__item {
      padding: 0 60px;
    }
    /deep/ .el-carousel__arrow--left {
      left: 0;
    }
    /deep/ .el-carousel__arrow--right {
      right: 0;
    }
    /deep/ .el-carousel__indicator {
      &.is-active {
        .el-carousel__button {
          background: #4475FD;
        }
      }
      .el-carousel__button {
        width: 8px;
        height: 8px;
        background: #d5d5d5;
        border-radius: 50%;
      }
    }
    .home-truck-drive-car {
      .drive-row {
        padding-top: 50px;
        overflow: hidden;
        & > li {
          width: 20%;
          float: left;
          padding: 0 6px;
          margin-bottom: 50px;
        }
      }
      .drive-name {
        width: 100%;
        height: 72px;
        background: #fff;
        text-align: center;
        color: #666;
        line-height: 72px;
        border-left: 3px solid #4475FD;
      }
    }
  }

  .home-truck-load {
    width: $width1000;
    margin: 0 auto;
    .home-truck-load-list {
      border: 1px solid #eee;
      text-align: center;
      padding: 50px 0;
      &.load1, &.load2 {
        border-right: none;
      }
      &.load1 {
        .load-icon {
          width: 93px;
          height: 77px;
          background: url($icon-1) no-repeat;
          background-size: 100% 100%;
        }
      }
      &.load2 {
        .load-icon {
          width: 100px;
          height: 78px;
          background: url($icon-2) no-repeat;
          background-size: 100% 100%;
        }
      }

      &.load3 {
        .load-icon {
          width: 224px;
          height: 86px;
          background: url($icon-3) no-repeat;
          background-size: 100% 100%;
        }
      }
      .load-icon {
        display: inline-block;
        margin-bottom: 30px;
      }

      .load-title {
        font-size: 16px;
        color: #4475FD;
        line-height: 24px;
      }
      .load-content {
        padding-top: 38px;
        margin: 0 auto;
        width: 220px;
        font-size: 12px;
        color: #aaa;
        line-height: 18px;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          left: 50%;
          top: 18px;
          transform: translateX(-50%);
          width: 17px;
          height: 4px;
          background: #d5d5d5;
        }
      }
    }
  }

  .height640 {
    height: $height640;
  }
</style>
