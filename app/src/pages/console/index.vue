<template>
  <div class="wrapper">
    <el-row class="con-bal-cost-part" type="flex" :gutter="20">
      <con-block :key="i" :index="i" :block="item" v-for="(item, i) in block"/>
    </el-row>
    <div id="app">
      <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
    </div>
  </div>
</template>

<script>
import ConBlock from '@/components/console/con-block/con-block';
import cost1 from '@/assets/images/console/counts.png';
import cost2 from '@/assets/images/console/nums.png';
import cost3 from '@/assets/images/console/balance.png';

export default {
  name: 'ConIndex',
  data () {
    return {
      block: [
        {num: 1233332, title: '调用次数', icon: cost1},
        {num: 1232, title: '接口数量', icon: cost2},
        {num: 1232, title: '余额（元）', icon: cost3}
      ],
      orgOptions: {}
    };
  },
  components: {
    ConBlock
  },
  mounted () {
    this.orgOptions = {
      title: {
        text: '最近15日接口使用情况',
        textStyle: {
          color: '#666',
          fontWeight: 'bold',
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'axis',
        showContent: false,
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['销量']
      },
      grid: {
        left: '3%',
        right: '2%',
        bottom: '8%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: ['08-01', '08-02', '08-03', '08-04', '08-05', '08-06', '08-07', '08-08', '08-09', '08-10', '08-11', '08-12', '08-13', '08-14', '08-15'],
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: '#aaa', // 左边线的颜色
            width: '1' // 坐标线的宽度
          }
        },
        axisLabel: {
          textStyle: {
            color: '#aaa' // 坐标值得具体的颜色
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {show: true}, // 去除网格线
        splitArea: {show: false},
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: '#aaa', // 左边线的颜色
            width: '1' // 坐标线的宽度
          }
        },
        axisLabel: {
          textStyle: {
            color: '#aaa' // 坐标值得具体的颜色
          }
        },
        axisTick: {
          show: false // 刻度值
        }
      },
      series: [{
        data: [123, 323, 345, 434, 413, 456, 634, 820, 932, 901, 934, 1290, 1330, 1620, 1846],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        emphasis: {
          label: {
            color: '#fff',
            show: true,
            backgroundColor: '#4F91FF',
            borderRadius: 12,
            padding: [5, 10]
          }
        },
        itemStyle: {
          label: {
          },
          normal: {
            color: '#4F91FF', // 折点颜色
            borderColor: '#fff',
            borderWidth: 2,
            lineStyle: {
              width: 3, // 0.1的线条是非常细的了
              color: '#4F91FF' // 折线颜色
            }
          }
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(68,117,253,0.5)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(68,117,253,0.1)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        }
      }]
    };
  },
  metainfo: {
    title: '数据看板-车联网数据开放平台'
  }

};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .con-bal-cost-part {
    .con-bal-data {
      .con-bal-data-tab {
        padding: 30px 15px 15px;
      }
    }
    .con-bal-pages {
      margin-top: 25px;
      text-align: center;
      .el-pagination {
        display: inline-block;
      }
    }
  }
  #app{
    flex: 1;
    width:100%;
    max-height:500px;
    padding:15px;
    background:#fff;
    margin-top: 20px;
    .echarts{
      width:100%;
      height:100%;
      display: block;
    }
  }
}

</style>
