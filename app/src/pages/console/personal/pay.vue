<template>
  <section class="con-info">
    <ConBreadCrumbs :navShow="crumbs"/>
    <div class="con-info-user">
      <div v-if="!paid">
        <div class="con-pay-auto">
          <div class="con-pay-img">
            <img :src="getEwmUrl" alt="">
          </div>
          <el-form
            label-width="100px"
            class="con-pay-form"
            :rules="rules"
            :model="ruleForm"
            ref="ruleForm"
          >
            <el-form-item
              label="充值金额 :"
            >
              <el-button
                plain
                class="con-pay-btn"
                :class="{'is-checked': item.isChecked}"
                @click.prevent="changePayMoney(item)"
                :key="i"
                v-for="(item, i) in btns"
              >{{item.num}}<b class="small">元</b></el-button>
              <!--<el-button class="con-pay-btn" @click.prevent="changePayMoney">500<b class="small">元</b></el-button>-->
              <!--<el-button class="con-pay-btn" @click.prevent="changePayMoney">1000<b class="small">元</b></el-button>-->
              <div class="con-pay-custom-btn">
                <div class="con-pay-btn con-pay-custom" :class="{'is-custom': isCustom}">
                  <el-form-item prop="payMoney">
                    <el-input placeholder="自定义" v-model="ruleForm.payMoney" @focus="changeCustom"
                              @blur="blurCustom"></el-input>
                    <b class="small">元</b>
                  </el-form-item>
                </div>
                <p class="danger">*自定义金额必须为大于0的正整数，例如：1314</p>
              </div>
            </el-form-item>
            <el-form-item
              label="应付金额 :"
              v-show="checkPayMoney"
            >
              <p class="con-pay-money">{{checkPayMoney}}<b class="small">元</b></p>
            </el-form-item>
            <el-form-item
              label="支付方式 :"
            >
              <div class="con-pay-way">
                <div class="con-pay-btn con-pay-way-btn"
                     @click="changePay(pay)"
                     v-show="pay.isPayed"
                     :class="{'is-payed': pay.isPay}"
                     :key="i" v-for="(pay, i) in pays">
                  <i class="con-pay-way-btn-icon btn-icon1" :class="`btn-icon${i + 1}`"></i>
                  <span>{{pay.way.name}}</span>
                </div>
                <!--<div class="con-pay-btn con-pay-way-btn">-->
                <!--<i class="con-pay-way-btn-icon btn-icon2"></i>-->
                <!--<span>微信</span>-->
                <!--</div>-->
              </div>
              <!--<div class="con-pay-code" v-if="!payed">-->
              <!--<img :src="codeImg" alt="">-->
              <!--<p>请使用{{way.name}}扫一扫，扫描二维码支付</p>-->
              <!--<p>请尽快完成支付，超时订单将自动取消。</p>-->
              <!--</div>-->
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="con-pay-btn"
                @click="onSubmit('ruleForm')">立即支付
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="con-pay-info">
          <h3>充值说明</h3>
          <p>落地运营平台充值金额可用来缴纳车辆新办理入网和车辆入网续费的费用。</p>
          <p>若账户不再使用需要退还账户余额，请联系客服办理！</p>
        </div>
      </div>
      <div v-else class="con-paid">
        <div class="con-paid-type is-success">
          <i></i>
          <b>支付成功</b>
        </div>
        <div class="con-paid-info">
          <p class="con-paid-info-title">恭喜您支付成功，详情如下：</p>
          <template>
            <el-table
              class="con-paid-table"
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                label="充值详情">
                <el-table-column
                  prop="title">
                </el-table-column>
                <el-table-column
                  prop="info">
                </el-table-column>
              </el-table-column>
            </el-table>
          </template>
          <div class="con-paid-back">
            <el-button type="primary">返回商户</el-button>
            <p class="con-paid-back-time">9秒后自动返回</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ToastTip from '@/lib/message';
import ConBreadCrumbs from '@/components/console/con-bread-crumbs/index';
import payService from '@/services/pay';
import { mapGetters } from 'vuex';
import { getUrlConfig } from '@/http/http.url.config';

