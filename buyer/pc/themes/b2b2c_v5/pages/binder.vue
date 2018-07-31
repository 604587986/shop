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
          Storage.removeItem('repeat_connect', { domain: domain.cookie })
          Storage.removeItem('uuid_connect', { domain: domain.cookie })
          this.$router.replace({ name: 'member-account-binding' })
        })
        return false
      }
      // 如果有刷新token，说明是在已登录的情况下绑定或换绑
      if (Storage.getItem('refreshToken')) {
        API_Connect.loginBindConnect(Storage.getItem('uuid_connect')).then(() => {
          this.$router.replace({ name: 'member-account-binding' })
        }).catch(() => {
          this.$router.replace({ name: 'member-account-binding' })
        })
        return false
      }
      this.$layer.open({
        title: '授权成功',
        btn: ['登录', '注册'],
        closeBtn: 0,
        content: '当前已授权成功，请您：',
        move: false,
        yes: (index) => {
          this.$layer.close(index)
          this.$router.push({ name: 'login', query: { form: 'connect' } })
        },
        btn2: (index) => {
          this.$layer.close(index)
          this.$router.push({ name: 'register', query: { form: 'connect' } })
        }
      })
    },
    methods: {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../assets/styles/color";
  .binder-container {
    min-height: 200px;
  }
</style>
