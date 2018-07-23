<template>
  <div
    id="category"
    @mouseover="handleCategoryMouseover"
    @mouseout="handleCategoryMouseout"
  >
    <nuxt-link to="/goods" class="category-title">全部商品分类</nuxt-link>
    <div v-show="unfold" class="category-layer">
      <div v-for="(item, index) in categoryList" v-if="index < 7" :key="item.category_id" class="category-item">
        <div class="item-content">
          <i class="item-icon"></i>
          <div class="item-title">
            <strong>
              <nuxt-link :to="'/goods?category=' + item.category_id">{{ item.name }}</nuxt-link>
            </strong>
            <span>
              <template v-for="(_item, _index) in item.children">
                <nuxt-link
                  v-if="_index < 2"
                  :key="_item.catrgory_id"
                  :to="'/goods?category=' + _item.category_id"
                >
                  {{ _item.name }}
                </nuxt-link>
              </template>
            </span>
          </div>
        </div>
        <div class="item-layer">
          <div class="item-layer-con">
            <div class="item-layer-left">
              <!--<div class="item-layer-channel">-->
                <!--<a href="#">品牌日</a>-->
                <!--<a href="#">家电城</a>-->
                <!--<a href="#">智能家居</a>-->
              <!--</div>-->
              <div class="item-layer-detail">
                <span>
                  <dl v-for="_item in item.children" :key="_item.category_id">
                    <dt>
                      <nuxt-link :to="'/goods?category=' + _item.category_id">{{ _item.name }}</nuxt-link>
                    </dt>
                    <dd>
                      <nuxt-link
                        v-for="__item in _item.children"
                        :key="__item.category_id"
                        :to="'/goods?category=' + __item.category_id"
                      >
                        {{ __item.name }}
                      </nuxt-link>
                    </dd>
                  </dl>
                </span>
                <div class="item-layer-brands">
                </div>
                <div class="item-layer-promotions"></div>
              </div>
            </div>
            <div class="item-layer-right">
              <div v-for="(brand, index) in item.brand_list" v-if="index < 20" :key="index" class="brand-item">
                <nuxt-link :to="'/goods?brand=' + brand.brand_id">
                  <img :src="brand.logo" :alt="brand.name">
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <span class="clr"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'EnCategory',
    data() {
      return {
        unfold: this.$route.path === '/'
      }
    },
    mounted() {
      this.getCategoryData()
    },
    watch: {
      $route() {
        this.unfold = this.$route.path === '/'
      }
    },
    computed: {
      /** 如果为首页，总是展开 */
      always_unfold() {
        return this.$route.path === '/'
      },
      /** 分类数据 */
      ...mapGetters(['categoryList'])
    },
    methods: {
      /** 鼠标移入 */
      handleCategoryMouseover() {
        if (this.always_unfold) return
        this.unfold = true
      },
      /** 鼠标移出 */
      handleCategoryMouseout() {
        if (this.always_unfold) return
        this.unfold = false
      },
      ...mapActions(['getCategoryData'])
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  #category {
    width: 240px;
    height: 40px;
    background-color: #f42424;
    flex-shrink: 0;
    z-index: 20;
    .category-title {
      display: block;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      text-align: center;
      line-height: 40px;
    }
    .category-layer {
      position: relative;
      height: 500px;
      z-index: 30;
      background-color: rgba(0, 0, 0, .6);
      padding-top: 3px;
    }
    .category-item {
      cursor: pointer;
      height: 70px;
      a:hover {
        color: #f42424;
      }
      &:hover {
        .item-content {
          background-color: rgba(0, 0, 0, 1);
        }
        .item-layer {
          display: block;
        }
      }
    }
    .item-content {
      padding: 14.5px 0;
      float: left;
      width: 240px;
      .item-icon {
        display: inline-block;
        float: left;
        width: 25px;
        height: 25px;
      }
      .item-title {
        margin-left: 25px;
        a {
          display: inline-block;
          color: #fff;
          font-size: 14px;
          margin-right: 5px;
          &:hover {
            color: #f42424;
          }
        }
        span {
          display: block;
          a {
            color: #bfbfbf;
            font-size: 13px;
          }
        }
      }
    }
    .item-layer {
      display: none;
      position: absolute;
      top: 3px;
      left: 240px;
      width: 1210px - 240px;
      height: 498px;
      cursor: auto;
      border: 1px solid #fff;
      background-color: #fff;
      box-shadow: 0 0 3px 2px rgba(0, 0, 0, .1);
      transition: top .25s ease;
      overflow: hidden;
      .item-layer-con {
        display: block;
        padding: 20px 20px 28px 18px;
      }
      .item-layer-left {
        float: left;
        width: 704px;
      }
      .item-layer-channel {
        overflow: hidden;
        height: 24px;
        width: 100%;
        a {
          float: left;
          margin-right: 10px;
          padding: 0 10px 0 12px;
          height: 24px;
          line-height: 24px;
          color: #fff;
          background-color: #5f4f4f;
        }
      }
      .item-layer-detail {
        margin-top: 20px;
        width: 100%;
        dl {
          padding-left: 80px;
          position: relative;
          &:last-child dd {
            border-bottom: 0;
          }
        }
        dt {
          overflow: hidden;
          position: absolute;
          color: #555;
          left: 0;
          top: 13px;
          width: 70px;
          text-align: right;
          font-weight: 700;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        dd {
          padding: 8px 0;
          overflow: hidden;
          border-bottom: 1px dashed #d2d2d2;
          min-height: 28px;
          a {
            float: left;
            margin: 8px 0;
            padding: 0 10px;
            height: 12px;
            border-left: 1px solid #e0e0e0;
            line-height: 12px;
            white-space: nowrap;
          }
        }
        a { color: #666 }
        a:hover { color: #f42424 }
      }
      .item-layer-right {
        float: right;
        width: 200px;
        .brand-item {
          overflow: hidden;
          display: inline-block;
          width: 90px;
          height: 40px;
          border: 1px solid #f9f9f9;
          text-align: center;
          margin: -1px 5px 0 0;
          a {
            display: table-cell;
            vertical-align: middle;
            width: 90px;
            height: 40px;
            img {
              width: 90px;
              height: 40px;
            }
          }
        }
      }
    }
  }
</style>
