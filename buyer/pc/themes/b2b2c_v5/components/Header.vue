<template>
  <div id="header">
    <div class="top-header w">
      <en-logo/>
      <en-search/>
      <en-settleup/>
    </div>
    <en-nav/>
  </div>
</template>

<script>
  export default {
    name: 'EnHeader',
    components: {
    },
    mounted() {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  #header {
    height: 150px;
    .top-header {
      display: flex;
      justify-content: space-between;
      height: 70px;
      padding-top: 30px;
      /deep/ #logo {
        width: 240px;
        height: 60px;
      }
    }
  }
</style>
