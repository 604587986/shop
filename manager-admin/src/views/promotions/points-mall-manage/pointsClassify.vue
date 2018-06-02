<template>
  <div>

  </div>
</template>

<script>
  import * as API_Promotion from '@/api/promotion'

  export default {
    name: 'pointsClassify',
    data() {
      return {
        loading: false,
        params: {
          page_no: 1,
          page_size: 10
        }
      }
    },
    created() {
      this.GET_ExchangeCats()
    },
    methods: {
      /** 获取积分分类 */
      GET_ExchangeCats() {
        this.loading = true
        API_Promotion.getExchangeCats(this.params).then(response => {
          console.log(response)
        }).catch(() => { this.loading = false })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
