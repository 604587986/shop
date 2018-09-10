<template>
  <nuxt id="wrapper"/>
</template>
<script>
  import Storage from '@/utils/storage'
  export default {
    name: 'defalt',
    mounted() {
      // 如果是首页，并且有uuid，那么替换掉cookie中的uuid，并且移除url中的uuid
      const { name, query } = this.$route
      if (name === 'index' && query.uuid) {
        Storage.setItem('uuid', query.uuid)
        Storage.removeItem('uuid_connect', { domain: document.domain.split('.').slice(1).join('.') })
        location.href = '/'
        return
      }
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
