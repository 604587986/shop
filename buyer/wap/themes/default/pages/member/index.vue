<template>
  <div id="member-index">
    <tab-bar :active="3"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import * as API_Members from '@/api/members'
  export default {
    name: 'member-index',
    data() {
      return {
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .user-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 148px;
    padding: 15px;
    border: 1px solid #e7e7e7;
    border-bottom: none;
    box-sizing: border-box;
    .user-item {
      display: flex;
      align-items: center;
      width: 375px;
      height: 100%;
      .user-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        margin-left: 10px;
        overflow: hidden;
        border-radius: 100%;
        box-shadow: 0 0 10px #ccc;
        img {
          width: 90px;
          height: 90px;
          border-radius: 100%;
          transition: all .2s ease-out;
          &:hover {
            width: 100%;
            height: 100%;
          }
        }
      }
      .user-info {
        margin-left: 15px;
        p {
          color: #777;
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
    .other-item {
      display: flex;
      align-items: center;
      flex-flow: column;
      width: 189px;
      height: 100%;
      border-left: 1px solid #e7e7e7;
      cursor: pointer;
      p {
        color: #666;
        font-size: 15px;
      }
      .iconfont {
        color: #FD92B0;
        font-size: 36px;
        margin: 15px 0;
      }
      .num { font-size: 20px }
    }
  }
  .box-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 410px;
    z-index: 1;
    font-family: "Hiragino Sans GB", "Microsoft Yahei", arial, 宋体, "Helvetica Neue", Helvetica, STHeiTi, sans-serif;;
    .item {
      box-sizing: border-box;
      height: 100%;
      padding: 10px;
      border: 1px solid #e7e7e7;
      transition: all .3s ease-out;
      z-index: 2;
      overflow: hidden;
      .item-title {
        display: flex;
        align-content: center;
        justify-content: space-between;
        h2 {
          border-left: 3px solid #fd6760;
          padding-left: 5px;
          font-size: 13px;
        }
      }
      .item-content { margin-top: 10px }
      &.left { width: 590px }
      &.right { width: 990px - 590px; border-left: none }
      &:hover {
        border-color: rgba(244, 36, 36, 0.5);
        box-shadow: 0 0 10px 0 #f42424;
        z-index: 10;
      }
    }
  }
  .box-item:last-child .item {
    border-top: none;
  }
  .goods-image {
    display: block;
    width: 80px;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .item.order {
    background-color: #fefbf8;
    .order-status {
      a {
        border-right: 1px solid #e7e7e7;
        padding: 0 15px;
        &:last-child { border-right: none }
      }
    }
    .order-item {
      display: flex;
      justify-items: center;
      background-color: #fbf8e9;
      margin-top: 10px;
      padding: 12px;
      .order-info {
        width: 320px;
        margin-left: 10px;
        .goods-name {
          display: block;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-size: 12px;
          color: #333;
          font-weight: 600;
        }
        .price { color: #f42424 }
      }
      p {
        color: #777;
        font-weight: 400;
      }
      .order-status-num {
        display: flex;
        justify-content: space-between;
      }
      .order-oper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 130px;
        a {
          cursor: pointer;
          font: 12px/20px "microsoft yahei";
          height: 20px;
          padding: 4px 12px;
          text-align: center;
          vertical-align: middle;
          color: #777 !important;
          border: 1px solid #dcdcdc;
          background: #f5f5f5;
        }
      }
    }
  }
  .item.cart {
    .cart-item {
      display: flex;
      justify-items: center;
      width: 100%;
      margin-bottom: 10px;
      transition: background-color .2s ease-in;
      &:hover { background-color: #fefbf8 }
    }
    .goods-image {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    .goods-name {
      display: flex;
      flex-flow: column;
      justify-content: center;
      width: 200px;
      a {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      p {
        display: flex;
        justify-content: space-between;
      }
      em {
        font-size: 12px;
        color: #f42424;
      }
      span { margin-right: 50px }
    }
    .delete-btn {
      color: red;
      align-self: center;
      margin-left: 20px;
    }
  }
  .item.goods-collection {
    .item-content {
      margin-left: -25px;
    }
    .goods-collection-item {
      width: 119px;
      height: 165px;
      border: 1px solid #e7e7e7;
      border-radius: 3px;
      float: left;
      margin-bottom: 10px;
      margin-left: 25px;
      transition: all .2s ease-in;
      &:hover {
        box-shadow: 0 0 15px #ccc;
      }
      .goods-image {
        width: 119px;
        height: 119px;
      }
      .goods-name {
        display: block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #333;
        padding: 0 5px;
      }
      .goods-price {
        display: flex;
        justify-content: space-between;
        padding: 0 5px;
      }
      .delete-btn { color: #f42424 }
    }
  }
  .item.shop-collection {
    .shop-collection-item {
      display: flex;
      height: 78px;
      border: 1px solid #e7e7e7;
      margin-bottom: 10px;
    }
    .shop-info {
      display: flex;
      flex-flow: column;
      width: 124px;
      height: 100%;
      img {
        width: 124px;
        height: 55px;
      }
      .shop-btns {
        display: flex;
        justify-content: space-between;
        height: 78px - 55px;
        a {
          width: 100%;
          height: 100%;
          text-align: center;
          border-right: 1px solid #e7e7e7;
          background-color: #f9f9f9;
          color: #666;
          &:hover {
            color: #f42424
          }
        }
      }
    }
    .shop-goods {
      position: relative;
      width: 359px - 124px;
      padding: 5px 10px;
      overflow: hidden;
      user-select: none;
      &:hover {
        /deep/ .swiper-button-next, .swiper-button-prev { opacity: 1 }
      }
    }
    .shop-goods-image {
      width: 100%;
      height: 100%;
    }
    /deep/ .swiper-button-next, .swiper-button-prev {
      opacity: 0;
      width: 20px;
      height: 100%;
      top: 0;
      margin-top: 0;
      background-size: 10px 20px;
      background-color: rgba(0,0,0,.5);
      transition: opacity .2s ease-in;
    }
    /deep/ .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
      opacity: 1;
    }
    /deep/ .swiper-button-prev { left: 0 }
    /deep/ .swiper-button-next { right: 0 }
  }
</style>

