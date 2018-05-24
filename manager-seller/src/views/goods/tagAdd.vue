<template>
  <div>
    <el-button type="primary" @click="selectgoodslist" style="margin-bottom: 15px;">选择商品</el-button>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
      :selectionChange="selectionChange"
    >
      <template slot="table-columns">
        <el-table-column type="selection"/>
        <el-table-column label="商品信息" width="1000px" header-align="left">
          <template slot-scope="scope">
            <div class="goods_info">
              <img :src="scope.row.thumbnail" class="goods-image"/>
              <div class="goodsinfo-txt">
                <span class="goods_name">{{scope.row.goods_name}}</span>
                <span class="goods_price">{{ scope.row.price | unitPrice('￥') }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="库存"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="canceljoin(scope)">取消参加
            </el-button>
          </template>
        </el-table-column>
      </template>
    </en-tabel-layout>
    <el-button type="danger" @click="cancelall" style="margin-top: 15px;">批量取消</el-button>
    <div style="text-align: center">
      <el-button type="primary" @click="savesetup" style="margin-top: 15px;">保存设置</el-button>
    </div>
    <en-goods-selector
      :show="showDialog"
      :api="goods_api"
      :defaultInfo="tableData"
      :maxLength="maxsize"
      @confirm="refreshFunc"
      @closed="showDialog = false"/>
  </div>
</template>

<script>
  import * as API_goodsTag from '@/api/goodsTag'
  import { CategoryPicker, TableLayout, TableSearch } from '@/components'
  import { GoodsSelector } from '@/plugins/selector/vue'

  export default {
    name: 'tagAdd',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPicker.name]: CategoryPicker,
      [GoodsSelector.name]: GoodsSelector
    },
    data() {
      return {
        /** 标签商品列表loading状态 */
        loading: false,

        /** 标签商品列表参数*/
        params: {
          page_no: 1,
          page_size: 10,
          tag_id: ''
        },
        /** 标签商品列表数据 */
        tableData: [],

        /** 标签商品已选择项id的集合 */
        selectionids: [],

        /** 商品选择器最大长度*/
        maxsize: 0,

        /** 商品选择器列表api*/
        goods_api: process.env.BASE_API + '/goods',

        /** 显示/隐藏商品选择器 */
        showDialog: false,

        /** 商品ids */
        goodsIds: []
      }
    },
    mounted() {
      this.params.tag_id = this.$route.params.tag_id
      this.getTagGoodsList()
    },
    methods: {
      /**  显示商品选择器*/
      selectgoodslist() {
        this.showDialog = true
      },

      /** 保存商品选择器选择的商品 */
      refreshFunc(val) {
        this.tableData = this.tableData.concat(val)
        // 去重 转化
        const res = new Map()
        this.tableData = this.tableData.filter((key) => !res.has(key.goods_id) && res.set(key.goods_id, 1))
      },

      /** 获取标签下的商品列表**/
      getTagGoodsList() {
        this.loading = true
        const _tag_id = this.params.tag_id
        API_goodsTag.getTagGoodsList(_tag_id, {}).then(response => {
          this.loading = false
          this.tableData = response.data
          this.maxsize = 0
        })
      },

      /**  取消参加 */
      canceljoin(scope) {
        this.tableData.forEach((elem, index) => {
          if (elem.goods_id === scope.row.goods_id) {
            this.$message.success('取消成功！')
            this.tableData.splice(index, 1)
          }
        })
      },

      selectionChange(val) {
        this.selectionids = val.map(item => item.goods_id)
      },

      /** 批量取消 */
      cancelall() {
        this.selectionids.forEach(key => {
          this.tableData.forEach((elem, index) => {
            if (elem.goods_id === key) {
              this.tableData.splice(index, 1)
            }
          })
          this.$message.success('批量取消成功！')
        })
      },
      /** 保存设置 */
      savesetup() {
        const _tag_id = this.params.tag_id
        const _goods_ids = this.tableData.map(key => {
          return key.goods_id
        })
        API_goodsTag.saveTagGoodsList(_tag_id, _goods_ids, this.params).then(response => {
          this.loading = false
          this.$message.success('保存设置成功！')
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .goods_info {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }

  .goodsinfo-txt {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    .goods_name {
      color: #6289ff;
    }
    .goods_price {
      color: #f60;
    }
  }

</style>
