<template>
  <div id="category" class="classify">
    <nav-bar title="分类"/>
    <div class="category-container">
      <div class="cat-wrapper" id="cat-wrapper">
        <ul>
          <li
            v-for="(cat, index) in category"
            :class="['item', index === 0 && 'focus']"
            :key="index"
          >
            <a href="javascript:;">{{ cat.name }}</a>
          </li>
        </ul>
      </div>
    </div>
    <tab-bar :active="1"/>
  </div>
</template>

<script>
  import * as API_Goods from '@/api/goods'
  export default {
    name: 'category',
    data() {
      return {
        // 分类数据
        category: '',
        // 加载状态
        loading: true
      }
    },
    mounted() {
      API_Goods.getCategory().then(response => {
        this.category = response
        console.log(response)
      })
    },
    methods: {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .category-container {
    position: fixed;
    top: 46px;
    left: 0;
    width: 100%;
    height: calc(100% - 46px - 50px);
  }
  .cat-wrapper {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 80px;
    height: 100%;
    overflow: hidden;
    font-size: 14px;
    background-color: #f8f8f8;
  }

  .cat-wrapper ul {
    position: absolute;
    z-index: 1;
  }

  .cat-wrapper ul {
    width: 100%;
    background-color: #fff;
  }

  .cat-wrapper li {
    background: #fff;
    text-align: center;
    position: relative;
  }

  .cat-wrapper li::before {
    content: '';
    height: 92px;
    width: 1px;
    position: absolute;
    left: auto;
    top: 0;
    right: 0;
    bottom: auto;
    background-color: #e5e5e5;
    border: 0 solid transparent;
    border-radius: 0;
    -webkit-border-radius: 0;
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    -moz-transform: scale(0.5);
    -ms-transform: scale(0.5);
    -o-transform: scale(0.5);
    transform-origin: top left;
    -webkit-transform-origin: top left;
    -moz-transform-origin: top left;
    -ms-transform-origin: top left;
    -o-transform-origin: top left;
  }

  .cat-wrapper ul li::after {
    content: '';
    height: 1px;
    width: 200%;
    position: absolute;
    left: 0;
    top: auto;
    right: auto;
    bottom: 0;
    background-color: #e5e5e5;
    border: 0 solid transparent;
    border-radius: 0;
    -webkit-border-radius: 0;
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    -moz-transform: scale(0.5);
    -ms-transform: scale(0.5);
    -o-transform: scale(0.5);
    transform-origin: top left;
    -webkit-transform-origin: top left;
    -moz-transform-origin: top left;
    -ms-transform-origin: top left;
    -o-transform-origin: top left;
  }

  .cat-wrapper li a {
    display: block;
    width: 100%;
    padding: 15px 0;
    text-decoration: none;
    font-size: 12px;
    color: #232326;
    overflow: hidden;
  }

  .cat-wrapper .item.focus a {
    color: #ff002d;
  }

  .con-wrapper {
    position: absolute;
    right: 0;
    z-index: 1;
    width: auto;
    height: 100%;
    overflow: hidden;
  }

  .con-wrapper .content {
    position: absolute;
    z-index: 1;
    width: 100%;
  }

  .con-wrapper .inner-content {
    opacity: 0;
    padding: 0 10px;
    transition: opacity .2s linear;
    -webkit-transition: opacity .2s linear ;
  }

  .con-wrapper .inner-content.show {
    opacity: 1;
  }

  .inner-content .cont .item {
    margin-bottom: 15px;
  }

  .inner-content .title-item {
    line-height: 30px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .inner-content .content-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    align-content: flex-start;
    background-color: #ffffff;
    box-shadow: 0 7px 10px #ccc;
  }

  .content-item .cat-item {
    position: relative;
    width: 33.3%;
    height: 90px;
    text-align: center;
  }

  .content-item .cat-item img {
    height: 50px;
    max-width: 80%;
    margin-top: 10px;
  }

  .content-item .name-cat-item {
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    overflow: hidden;
  }
</style>
