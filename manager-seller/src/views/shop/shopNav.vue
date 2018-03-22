<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button @click="showaddShopNav" type="success">新增</el-button>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column prop="shop_nav_sort" label="排序"/>
        <el-table-column prop="shop_nav_name" label="导航名称"/>
        <el-table-column label="是否显示">
          <template slot-scope="scope">
            <span v-if="scope.row.shop_nav_show === 1">已显示</span>
            <span v-if="scope.row.shop_nav_show === 0">未显示</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEditShopNav(scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </template>
    </en-tabel-layout>
    <el-dialog title="新增导航" :visible.sync="addShopNavshow" width="30%">
      <el-form :model="navform">
        <el-form-item label="导航名称">
          <el-input v-model="navform.shop_nav_name" auto-complete="off" label-width="100"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="navform.shop_nav_show">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model.number="navform.shop_nav_sort" auto-complete="off" label-width="100"></el-input>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="navform.shop_nav_url" auto-complete="off" label-width="100"></el-input>
          <span>请填写包含http://的完整URL地址，否则会跳转到外链</span>
          <span>例: http://localhost:8080/b2b2c/index.html填写:http://localhost:8080/b2b2c/index.html</span>
        </el-form-item>
        <el-form-item label="新窗口打开">
          <el-radio-group v-model="navform.open_new_blank">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addShopNavshow = false">取 消</el-button>
        <el-button type="primary" @click="addShopNav">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_ShopNav from '@/api/shopNav'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'

  export default {
    name: 'shopNav',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {},

        /** 列表数据*/
        tableData: null,

        /** 新增导航表单*/
        navform: {
          shop_nav_name: '',
          shop_nav_show: 1,
          shop_nav_sort: '',
          shop_nav_url: '',
          open_new_blank: 1
        },

        /** 是否显示新增导航*/
        addShopNavshow: false
      }
    },
    mounted() {
      this.GET_ShopNavList()
    },
    methods: {
      GET_ShopNavList() {
        this.loading = true
        API_ShopNav.getShopNavList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },

      /** 编辑导航 */
      handleEditShopNav() {

      },

      showaddShopNav() {
        this.addShopNavshow = true
        // 清空表单
        this.navform = {
          shop_nav_name: '',
          shop_nav_show: 1,
          shop_nav_sort: '',
          shop_nav_url: '',
          open_new_blank: 1
        }
      },

      /** 新增导航*/
      addShopNav() {
        API_ShopNav.addShopNav(this.navform).then(response => {
          this.$message.success('保存成功')
          this.addShopNavshow = false
        }).catch(error => {
          console.log(error)
          this.$message.error('保存失败，请稍后重试！')
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .inner-toolbar {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .toolbar-btns {

  }

  .toolbar-search {
    margin-right: 10px;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }

</style>

