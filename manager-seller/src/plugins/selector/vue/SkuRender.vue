<template>
    <div class='sku-render-container'></div>
</template>

<script>
import $ from 'jquery'
import '@/plugins/selector/js/skurender.js'

export default {
  name: 'EnSkuRender',
  props: ['goodsID'],
  mounted() {
    $('.sku-render-container').skuRender({
      goodsID: this.goodsID,
      refresh: data => {
        this.$emit('refreshFunc', data)
      }
    })
  },
  beforeDestroy() {
    $('.sku-render-container').empty()
  }
}
</script>
<style lang='scss'>
.sku-render-container {
  min-width: 200px;
  min-height: 200px;
}

.goods-sku .sku {
  display: inline-block;
  border: 2px solid #e2e1e3;
  font-size: 12px;
  margin: 5px;
  height: 30px;
  min-width: 50px;
  text-align: center;
  line-height: 30px;
  position: relative;
  color: black;
  font-weight: bold;
}

.goods-sku .sku:hover {
  cursor: pointer;
}

.goods-sku .sku .right {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJUExURUxpcf8AN////7f4NBoAAAABdFJOUwBA5thmAAAAMUlEQVQI103MAQ4AMAQEQev/j66i6YrEXIKIX9jY2NjYyDmhZnlCo5rdyWvebfYDVAcSmABbA7WD+QAAAABJRU5ErkJggg==);
  position: absolute;
  right: 0;
  bottom: 0;
  display: none;
  width: 12px;
  height: 12px;
}

.goods-sku .sku.goods-selected .right {
  display: inline-block;
}

.goods-sku .sku-body {
  width: 100%;
}

.goods-sku .sku-body .goods-spec-name {
  font-size: 12px;
  color: grey;
  float: left;
  margin-top: 1rem;
}

.goods-sku .goods-selected {
  border: 2px solid #f00;
}

.goods-sku .disabled {
  border: 2px dashed #b8b7bd;
  color: #b8b7bd;
}

.goods-sku span.disabled:hover {
  cursor: not-allowed;
}

.goods-sku .sku-hover {
  border: 2px solid #f00;
}

.goods-sku .sku-value-container {
  width: 80%;
  margin-left: 18%;
}

.goods-sku .sku.sku-image {
  background-size: cover !important;
  width: 50px;
  height: 50px;
}
</style>
