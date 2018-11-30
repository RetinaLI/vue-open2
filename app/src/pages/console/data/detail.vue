<template>
  <section class="con-info">
    <ConBreadCrumbs :navShow="crumbs"/>
    <el-row type="flex" :gutter="20" class="con-blocks">
      <con-block :key="i" :index="i" :block="item" :isWhite="isWhite" v-for="(item, i) in block"/>
    </el-row>
    <div class="con-info-user">
      <div class="con-detail-charts">
        <h3 class="con-detail-charts-title">接口调用走势图</h3>
        <div id="app" v-show="showChart">
          <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
        </div>
        <p v-show="hideChart" class="no-data">暂无数据</p>
      </div>
      <div class="con-detail-table">
        <h3 class="con-detail-charts-title con-detail-charts-title2">
          <span>接口调用列表展示</span>
          <p class="con-detail-charts-title-btn">
            <span :class="{'blue': type === 'month'}" @click="getDetailMonth">按月统计</span>
            <span :class="{'blue': type === 'day'}" @click="getDetailDay">按日统计</span>
          </p>
        </h3>
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
              align="center"
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
  mateInfo: {
    title: '控制台-我的数据详情'
  },
  data () {
    return {
      crumbs: {
        nav: [
          {
            title: '我的数据',
            path: '/console/data/index.html'
          }
        ],
        current: `${decodeURIComponent(this.$route.query.name)}-调用详情`
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
          prop: 'time',
          label: '时间'
        },
        {
          prop: 'usercount',
          label: '调用次数'
        },
        {
          prop: 'allmoney',
          label: '消费金额（元）'
        }
      ],
      total: 0,
      monthPage: 1,
      dayPage: 1,
      type: 'month',
      showChart: false,
      hideChart: false
    };
  },
  computed: {
    getCurrentPage () {
      return Number(this.$route.query.page);
    }
  },
  watch: {
    '$route' () {
      // 路由变化执行
      this.getDetailTable();
    }
  },
  methods: {
    pageChangeHandle (val) {
      // 将路由跳转到对应page页
      this.$router.push({
        path: '/console/data/detail/index.html',
        query: {apiid: this.$route.query.apiid, name: this.$route.query.name, page: val, type: this.type}
      });
    },
    getDetailMonth () {
      // 将路由跳转到对应page页
      this.type = 'month';
      this.pageChangeHandle(this.monthPage);
    },
    getDetailDay () {
      // 将路由跳转到对应page页
      this.type = 'day';
      this.pageChangeHandle(this.dayPage);
    },
    creatEcharts (dataset) {
      // let count = [];
      // let money = [];
      // dataset.source.map(ele => {
      //   count.push(ele.usercount);
      //   money.push(ele.allmoney);
      // });
      // let maxCount = Math.max(...count);
      // let maxMoney = Math.max(...money);
      this.orgOptions = {
        dataset,
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
          data: ['调用次数', '消费金额'],
          align: 'left',
          right: true
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
        yAxis: [{
          type: 'value',
          name: '',
          position: 'left',
          splitLine: {show: true}, // 去除网格线
          min: 0,
          axisLine: {
            lineStyle: {
              color: '#4F91FF'
            }
          },
          axisLabel: {
            formatter: '{value} 次'
          }
        }, {
          type: 'value',
          name: '',
          position: 'right',
          splitLine: {show: false}, // 去除网格线
          min: 0,
          axisLine: {
            lineStyle: {
              color: '#FF314C'
            }
          },
          axisLabel: {
            formatter: '{value} 元'
          }
        }],
        series: [
          {
            name: '调用次数',
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
                    offset: 1, color: 'rgba(68,117,253,0)' // 100% 处的颜色
                  }],
                globalCoord: false // 缺省为 false
              }
            }
          }, {
            name: '消费金额',
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            yAxisIndex: 1,
            emphasis: {
              label: {
                color: '#fff',
                show: true,
                backgroundColor: '#FF314C',
                borderRadius: 12,
                padding: [5, 10]
              }
            },
            itemStyle: {
              label: {},
              normal: {
                color: '#FF314C', // 折点颜色
                borderColor: '#fff',
                borderWidth: 2,
                lineStyle: {
                  width: 3, // 0.1的线条是非常细的了
                  color: '#FF314C' // 折线颜色
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
                    offset: 0, color: 'rgba(255,49,76,0.5)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(255,49,76,0)' // 100% 处的颜色
                  }],
                globalCoord: false // 缺省为 false
              }
            }
          }]
      };
    },
    async getChart () {
      let apiId = this.$route.query.apiid;
      let data = await detailServer.getDetailChart({
        apiId
      });
      if (data !== undefined && data.length) {
        this.showChart = true;
        this.hideChart = false;
        let dataset = {
          dimensions: ['time', 'usercount', 'allmoney'],
          source: data.reverse()
        };
        this.creatEcharts(dataset);
      } else {
        this.showChart = false;
        this.hideChart = true;
      }
    },
    async getDetail () {
      let apiId = this.$route.query.apiid;
      let {totalmoneys = 0, yesterdayCount = 0, yesterdayMoneys = 0, usercount = 0} = await detailServer.getDetail({
        apiId
      });
      this.block[0].num = usercount;
      this.block[1].num = totalmoneys;
      this.block[2].num = yesterdayCount;
      this.block[3].num = yesterdayMoneys;
    },
    async getDetailTable () {
      let data = {};
      let apiId = this.$route.query.apiid;
      this.type = this.$route.query.type || 'month';
      let page = this.$route.query.page || 1;
      if (this.type === 'month') {
        data = await detailServer.getDetailMonth({
          apiId,
          pageSize: 10,
          pageNum: page
        });
      } else if (this.type === 'day') {
        data = await detailServer.getDetailDay({
          apiId,
          pageSize: 10,
          pageNum: page
        });
      } else {
        data = await detailServer.getDetailMonth({
          apiId,
          pageSize: 10,
          pageNum: page
        });
      }
      this.tableData = data.data;
      this.total = data.totalCount;
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
  .blue {
    color: #4475FD;
    font-weight: bold;
  }
  .no-data {
    color: #909399;
    line-height: 60px;
    text-align: center;
  }

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

  .con-detail-charts-title2 {
    overflow: hidden;
    .con-detail-charts-title-btn {
      float: right;
      margin-right: 15px;
      & > span {
        cursor: pointer;
        font-size: 14px;
        &:hover {
          color: #4475FD;
        }
      }
      & > span:nth-of-type(1) {
        &:after {
          content: '';
          border-right: 2px solid #ccc;
          height: 14px;
          margin: 0 5px 0 10px;
        }
      }
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
    padding-bottom: 25px;
    text-align: center;
    .el-pagination {
      display: inline-block;
    }
  }
</style>
