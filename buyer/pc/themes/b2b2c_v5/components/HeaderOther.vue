<template>
  <div class="header-other">
    <div class="inner-header-other" :style="{width: width + 'px'}">
      <div class="left-heander-other">
        <a href="/" class="logo">
          <img src="~/assets/images/logo-javashop.png" alt="logo" class="logo-img">
        </a>
        <span class="logo-title">{{ title }}</span>
      </div>
      <div class="right-heander-other">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EnHeaderOther',
    props: {
      title: {
        type: String,
        required: true
      },
      width: {
        default: 1000
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .header-other {
    .inner-header-other {
      position: relative;
      margin: 20px auto;
      height: 80px;
      .logo {
        float: left;
        width: 245px;
        height: 60px;
      }
      .logo-img {
        width: 240px;
        height: 60px;
      }
      .logo-title {
        font-size: 23px;
        float: left;
        display: block;
        margin: 25px 5px;
      }
      .right-heander-other {
        font-size: 16px;
        float: right;
        color: #999;
      }
    }
  }
</style>
