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
          <el-table-column  type="selection" />
          <el-table-column label="商品信息" >
            <template slot-scope="scope">
              <img :src="scope.row.image" class="goods-image"/>
              <div class="goodsinfo-txt">
                <span>{{scope.row.name}}</span>
                <span>{{scope.row.price}}</span>
                <!--<span>{{ scope.row.price | unitPrice('￥') }}</span>-->
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="balanced" label="库存" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="canceljoin(scope)">取消参加</el-button>
            </template>
          </el-table-column>
        </template>
      </en-tabel-layout>
      <el-button type="danger" @click="cancelall" style="margin-top: 15px;">批量取消</el-button>
      <div style="text-align: center">
        <el-button type="primary" @click="savesetup" style="margin-top: 15px;">保存设置</el-button>
      </div>
      <en-goods-selector :show="showDialog"  :api="goods_api"  :maxLength="maxsize"  @confirm="refreshFunc" @closed="showDialog = false" />
    </div>
</template>

<script>
  import * as API_goods from '@/api/goods'
  import * as API_goodsTag from '@/api/goodsTag'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'
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
        /** 列表loading状态 */
        loading: false,

        /** 列表参数*/
        params: {
          tag_id: null
        },
        /** 列表数据 */
        tableData: null,

        /** 已选择项id的 */
        selectionids: [],

        /** 最大长度*/
        maxsize: 0,

        /** 商品列表api*/
        goods_api: process.env.BASE_API + '/shop/seller/goods/search.do',

        /** 商品列表*/
        goodsIdList: null,

        /** 显示/隐藏商品选择器 */
        showDialog: false
      }
    },
    mounted() {
      this.params.tag_id = this.$route.params.tag_id
      this.getTagGoodsList()
    },
    methods: {
      /**
       * 商品列表
       */
      selectgoodslist() {
        this.showDialog = true
        API_goods.getGoodsList(this.params).then(response => {
          this.goodsIdList = response.data
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * 保存选择的商品
       */
      refreshFunc() {
        console.log(77)
      },
      /** 已选标签商品列表**/
      getTagGoodsList() {
        this.loading = true
        API_goods.getGoodsList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
          console.log(this.tableData, 666)
          this.maxsize = 0
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },
      /**
       * 取消参加
       * @param row
       */
      canceljoin(scope) {
        this.tableData.forEach((elem, index) => {
          if (elem.id === scope.row.id) {
            this.$message.success('取消成功！')
            this.tableData.splice(index, 1)
          }
        })
      },
      selectionChange(val) {
        this.selectionids = val.map(item => item.id)
      },
      /**
       * 批量取消
       */
      cancelall() {
        this.selectionids.forEach(key => {
          this.tableData.forEach((elem, index) => {
            if (elem.id === key) {
              this.tableData.splice(index, 1)
            }
          })
          this.$message.success('批量取消成功！')
        })
      },
      /**
       * 保存设置
       */
      savesetup() {
        this.$message.success('保存设置成功！')
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }
  .goodsinfo-txt{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
  }

</style>