export default {
  name: 'Pay',
  metaInfo: {
    title: '控制台-充值'
  },
  data () {
    let checkNum = (rule, value, callback) => {
      if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
        callback(new Error('请输入正整数值'));
      } else {
        callback();
      }
    };
    return {
      times: null,
      crumbs: {
        nav: [
          {
            title: '我的余额',
            path: '/console/balance/index.html'
          }
        ],
        current: '充值'
      },
      tableData: [
        {
          title: '订单号',
          info: '343243214idsfdsfsfds324243243'
        },
        {
          title: '支付金额',
          info: '500元'
        },
        {
          title: '用途',
          info: '落地运营平台余额充值'
        }
      ],
      payImg: '', // 支付二维码
      ruleForm: {
        payMoney: ''
      },
      btns: [ // 支付金额
        {
          num: 100,
          isChecked: false
        },
        {
          num: 500,
          isChecked: false
        },
        {
          num: 1000,
          isChecked: false
        }
      ],
      pays: [
        {
          way: {
            name: '支付宝',
            arg: 'ALIPAY'
          },
          isPay: false,
          isPayed: true
          // },
          // {
          //   way: {
          //     name: '微信',
          //     arg: 'WEIXIN'
          //   },
          //   isPay: false,
          //   isPayed: true
        }
      ],
      way: '', // 支付方式
      isCustom: false,
      rules: {
        payMoney: [
          {validator: checkNum, trigger: 'blur'}
        ]
      },
      formNum: 0,
      payed: true, // 去支付
      paid: false // 支付完成
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentUser'
    ]),
    checkPayMoney () {
      return !Number.isInteger(Number(this.ruleForm.payMoney)) || Number(this.ruleForm.payMoney) <= 0
        ? ''
        : this.ruleForm.payMoney;
    },
    getEwmUrl () {
      if (this.payImg) {
        let {accountNo, orderNo, orderPrice, payWayType, orderForm, productName, orderIp} = this.payImg;
        return `${getUrlConfig(
          'getEwmUrl').url}?accountNo=${accountNo}&orderNo=${orderNo}&orderPrice=${orderPrice}&payWayType=${payWayType}&orderForm=${encodeURIComponent(
          orderForm)}&productName=${encodeURIComponent(productName)}&orderIp=${orderIp}`;
      }
      return '';
    }
  },
  methods: {
    async onSubmit (formName) {
      if (!this.checkPayMoney) {
        ToastTip.error('请选择充值金额');
        return false;
      }
      if (!this.way) {
        ToastTip.error('请选择支付方式');
        return false;
      }
      // console.log(`submit:充值金额${parseInt(this.ruleForm.payMoney)}元，充值方式${this.way}`);
      payService.goPay({
        orderPrice: this.ruleForm.payMoney,
        payWayType: this.way.arg,
        token: this.getCurrentUser.token
      });
      console.log('支付了！');
      // if (code) {
      // 显示支付方式
      // this.pays.map(ele => {
      //   ele.isPayed = ele.way === this.way ? Boolean(true) : Boolean(false);
      // });
      // this.payed = false;
      // } else {
      //   ToastTip.error('支付失败！');
      // }
    },
    changePayMoney (item) {
      this.isCustom = false;
      this.ruleForm.payMoney = item.num;
      // 修复表单是否与原值
      if (this.formNum !== this.checkPayMoney) {
        this.way = '';
        this.pays.map(ele => {
          ele.isPay = false;
        });
      }
      this.btns.map(ele => {
        ele.isChecked = ele === item ? Boolean(true) : Boolean(false);
      });
    },
    blurCustom () {
      // 修复表单是否与原值
      if (this.formNum !== this.checkPayMoney) {
        this.way = '';
        this.pays.map(ele => {
          ele.isPay = false;
        });
      }
    },
    changeCustom () {
      this.btns.map(ele => {
        ele.isChecked = false;
      });
      this.isCustom = true;
    },
    async changePay (item) {
      if (this.checkPayMoney) {
        this.way = item.way;
        if (this.way) {
          this.interResult();
          this.pays.map(ele => {
            ele.isPay = ele === item ? Boolean(true) : Boolean(false);
          });
          // 请求二维码
          if (this.formNum !== this.checkPayMoney) {
            this.formNum = this.checkPayMoney;
            let {code, data, message} = await payService.postEwm({
              orderPrice: this.checkPayMoney,
              payWayType: this.way.arg,
              token: this.getCurrentUser.token
            });
            if (code === 1) {
              // 获取二维码
              // let {code, data, message} = await payService.getEwmUrl(data);
              this.payImg = data;
              console.log(this.payImg);
            } else {
              ToastTip.error(message);
            }
          }
        }
      } else {
        ToastTip.error('请先选择充值金额');
      }
    },
    async orderResult () {
      if (this.payImg.orderNo) {
        let {data} = await payService.postPayRes({
          orderNo: this.payImg.orderNo,
          accountNo: this.payImg.orderNo,
          token: this.getCurrentUser.token
        });
        return data;
      }
    },
    interResult () {
      let _self = this;
      this.times = setInterval(() => {
        let data = _self.orderResult();
        if (data.status === 'YES') {
          clearInterval(this.times);
          payService.postPaied({
            orderNo: this.payImg.orderNo,
            accountNo: this.payImg.orderNo,
            token: this.getCurrentUser.token
          });
        }
      }, 10000);
    }
  },
  destroyed: function () {
    clearInterval(this.times);
  },
  components: {
    ConBreadCrumbs
  }
};
</script>

