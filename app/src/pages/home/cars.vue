<template>
  <div>
    <banner v-bind:bannerdata="bannerData[type]"></banner>
    <div class="content">
      <div v-for="(item, index) in cars[type]" :key="index">
        <div class="part" :class="'part'+(index + 1)">
          <div class="wrapper">
            <div class="title vc">
              <h2>{{ '0' + (index + 1) }}</h2>
              <p class="line"></p>
              <h1>{{item.h1}}</h1>
              <p class="txt">{{ item.p }}</p>
            </div>
            <div class="img vc" :class="{'fortruck': type === 'truck' && index === 0}">
              <img :src="item.img" alt="">
            </div>
          </div>
        </div>
        <div class="bg" :class="['bg'+(index + 1), type]"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Banner from 'components/banner';
export default {
  data () {
    return {
      bannerData: {
        truck: {
          bgImg: require('project-assets/images/car/truck/banner.jpg'),
          h3: '中重卡车联网平台'
        },
        energy: {
          bgImg: require('project-assets/images/car/energy/banner.jpg'),
          h3: '新能源车联网平台'
        },
        mechanics: {
          bgImg: require('project-assets/images/car/mechanics/banner.jpg'),
          h3: '工程机械车联网平台'
        },
        bus: {
          bgImg: require('project-assets/images/car/bus/banner.jpg'),
          h3: '客车车联网平台'
        },
        passenger: {
          bgImg: require('project-assets/images/car/passenger/banner.jpg'),
          h3: '乘用车车联网平台'
        }
      },
      cars: {
        truck: [
          {
            'h1': '位置服务',
            'p': '精准定位，车辆位置实时掌握',
            'img': require('project-assets/images/car/truck/part1.png')
          },
          {
            'h1': '油耗分析',
            'p': '油耗针对性分析，降低运营成本',
            'img': require('project-assets/images/car/truck/part2.png')
          },
          {
            'h1': '驾驶行为',
            'p': '不良驾驶行为监测，让开车更安全',
            'img': require('project-assets/images/car/truck/part3.png')
          },
          {
            'h1': '载重监测',
            'p': '实时监测车辆的载重情况',
            'img': require('project-assets/images/car/truck/part4.png')
          }
        ],
        energy: [
          {
            'h1': '电池监控',
            'p': '各项电池数据实时监测',
            'img': require('project-assets/images/car/energy/part1.png')
          },
          {
            'h1': '运行分析',
            'p': '多维度分析统计车辆运行情况',
            'img': require('project-assets/images/car/energy/part2.png')
          },
          {
            'h1': '实时故障处理',
            'p': '故障信息实时上报，远程诊断并处理故障',
            'img': require('project-assets/images/car/energy/part3.png')
          },
          {
            'h1': '国标数据对接',
            'p': '满足法规数据要求，对接国家及地方新能源监',
            'img': require('project-assets/images/car/energy/part4.png')
          }
        ],
        mechanics: [
          {
            'h1': '主动服务',
            'p': '车况数据监测，故障预警及主动服务',
            'img': require('project-assets/images/car/mechanics/part1.png')
          },
          {
            'h1': '工作监控',
            'p': '远程监控工程机械车辆实时工作状态',
            'img': require('project-assets/images/car/mechanics/part2.png')
          },
          {
            'h1': '工况分析',
            'p': '全面分析工程机械车辆的工况数据',
            'img': require('project-assets/images/car/mechanics/part3.png')
          },
          {
            'h1': '远程配置',
            'p': '智能配置上装参数，提升工作效率',
            'img': require('project-assets/images/car/mechanics/part4.png')
          }
        ],
        bus: [
          {
            'h1': '视频监控',
            'p': '车内外视频监控，视频云存储',
            'img': require('project-assets/images/car/bus/part1.png')
          },
          {
            'h1': '运营调度',
            'p': '智能调度车辆，满足不同场景用车需求',
            'img': require('project-assets/images/car/bus/part2.png')
          },
          {
            'h1': '疲劳监测',
            'p': '面部特征识别，实时疲劳预警，杜绝潜在危险',
            'img': require('project-assets/images/car/bus/part3.png')
          },
          {
            'h1': '运营分析',
            'p': '评价车辆运行情况，最大化提升运营效率',
            'img': require('project-assets/images/car/bus/part4.png')
          }
        ],
        passenger: [
          {
            'h1': '位置服务',
            'p': '精准定位，车辆位置实时掌握',
            'img': require('project-assets/images/car/passenger/part1.png')
          },
          {
            'h1': '油耗分析',
            'p': '油耗针对性分析，降低运营成本',
            'img': require('project-assets/images/car/passenger/part2.png')
          },
          {
            'h1': '驾驶行为',
            'p': '不良驾驶行为监测，让开车更安全',
            'img': require('project-assets/images/car/passenger/part3.png')
          },
          {
            'h1': '载重监测',
            'p': '实时监测车辆的载重情况',
            'img': require('project-assets/images/car/passenger/part4.png')
          }
        ]
      },
      type: ''
    };
  },
  components: {
    Banner
  },
  created () {
    this.type = this.$route.params.type;
  },
  methods: {
    bgMove (els) {
      els.each(function (index, el) {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var $dom = $(el);
        var winH = window.innerHeight;
        var $t = $dom.offset().top;
        var start = $t - winH;
        var space = winH > 750 ? 820 : 120;// 值越大，背景图移动的越慢，距离越小
        if (scrollTop >= start) {
          var x = (scrollTop - start) * space / winH;
          $dom.css('background-position-y', space - x);
        }
      });
    },
    handleScroll () {
      this.bgMove($('.bg'));
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
  }
};
</script>
<style lang="scss" scoped>
.content {
  .part {
    height: 540px;
    .wrapper {
      position: relative;
      height: 100%;
      .title {
        left: 0;
        h2 {
          font-size: 64px;
          color: #aaa;
        }
        .line {
          display: inline-block;
          margin: 20px 0 50px;
          width: 20px;
          height: 4px;
          background-color: #4475fd;
        }
        h1 {
          font-size: 40px;
          color: #333;
        }
        .txt {
          margin-top: 10px;
          font-size: 14px;
          color: #666;
        }
      }
      .img {
        left: auto;
        right: 0;
      }
    }
    .fortruck {
      left: 30%!important;
    }
    &.part2,
    &.part4 {
      .title {
        right: 0;
        left: auto;
        text-align: right;
      }
      .img {
        left: 0;
        right: auto;
      }
    }
  }
  .bg {
    height: 540px;
    background-color: yellowgreen;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-position: center 0;
    &.truck {
      &.bg1 {
        background-image: url("../../assets/images/car/truck/bg1.jpg");
      }
      &.bg2 {
        background-image: url("../../assets/images/car/truck/bg2.jpg");
      }
      &.bg3 {
        background-image: url("../../assets/images/car/truck/bg3.jpg");
      }
    }
    &.energy {
      &.bg1 {
        background-image: url("../../assets/images/car/energy/bg1.jpg");
      }
      &.bg2 {
        background-image: url("../../assets/images/car/energy/bg2.jpg");
      }
      &.bg3 {
        background-image: url("../../assets/images/car/energy/bg3.jpg");
      }
    }
    &.mechanics {
      &.bg1 {
        background-image: url("../../assets/images/car/mechanics/bg1.jpg");
      }
      &.bg2 {
        background-image: url("../../assets/images/car/mechanics/bg2.jpg");
      }
      &.bg3 {
        background-image: url("../../assets/images/car/mechanics/bg3.jpg");
      }
    }
    &.bus {
      &.bg1 {
        background-image: url("../../assets/images/car/bus/bg1.jpg");
      }
      &.bg2 {
        background-image: url("../../assets/images/car/bus/bg2.jpg");
      }
      &.bg3 {
        background-image: url("../../assets/images/car/bus/bg3.jpg");
      }
    }
    &.passenger {
      &.bg1 {
        background-image: url("../../assets/images/car/passenger/bg1.jpg");
      }
      &.bg2 {
        background-image: url("../../assets/images/car/passenger/bg2.jpg");
      }
      &.bg3 {
        background-image: url("../../assets/images/car/passenger/bg3.jpg");
      }
    }
  }
  .bg4 {
    display: none;
  }
}
.bg {
  display: none !important;
}
.content>div:nth-child(even) .part {
  background-color: #F7F7F8;
}
.content>div:nth-child(odd) .part  {
  background-color: #fff;
}
</style>
