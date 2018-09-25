<template>
  <nuxt id="wrapper"/>
</template>
<script>
  import Storage from '@/utils/storage'
  import * as API_Connect from '@/api/connect'
  export default {
    name: 'defalt',
    async mounted() {
      // 如果是微信浏览器
      if (this.MixinIsWeChatBrowser()) {
        // 如果没有授权
        if (!Storage.getItem('is_wechat_auth')) {
          Storage.setItem('forward', location.href)
          location.href = API_Connect.wechatAuthUrl
        }
        // 如果已授权，之前已登录过，且登录状态已失效，自动登录
        if (Storage.getItem('is_wechat_auth') && Storage.getItem('uuid_connect') && !Storage.getItem('refresh_token')) {
          const res = await API_Connect.weChatAutoLogin(Storage.getItem('uuid'))
          const { uid, access_token, refresh_token } = res
          if (res.uid && access_token && refresh_token) {
            Storage.setItem('uid', res.uid)
            this.$store.dispatch('user/setAccessTokenAction', access_token)
            this.$store.dispatch('user/setRefreshTokenAction', refresh_token)
          }
        }
      }
      // 如果是首页，并且有uuid，那么替换掉cookie中的uuid，并且移除url中的uuid
      const { name, query } = this.$route
      if (name === 'index' && query.uuid) {
        Storage.setItem('uuid', query.uuid, { expires: 30 })
        Storage.removeItem('uuid_connect')
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