<style scoped lang="scss">
  $dui: '~@/assets/images/balance/dui.png';
  $zfb: '~@/assets/images/balance/zfb.png';
  $wx: '~@/assets/images/balance/weixin.png';
  $cuo: '~@/assets/images/balance/cuo.png';
  $ewm: '~@/assets/images/balance/ewm.png';
  $allColor: #4475FD;
  .con-pay-title {
    justify-content: start;
    .con-pay-cost {
      font-size: 18px;
      cursor: pointer;
      margin-right: 5px;
      &:hover {
        color: #409EFF;
      }
    }
  }

  .con-pay-auto {
    width: 600px;
    margin: 0 auto;
    position: relative;
    .con-pay-img {
      position: absolute;
      right: 55px;
      bottom: 0;
      width: 130px;
      height: 130px;
      background: url($ewm) no-repeat;
      background-size: 100% 100%;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      &:before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 16px;
        height: 16px;
        opacity: .8;
        margin: -8px 0 0 -8px;
        background: url($zfb) #fff no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }

  .con-pay-form {
    padding: 30px 0 0 50px;
    .con-pay-btn {
      width: 120px;
    }
    .con-pay-custom-btn {
      .con-pay-custom {
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 0 10px;
        margin-top: 15px;
        .el-input {
          width: 75%;
          height: 40px;
          line-height: 40px;
          /deep/ input {
            height: 28px;
            line-height: 28px;
            border-radius: 0;
            border: 0;
            border-bottom: 1px solid #dcdfe6;
          }
        }
        /deep/ .el-form-item__error {
          left: auto;
          right: -106px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .con-pay-money {
      font-size: 20px;
      color: #4475FD;
    }
    .con-pay-way {
      display: flex;
      .con-pay-way-btn {
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
        margin-right: 10px;
        cursor: pointer;
        &.is-payed {
          border-color: #409EFF;
          &:before {
            content: '';
            position: absolute;
            width: 80px;
            height: 20px;
            background: #409EFF;
            right: -44px;
            bottom: 0;
            transform: rotate(-32deg);
          }
          &:after {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            color: #fff;
            width: 14px;
            height: 14px;
            background: url($dui) no-repeat;
            background-size: 100% 100%;
          }
        }
        .con-pay-way-btn-icon {
          width: 20px;
          height: 20px;
          margin-right: 8px;
          &.btn-icon1 {
            background: url($zfb) no-repeat;
            background-size: 100% 100%;
          }
          &.btn-icon2 {
            background: url($wx) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .con-pay-code {
      margin-top: 35px;
      img {
        display: block;
        width: 200px;
        height: 200px;
        margin-bottom: 15px;
      }
      p {
        font-size: 12px;
        color: #666;
        line-height: 24px;
      }
    }
    .danger {
      color: #F56C6C;
      font-size: 12px;
    }
    .small {
      font-weight: normal;
      font-size: 12px;
      margin-left: 4px;
    }
    .is-checked {
      color: #fff;
      background-color: $allColor;
      border-color: $allColor;
    }
    .is-custom {
      border-color: #409EFF !important;
    }
  }

  .con-pay-info {
    border-top: 1px solid #eee;
    padding: 15px 30px 0;
    margin: 50px 50px 0;
    h3 {
      font-size: 14px;
      color: #666;
      line-height: 40px;
    }
    p {
      font-size: 12px;
      color: #aaa;
      line-height: 18px;
    }
  }

  .con-paid {
    .con-paid-type {
      padding: 50px 0;
      text-align: center;
      &.is-err {
        i {
          background: #F56C6C;
          border: 4px solid rgba(245, 108, 108, 0.15);
          &:before {
            background: url($cuo) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      &.is-success {
        i {
          background: rgba(27, 205, 147, 1);
          border: 4px solid rgba(27, 205, 147, 0.15);
          &:before {
            background: url($dui) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      i {
        margin: 0 auto 20px;
        display: block;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
        }
      }
      b {
        font-size: 16px;
        color: #333;
      }
    }
    .con-paid-info {
      width: 460px;
      margin: 0 auto;
      .con-paid-info-title {
        font-size: 14px;
        color: #aaa;
        line-height: 20px;
        margin-bottom: 15px;
      }
      .con-paid-table {
        font-size: 14px !important;
        /deep/ thead > tr:nth-of-type(2) {
          display: none !important;
        }
      }
      .con-paid-back {
        padding: 30px 0 0;
        text-align: center;
        .con-paid-back-time {
          font-size: 14px;
          color: #aaa;
          padding-top: 14px;
        }
      }
    }
  }
</style>
