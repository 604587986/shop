<template>
  <nuxt-child/>
</template>

<script>
  export default {
    name: 'checkout',
    layout: 'full',
    middleware: 'auth'
  }
</script>
