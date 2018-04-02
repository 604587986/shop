<template>
  <div id="my-collection">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li :class="[type === 'goods' && 'active']" @click="handleTypeChanged('goods')">商品收藏</li>
        <li :class="[type === 'shop' && 'active']" @click="handleTypeChanged('shop')">店铺收藏</li>
      </ul>
    </div>
    <div class="collection-container">
      <div v-show="type === 'goods'" class="goods">
        <ul>
          <li
            v-for="goods in goodsData.data"
            :key="goods.goods_id"
            :class="['coll-g-item', goods.show_pop && 'del-pop-show']"
          >
            <div class="goods-image">
              <nuxt-link :to="'/goods/' + goods.goods_id" target="_blank">
                <img :src="goods.goods_image" :alt="goods.goods_name">
              </nuxt-link>
              <div class="goods-delete" @click="goods.show_pop = 1">
                <i class="iconfont ea-icon-delete"></i>
              </div>
              <div class="goods-image-btns">
                <nuxt-link :to="'/shop/' + goods.shop_id">进入店铺</nuxt-link>
                <a href="javascript:;" @click="handleAddToCart(goods)">加入购物车</a>
              </div>
            </div>
            <div class="goods-name">
              <nuxt-link :to="'/goods/' + goods.goods_id" target="_blank">
                {{ goods.goods_name }}
              </nuxt-link>
            </div>
            <div class="goods-price">
              <div class="price">
                <span>￥</span>
                <strong>{{ goods.goods_price | unitPrice }}</strong>
              </div>
              <div v-if="goods.goods_original_price" class="original-price">
                <span>￥</span>
                <span>{{ goods.goods_original_price | unitPrice }}</span>
              </div>
            </div>
            <div class="del-pop">
              <div class="del-pop-bg"></div>
              <div class="del-pop-box">
                <div class="txt">确定删除？</div>
                <div class="btns">
                  <a href="javascript:;" @click="handleDeleteGoodsColl(goods)">确定</a>
                  <a href="javascript:;" @click="goods.show_pop = 0">取消</a>
                </div>
              </div>
            </div>
          </li>
          <li class="clr"></li>
        </ul>
        <el-pagination
          v-if="goodsData"
          layout="prev, pager, next"
          :total="1000"/>
      </div>
      <div v-show="type === 'shop'" class="shop">
        <ul>
          <li v-for="shop in shopData.data" :key="shop.shop_id" class="coll-s-item"></li>
          <li class="clr"></li>
        </ul>
        <el-pagination
          v-if="shopData"
          layout="prev, pager, next"
          :total="1000"/>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API_Collection from '@/api/collection'
  export default {
    name: 'my-collection',
    data() {
      let hash = this.$route.hash
      if (hash) hash = hash.match(/#(\w+)/)[1]
      return {
        type: hash || 'goods',
        /** 商品收藏参数 */
        params_goods: {
          page_no: 1,
          page_size: 30
        },
        /** 店铺收藏参数 */
        params_shop: {
          page_no: 1,
          page_size: 10
        },
        /** 商品数据 */
        goodsData: '',
        /** 店铺数据 */
        shopData: ''
      }
    },
    created() {
      this.GET_Collection(this.type)
    },
    methods: {
      /** 类型改变 */
      handleTypeChanged(type) {
        this.type = type
        const _href = location.href.match(/(.+)#/)
        location.href = (_href ? _href[1] : location.href)  + '#' + type
        if (!this.goodsData) this.GET_Collection('goods')
        if (!this.shopData) this.GET_Collection('shop')
      },
      /** 加入到购物车 */
      handleAddToCart(goods) {
        console.log(goods)
      },
      /** 删除商品收藏 */
      handleDeleteGoodsColl(goods) {
        API_Collection.deleteGoodsCollection(goods.goods_id).then(() => {
          this.GET_Collection('goods')
        })
      },
      /** 获取收藏 */
      GET_Collection(type) {
        if (type === 'goods') {
          API_Collection.getGoodsCollection(this.params_goods).then(response => {
            response.data.map(item => {
              item.show_pop = 0
              return item
            })
            this.goodsData = response
          })
        } else {
          API_Collection.getShopCollection(this.params_shop).then(response => {
            this.shopData = response
          })
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .collection-container {
    position: relative;
    margin-top: 10px;
    /deep/ .el-pagination { text-align: right }
  }
  .coll-g-item {
    position: relative;
    float: left;
    width: 150px;
    height: 226px;
    margin-right: 14px;
    text-align: center;
    margin-bottom: 14px;
    &:nth-child(6n) { margin-right: 0 }
    .goods-image {
      border: #eee 1px solid;
      margin-bottom: 11px;
      height: 148px;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .goods-delete {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        width: 25px;
        height: 25px;
        background: rgba(0,0,0,.5);
        color: #fff;
        cursor: pointer;
        text-align: center;
        line-height: 25px;
        &:hover { background-color: #f40 }
      }
      .goods-image-btns {
        display: none;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 25px;
        a {
          display: inline-block;
          width: 50%;
          line-height: 25px;
          background: rgba(0,0,0,.5);
          color: #fff;
          cursor: pointer;
          &:hover { background-color: #f40 }
          &:last-child {
            border-left: 1px solid #fff;
            margin-right: -1px;
          }
        }
      }
    }
    .goods-name {
      height: 23px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #3c3c3c;
    }
    .goods-price {
      word-wrap: break-word;
      word-break: normal;
      height: 23px;
      line-height: 23px;
      overflow: hidden;
      .price {
        display: inline;
        span {
          color: #f40;
          margin-right: 0;
        }
        strong {
          color: #f40;
          font-weight: 700;
          font-family: verdana,arial;
        }
      }
      .original-price {
        margin-left: 3px;
        text-decoration: line-through;
        white-space: nowrap;
        font-weight: 400;
        display: inline;
        color: #6c6c6c;
        span {
          color: #9c9c9c;
        }
      }
    }
    &:hover:not(.del-pop-show) {
      .goods-delete, .goods-image-btns {
        display: block;
      }
    }
    .del-pop {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      .del-pop-bg {
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: .5;
        z-index: 11;
      }
      .del-pop-box {
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -30px;
        width: 100%;
        z-index: 12;
        a {
          display: inline-block;
          width: 52px;
          height: 22px;
          line-height: 22px;
          border: #c5c5c5 1px solid;
          background-color: #fff;
          cursor: pointer;
          margin-left: 3px;
          margin-right: 3px;
          &:first-child {
            border-color: #ff4200;
            background-color: #ff4200;
            color: #fff;
          }
        }
      }
      .txt {
        height: 25px;
        line-height: 25px;
        color: #fff;
        margin-bottom: 7px;
        text-align: center;
      }
      .btns { text-align: center }
    }
    &.del-pop-show .del-pop {
      display: block;
    }
  }
</style>
