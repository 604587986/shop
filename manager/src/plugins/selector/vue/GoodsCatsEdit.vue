<template>
    <div class="goods-cats-edit-container"></div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'GoodsCatsEdit',
    data() {
      return {
        options: {
        }
      }
    },
    mounted() {
      console.log($('.goods-cats-edit-container'))
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
