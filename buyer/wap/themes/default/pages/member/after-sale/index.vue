<template>
  <div id="after-sale">
    <nav-bar title="售后列表"/>
    <div class="after-sale-container">
      <empty-member v-if="finished && !afterSaleList.length">暂无订单</empty-member>
      <van-list
        v-else
        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
        <div class="order-item" v-for="(order, index) in afterSaleList" :key="index">
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  import * as API_AfterSale from '@/api/after-sale'
  export default {
    name: 'after-sale-index',
    data() {
      return {
        loading: false,
        finished: false,
        afterSaleList: [],
        params: {
          page_no: 1,
          page_size: 10
        }
      }
    },
    methods: {
      /** 加载售后数据 */
      onLoad() {
        this.params.page_no += 1
        this.GET_AfterSale()
      },
      /** 获取售后列表 */
      GET_AfterSale() {
        this.loading = true
        API_AfterSale.getAfterSale(this.params).then(response => {
          const { data } = response
          if(!data || !data.length) {
            this.finished = true
          } else {
            this.afterSaleList.push(...data)
          }
          this.loading = false
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .after-sale-container {
    padding-top: 46px;
  }
</style>
