<template>
  <div id="member">
    <en-header/>
    <en-nav/>
    <div class="member-layout w">
      <en-menu/>
      <nuxt-child style="width: calc(1190px - 220px)"/>
    </div>
  </div>
</template>

<script>
  import Nav from './member/__nav'
  import Menu from './member/__menu'
  export default {
    name: 'member',
    components: {
      'en-nav': Nav,
      'en-menu': Menu
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .member-layout {
    display: flex;
    justify-content: space-between;
  }
</style>
