<template>
  <div id="goods-comments" class="goods-comments">
  </div>
</template>

<script>
  /**
   * 商品评论模块
   * 这里只负责展示商品的评论
   */
  import * as API_Goods from '@/api/goods'
  export default {
    name: "goods-comments",
    props: ['goods-id'],
    data() {
      return {
        params: {
          page_no: 1,
          page_size: 10
        }
      }
    },
    mounted() {
      this.GET_GoodsComments()
    },
    methods: {
      /** 获取商品评论 */
      GET_GoodsComments(){
        API_Goods.getGoodsComments(this.goodsId, this.params).then(response => {
          console.log(response)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .goods-comments {

  }
</style>
