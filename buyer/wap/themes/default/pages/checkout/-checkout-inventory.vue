<template>
  <van-popup id="inventory" v-model="show" position="right" style="width:100%;height:100%">
    <van-nav-bar title="购物清单" fixed left-arrow @click-left="$emit('close')"/>
    <div v-if="inventories" class="invs-container">
      <div class="list-item" v-for="(sku, index) in inventories" :key="index">
        <div class="container-item">
          <div class="img-container-item">
            <div class="box-img">
              <img :src="sku.goods_image">
            </div>
          </div>
          <div class="title-container-item">
            <div class="name-container-item">{{ sku.name }}</div>
            <div class="detail-container-item">
              <div class="price-box">
                <span class="price-box-span"><em>￥</em><span class="price"></span><em>{{ sku.purchase_price | unitPrice }}</em></span>
              </div>
              <span class="sam-num">x{{ sku.num }}</span>
            </div>
          </div>
        </div>
        <div class="gift-item">
          <div></div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
  /**
   * 结算页
   * 购物车清单组件
   */
  import * as API_Trade from '@/api/trade'
  export default {
    name: 'checkout-inventory',
    props: ['show', 'inventories']
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../assets/styles/color";
  .invs-container {
    padding-top: 46px;
  }
  .list-item {
    position: relative;
    padding: 15px 0 7px 10px;
    line-height: 18px;
    background-color: #fff;
    overflow: hidden;
    &:after {
      content: '';
      border-top: 1px solid #e0e0e0;
      display: block;
      width: 100%;
      position: absolute;
      right: 0;
    }
  }
  .container-item {
    display: flex;
  }
  .gift-item {
    width: 100%;
    height: auto;
    padding-right: 10px;
    box-sizing: border-box;
    margin-top: 12px;
  }
  .img-container-item {
    float: left;
    padding-right: 10px;
    text-align: center;
    width: 87px;
    .box-img {
      position: relative;
      float: left;
      margin-right: 7px;
      width: 77px;
      height: 77px;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        border: 1px solid #e3e5e9;
        border-radius: 4px;
        transform: scale(0.5);
        transform-origin: top left;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .title-container-item {
    position: relative;
    padding-right: 10px;
    width: auto;
    clear: both;
    float: none;
    -webkit-box-flex: 1;
    .name-container-item {
      display: -webkit-box;
      padding-top: 1px;
      padding-right: 20px;
      height: 34px;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 8px;
      font-size: 14px;
      line-height: 17px;
      color: #232326;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
    .detail-container-item {
      white-space: nowrap;
      font-size: 0;
      line-height: 17px;
      overflow: hidden;
      zoom: 1;
    }
    .price-box {
      float: left;
      font-size: 16px;
      color: $color-main;
      em {
        font-size: 12px;
      }
    }
    .sam-num {
      float: right;
      color: #848689;
      font-size: 13px;
      margin-top: 4px;
    }
  }
</style>
