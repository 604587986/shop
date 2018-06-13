<template>
  <div id="search">
    <div class="search-form">
      <input
        v-model="keyword"
        @input="handleKeywordChnaged"
        @focus="show_autocomplete = true"
        @blur="handleSearchInputBlur"
        @keyup.enter="handleSearchGoods"
        class="search-input"
      >
      <button type="button" class="search-btn goods" @click="handleSearchGoods">搜商品</button>
      <button type="button" class="search-btn shop" @click="handleSearchShop">搜店铺</button>
    </div>
    <ul class="search-hot-keywords">
      <li v-for="item in hot_keywords" :key="item.id">
        <nuxt-link :to="'/goods-list?keyword=' + item">{{ item.hot_name }}</nuxt-link>
      </li>
    </ul>
    <div v-show="show_autocomplete && autoCompleteData.length > 0" class="search-autocomplete">
      <ul>
        <li style="height:1px; overflow:hidden; border-bottom:1px #eee solid; margin-top:-1px;"></li>
        <li v-for="(item, index) in autoCompleteData" :key="index" @click="handleSearchGoods(item.text)">
          <div class="left-span">
            &nbsp;<span style="font-weight: bold">{{ autoCompleteStr }}</span>
            <span>{{ item.text.substr(autoCompleteStr.length, item.text.length) }}</span>
          </div>
          <div class="autocomplete-span">约{{ item.num }}个商品</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as API_Home from '@/api/home'
  export default {
    name: 'EnSearch',
    props: {},
    data() {
      return {
        keyword: '',
        hot_keywords: [],
        autoCompleteStr: '',
        autoCompleteData: [],
        show_autocomplete: false
      }
    },
    mounted() {
       /** 获取热门关键词 */
      API_Home.getHotKeywords().then(response => this.hot_keywords = response)
    },
    methods: {
      /** 关键字发生改变 */
      handleKeywordChnaged(event) {
        let _str = event.data || ''
        _str = _str.replace('\'', '')
        this.GET_AutoCompleteWords(this.keyword + _str)
      },
      /** 搜索框失去焦点 */
      handleSearchInputBlur() {
        setTimeout(() => {
          this.show_autocomplete = false
        }, 150)
      },
      /** 搜索商品 */
      handleSearchGoods(keyword) {
        keyword = typeof (keyword) === 'string'
          ? keyword
          : this.keyword
        this.keyword = keyword
        this.show_autocomplete = false
        this.$route.path === '/goods-list'
          ? this.$router.replace({ path: '/goods-list', query: { keyword }})
          : this.$router.push({ path: '/goods-list', query: { keyword }})
      },
      /** 搜索店铺 */
      handleSearchShop() {
        this.$route.name === 'shop'
          ? this.$router.replace({path: '/shop', query: { keyword: this.keyword }})
          : this.$router.push({path: '/shop', query: { keyword: this.keyword }})
      },
      /** 获取自动补全数据 */
      GET_AutoCompleteWords(keyword) {
        let _str = keyword || this.keyword
        if (_str === this.autoCompleteStr) return
        this.autoCompleteStr = _str
        _str = _str.trim()
        this.show_autocomplete = !!_str
        API_Common.getAutoCompleteKeyword(_str).then(response => this.autoCompleteData = response)
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  #search {
    position: relative;
    .search-form {

    }
    .search-input {
      box-sizing: content-box;
      width: 378px;
      height: 14px;
      padding: 8px;
      border: 2px solid #f42424;
      outline: 0;
      font-size: 12px;
      float: left;
      color: #999;
    }
    .search-btn {
      width: 70px;
      height: 34px;
      line-height: 34px;
      padding: 0;
      background-color: #f42424;
      font-size: 14px;
      cursor: pointer;
      float: left;
      outline: 0;
      transition: all ease-out .3s;
      color: #fff;
      font-weight: bold;
      border: 0;
      &:hover {
        opacity: .8;
      }
      &.goods {
        margin-right: 8px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      &.shop {
        background-color: #b31919;
      }
    }
    .search-hot-keywords {
      float: left;
      width: 100%;
      height: 28px;
      li {
        float: left;
        height: 28px;
        line-height: 28px;
        margin-right: 10px;
        a {
          display: block;
          color: #999;
          &:hover {
            color: #e33333;
          }
        }
      }
    }
    .search-autocomplete {
      width: 395px;
      background: white;
      border: 1px solid #f42424;
      position: absolute;
      z-index: 99999;
      border-top: none;
      top: 34px;
      left: 0;
      li {
        height: 28px;
        line-height: 28px;
        clear: both;
        padding: 0 5px;
        cursor: pointer;
        &:hover {
          background-color: #f5f5f5;
        }
      }
      .left-span {
        width: 306px;
        height: 28px;
        overflow: hidden;
        float: left;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .autocomplete-span {
        float: right;
        color: #d2d2d2;
      }
    }
  }
</style>
