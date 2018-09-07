<template>
  <div>
    <div class="banner">
      <div class="bg1">
        <img src="../../assets/images/home/bg1.png" alt="">
      </div>
      <div class="bg2">
        <img src="../../assets/images/home/bg2.png" alt="">
      </div>
      <div class="bg3">
        <img src="../../assets/images/home/bg3.png" alt="">
      </div>
      <div class="bg4">
        <img src="../../assets/images/home/bg4.png" alt="">
      </div>
      <div class="bg5">
        <img src="../../assets/images/home/bg5.png" alt="">
      </div>
      <div class="wrappr">
        <div class="text vc">
          <h3>智能生态&nbsp;智慧互联</h3>
          <p class="font14">深挖车辆数据价值、数据驱动汽车行业发展、为千万车主提供更人性化的智能网联服务</p>
        </div>
      </div>
    </div>
    <div class="bigdata">
      <div class="content vhc">
        <div class="title vc">
          <h3>车联网大数据</h3>
          <p class="font14">海量数据整合 数据价值分析</p>
        </div>
        <div class="numbs vc clearfix">
          <el-card :body-style="{padding: 0}" shadow="nerver" v-for="item in bigData" :key="item.name">
            <img :src="item.imgUrl" alt="">
            <p class="line"></p>
            <p class="name" v-html="item.name"></p>
            <p class="numb">{{ item.numb }}
              <span>+</span>
            </p>
          </el-card>
        </div>
      </div>
    </div>
    <div class="data-getter">
      <part-title :cTitle="dataGetter.cTitle"></part-title>
      <div class="wrapper">
        <div class="clearfix data-box" ref="dataBox">
          <div class="item" v-for="item in dataGetter.dataBox" :key="item.name">
            <img :src="item.imgUrl" alt="">
            <p class="font14">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="data-share">
      <part-title :cTitle="dataShare.cTitle"></part-title>
      <div class="wrapper">
        <div class="clearfix">
          <div class="left" ref="leftImg">
            <img src="../../assets/images/home/datashare1.png" alt="">
          </div>
          <div class="right clearfix">
            <div class="item" v-for="item in dataShare.shares" :key="item.name">
              <img :src="item.imgUrl" alt="">
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cooperation">
      <part-title :cTitle="cooperation.cTitle"></part-title>
      <div class="wrapper">
        <div class="item" v-for="(item, index) in cooperation.coops" :key="index">
          <img :src="item[0]" alt="">
          <img class="no-grey" :src="item[1]" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PartTitle from 'components/part-title';
