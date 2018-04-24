<template>
  <div id="apply-shop">
    <apply-header/>
    <nuxt-child v-if="$route.name === 'shop-apply'"/>
    <div v-else class="apply-container w">
      <apply-menu/>
      <div class="right-content">
        <apply-steps/>
        <nuxt-child/>
      </div>
    </div>
  </div>
</template>

<script>
  import applyHeader from './apply/-apply-header';
  import applyMenu from './apply/-apply-menu';
  import applySteps from './apply/-apply-steps'

  export default {
    name: 'apply',
    components: { applyHeader, applyMenu, applySteps }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .apply-container {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    padding-top: 30px;
    margin-bottom: 50px;
  }
  .right-content {
    width: 1000px - 210px -15px - 2px;
    min-height: 300px;
    border: 1px solid #D7D7D7;
  }
</style>
