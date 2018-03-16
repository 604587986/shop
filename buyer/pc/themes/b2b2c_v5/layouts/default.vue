<template>
  <div>
    <shortcut/>
    <nuxt id="wrapper"/>
    <en-footer/>
  </div>
</template>
<script>
  import { Footer, Shortcut } from '@/components'
  export default {
    name: 'defalt',
    components: {
      'en-footer': Footer,
      Shortcut
    }
  }
</script>
<style>
  #wrapper {
    min-height: calc(100vh - 31px - 219px)
  }
</style>
