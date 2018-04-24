<template>
  <div id="apply-steps" class="steps-container">
    <ul>
      <li class="step1" :class="[routeNname === 'shop-apply-user-agreement' && 'current']"><span>入驻协议</span></li>
      <li class="step2" :class="[routeNname === 'shop-apply-basic-info' && 'current']"><span>基本信息</span></li>
      <li class="step3" :class="[routeNname === 'shop-apply-auth-info' && 'current']"><span>认证信息</span></li>
      <li class="step4" :class="[routeNname === 'shop-apply-financial-qualification' && 'current']"><span>财务资质信息</span></li>
      <li class="step5" :class="[routeNname === 'shop-apply-shop-info' && 'current']"><span>店铺信息</span></li>
    </ul>
  </div>
</template>

<script>
	export default {
		name: 'apply-steps',
    computed:{
      routeNname() {
        return this.$route.name
      }
    }
	}
</script>

<style type="text/scss" lang="scss" scoped>
  .steps-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 99px;
    border-bottom: 1px dashed #D7D7D7;
    li {
      position: relative;
      font-size: 12px;
      background: url(~/assets/images/icons-apply-shop.png) no-repeat 0 -130px;
      vertical-align: top;
      letter-spacing: normal;
      word-spacing: normal;
      display: inline-block;
      width: 120px;
      height: 16px;
      z-index: 1;
      span {
        color: #999;
        text-align: center;
        width: 120px;
        height: 20px;
        margin-left: -60px;
        position: absolute;
        z-index: 1;
        bottom: -30px;
        left: 50%;
      }
      &.step1, &.step5 { width: 68px }
      &.current {
        background-position: -172px -130px;
      }
    }
  }
</style>
