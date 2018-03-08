<template>
  <div>
    <div class="container">
      <h1>index</h1>
    </div>
    <tab-bar selected="home"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { TabBar } from '@/components'

  export default {
    name: 'Home',
    components: {
      TabBar
    },
    computed: {
      ...mapGetters(['cartNum'])
    },
    data() {
      return {
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .container {
    margin-bottom: 50px;
  }
</style>
