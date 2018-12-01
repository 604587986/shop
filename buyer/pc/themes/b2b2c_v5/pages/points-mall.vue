<template>
  <div id="points-mall">
    <div class="points-category">
      <ul class="inner-points-cate w">
        <li v-for="cat in categorys" :key="cat.cat_id" :class="[cat.active && 'active']">
          <a href="javascript:;" @click="handleClickCat(cat)">{{ cat.name }}</a>
        </li>
      </ul>
    </div>
    <div class="points-goods">
      <div v-if="!tableData || !tableData.data.length" class="no-goods w">
        暂无商品...
      </div>
      <div v-else class="w">
        <ul class="goods-list">
          <li v-for="(goods, index) in tableData.data" v-if="goods.enable_exchange === 1" :key="index" class="goods-item">
            <a :href="'/goods/' + goods.goods_id">
              <img class="goods-img" :src="goods.goods_img">
            </a>
            <div class="goods-info">
              <p class="integral">
                <span class="price">￥{{ goods.exchange_money | unitPrice }}+{{ goods.exchange_point }}积分</span>
                <span class="origin-price">￥{{ goods.goods_price | unitPrice }}</span>
              </p>
              <p class="goods-name">{{ goods.goods_name }}</p>
            </div>
          </li>
        </ul>
        <el-pagination
          @current-change="handleCurrentPageChange"
          :current-page.sync="params.page_no"
          :page-size="params.page_size"
          layout="total, prev, pager, next"
          :total="tableData.data_total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Pagination } from 'element-ui'
  Vue.use(Pagination)
  import * as API_Promotions from '@/api/promotions'
  export default {
    name: 'points-mall',
    head() {
      return {
        title: `积分商城-${this.site.site_name}`
      }
    },
    data() {
      return {
        categorys: '',
        params: {
          page_no: 1,
          page_size: 20,
          cat_id: 0
        },
        tableData: ''
      }
    },
    mounted() {
      this.GET_PointsCategory()
      this.GET_PointsGoods()
    },
    methods: {
      /** 当前分页发生改变 */
      handleCurrentPageChange(page_no) {
        this.params.page_no = page_no
        this.GET_PointsGoods()
      },
      /** 选择积分分类 */
      handleClickCat(cat) {
        this.$set(this, 'categorys', this.categorys.map(item => {
          item.active = item.cat_id === cat.cat_id
          return item
        }))
        this.params.cat_id = cat.cat_id
        this.GET_PointsGoods()
      },
      /** 获取积分分类 */
      GET_PointsCategory() {
        API_Promotions.getPointsCategory().then(response => {
          this.categorys = [
            { name: '全部', cat_id: 0, active: true },
            ...response.map(item => ({
              active: false,
              name: item.name,
              cat_id: item.category_id
            }))
          ]
        })
      },
      /** 获取积分商品 */
      GET_PointsGoods() {
        const params = JSON.parse(JSON.stringify(this.params))
        if (params.cat_id === 0) delete params.cat_id
        API_Promotions.getPointsGoods(params).then(response => {
          this.tableData = response
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../assets/styles/color";
  .points-category {
    width: 100%;
    background: #eceaea;
    :after {
      display: block;
      clear: both;
    }
    ul {
      height: 80px;
      line-height: 80px;
    }
    li {
      position: relative;
      float: left;
      font-size: 16px;
      margin-right: 25px;
      &:not(:first-child)::after {
        position: absolute;
        top: 0;
        left: -17.5px;
        font-size: 30px;
        content: '∙';
      }
      &.active a {
        color: $color-main;
      }
    }
  }
  .points-goods {
    margin-top: 20px;
    margin-bottom: 50px;
    .goods-list {
      overflow: hidden;
    }
    .goods-item {
      float: left;
      width: 230px;
      margin: 0 10px 10px 0;
      border: 1px solid #ddd;
      a {
        display: block;
        margin: 5% auto;
      }
      .goods-img {
        display: block;
        margin: 0 auto;
        width: 200px;
        height: 200px;
      }
      .goods-info {
        margin: 5%;
        width: 90%;
      }
      .integral {
        font-size: 18px;
      }
      .origin-price {
        font-size: 12px;
        text-decoration: line-through;
        color: grey;
        float: right;
        margin-right: 10px;
      }
      .goods-name {
        font-size: 18px;
        margin: 10px 0;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    /deep/ .el-pagination {
      text-align: right;
    }
  }
  .no-goods {
    text-align: center;
    line-height: 100px;
    font-size: 18px;
    font-weight: 700;
  }
</style>
