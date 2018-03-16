<template>
  <div id="goods-list">
    <en-header/>
  </div>
</template>

<script>
  import * as API_GoodsList from '@/api/goods'
  export default {
    name: '',
    data() {
      return {
        params: {
          keyword: '',
          page_no: 1,
          page_size: 20
        },
        goodsList: []
      }
    },
    created() {
      this.GET_GoodsList({keyword: this.$route.query.keyword})
    },
    watch: {
      ['$route']() {
        console.log(this.$route.query)
      }
    },
    methods: {
      GET_GoodsList(params) {
        API_GoodsList.getGoodsList({...this.params, ...params}).then(response => {
          this.goodsList = response.data
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
