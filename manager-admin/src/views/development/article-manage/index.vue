<template>
  <keep-alive :include="cachedViews">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
  export default {
    name: 'articleManage'
  }
</script>
