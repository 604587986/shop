<template>
  <div id="settleup">
    <div class="header-cart-con header-cart-cm">
      <nuxt-link to="/cart">
        <i class="icon-carts"></i>
        <span>我的购物车</span>
        <em class="count cart_num cart-num" id="cart-num">0</em>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EnSettleup'
  }
</script>

<style type="text/scss" lang="scss" scoped>
  #settleup {
    .header-cart-cm {
      position: relative;
      border: 1px solid #eee;
      height: 28px;
      line-height: 28px;
      z-index: 1
    }
    .header-cart-con {
      width: 178px;
      height: 33px;
      line-height: 33px;
      border-color: #d2d2d2;
      a {
        display: block;
        color: #f42424;
      }
      .icon-carts {
        display: block;
        width: 25px;
        height: 30px;
        background: url(../assets/images/icon-header-cart.png) no-repeat center;
        background-size: 100%;
        margin-left: 30px;
        float: left;
      }
      .count {
        min-width: 13px;
        height: 13px;
        line-height: 13px;
        padding: 1px;
        border-radius: 50%;
        background: #f42424;
        color: #fff;
        position: absolute;
        top: 8px;
        left: 122px;
        text-align: center;
        font-size: 12px;
      }
      span {
        margin-left: 8px;
      }
      em {
        margin-left: 10px;
      }
    }
  }
</style>
