<template>
  <div id="footer">
    <span class="clr"></span>
    <div class="help-center-footer">
      <div class="w">
        <dl class="fore1">
          <dt>购物指南</dt>
          <dd><a rel="nofollow" target="_blank" href="//help">网站使用条款</a></dd>
          <dd><a rel="nofollow" target="_blank" href="//help">购物流程</a></dd>
          <dd><a rel="nofollow" target="_blank" href="//help">会员等级折扣</a></dd>
          <dd><a rel="nofollow" target="_blank" href="//help">积分规则</a></dd>
          <dd><a rel="nofollow" target="_blank" href="//help">常见问题</a></dd>
        </dl>

        <dl class="fore2">
          <dt>配送方式</dt>
          <dd><a rel="nofollow" target="_blank" href="//help">配送方式</a></dd>
          <dd><a rel="nofollow" target="_blank" href="//help">验货</a></dd>
        </dl>

        <dl class="fore3">
          <dt>支付方式</dt>
          <dd><a rel="nofollow" target="_blank" href="//help">在线支付</a></dd>
          <dd><a rel="nofollow" target="_blank" href="//help">货到付款</a></dd>
          <dd><a rel="nofollow" target="_blank" href="//help">线下支付</a></dd>
        </dl>

        <dl class="fore4">
          <dt>售后服务</dt>
          <dd><a rel="nofollow" target="_blank" href="//help">售后服务</a></dd>
          <dd><a rel="nofollow" target="_blank" href="//help">免责条款</a></dd>
          <dd><a rel="nofollow" target="_blank" href="//help">商品退换货保障</a></dd>
        </dl>

        <dl class="fore5">
          <dt>关于网站</dt>
          <dd><a target="_blank" href="//help">关于我们</a></dd>
          <dd><a target="_blank" href="//help">联系我们</a></dd>
          <dd><a rel="nofollow" target="_blank" href="//help">业务合作</a></dd>
        </dl>
        <span class="clr"></span>
      </div>
    </div>
    <div class="link-footer">
      <div class="w">
        <a href="//index.html">首页</a>
        | <a href="//member/member.html">会员中心</a>
        | <a href="//new_store/pages/main_outline.html">商家中心</a>
        | <a href="//help-21-9.html">关于网站</a>
        | <a href="//help-21-8.html">联系我们</a>
        | <a href="//help-21-7.html">关于我们</a>
        | <a href="http://www.javamall.com.cn" title="JAVA B2B2C网店系统">网店系统</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EnFooter'
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /* Footer */
  #footer {
    background-color: #f5f6f5;
    &.fixed-bottom {
      position: fixed;
      bottom: 0;
      width: 100%;
    }
    .help-center-footer {
      border-bottom: solid 1px #eaeaea;
      padding: 20px 0 20px 10%;
      dl {
        width: 20%;
        float: left;
        line-height: 22px;
      }
      dt {
        padding-bottom: 6px;
        font-weight: 700;
        font-size: 14px;
        color: #777;
        height: 22px;
      }
      dd {
        font-size: 12px;
        color: #666;
        height: 22px;
        overflow: hidden;
      }
    }
    .link-footer {
      text-align: center;
      height: 40px;
      line-height: 40px;
      a {
        color: #666;
      }
    }
  }
</style>
