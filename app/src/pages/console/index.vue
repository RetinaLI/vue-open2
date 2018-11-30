<template>
  <div class="con-info wrapper">
    <el-row class="con-bal-cost-part" type="flex" :gutter="20">
      <con-block :key="i" :index="i" :block="item" v-for="(item, i) in block"/>
    </el-row>
    <div class="con-info-user">
      <div class="con-detail-charts">
        <h3 class="con-detail-charts-title">最近15日接口使用情况</h3>
        <div id="app" v-show="showChart">
          <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
        </div>
        <p v-show="hideChart" class="no-data">暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import { BalanceService } from '@/services/balance';
import ConBlock from '@/components/console/con-block/con-block';
import cost1 from '@/assets/images/console/counts.png';
import cost2 from '@/assets/images/console/nums.png';
import cost3 from '@/assets/images/console/balance.png';

let balanceService = new BalanceService();

export default {
  name: 'ConIndex',
  data () {
    return {
      block: [
        {num: 0, title: '本月调用（次）', icon: cost1},
        {num: 0, title: '接口数量（个）', icon: cost2},
        {num: 0, title: '余额（元）', icon: cost3}
      ],
      orgOptions: {},
      showChart: false,
      hideChart: false
    };
  },
  components: {
    ConBlock
  },
  methods: {
    async getIUsage () {
      let {callNum = 0, userBalance = 0, interfaceNum = 0} = await balanceService.getInterfaceUsage();
      this.block[0].num = callNum;
      this.block[1].num = interfaceNum;
      this.block[2].num = userBalance;
    },

    async get15DaysInterface () {
      this.creatChart();
      let result = await balanceService.getHalfMonthIUsage();
      let dateArr = [];
      let data = [];
      if (result.data !== undefined && result.data.length) {
        this.hideChart = false;
        this.showChart = true;
        result.data.reverse().forEach((val, index) => {
          dateArr.push(val.time.substr(5));
          data.push(val.usercount);
        });
        this.orgOptions.xAxis.data = dateArr;
        this.orgOptions.series[0].data = data;
      } else {
        this.hideChart = true;
        this.showChart = false;
      }
    },

    creatChart () {
      this.orgOptions = {
        title: {
          text: '',
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
          data: [],
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
        series: [
          {
            data: [],
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            markPoint: {
              symbol: 'circle',
              symbolSize: 12,
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  color: '#fff',
                  fontSize: 12,
                  borderWidth: 10,
                  borderRadius: 4,
                  padding: [1, 6, 1, 6],
                  borderColor: '#4F91FF',
                  backgroundColor: '#4F91FF'
                }
              },
              itemStyle: {
                normal: {
                  color: '#4F91FF',
                  fontSize: 5,
                  borderColor: '#fff',
                  borderWidth: 3,
                  label: {
                    show: false
                  }
                }
              },
              effect: {
                show: true,
                shadowBlur: 0
              },
              data: [
                {
                  type: 'average',
                  name: '平均值'
                }]
            },
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
              label: {},
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
                colorStops: [
                  {
                    offset: 0, color: 'rgba(68,117,253,0.5)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(68,117,253,0.1)' // 100% 处的颜色
                  }],
                globalCoord: false // 缺省为 false
              }
            }
          }]
      };
    }
  },
  mounted: function () {
    this.getIUsage();
    this.get15DaysInterface();
  },
  metainfo: {
    title: '数据看板-车联网数据开放平台'
  }

};
</script>

<style scoped lang="scss">
  .no-data {
    color: #909399;
    line-height: 60px;
    text-align: center;
  }

  .con-detail-charts-title {
    font-size: 16px;
    padding: 30px 0 0 20px;
    &:before {
      content: '';
      width: 2px;
      height: 16px;
      display: inline-block;
      vertical-align: middle;
      margin: -1px 8px 0 0;
      background: #4475FD;
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    .con-bal-cost-part {
      margin-bottom: 20px;
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
    #app {
      flex: 1;
      width: 100%;
      height: 500px;
      padding: 0 15px;
      background: #fff;
      .echarts {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }

</style>
