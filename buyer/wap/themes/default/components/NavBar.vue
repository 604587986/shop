<template>
  <van-nav-bar
    left-arrow
    @click-left="$router.go(-1)"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
  export default {
    name: 'NavBar'
  }
</script>
