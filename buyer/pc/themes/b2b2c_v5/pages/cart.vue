<template>
  <div id="cart">
    <div class="cart-header w">
      <div class="logo"><en-logo/></div>
      <ul class="cart-flow">
        <li class="active">
          <i class="flow-1"></i>
          <span></span>
          <p>我的购物车</p>
          <strong></strong>
        </li>
        <li>
          <i class="flow-2"></i>
          <span></span>
          <p>填写核对订单信息</p>
          <strong></strong>
        </li>
        <li>
          <i class="flow-3"></i>
          <span></span>
          <p>成功提交订单</p>
          <strong></strong>
        </li>
      </ul>
    </div>
    <div class="cart-content"></div>
  </div>
</template>

<script>
  export default {
    name: 'cart'
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .cart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    .logo {
      width: 260px;
      height: 60px;
    }
    .cart-flow {
      width: 640px;
      li {
        display: inline-block;
        font-size: 12px;
        height: 70px;
        letter-spacing: normal;
        position: relative;
        vertical-align: top;
        word-spacing: normal;
        z-index: 1;
        text-align: center;
        width: 180px;
        float: left;
        &.active {
          .flow-1 { background: url(../assets/images/icons-cart-flow.jpg) no-repeat -10px -43px }
          .flow-2 { background: url(../assets/images/icons-cart-flow.jpg) no-repeat -53px -43px }
          .flow-3 { background: url(../assets/images/icons-cart-flow.jpg) no-repeat -102px -4px }
          span { background: #27a9e3 }
          p { color: #27a9e3 }
          strong {
            background-color: #27a9e3;
            border-color: #27a9e3;
            box-shadow: 0 0 0 2px rgba(0, 153, 204, 0.15);
          }
        }
      }
      i {
        height: 36px;
        width: 36px;
        display: block;
        margin-left: 70px;
      }
      span {
        width: 180px;
        height: 1px;
        display: block;
        background: #ccc;
        margin: 5px 0;
      }
      strong {
        display: block;
        position: absolute;
        width: 5px;
        height: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
        left: 86px;
        top: 38px;
        background: #fff;
      }
      .flow-1 { background: url(../assets/images/icons-cart-flow.jpg) no-repeat -15px -4px }
      .flow-2 { background: url(../assets/images/icons-cart-flow.jpg) no-repeat -56px -4px }
      .flow-3 { background: url(../assets/images/icons-cart-flow.jpg) no-repeat -102px -4px }
    }
  }
</style>
