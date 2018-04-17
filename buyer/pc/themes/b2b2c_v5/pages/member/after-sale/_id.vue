<template>
  <div id="after-sale-detail">
    <div v-if="detail" class="order-detail">
      <h1>订单信息</h1>
      <div class="detail-list">
        <dl><dt>订单编号：</dt><dd>20180412000001</dd></dl>
        <dl class="top-line"><dt>申请时间：</dt><dd>2018-04-12 17:08</dd></dl>
        <dl><dt>状态：</dt><dd><span>申请中</span></dd></dl>
        <dl><dt>申请售后原因：</dt><dd>收到商品与描述不符</dd></dl>
        <dl><dt>申请售后详细描述：</dt><dd>我TM就是想退货！！！</dd></dl>
        <dl><dt>退款方式：</dt><dd>支付宝</dd></dl>
        <dl><dt>申请售后金额：</dt><dd>2449</dd></dl>
      </div>
    </div>
    <div v-if="detail" class="goods-list">
      <sku-list :skuList="detail.skuList"></sku-list>
    </div>
  </div>
</template>

<script>
  import * as API_AfterSale from '@/api/after-sale'
  import SkuList from '@/components/MemberSkuList'
  export default {
    name: 'detail',
    components: {
      SkuList
    },
    data() {
      return {
        sn: this.$route.params.id,
        detail: ''
      }
    },
    mounted() {
      this.GET_AfterSaleDetail()
    },
    methods: {
      GET_AfterSaleDetail() {
        API_AfterSale.getAfterSaleDetail(this.sn).then(response => {
          this.detail = response
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .order-detail {
    background-color: #fbfbfb;
    border: 1px solid #d8d8d8;
    display: inline-block;
    letter-spacing: normal;
    vertical-align: top;
    width: 100%;
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
  .goods-list {
    margin-top: 20px;
  }
</style>
