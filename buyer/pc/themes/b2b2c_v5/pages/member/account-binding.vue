<template>
  <div id="account-binding">
    <el-alert type="info" title="" :closable="false">
      <h2>绑定第三方登录有什么好处？</h2>
      <p>1. 您可以快速地从第三方登录我们的站点。 </p>
      <p>2. 避免了记不住密码的尴尬局面。</p>
    </el-alert>
    <div class="">
      <div class="bind-item">
        <div class="fore1">
          <strong>腾讯QQ</strong>
        </div>
        <div class="fore2">
          <span class="ftx-03"><img src="../../assets/images/icon-bind-qq.png"></span>
          <span class="ftx-01">&nbsp;绑定QQ帐号</span>
          <span style="color: #ff6c00;">&nbsp;未绑定</span>
        </div>
        <div class="fore3">
          <a class="ftx-05" href="/javashop/connect.do?type=1">绑定</a>
        </div>
      </div>
      <div class="bind-item">
        <div class="fore1">
          <strong>新浪微博</strong>
        </div>
        <div class="fore2">
          <span class="ftx-03"><img src="../../assets/images/icon-bind-sina.png"></span>
          <span class="ftx-01">&nbsp;绑定微博帐号</span>
          <span style="color: #ff6c00;">&nbsp;未绑定</span>
        </div>
        <div class="fore3">
          <a class="ftx-05" href="/javashop/connect.do?type=2">绑定</a>
        </div>
      </div>
      <div class="bind-item">
        <div class="fore1">
          <strong>腾讯微信</strong>
        </div>
        <div class="fore2">
          <span class="ftx-03"><img src="../../assets/images/icon-bind-weixin.png"></span>
          <span class="ftx-01">&nbsp;绑定微信帐号</span>
          <span style="color: #ff6c00;">&nbsp;未绑定</span>
        </div>
        <div class="fore3">
          <a class="ftx-05" href="/javashop/connect.do?type=3">绑定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API_Members from '@/api/members'
  export default {
    name: 'account-binding',
    head() {
      return {
        title: `账号绑定-${this.site.title}`
      }
    },
    mounted() {
      API_Members.getAccountBinder().then(response => {
        console.log(response)
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .el-alert {
    h2 { margin: 20px 0 }
    p { margin-bottom: 10px }
  }
  .bind-item {
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    padding: 30px 0;
    .fore1 {
      font-family: 微软雅黑;
      font-size: 18px;
      padding-left: 25px;
      text-align: left;
      width: 130px;
    }
    .fore2 {
      border-left: 1px solid #e6e6e6;
      height: auto;
      line-height: 24px;
      padding: 4px 0 4px 15px;
      width: 550px;
    }
    .fore3 {
      text-align: center;
      width: 140px;
    }
    .ftx-05 {
      color: #005ea7;
      &:hover { color: #f42424 }
    }
  }
</style>
