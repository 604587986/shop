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
          // 链接地址
          case 'URL': return opt_value
          // 商品
          case 'GOODS': return `/goods/${opt_value}`
          // 关键字
          case 'KEYWORD': return `/goods?keyword=${opt_value}`
          // 店铺
          case 'SHOP': return `/shop/${opt_value}`
          // 分类
          case 'CATEGORY': return `/goods?category=${opt_value}`
          default: return '/'
        }
      }
    }
  }
</script>