export default {
  name: 'index',
  data () {
    return {
      bigData: [
        {
          imgUrl: require('project-assets/images/home/bigdata1.png'),
          name: '总接入车辆（辆）',
          numb: '70万'
        },
        {
          imgUrl: require('project-assets/images/home/bigdata2.png'),
          name: '总数据量',
          numb: '500T'
        },
        {
          imgUrl: require('project-assets/images/home/bigdata3.png'),
          name: '月增数据量',
          numb: '40T'
        },
        {
          imgUrl: require('project-assets/images/home/bigdata4.png'),
          name: '日处理数据量（条）',
          numb: '20亿'
        }
      ],
      dataGetter: {
        cTitle: ['数据采集', '与整车深度集成，实时采集车辆各项数据，单车数据项超过300种'],
        dataBox: [
          {
            imgUrl: require('project-assets/images/home/home-icon-1.png'),
            name: '发动机'
          },
          {
            imgUrl: require('project-assets/images/home/home-icon-2.png'),
            name: '变速箱'
          },
          {
            imgUrl: require('project-assets/images/home/home-icon-3.png'),
            name: '电子仪表'
          },
          {
            imgUrl: require('project-assets/images/home/home-icon-4.png'),
            name: '后处理'
          },
          {
            imgUrl: require('project-assets/images/home/home-icon-5.png'),
            name: '车桥'
          },
          {
            imgUrl: require('project-assets/images/home/home-icon-6.png'),
            name: '位置数据'
          },
          {
            imgUrl: require('project-assets/images/home/home-icon-7.png'),
            name: '故障数据'
          },
          {
            imgUrl: require('project-assets/images/home/home-icon-8.png'),
            name: '报警数据'
          },
          {
            imgUrl: require('project-assets/images/home/home-icon-9.png'),
            name: '驾驶行为数据'
          },
          {
            imgUrl: require('project-assets/images/home/home-icon-10.png'),
            name: '载重数据'
          }
        ]
      },
      dataShare: {
        cTitle: ['数据共享', ''],
        shares: [
          {
            imgUrl: require('project-assets/images/home/datashare2.png'),
            name: '数据开放共享'
          },
          {
            imgUrl: require('project-assets/images/home/datashare3.png'),
            name: '服务合作伙伴'
          },
          {
            imgUrl: require('project-assets/images/home/datashare4.png'),
            name: '重构行业生态'
          },
          {
            imgUrl: require('project-assets/images/home/datashare5.png'),
            name: '驱动产业发展'
          }
        ]
      },
      cooperation: {
        cTitle: ['战略合作', '携手共赢，与全球合作伙伴共建车联网生态，齐力开创新业务，实现更快速成长'],
        coops: [
          [
            require('project-assets/images/home/c1-grey.png'),
            require('project-assets/images/home/c1.png')
          ],
          [
            require('project-assets/images/home/c2-grey.png'),
            require('project-assets/images/home/c2.png')
          ],
          [
            require('project-assets/images/home/c3-grey.png'),
            require('project-assets/images/home/c3.png')
          ],
          [
            require('project-assets/images/home/c4-grey.png'),
            require('project-assets/images/home/c4.png')
          ],
          [
            require('project-assets/images/home/c5-grey.png'),
            require('project-assets/images/home/c5.png')
          ],
          [
            require('project-assets/images/home/c6-grey.png'),
            require('project-assets/images/home/c6.png')
          ],
          [
            require('project-assets/images/home/c7-grey.png'),
            require('project-assets/images/home/c7.png')
          ],
          [
            require('project-assets/images/home/c8-grey.png'),
            require('project-assets/images/home/c8.png')
          ],
          [
            require('project-assets/images/home/c9-grey.png'),
            require('project-assets/images/home/c9.png')
          ],
          [
            require('project-assets/images/home/c10-grey.png'),
            require('project-assets/images/home/c10.png')
          ],
          [
            require('project-assets/images/home/c11-grey.png'),
            require('project-assets/images/home/c11.png')
          ],
          [
            require('project-assets/images/home/c12-grey.png'),
            require('project-assets/images/home/c12.png')
          ]
        ]
      }
    };
  },
  metaInfo: {
    title: '车联网数据开放平台'
  },
  components: {
    PartTitle
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll () {
      if (this.$route.name !== 'index') return;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var getter = $('.data-getter .data-box');
      var t1 = getter.offset().top;
      var getterPoint = t1 - (window.innerHeight * 0.8);

      var share = $('.data-share .left');
      var t2 = share.offset().top;
      var sharePoint = t2 - (window.innerHeight * 0.8);
      if (scrollTop > getterPoint) {
        $(getter).addClass('move');
      }
      if (scrollTop > sharePoint) {
        $(share).addClass('move');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.banner {
  width: 100%;
  height: 720px;
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
  & > div:not(.wrappr) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-fill-mode: forwards;
  }
  .bg1 {
    opacity: 0;
    z-index: 5;
    animation: b_to_t4 0.8s cubic-bezier(0.4, 0, 0.2, 1) .6s 1;
  }
  .bg2 {
    opacity: 0;
    z-index: 4;
    animation: b_to_t3 0.8s cubic-bezier(0.4, 0, 0.2, 1) .4s 1;
  }
  .bg3 {
    opacity: 0;
    z-index: 3;
    animation: b_to_t2 0.8s cubic-bezier(0.4, 0, 0.2, 1) .3s 1;
  }
  .bg4 {
    opacity: 0;
    z-index: 2;
    animation: b_to_t1 0.8s cubic-bezier(0.4, 0, 0.2, 1) .2s 1;
  }
  .bg5 {
    z-index: 1;
  }
  .wrappr {
    position: relative;
    margin: auto;
    width: 1200px;
    height: 100%;
    z-index: 6;
    color: #fff;
    .text {
      opacity: 0;
      width: 480px;
      animation: banner 0.8s cubic-bezier(0.4, 0, 0.2, 1) .6s 1;
      animation-fill-mode: forwards;
      h3 {
        font-size: 54px;
        margin-bottom: 14px;
      }
    }
  }
}
.bigdata {
  width: 100%;
  height: 600px;
  position: relative;
  .content {
    width: 1080px;
    height: 400px;
    margin-left: 60px;
    box-shadow: 3px 6px 12px 0px rgba(241, 241, 241, 1);
    border: 1px solid rgba(239, 239, 239, 1);
    .title {
      width: 320px;
      height: 300px;
      background: rgba(68, 117, 253, 1);
      left: -100px;
      color: #fff;
      padding-left: 40px;
      h3 {
        font-size: 40px;
        padding-top: 108px;
      }
    }
    .numbs {
      width: 860px;
      height: 100%;
      left: 220px;

      .el-card {
        float: left;
        border: none;
        margin-left: 90px;
        padding-top: 120px;
        .line {
          margin: 0 0 15px;
          width: 16px;
          height: 2px;
          background-color: #e3e3e3;
        }
        .name {
          font-size: 12px;
          color: #666;
        }
        .numb {
          font-weight: 600;
          font-size: 36px;
          color: rgba(68, 117, 253, 1);
          span {
            vertical-align: middle;
            font-size: 40px;
          }
        }
      }
    }
  }
}
.data-getter {
  height: 780px;
  background: #0e0c2b url("../../assets/images/home/data-getter.jpg") center
    center no-repeat;
  .part-title {
    padding-top: 110px;
    color: #fff;

    & /deep/ h1,
    & /deep/ p {
      margin-bottom: 5px;
      color: #fff;
    }
  }
  .data-box {
    // animation-fill-mode: forwards !important;
    opacity: 0;
    margin-top: 160px;
    .item {
      float: left;
      width: 84px;
      text-align: center;
      margin: 0 78px 80px;
      p {
        color: #fff;
        margin-top: 10px;
      }
    }
    &.move {
      opacity: 1;
      margin-top: 120px;
      transition: all .5s;
    }
  }
}
.data-share {
  padding-top: 88px;
  height: 876px;
  .clearfix {
    margin-top: 80px;
    & > div {
      float: left;
    }
    .left {
      opacity: 0;
      margin-top: 50px;
    }
    .left.move {
      transition: all .5s;
      opacity: 1;
      margin-top: 0;
    }
    .right {
      padding-left: 140px;
      padding-top: 35px;
      width: 640px;
      .item {
        float: left;
        margin-bottom: 80px;
        text-align: center;
        &:nth-child(odd) {
          margin-right: 200px;
        }
        p {
          font-size: 18px;
          color: #666;
          margin-top: 20px;
        }
      }
    }
  }
}
.cooperation {
  height: 580px;
  .part-title {
    padding-top: 90px;
  }
  .wrapper {
    padding-top: 80px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      flex: 1;
      position: relative;
      margin-bottom: 35px;
      cursor: pointer;
      .no-grey {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        transition: opacity .5s;
      }
    }
    .item:hover .no-grey {
      opacity: 1;
    }
  }
}
</style>
