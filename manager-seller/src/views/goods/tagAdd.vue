<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
      :selectionChange="selectionChange"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button type="primary" @click="selectgoodslist" >选择商品</el-button>
          <el-button type="danger" @click="cancelall" >批量取消</el-button>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column type="selection"/>
        <el-table-column label="商品信息" width="1000px">
          <template slot-scope="scope">
            <div class="goods-info">
              <img v-if="scope.row.goods_image" :src="scope.row.goods_image" class="goods-image"/>
              <div class="goodsinfo-txt">
                <span class="goods_name">{{scope.row.goods_name}}</span>
                <span class="goods_price" v-if="scope.row.goods_price">{{ scope.row.goods_price | unitPrice('￥') }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="库存">
          <template slot-scope="scope">
             <span v-if="scope.row.buy_count || scope.row.buy_count === 0">{{ scope.row.buy_count }}</span>
             <span v-if="scope.row.quantity || scope.row.quantity === 0 ">{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click="canceljoin(scope)">取消参加
            </el-button>
          </template>
        </el-table-column>
      </template>
    </en-tabel-layout>
    <div style="text-align: center">
      <el-button type="primary" @click="savesetup" style="margin-top: 15px;">保存设置</el-button>
    </div>
    <en-goods-picker
      type="seller"
      :show="showDialog"
      :api="goods_api"
      :categoryApi="categoryApi"
      :headers="headers"
      :defaultData="goodsIds"
      :limit="maxsize"
      @confirm="refreshFunc"
      @close="showDialog = false"/>
  </div>
</template>

<script>
  import * as API_goodsTag from '@/api/goodsTag'
  export default {
    name: 'tagAdd',
    data() {
      return {
        /** 标签商品列表loading状态 */
        loading: false,

        /** 请求头令牌 */
        headers: {
          Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzZWxmT3BlcmF0ZWQiOjAsInVpZCI6MTAwLCJzdWIiOiJTRUxMRVIiLCJzZWxsZXJJZCI6MTczMiwicm9sZXMiOlsiQlVZRVIiLCJTRUxMRVIiXSwic2VsbGVyTmFtZSI6Iua1i-ivleW6l-mTuiIsInVzZXJuYW1lIjoid29zaGljZXNoaSJ9.cLVAOdWk3hiltbYcN3hTs7az2y6U7FQdjYwLEPcMgeES50O4ahgG4joT_rOAB2XvjS4ZR2R-_AgEMeScpXNW3g'
        },

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
        goods_api: `${process.env.BASE_API}/goods`,

        /** 商城分类api */
        categoryApi: `${process.env.BASE_API}/goods/category/0/children`,

        /** 显示/隐藏商品选择器 */
        showDialog: false,

        /** 商品ids */
        goodsIds: []
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.params.tag_id = to.params.tag_id
      this.getTagGoodsList()
      next()
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
        this.tableData = val
        /** 去重 转化 */
        const res = new Map()
        this.tableData = this.tableData.filter((key) => !res.has(key.goods_id) && res.set(key.goods_id, 1))
        this.goodsIds = this.tableData.map(key => {
          return key.goods_id
        })
      },

      /** 获取标签下的商品列表**/
      getTagGoodsList() {
        this.loading = true
        const _tag_id = this.params.tag_id
        API_goodsTag.getTagGoodsList(_tag_id, {}).then(response => {
          this.loading = false
          this.tableData = response.data
          this.goodsIds = this.tableData.map(key => {
            return key.goods_id
          })
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
        this.goodsIds = this.tableData.map(key => {
          return key.goods_id
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
        this.goodsIds = this.tableData.map(key => {
          return key.goods_id
        })
      },
      /** 保存设置 */
      savesetup() {
        const _tag_id = this.params.tag_id
        const _goods_ids = this.tableData.map(key => {
          return key.goods_id
        })
        if (_goods_ids.length === 0) {
          this.$message.error('请至少选择一种商品')
          return
        }
        API_goodsTag.saveTagGoodsList(_tag_id, _goods_ids, this.params).then(() => {
          this.loading = false
          this.$message.success('保存设置成功！')
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ div.toolbar {
    height: 70px;
    padding: 20px 0;
  }

  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }
  /deep/ thead>tr {
    /deep/ th:nth-child(2) {
      text-align: left !important;
    }
  }

  .goods-info {
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
  .goods-image {
    width: 50px;
    height: 50px;
  }

</style>
