<template>
  <nuxt-child/>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'member',
    middleware: 'auth-user'
  }
</script>
