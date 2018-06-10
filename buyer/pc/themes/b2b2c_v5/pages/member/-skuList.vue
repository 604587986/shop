
<template>
  <el-table :data="skuList" style="width: 100%">
    <el-table-column label="商品名称" class-name="goods-name-img">
      <template slot-scope="scope">
        <nuxt-link :to="'/goods-' + scope.row.goods_id + '.html'" target="_blank">
          <img :src="image || scope.row.goods_image">
        </nuxt-link>
        <nuxt-link :to="'/goods-' + scope.row.goods_id + '.html'" target="_blank" class="goods-name">{{ name || scope.row.goods_name }}</nuxt-link>
      </template>
    </el-table-column>
    <el-table-column label="商品单价" width="120">
      <template slot-scope="scope">{{ (price || scope.row.price) | unitPrice('￥') }}</template>
    </el-table-column>
    <el-table-column label="数量" width="90">
      <template slot-scope="scope">{{ num || scope.row.num }}</template>
    </el-table-column>
    <el-table-column label="商品小计" width="120">
      <template slot-scope="scope">{{ (total || (num || scope.row.num) * (price || scope.row.price)) | unitPrice('￥') }}</template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'member-sku-list',
    props: ['skuList', 'image', 'name', 'price', 'num', 'total']
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .el-table {
    border: 1px solid #ebeef5;
    border-bottom: none;
    font-size: 12px;
  }
  .el-table /deep/ .el-table__header .cell { text-align: center }
  .el-table /deep/ .el-table__body .cell { text-align: center }
  .el-table /deep/ .el-table__body .goods-name-img .cell {
    display: flex;
    align-items: center;
    text-align: left;
    .goods-name {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
  }
</style>
