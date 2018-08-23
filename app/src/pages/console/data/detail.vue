<template>
  <section class="con-info">
    <ConBreadCrumbs :navShow="crumbs"/>
    <el-row type="flex" :gutter="20" class="con-blocks">
      <con-block :key="i" :index="i" :block="item" :isWhite="isWhite" v-for="(item, i) in block"/>
    </el-row>
    <div class="con-info-user">
      <div class="con-detail-charts">
        <h3 class="con-detail-charts-title">接口调用走势图</h3>
        <div id="app">
          <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
        </div>
      </div>
      <div class="con-detail-table">
        <h3 class="con-detail-charts-title">接口调用列表展示</h3>
        <template>
          <el-table
            :data="tableData"
            class="my-table"
            stripe>
            <el-table-column
              v-for="(item, i) in tableTitle"
              :key="i"
              :prop="item.prop"
              :width="[ i > 0 ? '' : '120px' ]"
              :align="( i > 0 ? 'left' : 'center' )"
              :label="item.label">
            </el-table-column>
          </el-table>
        </template>
        <div class="con-bal-pages" v-if="total > 10">
          <el-pagination
            @current-change="pageChangeHandle"
            :current-page="getCurrentPage"
            background
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import detailServer from '@/services/detail';
import ConBreadCrumbs from '@/components/console/con-bread-crumbs/index';
import ConBlock from '@/components/console/con-block/con-block';

export default {
  name: 'Detail',
  data () {
    return {
      crumbs: {
        nav: [
          {
            title: '我的数据',
            path: '/console/data'
          }
        ],
        current: '接口名称-接口调用详情'
      },
      block: [
        {num: 0, title: '调用接口总次数'},
        {num: 0, title: '消费总金额（元）'},
        {num: 0, title: '昨日调用次数'},
        {num: 0, title: '昨日消费金额（元）'}
      ],
      isWhite: true,
      orgOptions: {},
      tableData: [],
      tableTitle: [
        {
          prop: 'date',
          label: '时间'
        },
        {
          prop: 'count',
          label: '调用次数'
        },
        {
          prop: 'cost',
          label: '消费金额（元）'
        }
      ],
      total: 20
    };
  },
  computed: {
    getCurrentPage () {
      return Number(this.$route.query.page);
    }
  },
  methods: {
    pageChangeHandle (val) {
      // 将路由跳转到对应page页
      this.$router.push({path: '/console/data/detail', query: {id: this.$route.query.id, page: val}});
    },
    creatEcharts () {
      this.orgOptions = {
        dataset: [],
        title: {
          text: '',
          textStyle: {
            color: '#666',
            fontWeight: 'normal',
            fontSize: 16
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
            type: 'line',
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
    },
    async getChart () {
      this.creatEcharts();
      let data = await detailServer.getDetailChart();
      this.orgOptions.dataset = {
        dimensions: ['xData', 'yData'],
        source: data
      };
    },
    async getDetail () {
      let {interfaceCount, cost, yesCount, yesCost} = await detailServer.getDetail();
      this.block[0].num = interfaceCount;
      this.block[1].num = cost;
      this.block[2].num = yesCount;
      this.block[3].num = yesCost;
    },
    async getDetailTable () {
      let {data, totalCount} = await detailServer.getDetailTable();
      this.tableData = data;
      this.total = totalCount;
    }
  },
  mounted: function () {
    this.getChart();
    this.getDetail();
    this.getDetailTable();
  },
  components: {
    ConBlock,
    ConBreadCrumbs
  }
};
</script>

<style scoped lang="scss">
  .con-bal-cost-part {
    padding: 15px;
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

  .con-detail-charts {
    #app {
      width: 100%;
      height: 500px;
      padding: 0 15px 15px;
      .echarts {
        width: 100%;
        height: 100%;
      }
    }
  }

  .con-detail-table {
    .el-table {
      margin-top: 20px;
    }
  }

  .con-bal-pages {
    margin-top: 25px;
    text-align: center;
    .el-pagination {
      display: inline-block;
    }
  }
</style>
