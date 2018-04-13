<template>
  <div id="shortcut">
    <div class="w">
      <div class="login-status">
        <span>您好，欢迎来到</span>
        <nuxt-link to="/" style="color: #333">Javashop示例商城</nuxt-link>
        <span>[<nuxt-link to="/login">登录</nuxt-link>] [<nuxt-link to="/register">注册</nuxt-link>]</span>
      </div>
      <ul class="links">
        <li>
          <div class="dt"><a target="_blank" href="/">商家中心</a></div>
        </li>
        <li class="spacer"></li>
        <li class="dorpdown">
          <div class="dt hs-icon">
            <a href="/member/my-order#all">我的订单</a>
            <i class="iconfont ea-icon-arrow-down"></i>
          </div>
          <div class="dd dorpdown-layer">
            <dl>
              <dd><a href="/member/my-order#wait-pay">待付款订单</a></dd>
              <dd><a href="/member/my-order#shipped">已发货订单</a></dd>
              <dd><a href="/member/my-order#wait-comments">待评价订单</a></dd>
            </dl>
          </div>
        </li>
        <li class="spacer"></li>
        <li class="dorpdown">
          <div class="dt hs-icon">
            <a target="_blank" href="/">我的收藏</a>
            <i class="iconfont ea-icon-arrow-down"></i>
          </div>
          <div class="dd dorpdown-layer">
            <dl>
              <dd><a href="/">收藏的商品</a></dd>
              <dd><a href="/">收藏的店铺</a></dd>
            </dl>
          </div>
        </li>
        <li class="spacer"></li>
        <li class="dorpdown">
          <div class="dt hs-icon">
            <a target="_blank" href="/">客户服务</a>
            <i class="iconfont ea-icon-arrow-down"></i>
          </div>
          <div class="dd dorpdown-layer">
            <dl>
              <dd><a href="/help/help.html">帮助中心</a></dd>
              <dd><a href="/">售后中心</a></dd>
              <dd><a href="/">客服中心</a></dd>
            </dl>
          </div>
        </li>
        <li class="spacer"></li>
        <li class="dorpdown">
          <div class="dt hs-icon">
            <a target="_blank" href="/">站点导航</a>
            <i class="iconfont ea-icon-arrow-down"></i>
          </div>
          <div class="dd dorpdown-layer">
            <dl>
              <dd><a href="/">商城首页</a></dd>
              <dd><a href="/">商家中心</a></dd>
              <dd><a href="/">个人中心</a></dd>
            </dl>
          </div>
        </li>
        <li class="spacer"></li>
        <li>
          <div class="dt">
            <a target="_blank" href="/">站内消息[0]</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EnShortcut'
  }
</script>

<style type="text/scss" lang="scss" scoped>
  #shortcut {
    border-bottom: 1px solid #ddd;
    background-color: #e3e4e5;
    .w {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      line-height: 30px;
    }
    .login-status {
      a { color: #666 }
    }
    a:hover {
      color: #e33333
    }
  }
  .links {
    z-index: 999;
    a {
      color: #999;
      display: block;
    }
    li {
      position: relative;
      float: left;
      &.spacer {
        overflow: hidden;
        margin: 11px 5px 0;
        width: 1px;
        height: 10px;
        background-color: #ccc;
      }
      &.dorpdown:hover {
        .dorpdown-layer {
          display: block;
        }
        .dt {z-index: 3;}
        .iconfont {transform: rotate(180deg);}
      }
      .dt {
        padding-left: 7px;
        padding-right: 7px;
        &.hs-icon {
          height: 28px;
          line-height: 28px;
          overflow: hidden;
          position: relative;
          z-index: 1;
          float: left;
          padding-right: 20px;
        }
        .iconfont {
          position: absolute;
          right: 5px;
          top: 10px;
          width: 12px;
          height: 12px;
          line-height: 12px;
          font-size: 12px;
          transition: all .3s ease-out;
        }
      }

      .dorpdown-layer {
        background-color: #FFF;
        display: none;
        width: 78px;
        border: solid 1px #F0F0F0;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        padding-top: 30px;
        dd {
          cursor: pointer;
          &:hover {background-color: #f5f6f5;}
        }
        a {
          line-height: 24px;
          padding-left: 7px;
        }
      }
    }
  }
</style>
