<template>
  <nuxt id="wrapper" style="min-height: 100vh"/>
</template>
<script>
  import Storage from '@/utils/storage'
  export default {
    name: 'defalt',
    mounted() {
      if (Storage.getItem('refreshToken')) {
        this.$store.dispatch('user/getUserDataAction')
      }
    }
  }
</script>
