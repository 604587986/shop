<template>
  <div class="member-container">
    <div class="inner-member"> </div>
  </div>
</template>

<script>
  export default {
    name: 'LayoutMember'
  }
</script>

<style type="text/scss" lang="scss" scoped>
  $nav-bar_tab-height: 45px;

  .member-container {
    width: 200px;
    height: $nav-bar_tab-height;
    margin-top: 11px;
    .inner-member {
      width: 160px;
      height: $nav-bar_tab-height;
      margin: 0 20px;
      line-height: $nav-bar_tab-height;
      color: #fff;
      background: url("../../assets/logo-javashop-rectangle-dark.png") no-repeat left;
      background-size: 100% $nav-bar_tab-height;
    }
  }
</style>
