<template>
  <section class="con-info">
    <ConBreadCrumbs :navShow="crumbs" :btnShow="payBtn"/>
    <el-row type="flex" :gutter="20" class="con-blocks">
      <con-block :key="i" :index="i" :block="item" :isWhite="isWhite" v-for="(item, i) in block"/>
    </el-row>
    <div class="con-info-user">
      <!--<h3 class="con-info-user-title">-->
      <!--我的余额-->
      <!--<router-link to="/console/pay" tag="div">-->
      <!--<el-button type="primary" size="mini">充值</el-button>-->
      <!--</router-link>-->
      <!--</h3>-->
      <div class="con-bal-data">
        <div class="con-bal-data-tab">
          <template>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <!--<el-tab-pane label="充值记录" name="first">用户管理</el-tab-pane>-->
              <el-tab-pane :key="i" v-for="(item, i) in tabs" :label="item.name" :name="item.bindName">
                <template>
                  <el-table
                    :data="item.data"
                    class="my-table"
                    stripe>
                    <el-table-column
                      v-for="(list, i) in item.title"
                      :label="list"
                      :prop="item.prop[i]"
                      :key="i"
                      :width="[ i > 0 ? '' : '120px' ]"
                      :align="( i > 0 ? 'left' : 'center' )"
                      class="tabs"
                    >
                    </el-table-column>
                  </el-table>
                </template>
                <div class="con-bal-pages" v-if="item.total > 10">
                  <el-pagination
                    @current-change="pageChangeHandle"
                    :current-page="getCurrentPage"
                    background
                    layout="prev, pager, next"
                    :total="item.total">
                  </el-pagination>
                </div>
              </el-tab-pane>
            </el-tabs>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ConBreadCrumbs from '@/components/console/con-bread-crumbs/index';
import ConBlock from '@/components/console/con-block/con-block';
import { BalanceService } from '@/services/balance';

let balanceService = new BalanceService();
export default {
  name: 'PersonalBalance',
  metaInfo: {
    title: '控制台-我的余额'
  },
  data () {
    return {
      activeName: 'pay',
      block: [
        {num: 0, title: '当前余额（元）'},
        {num: 0, title: '昨日消费（元）'},
        {num: 0, title: '本月充值（元）'},
        {num: 0, title: '本月消费（元）'}
      ],
      isWhite: true,
      tabs: [
        {
          name: '充值记录',
          bindName: 'pay',
          title: ['序号', '充值金额（元）', '充值方式', '充值时间'],
          prop: ['count', 'cost', 'way', 'date'],
          data: [],
          total: 0
        },
        {
          name: '消费记录',
          bindName: 'cost',
          title: ['日期', '消费金额（元）', '调用接口个数', '调用总次数'],
          prop: ['date', 'cost', 'count', 'all'],
          data: [],
          total: 0
        }
      ],
      payPage: 1,
      costPage: 1,
      crumbs: {
        current: '我的余额'
      },
      payBtn: {
        title: '充值',
        path: '/console/pay/index.html'
      }
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
      this.getTabData();
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event);
      if (tab.name === 'pay') {
        this.pageChangeHandle(this.payPage);
      } else if (tab.name === 'cost') {
        this.pageChangeHandle(this.costPage);
      }
    },
    pageChangeHandle (val) {
      // 将路由跳转到对应page页
      this.$router.push({path: '/console/balance/index.html', query: {type: this.activeName, page: val}});
    },
    async getTabData () {
      // 获取tab栏数据
      let {page = 1, type = 'pay'} = this.$route.query;
      // 修改tab默认显示
      this.activeName = type;
      if (type === 'pay') {
        this.payPage = page;
        let {data = [], totalCount = 0} = await balanceService.getTabPay({
          pageSize: 10,
          pageNum: page
        });
        this.tabs[0].data = data;
        this.tabs[0].total = totalCount;
      } else if (type === 'cost') {
        this.costPage = page;
        let {data = [], totalCount = 0} = await balanceService.getTabCost({
          pageSize: 10,
          pageNum: page
        });
        this.tabs[1].data = data;
        this.tabs[1].total = totalCount;
      }
    },
    async getTop () {
      // 获取顶部数据
      let {yesterdayConsumeSum = 0, money = 0, monthRechargeSum = 0, monthConsumeSum = 0} = await balanceService.getTop();
      // console.log(yuE, cost, pay, mouthCost);
      this.block[0].num = money;
      this.block[1].num = yesterdayConsumeSum;
      this.block[2].num = monthRechargeSum;
      this.block[3].num = monthConsumeSum;
    }
  },
  mounted: function () {
    this.getTabData();
    this.getTop();
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

  .con-bal-data {
    .con-bal-data-tab {
      padding-bottom: 15px;
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
