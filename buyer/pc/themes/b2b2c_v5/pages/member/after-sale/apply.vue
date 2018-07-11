<template>
  <div id="apply-after-sale">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li :class="[type === 'money' && 'active']" @click="handleChangeType('money')">申请退款</li>
        <li :class="[type === 'goods' && 'active']" @click="handleChangeType('goods')">申请退货</li>
      </ul>
    </div>
    <div class="apply-container">
      <div v-show="type === 'money'">
        <el-form :model="returnMoneyForm" :rules="returnMoneyRules" ref="returnMoneyForm" label-width="120px">
          <el-form-item label="退款方式：" prop="account_type">
            <el-select v-model="returnMoneyForm.account_type" size="small" placeholder="请选择退款方式">
              <el-option label="支付宝" value="ALIPAY"></el-option>
              <el-option label="微信" value="WEIXINPAY"></el-option>
              <el-option label="银行转账" value="BANKTRANSFER"></el-option>
            </el-select>
          </el-form-item>
          <div v-if="returnMoneyForm.account_type === 'BANKTRANSFER'">
            <el-form-item label="银行名称：" prop="bank_name">
              <el-input v-model="returnMoneyForm.bank_name" size="small" :maxlength="180" placeholder="请输入银行名称"/>
            </el-form-item>
            <el-form-item label="银行开户行：" prop="bank_deposit_name">
              <el-input v-model="returnMoneyForm.bank_deposit_name" size="small" :maxlength="180" placeholder="请输入银行开户行"/>
            </el-form-item>
            <el-form-item label="银行开户名：" prop="bank_account_name">
              <el-input v-model="returnMoneyForm.bank_account_name" size="small" :maxlength="180" placeholder="请输入银行开户名"/>
            </el-form-item>
            <el-form-item label="银行账号：" prop="bank_account_number">
              <el-input v-model="returnMoneyForm.bank_account_number" size="small" :maxlength="180" placeholder="请输入银行账号"/>
            </el-form-item>
          </div>
          <el-form-item v-else label="退款账号：" prop="return_account">
            <el-input v-model="returnMoneyForm.return_account" size="small" :maxlength="180" placeholder="请输入退款账号"/>
          </el-form-item>
          <el-form-item label="退款原因：" prop="refund_reason">
            <el-select v-model="returnMoneyForm.refund_reason" size="small" placeholder="请选择退款原因">
              <el-option label="商品质量有问题" value="商品质量有问题"></el-option>
              <el-option label="收到商品与描述不符" value="收到商品与描述不符"></el-option>
              <el-option label="不喜欢/不想要" value="不喜欢/不想要"></el-option>
              <el-option label="发票问题" value="发票问题"></el-option>
              <el-option label="空包裹" value="空包裹"></el-option>
              <el-option label="快递无记录" value="快递无记录"></el-option>
              <el-option label="快递一直没有收到" value="快递一直没有收到"></el-option>
              <el-option label="买错/不想要" value="买错/不想要"></el-option>
              <el-option label="未按照时间发货" value="未按照时间发货"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款金额：">
            <span style="color: #f42424;">￥</span>
            <span style="font-size: 16px;font-weight: 600;color: #f42424;">{{ (returnMoneyForm.return_money || 0) | unitPrice }}</span>
          </el-form-item>
          <el-form-item label="问题描述：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入问题描述(180字以内)"
              :maxlength="180"
              style="width: 300px"
              v-model="returnMoneyForm.customer_remark">
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="danger" size="small" @click="handleSubmitRturnMoney">提交申请</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="type === 'goods'">
        <div class="order-detail">
          <div class="order-intro">
            <h1>订单信息</h1>
            <div class="detail-list">
              <dl><dt>收货地址：</dt><dd>北京海淀区三环以内-asdfasdf-adsf</dd></dl>
              <dl class="top-line"><dt>订单编号：</dt><dd>20180412000002</dd></dl>
              <dl><dt>付款方式：</dt><dd>在线支付</dd></dl>
              <dl><dt>已付款金额：</dt><dd>380</dd><input type="hidden" value="380"></dl>
              <dl><dt>下单时间：</dt><dd>2018-04-12 18:34</dd></dl>
            </div>
          </div>
          <el-form :model="returnGoodsForm" :rules="returnGoodsRules" ref="returnGoodsForm" label-width="100px" style="margin-top: 10px">
            <el-form-item label="退款方式：" prop="account_type">
              <el-select v-model="returnGoodsForm.account_type" size="small" placeholder="请选择退款方式">
                <el-option label="支付宝" value="ALIPAY"></el-option>
                <el-option label="微信" value="WEIXINPAY"></el-option>
                <el-option label="银行转账" value="BANKTRANSFER"></el-option>
              </el-select>
            </el-form-item>
            <div v-if="returnMoneyForm.account_type === 'BANKTRANSFER'">
              <el-form-item label="银行名称：" prop="bank_name">
                <el-input v-model="returnMoneyForm.bank_name" size="small" :maxlength="180" placeholder="请输入银行名称"/>
              </el-form-item>
              <el-form-item label="银行开户行：" prop="bank_deposit_name">
                <el-input v-model="returnMoneyForm.bank_deposit_name" size="small" :maxlength="180" placeholder="请输入银行开户行"/>
              </el-form-item>
              <el-form-item label="银行开户名：" prop="bank_account_name">
                <el-input v-model="returnMoneyForm.bank_deposit_name" size="small" :maxlength="180" placeholder="请输入银行开户名"/>
              </el-form-item>
              <el-form-item label="银行账号：" prop="bank_account_number">
                <el-input v-model="returnMoneyForm.bank_account_number" size="small" :maxlength="180" placeholder="请输入银行账号"/>
              </el-form-item>
            </div>
            <el-form-item v-else label="退款账号：" prop="return_account">
              <el-input v-model="returnMoneyForm.return_account" size="small" :maxlength="180" placeholder="请输入退款账号"/>
            </el-form-item>
            <el-form-item label="退货原因：" prop="name">
              <el-select v-model="returnGoodsForm.refund_reason" size="small" placeholder="请选择退款原因">
                <el-option label="商品质量有问题" value="商品质量有问题"></el-option>
                <el-option label="收到商品与描述不符" value="收到商品与描述不符"></el-option>
                <el-option label="不喜欢/不想要" value="不喜欢/不想要"></el-option>
                <el-option label="发票问题" value="发票问题"></el-option>
                <el-option label="空包裹" value="空包裹"></el-option>
                <el-option label="快递无记录" value="快递无记录"></el-option>
                <el-option label="快递一直没有收到" value="快递一直没有收到"></el-option>
                <el-option label="买错/不想要" value="买错/不想要"></el-option>
                <el-option label="未按照时间发货" value="未按照时间发货"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="退款金额：" prop="name">
              <span style="color: #f42424;">￥</span>
              <span style="font-size: 16px;font-weight: 600;color: #f42424;">{{ 2333.33 | unitPrice }}</span>
            </el-form-item>
            <el-form-item label="退货数量：" prop="name">
              <el-input-number size="mini" v-model="returnGoodsForm.return_num"></el-input-number>
            </el-form-item>
            <el-form-item label="问题描述：" prop="name">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入问题描述(180字以内)"
                :maxlength="180"
                style="width: 300px"
                v-model="returnGoodsForm.customer_remark">
              </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button type="danger" size="small" @click="handleSubmitRturnGoods">提交申请</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div v-if="order" class="goods-list">
      <sku-list :skuList="skuList" name="name" price="purchase_price" total="subtotal"/>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { InputNumber, Select, Option } from 'element-ui'
  Vue.use(InputNumber)
  Vue.use(Select)
  Vue.use(Option)
  import * as API_AfterSale from '@/api/after-sale'
  import SkuList from '../-skuList'
  export default {
    name: 'apply',
    components: { SkuList },
    data() {
      return {
        // 订单详情
        order: '',
        // 货品列表
        skuList: [],
        // 申请售后类型
        type: this.$route.query.sku_id ? 'money' : 'money',
        // 申请退款 表单
        returnMoneyForm: {
          order_sn: this.$route.query.order_sn
        },
        // 申请退款 表单规则
        returnMoneyRules: {
          // 退款方式
          account_type: [this.MixinRequired('请选择退款方式！', 'change')],
          // 退款账号
          return_account: [{ required: true, message: '请输入退款账号', trigger: 'blur' }],
          // 银行名称
          bank_name: [{ required: false, message: '请输入银行名称', trigger: 'blur' }],
          // 银行开户行
          bank_deposit_name: [{ required: false, message: '请输入银行开户行', trigger: 'blur' }],
          // 银行开户名
          bank_account_name: [{ required: false, message: '请输入银行开户名', trigger: 'blur' }],
          // 银行账号
          bank_account_number: [{ required: false, message: '请输入银行账号', trigger: 'blur' }],
          // 退款原因
          refund_reason: [this.MixinRequired('请选择退款原因！')]
        },
        // 申请退货 表单
        returnGoodsForm: {},
        // 申请退货 表单规则
        returnGoodsRules: {},
        // 是否为取消订单模式
        isCancel: !(!!this.$route.query.sku_id),
        ...this.$route.query
      }
    },
    mounted() {
      // 获取售后数据
      API_AfterSale.getAfterSaleData(this.order_sn, this.sku_id).then(response => {
        this.order = response.order
        this.skuList = response.sku_list
        this.returnMoneyForm.return_money = response.return_money
        this.returnGoodsForm.return_money = response.return_money
      })
    },
    watch: {
      'returnMoneyForm.account_type': function (newVal) {
        this.returnMoneyRules.return_account[0].required = newVal !== 'BANKTRANSFER'
        this.returnMoneyRules.bank_name[0].required = newVal === 'BANKTRANSFER'
        this.returnMoneyRules.bank_deposit_name[0].required = newVal === 'BANKTRANSFER'
        this.returnMoneyRules.bank_account_name[0].required = newVal === 'BANKTRANSFER'
        this.returnMoneyRules.bank_account_number[0].required = newVal === 'BANKTRANSFER'
      },
      'returnGoodsForm.account_type': function (newVal) {
        console.log(newVal)
      }
    },
    methods: {
      /** 申请售后类型发生变化 */
      handleChangeType(type) {
        this.type = type
      },
      /** 申请退款 */
      handleSubmitRturnMoney() {
        this.$refs['returnMoneyForm'].validate((valid) => {
          if (valid) {
            const params = JSON.parse(JSON.stringify(this.returnMoneyForm))
            if (this.isCancel) {
              API_AfterSale.applyAfterSaleCancel(params).then(this.handleApplySuccess)
            } else {
              params.sku_id = this.sku_id
              API_AfterSale.applyAfterSaleMoney(params).then(this.handleApplySuccess)
            }
          } else {
            this.$message.error('表单填写有误，请核对！')
            return false
          }
        })
      },
      /** 申请退货 */
      handleSubmitRturnGoods() {
        API_AfterSale.applyAfterSaleGoods(this.returnGoodsForm).then(this.handleApplySuccess)
      },
      /** 申请售后成功 */
      handleApplySuccess() {
        this.$message.success('申请成功！')
        this.$router.go(-1)
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .goods-list {
    margin-top: 20px;
  }
  .apply-container {
    padding-top: 20px;
    .order-detail {
      display: flex;
      border: 1px solid #d8d8d8;
      position: relative;
      z-index: 2;
    }
    .order-intro {
      background-color: #fbfbfb;
      border-right: 1px solid #d8d8d8;
      letter-spacing: normal;
      vertical-align: top;
      width: 389px;
      word-spacing: normal;
      h1 {
        background-color: #f3f3f3;
        border-bottom: 1px solid #d8d8d8;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        line-height: 20px;
        padding: 9px;
      }
      .detail-list {
        display: block;
        padding: 17px 17px 7px;
        width: auto;
      }
      dl {
        margin-bottom: 10px;
        display: inline-block;
        font-size: 12px;
        letter-spacing: normal;
        line-height: 20px;
        vertical-align: top;
        word-spacing: normal;
        width: 100%;
        &.top-line {
          border-top: 1px dotted #d8d8d8;
          padding-top: 10px;
        }
      }
      dt {
        color: #888;
        width: 23%;
        float: left;
        display: inline;
      }
      dd {
        color: #666;
        width: 77%;
        float: left;
        display: inline;
      }
    }
  }
  /deep/ .el-input {
    width: 212px;
  }
</style>
