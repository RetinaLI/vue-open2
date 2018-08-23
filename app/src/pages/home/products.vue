<template>
  <div>
    <banner v-bind:bannerdata="proBanner"></banner>
    <div class="list">
      <h1>车联网五大产品</h1>
      <div class="pros">
        <div class="item" v-for="(item, index) in pros" :key="index">
          <a :href="item.href">
            <h3>{{ item.title }}</h3>
            <p class="line"></p>
            <p v-for="(x, i) in item.txt" :key="i" v-text="x" class="p"></p>
            <div class="img">
              <img :src="item.img" alt="">
            </div>
            <div class="icon-box">
              <el-button class="icon" circle icon="el-icon-back"></el-button>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Banner from '../../components/banner.vue';
export default {
  name: 'products',
  data () {
    return {
      proBanner: {
        'bgImg': require('project-assets/images/product/banner.jpg'),
        'h3': '全系覆盖',
        'p': '支持福田汽车全系产品，每日处理数据量20亿+条'
      },
      pros: [
        {
          title: '中重卡',
          txt: ['位置服务', '油耗分析', '驾驶行为', '载重检测'],
          img: require('project-assets/images/product/car1.png'),
          href: 'cars/truck'
        },
        {
          title: '新能源',
          txt: ['电池监控', '运行分析', '实时故障处理', '图标数据对接'],
          img: require('project-assets/images/product/car2.png'),
          href: 'cars/energy'
        },
        {
          title: '工程机械',
          txt: ['主动服务', '工况分析', '远程配置', '作业监控'],
          img: require('project-assets/images/product/car3.png'),
          href: 'cars/mechanics'
        },
        {
          title: '客车',
          txt: ['视频监控', '运营调度', '疲劳监测', '运营分析'],
          img: require('project-assets/images/product/car4.png'),
          href: 'cars/bus'
        },
        {
          title: '乘用车',
          txt: ['远程控制', '影音娱乐', '故障诊断', '远程升级'],
          img: require('project-assets/images/product/car5.png'),
          href: 'cars/passenger'
        }
      ]
    };
  },
  metaInfo: {
    title: '车联网数据开放平台-产品'
  },
  components: {
    Banner
  },
  template: '<products/>'
};
</script>
<style lang="scss" scoped>
.list {
  padding: 90px 0 120px;
  text-align: center;
  background-color: #f7f7f8;
  & > h1 {
    font-size: 40px;
    color: #333;
  }
  .pros {
    margin: 80px auto 0;
    max-width: 1620px;
    padding: 0 100px;
    display: flex;
    justify-content: center;
    .item {
      flex: 1;
      position: relative;
      margin: 0 3px;
      padding-top: 50px;
      box-shadow: 0px 0px 5px 2px rgba(241, 241, 241, 1);
      background-color: #fff;
      transition: all 0.5s;
      h3 {
        font-size: 20px;
        color: #333;
      }
      .line {
        margin: 12px auto 30px;
        width: 20px;
        height: 2px;
        background-color: #333;
      }
      .p {
        font-size: 12px;
        color: #666;
        line-height: 1.5;
      }
      .img {
        margin-top: 20px;
        position: relative;
        z-index: 2;
        transition: opacity 0.3s;
        img {
          display: block;
          width: 100%;
        }
      }
      .icon-box {
        position: absolute;
        left: 50%;
        bottom: 23%;
        transform: translateX(-50%) rotate(180deg);
        z-index: 1;
        .icon {
          opacity: 0;
          padding: 15px;
          transition: opacity 0.5s;
          i {
            color: #4475fd;
          }
        }
      }
      &:hover {
        transform: scale(1.1);
        z-index: 2;
        background-color: #4475fd;
        box-shadow: 0px 0px 15px 3px rgb(207, 198, 198);
        h3,
        .p {
          color: #fff;
        }
        .line {
          background-color: #fff;
        }
        .img {
          opacity: 0;
        }
        .icon-box {
          z-index: 3;
          .icon {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
