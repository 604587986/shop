<template>
  <div id="goods-tags" class="goods-tags">
    <div v-if="tagGoods.hotGoods" class="item-tag">
      <h5 class="title-tag">热销商品</h5>
      <ul class="goods-list">
        <template v-for="(goods, index) in tagGoods.hotGoods">
          <li
            v-if="index < 5"
            :key="goods.goods_id"
            class="goods-item">
            <nuxt-link :to="'/goods-' + goods.goods_id + '.html'">
              <img :src="goods.goods_image" :alt="goods.goods_name" class="goods-image">
              <div class="goods-info">
                <div class="goods-name">{{ goods.goods_name }}</div>
                <div class="goods-price">￥{{ goods.goods_price | unitPrice }}</div>
              </div>
            </nuxt-link>
          </li>
        </template>
      </ul>
    </div>
    <div v-if="tagGoods.newGoods" class="item-tag">
      <h5 class="title-tag">最新上架</h5>
      <ul class="goods-list">
        <template v-for="(goods, index) in tagGoods.newGoods">
          <li
            v-if="index < 5"
            :key="goods.goods_id"
            class="goods-item">
            <nuxt-link :to="'/goods-' + goods.goods_id + '.html'">
              <img :src="goods.goods_image" :alt="goods.goods_name" class="goods-image">
              <div class="goods-info">
                <div class="goods-name">{{ goods.goods_name }}</div>
                <div class="goods-price">￥{{ goods.goods_price | unitPrice }}</div>
              </div>
            </nuxt-link>
          </li>
        </template>
      </ul>
    </div>
    <div v-if="tagGoods.recGoods" class="item-tag">
      <h5 class="title-tag">店铺推荐</h5>
      <ul class="goods-list">
        <template v-for="(goods, index) in tagGoods.recGoods">
          <li
            v-if="index < 5"
            :key="goods.goods_id"
            class="goods-item">
            <nuxt-link :to="'/goods-' + goods.goods_id + '.html'">
              <img :src="goods.goods_image" :alt="goods.goods_name" class="goods-image">
              <div class="goods-info">
                <div class="goods-name">{{ goods.goods_name }}</div>
                <div class="goods-price">￥{{ goods.goods_price | unitPrice }}</div>
              </div>
            </nuxt-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'goods-tags',
    props: ['tagGoods']
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .goods-tags {
    width: 200px;
    min-height: 100px;
  }
  .title-tag {
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: #fff;
    background-color: #333333;
  }
  .goods-list { margin-bottom: 10px }
  .goods-item {
    position: relative;
    margin: 0 auto;
    border-top: 1px solid #f1f1f1;
    padding: 10px 0;
    a {
      display: flex;
    }
  }
  .goods-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 12px;
    margin-bottom: 5px;
  }
  .goods-image {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    margin-right: 10px;
  }
</style>
