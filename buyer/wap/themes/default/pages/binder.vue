<template>
  <div id="binder" class="binder-container w"></div>
</template>

<script>
  import Storage from '@/utils/storage'
  import * as API_Connect from '@/api/connect'
  import { domain } from '~/ui-domain'
  export default {
    name: 'binder',
    layout: 'full',
    mounted() {
      if (Storage.getItem('repeat_connect')) {
        this.$alert('当前使用的第三方账号已绑定过其它账号，您可以直接登录。如果需要换绑，请先登录账号进行解绑。', () => {
          Storage.removeItem('repeat_connect')
          Storage.removeItem('uuid_connect')
          this.$router.replace({ name: 'member-account-binding' })
        })
        return false
      }
      // 如果有刷新token，说明是在已登录的情况下绑定或换绑
      if (Storage.getItem('refresh_token')) {
        API_Connect.loginBindConnect(Storage.getItem('uuid_connect')).then(() => {
          this.$router.replace({ name: 'member-account-binding' })
        }).catch(() => {
          this.$router.replace({ name: 'member-account-binding' })
        })
        return false
      }
      this.$dialog.alert({
        title: '授权成功',
        message: '当前已授权成功，请您：',
        showCancelButton: true,
        confirmButtonText: '注册',
        cancelButtonText: '登录',
        beforeClose: (action, done) => {
          if (action === 'confirm') {
            done()
            this.$router.push({ name: 'register', query: { form: 'connect' } })
          } else {
            done()
            this.$router.push({ name: 'login', query: { form: 'connect' } })
          }
        }
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../assets/styles/color";
  .binder-container {
    min-height: 200px;
  }
</style>
