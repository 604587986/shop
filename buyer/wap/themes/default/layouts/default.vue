<template>
  <nuxt id="wrapper"/>
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
