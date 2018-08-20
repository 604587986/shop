<template>
  <nuxt id="wrapper"/>
</template>
<script>
  import Storage from '@/utils/storage'
  export default {
    name: 'defalt',
    mounted() {
      if (Storage.getItem('refresh_token')) {
        this.$store.dispatch('user/getUserDataAction')
      }
    }
  }
</script>
<style type="text/scss" lang="scss">
  #wrapper {
    min-height: 100vh
  }
</style>
