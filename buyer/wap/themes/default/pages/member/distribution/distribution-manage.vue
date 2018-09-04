<template>
  <div id="distribution-manage">
    <nav-bar title="分销管理"/>
    <div class="distribution-container">
      <van-cell-group>
        <van-cell title="我推荐的人" is-link to="./my-recommend" icon="tuijianren">
          <template slot="icon">
            <i class="icon iconfont icon-tuijianren"></i>
          </template>
        </van-cell>
        <van-cell title="我的业绩" is-link to="./my-performance" icon="yeji">
          <template slot="icon">
            <i class="icon iconfont icon-yeji"></i>
          </template>
        </van-cell>
        <van-cell title="提现设置" is-link to="./withdrawals-setting" icon="tixian">
          <template slot="icon">
            <i class="icon iconfont icon-tixian"></i>
          </template>
        </van-cell>
        <van-cell title="提现申请" is-link to="./withdrawals-apply" icon="apply">
          <template slot="icon">
            <i class="icon iconfont icon-29"></i>
          </template>
        </van-cell>
        <van-cell title="提现记录" is-link to="./withdrawals-history">
          <template slot="icon">
            <i class="icon iconfont icon-tixianjilu"></i>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import '@/assets/fonts/iconfont.css'
  export default {
    name: "distribution-manage"
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../../assets/styles/color";
  .distribution-container {
    padding-top: 46px;
  }

</style>
