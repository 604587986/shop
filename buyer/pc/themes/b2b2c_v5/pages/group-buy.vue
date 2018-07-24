<template>
  <div id="group-buy">
    <div class="nav-bar">
      <div class="w">
        <div
          v-for="(cate, index) in categorys"
          v-if="index < 10"
          :key="cate.cat_id"
          :class="['cate-item', cate.active && 'active']"
          @click="handleClickCate(cate)"
        >{{ cate.cat_name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API_Promotions from '@/api/promotions'
  export default {
    name: 'group-buy',
    head() {
      return {
        title: `团购-${this.site.title}`
      }
    },
    data() {
      return {
        params: {
          page_no: 1,
          page_size: 10,
          cat_id: 0
        },
        categorys: [
          { cat_id: 0, cat_name: '全部', active: true }
        ]
      }
    },
    mounted() {
      // 获取团购分类
      API_Promotions.getGroupBuyCategorys().then(response => {
        this.categorys.push(...response)
      })
      this.GET_GroupBuyGoods()
    },
    methods: {
      /** 选择团购分类 */
      handleClickCate(cate) {
        const { categorys } = this
        this.$set(this, 'categorys', categorys.map(item => {
          item.active = item.cat_id === cate.cat_id
          return item
        }))
        this.params.cat_id = cate.cat_id
        this.GET_GroupBuyGoods()
      },
      /** 获取团购商品 */
      GET_GroupBuyGoods() {
        API_Promotions.getGroupBuyGoods(this.params).then(response => {
          console.log(response)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .nav-bar {
    width: 100%;
    height: 40px;
    background-color: #d93600;
  }
  .cate-item {
    float: left;
    height: 24px;
    line-height: 24px;
    margin-top: 7px;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 600;
    color: #FFCFBF;
    margin-right: 10px;
    border-radius: 12.5px;
    transition: background-color, border-color ease .2s;
    cursor: pointer;
    border: 2px solid #d93600;
    &.active {
      background-color: #fff;
      color: #d93600
    }
    &:hover {
      border-color: #FFCFBF
    }
  }
</style>
