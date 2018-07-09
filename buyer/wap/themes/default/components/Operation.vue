<template>
  <nuxt-link :to="toPage"><slot/></nuxt-link>
</template>

<script>
  export default {
    name: 'EnOperation',
    props: ['opt'],
    computed: {
      toPage() {
        const { type, value } = this.opt
        switch (type) {
          case 'goods-sn': return `/goods/${value}`
          case 'keyword': return `/goods-list?keyword=${value}`
          default: return ''
        }
      }
    }
  }
</script>
