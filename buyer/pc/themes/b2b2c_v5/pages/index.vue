<template>
  <div class="container">
    <nuxt-link to="/goods">去商品页</nuxt-link>
  </div>
</template>

<script>
  import * as API_Common from '@/api/common'
  export default {
    components: {
    },
    created() {
    },
    mounted() {
      console.log(API_Common.getValidateCodeUrl('member'))
      console.log(API_Common.getUploadApi())
    }
  }
</script>

<style>

</style>
