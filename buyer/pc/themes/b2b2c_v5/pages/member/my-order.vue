<template>
  <div id="my-order">
    <div class="order-nav">
      <ul class="order-nav-list">
        <li
          v-for="item in navList"
          :key="item.status"
          :class="[item.active && 'active']"
          @click="handleClickNav(item)"
        >{{ item.title }}</li>
      </ul>
    </div>
    <div class="order-search">
      <input type="text" placeholder="输入订单中商品关键词">
      <button type="button">搜索</button>
      <span v-if="orderData">搜到：<em style="color: #f42424">{{ orderData.data_total }}</em> 笔订单</span>
      <span v-else>搜索中...</span>
    </div>
    <div class="order-table">
      <div class="order-table-thead">
        <span style="width: 450px">商品名称</span>
        <span style="width: 80px">单价</span>
        <span style="width: 80px">数量</span>
        <span style="width: 150px">订单金额</span>
        <span style="width: 100px">订单状态</span>
        <span style="width: 110px">订单操作</span>
      </div>
      <ul class="order-table-tbody">
        <li v-for="order in orderData.data" :key="order.order_sn">
          <div class="order-tbody-title">
            <span class="pay-type">线上支付：</span>
            <span class="price"><em>￥</em>{{ order.order_amount | unitPrice }}</span>
          </div>
          <div class="order-tbody-ordersn">
            <span>订单编号：{{ order.order_sn }}</span>
            <span>下单时间：{{ order.create_time | unixToDate }}</span>
          </div>
          <div class="order-tbody-item">
            <div class="order-item-sku">
              <div class="sku-item" v-for="sku in order.skuList" :key="sku.sku_id">
                <div class="goods-image">
                  <nuxt-link :to="'/goods/' + sku.goods_id">
                    <img :src="sku.goods_image" :alt="sku.goods_name">
                  </nuxt-link>
                </div>
                <div class="goods-name">{{ sku.goods_name }}</div>
                <div class="sku-price">{{ sku.goods_price | unitPrice('￥') }}</div>
                <div class="sku-num">x {{ sku.num }}</div>
              </div>
            </div>
            <div class="order-item-price">
              <strong>{{ order.order_amount | unitPrice('￥') }}</strong>
              <p>运费（{{ order.shipping_amount | unitPrice('￥') }}）</p>
              <p>{{ order.payment_text }}</p>
            </div>
            <div class="order-item-status">{{ order.order_status_text }}</div>
            <div class="order-item-operate">
              <button type="button">订单付款</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as API_Order from '@/api/order'
  export default {
    name: 'my-order',
    data() {
      return {
        loading: true,
        orderData: '',
        navList: [
          { title: '所有订单', active: true, status: 'all' },
          { title: '待付款', active: false, status: 'wait-pay' },
          { title: '待发货', active: false, status: 'wait-ship' },
          { title: '已发货', active: false, status: 'shipped' },
          { title: '已取消', active: false, status: 'canceled' },
          { title: '已完成', active: false, status: 'complete' },
          { title: '待评论', active: false, status: 'wait-comments' },
        ],
        params: {
          page_no: 1,
          page_size: 5,
          status: 'all'
        }
      }
    },
    created() {
      this.GET_OrderList()
    },
    methods: {
      /** 订单筛选栏点击 */
      handleClickNav(nav) {
        this.navList = this.navList.map(item => {
          item.active = false
          return item
        })
        nav.active = true
        this.params.status = nav.status
        this.GET_OrderList()
      },
      /** 获取订单列表 */
      GET_OrderList() {
        this.loading = true
        API_Order.getOrderList(this.params).then(response => {
          this.orderData = response
          this.loading = flase
        }).catch(error => {
          this.loading = false
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .order-nav {
    position: relative;
    width: 100%;
    height: 38px;
    background-color: #fff;
    z-index: 1;
  }
  .order-nav-list {
    display: flex;
    align-items: center;
    height: 36px;
    background-color: #fff;
    li {
      background-color: #f7f7f7;
      border-right: 1px solid #e7e7e7;
      border-top: 1px solid #e7e7e7;
      border-bottom: 1px solid #e7e7e7;
      line-height: 35px;
      padding: 0 20px;
      color: #666;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      transition: background-color .3s ease-out;
      &:first-child {
        border-left: 1px solid #e7e7e7;
      }
      &.active {
        background-color: #fff;
        color: #f42424;
        border-bottom: none;
      }
      &:not(.active):hover {
        background-color: #e7e7e7;
        color: #000;
      }
    }
  }
  .order-search {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #e7e7e7;
    input {
      border: 1px solid #ccc;
      padding: 5px 15px;
      height: 15px;
      width: 150px;
      color: #333;
      border-radius: 3px;
      transition: border .2s ease-out;
      &:focus {
        border-color: rgba(244, 36, 36, .75);
      }
    }
    button {
      width: 80px;
      background-color: #e7e7e7;
      color: #333;
      cursor: pointer;
      line-height: 27px;
      margin-left: 10px;
      margin-right: 10px;
      transition: background-color .2s ease-out;
      border-radius: 3px;
      &:hover {
        background-color: #d3d3d3;
      }
    }
  }
  .order-table {
    .order-table-thead {
      display: flex;
      align-items: center;
      height: 20px;
      padding: 8px 0;
      text-align: center;
      color: #999;
    }
    .order-table-tbody {
      li {
        margin-bottom: 20px;
      }
    }
    .order-tbody-title {
      background-color: #faece0;
      border: 1px solid #f9dbcc;
      padding: 9px 0;
      text-align: left;
      .pay-type {
        color: #53514f;
        font-weight: 600;
        margin-left: 20px;
      }
      .price {
        color: #f42424;
        font-size: 14px;
        font-weight: 600;
        em {
          font-size: 12px;
          font-weight: normal;
        }
      }
    }
    .order-tbody-ordersn {
      background-color: #fff;
      border: 1px solid #f9dbcc;
      padding: 5px 0;
      color: #999;
      height: 20px;
      font-size: 12px;
      font-weight: 400;
      span { margin-left: 20px }
    }
    .order-tbody-item {
      display: flex;
      align-items: center;
      position: relative;
      border: 1px solid #f9dbcc;
      border-top: none;
      .order-item-sku {
        width: 450px + 80px + 80px;
      }
      .sku-item {
        display: flex;
        align-items: center;
        margin-top: 6px;
      }
      .goods-image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 86px;
        height: 86px;
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 66px;
          height: 66px;
          text-align: center;
          border: 1px solid #ccc;
          background-color: #fff;
        }
        img {
          width: 62px;
          height: 62px;
        }
      }
      .goods-name {
        width: 450px - 86px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .sku-price { color: #f42424 }
      .sku-price, .sku-num {
        width: 80px;
        text-align: center;
      }
      .order-item-price, .order-item-status {
        width: 100px;
        text-align: center;
      }
      .order-item-price {
        width: 150px;
        &::before {
          content: ' ';
          position: absolute;
          top: 0;
          right: 110px + 100px + 150px;
          width: 1px;
          height: 100%;
          background-color: #f9dbcc;
        }
        &::after {
          content: ' ';
          position: absolute;
          top: 0;
          right: 110px + 100px;
          width: 1px;
          height: 100%;
          background-color: #f9dbcc;
        }
        strong { color: #f42424 }
      }
      .order-item-status {
        &::after {
          content: ' ';
          position: absolute;
          top: 0;
          right: 110px;
          width: 1px;
          height: 100%;
          background-color: #f9dbcc;
        }
      }
      .order-item-operate {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 110px;
        button {
          display: block;
          width: 80px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #ccc;
          text-align: center;
          background: #f9f9f9;
          cursor: pointer;
          &:hover {
            background: #eaeaea;
          }
        }
      }
    }
  }
</style>
