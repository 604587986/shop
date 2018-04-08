<template>
  <div id="account-security">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li class="active">账号安全</li>
      </ul>
    </div>
    <div class="safe-title">
      <el-alert
        title="安全提醒"
        type="warning"
        :closable="false"
        show-icon
      >
        <p>建议您启动全部安全设置，以保障账户及资金安全。</p>
        <p>确认您登录的是Javashop网址<a href="http://www.javamall.com.cn" target="_blank">http://www.javamall.com.cn</a>，注意防范进入钓鱼网站，不要轻信各种即时通讯工具发送的商品或支付链接，谨防网购诈骗。</p>
        <p>建议您安装杀毒软件，并定期更新操作系统等软件补丁，确保账户及交易安全。</p>
      </el-alert>
    </div>
    <div class="safe-item">
      <div class="fore1"><strong>登录密码</strong></div>
      <div class="fore2"><span>互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</span></div>
      <div class="fore3">
        <nuxt-link to="/member/change-password">修改</nuxt-link>
      </div>
    </div>
    <div class="safe-item">
      <div class="fore1"><strong>手机验证</strong></div>
      <div class="fore2">
        <span>您验证的手机：</span><strong>{{ user.mobile | secrecyMobile }}</strong>&nbsp;&nbsp;
        <span>若已丢失或停用，请立即更换，</span><span style="color:#cc0000;">避免账户被盗</span>
      </div>
      <div class="fore3">
        <nuxt-link to="/member/account-safe/mobile">修改</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'account-safe',
    computed: {
      ...mapGetters({
        user: 'user/user'
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .safe-title {
    margin-top: 10px;
    p { margin-top: 3px }
    a { color: #005ea7 }
    a:hover { color: #f42424 }
  }
  .safe-item {
    display: block;
    padding: 30px 0;
    border-bottom: 1px solid #e6e6e6;
    &:after {
      content: ".";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
    /deep/ .fore1, .fore2, .fore3 {
      float: left;
      height: 32px;
      line-height: 32px;
    }
    .fore1 {
      width: 125px;
      text-align: left;
      font-family: \5FAE\8F6F\96C5\9ED1;
      font-size: 18px;
      padding-left: 25px;
    }
    .fore2 {
      border-left: 1px solid #E6E6E6;
      width: 450px;
      height: auto;
      line-height: 24px;
      padding: 4px 0 4px 15px;
    }
    .fore3 {
      text-align: center;
      width: 140px;
    }
  }
</style>
