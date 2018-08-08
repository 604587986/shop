<template>
  <nuxt-child/>
</template>

<script>
  import Vue from 'vue'
  import Empty from '@/pages/member/-empty'
  Vue.component('empty-member', Empty)
  export default {
    name: 'member',
    middleware: 'auth-user'
  }
</script>
