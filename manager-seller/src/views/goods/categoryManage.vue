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
          <el-button type="success" @click="addGoodsCategory">新增商品分类</el-button>
        </div>
        <div class="toolbar-search">
          <en-table-search
            @search="searchEvent"
            @advancedSearch="advancedSearchEvent"
            advanced
          >
            <template slot="advanced-content">
              <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
                <el-form-item label="商品名称">
                  <el-input size="medium" v-model="advancedForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品编号">
                  <el-input size="medium" v-model="advancedForm.goods_sn"></el-input>
                </el-form-item>
                <el-form-item label="店铺名称">
                  <el-input size="medium" v-model="advancedForm.shop_name"></el-input>
                </el-form-item>
                <el-form-item label="商品类别">
                  <en-category-picker @changed="categoryChanged"/>
                </el-form-item>
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>

      <template slot="table-columns">
        <el-table-column label="分类名称" width="320" align="left">
          <template slot-scope="scope">
            <span v-if="toggleIconShow(scope.row)" @click="toogleCategory(scope.$index, scope.row)">
              <i v-if="scope.row._expanded && scope.row.level===1" class=" el-icon-minus icon_expanded_level1"></i>
              <i v-if="!scope.row._expanded && scope.row.level===1" class="el-icon-plus icon_expanded_level1"></i>
            </span>
            <span v-else>
              <svg-icon v-if="scope.row.level===2" iconClass="leftbotcorner" className="leftbotcorner-icon icon_expanded_level2" ></svg-icon>
              <i v-if="scope.row.level===1" class="el-icon-minus icon_expanded_level1"></i>
            </span>
            <span>{{ scope.row.category_name }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="sort" label="排序" />
        <el-table-column  label="显示">
          <template slot-scope="scope">
            <span class="showstatus showed"  v-if="scope.row.is_show === 1"><i class="el-icon-success"></i>已显示</span>
            <span class="showstatus notshow" v-if="scope.row.is_show === 0"><i class="el-icon-success"></i>未显示</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="350">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEditGoodsCategory(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleDeleteGoodsCategory(scope.row.category_id)">删除</el-button>
            <el-button
              v-if=" scope.row.level === 1 "
              size="mini"
              type="primary"
              @click="handleAddSonCategory(scope.$index, scope.row)">新增下级</el-button>
          </template>
        </el-table-column>
      </template>

      <el-pagination
        slot="pagination"
        v-if="pageData"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="pageData.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageData.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.data_total">
      </el-pagination>
    </en-tabel-layout>
    <el-dialog :title="categorytitle" :visible.sync="goodsCategoryShow" width="30%" align="center">
      <el-form :model="goodsCategoryData" label-position="right" label-width="80px">
        <el-form-item label="分类名称">
          <el-input  v-model="goodsCategoryData.category_name" auto-complete="off" style="width: 70%;"></el-input>
        </el-form-item>
        <el-form-item label="上级分类">
          <el-select v-model="goodsCategoryData.category_parent"  placeholder="请选择" style="width: 70%;">
            <el-option
              v-for="item in tableData"
              :key="item.category_id"
              :label="item.category_name"
              :value="item.category_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="goodsCategoryData.sort" auto-complete="off" style="width: 70%;" ></el-input>
        </el-form-item>
        <el-form-item label="显示状态">
          <el-radio-group v-model="goodsCategoryData.is_show" style="width: 70%;">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="goodsCategoryShow = false">取 消</el-button>
        <el-button type="primary" @click="reserveCategoryGoods">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_goodsCategory from '@/api/goodsCategory'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'
  export default {
    name: 'categoryManage',
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
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null,

        /** 高级搜索数据 */
        advancedForm: {
          goods_name: '',
          goods_sn: '',
          shop_name: '',
          category_id: ''
        },

        /** 分类更新弹框标题*/
        categorytitle: '增加分类',

        /** 显示新增/编辑分类弹框*/
        goodsCategoryShow: false,

        /** 显示状态*/
        showstatus: 1,

        /** 弹框数据*/
        goodsCategoryData: {
          category_name: '',
          category_parent: '',
          sort: 0,
          is_show: 0
        },

        /** 商品分类*/
        categoryID: 0
      }
    },
    mounted() {
      this.GET_GoodsCategoryList()
    },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_GoodsCategoryList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_GoodsCategoryList()
      },

      /** 单个商品下架操作确认 */
      handleWithdraw(index, row) {
        this.$confirm('确认下架吗？', '提示')
          .then(() => this.DELETE_Goods(row.id))
          .catch(() => {})
      },

      /** 销售状态格式化 */
      marketStatus(row, column, cellValue) {
        return row.market_enable === 1 ? '售卖中' : '已下架'
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.GET_GoodsCategoryList()
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
        this.params = {
          ...this.params,
          ...this.advancedForm
        }
        delete this.params.keyword
        this.GET_GoodsCategoryList()
      },

      /** 高级搜索中 分类选择组件值发生改变 */
      categoryChanged(data) {
        this.advancedForm.category_id = data.category_id
      },

      /** 添加属性 */
      add_expanded(data) {
        data.forEach(elem => {
          this.$set(elem, '_expanded', false)
          if (elem.children && elem.children.length > 0) {
            this.add_expanded(elem.children)
          }
        })
      },

      GET_GoodsCategoryList() {
        this.loading = true
        API_goodsCategory.getGoodsCategoryList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          this.tableData = response.data
          // 为分类数据增加展开状态
          this.add_expanded(this.tableData)
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },

      /** 删除分类 */
      handleDeleteGoodsCategory(ids) {
        API_goodsCategory.DeleteGoodsCategory(ids).then(() => {
          this.GET_GoodsCategoryList()
          this.$message.success('删除商品成功！')
        }).catch(() => this.$message.error('删除商品出错，请稍后再试！'))
      },

      /** 新增商品分类 */
      addGoodsCategory() {
        this.goodsCategoryShow = true
        this.categorytitle = '增加分类'
        this.categoryID = 0
        this.goodsCategoryData = {
          category_name: '',
          category_parent: '',
          sort: '',
          is_show: 1
        }
      },

      /** 编辑商品分类 */
      handleEditGoodsCategory($index, row) {
        this.goodsCategoryShow = true
        this.categorytitle = '编辑分类'
        this.categoryID = row.category_id
        if (row.level === 1) {
          this.goodsCategoryData = {
            category_name: row.category_name,
            category_parent: '',
            sort: row.sort,
            is_show: row.is_show
          }
        } else if (row.level === 2) {
          /** 获取他爸爸的category_id*/
          let category_id = null
          for (let i = $index; i >= 0; i--) {
            if (this.tableData[i].level === 1) {
              category_id = this.tableData[i].category_id
              break
            }
          }
          this.goodsCategoryData = {
            category_name: row.category_name,
            category_parent: category_id,
            sort: row.sort,
            is_show: row.is_show
          }
        }
      },

      /** 新增商品下级分类 */
      handleAddSonCategory($index, row) {
        this.goodsCategoryShow = true
        this.categorytitle = '增加子分类'
        this.categoryID = row.category_id
        this.goodsCategoryData = {
          category_name: '',
          category_parent: row.category_id,
          sort: '',
          is_show: 1
        }
      },

      /** 保存商品分类 */
      reserveCategoryGoods() {
        const params = {}
        API_goodsCategory.UpdateGoodsCategory(this.categoryID, params).then(response => {
          this.goodsCategoryShow = false
          this.$message.success('保存成功')
          this.GET_GoodsCategoryList()
        }).catch(() => this.$message.error('更新商品分类信息出错，请稍后再试'))
      },

      /** 点击展开和关闭的时候，图标的切换*/
      toggleIconShow(record) {
        if (record.children && record.children.length > 0) {
          return true
        }
        return false
      },

      /** 展开下级*/
      toogleCategory($index, rowData) {
        let childLen = rowData.children.length
        if (rowData._expanded) { // 闭合
          let dataArr = []
          dataArr.push(rowData)
          let arr = this.getChildCategoryId(dataArr, [])
          for (let i = 0; i < childLen; i++) {
            this.tableData.map((value) => {
              if (arr.indexOf(value.category_id) > -1) {
                this.removeByValue(this.tableData, value.category_id)
              }
            })
          }
        } else { // 展开
          let pre = this.tableData.slice(0, $index + 1)
          let concatChildren = pre.concat(rowData.children)
          let last = this.tableData.slice($index + 1)
          this.tableData = concatChildren.concat(last)
        }
        rowData._expanded = !rowData._expanded
      },

      /** 获取子级分类id */
      getChildCategoryId(data, emptyArr) {
        Array.from(data).forEach((record) => {
          record.level !== 1 && emptyArr.push(record.category_id)
          if (record.children && record.children.length > 0) {
            let childCategoryIdArr = this.getChildCategoryId(record.children, emptyArr)
            emptyArr.concat(childCategoryIdArr)
          }
        })
        return emptyArr
      },

      /** 对数组原型添加删除指定项的方法 */
      removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].category_id === val) {
            arr.splice(i, 1)
            break
          }
        }
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

  .toolbar-search {
    margin-right: 10px;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }


  .showstatus{
    margin:2px;
    padding:2px;
    border-radius: 5px;
  }
  .showed{
    color: #5CB85C;
    border: 1px solid #5cb85c;
  }
  .notshow{
    color: #888888;
    border: 1px solid #888888;
  }
  .icon_expanded_level1{
    margin-left: 100px;
    cursor: pointer;
    border: 1px solid #ddd;
  }
  .icon_expanded_level2{
    margin-left: 125px;
  }
</style>
