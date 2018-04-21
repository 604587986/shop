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
        <el-form :model="returnMoneyForm" :rules="returnMoneyRules" ref="returnMoneyForm" label-width="100px">
          <el-form-item label="退款方式：" prop="name">
            <el-select v-model="returnMoneyForm.return_way" size="small" placeholder="请选择退款方式">
              <el-option label="支付宝" value="alpay"></el-option>
              <el-option label="微信" value="weixin"></el-option>
              <el-option label="银行转账" value="bank"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款原因：" prop="name">
            <el-select v-model="returnMoneyForm.return_reason" size="small" placeholder="请选择退款原因">
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
          <el-form-item label="退还积分：" prop="name">
            <span>0</span>
          </el-form-item>
          <el-form-item label="问题描述：" prop="name">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 6}"
              placeholder="请输入问题描述(180字以内)"
              :maxlength="180"
              style="width: 300px"
              v-model="returnMoneyForm.describe">
            </el-input>
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
            <el-form-item label="退款方式：" prop="name">
              <el-select v-model="returnGoodsForm.return_way" size="small" placeholder="请选择退款方式">
                <el-option label="支付宝" value="alpay"></el-option>
                <el-option label="微信" value="weixin"></el-option>
                <el-option label="银行转账" value="bank"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="退货原因：" prop="name">
              <el-select v-model="returnGoodsForm.return_reason" size="small" placeholder="请选择退款原因">
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
                :autosize="{ minRows: 3, maxRows: 6}"
                placeholder="请输入问题描述(180字以内)"
                :maxlength="180"
                style="width: 300px"
                v-model="returnGoodsForm.describe">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div v-if="order" class="goods-list">
      <sku-list :skuList="order.skuList"/>
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
        order_sn: '',
        order: '',
        type: 'goods',
        /** 申请退款 表单 */
        returnMoneyForm: {},
        /** 申请退款 表单规则 */
        returnMoneyRules: {},
        /** 申请退货 表单 */
        returnGoodsForm: {},
        /** 申请退货 表单规则 */
        returnGoodsRules: {}
      }
    },
    methods: {
      /** 申请售后类型发生变化 */
      handleChangeType(type) {
        this.type = type
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
</style>
