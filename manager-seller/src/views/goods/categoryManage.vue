<template>
  <div>
    <en-tabel-layout
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button type="success" @click="addGoodsCategory">新增商品分组</el-button>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column label="分组名称" width="320" align="left">
          <template slot-scope="scope">
            <span v-if="toggleIconShow(scope.row)" @click="toogleCategory(scope.$index, scope.row)">
              <i v-if="scope.row._expanded && scope.row.level===1" class=" el-icon-minus icon_expanded_level1"></i>
              <i v-if="!scope.row._expanded && scope.row.level===1" class="el-icon-plus icon_expanded_level1"></i>
            </span>
            <span v-else>
              <svg-icon v-if="scope.row.level===2" iconClass="leftbotcorner"
                        className="leftbotcorner-icon icon_expanded_level2"></svg-icon>
              <i v-if="scope.row.level===1" class="el-icon-minus icon_expanded_level1"></i>
            </span>
            <span>{{ scope.row.shop_cat_name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"/>
        <el-table-column label="显示">
          <template slot-scope="scope">
            <span class="showstatus showed" v-if="scope.row.is_show === 1"><i class="el-icon-success"></i>已显示</span>
            <span class="showstatus notshow" v-if="scope.row.is_show === 0"><i class="el-icon-success"></i>未显示</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="350">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEditGoodsCategory(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleDeleteGoodsCategory(scope.row)">删除
            </el-button>
            <el-button
              v-if=" scope.row.level === 1 "
              size="mini"
              type="primary"
              @click="handleAddSonCategory(scope.$index, scope.row)">新增下级
            </el-button>
          </template>
        </el-table-column>
      </template>
    </en-tabel-layout>
    <el-dialog :title="categorytitle" :visible.sync="goodsCategoryShow" width="30%" align="center">
      <el-form :model="goodsCatData" label-position="right" label-width="80px">
        <el-form-item label="分组名称">
          <el-input v-model="goodsCatData.category_name" auto-complete="off" style="width: 70%;"></el-input>
        </el-form-item>
        <el-form-item label="上级分组">
          <el-select v-model="goodsCatData.category_parent" placeholder="请选择" style="width: 70%;">
            <el-option
              v-for="item in datafirst"
              :key="item.shop_cat_id"
              :label="item.shop_cat_name"
              :value="item.shop_cat_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model.number="goodsCatData.sort" auto-complete="off" style="width: 70%;text-align: center;"></el-input>
        </el-form-item>
        <el-form-item label="显示状态">
          <el-radio-group v-model="goodsCatData.is_show" style="width: 70%;">
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
  export default {
    name: 'categoryManage',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表数据 */
        tableData: null,

        /** 一级列表数据 */
        datafirst: null,

        /** 分组更新弹框标题*/
        categorytitle: '增加分组',

        /** 是否是编辑 1添加 2编辑 */
        is_edit: 1,

        /** 显示新增/编辑分组弹框*/
        goodsCategoryShow: false,

        /** 显示状态*/
        showstatus: 1,

        /** 弹框数据*/
        goodsCatData: {
          category_name: '',
          category_parent: '',
          sort: 1,
          is_show: 0
        },

        /** 商品分组*/
        categoryID: 0
      }
    },
    mounted() {
      this.GET_GoodsCategoryList()
    },
    methods: {
      /** 添加展开属性 */
      add_expanded(data) {
        if (Array.isArray(data) && data.length > 0) {
          data.forEach(elem => {
            this.$set(elem, '_expanded', false)
            if (elem.children && elem.children.length > 0) {
              this.add_expanded(elem.children)
            }
          })
        }
      },

      /** 获取商品分组列表 */
      GET_GoodsCategoryList() {
        this.loading = true
        API_goodsCategory.getGoodsCategoryList().then(response => {
          this.loading = false
          this.tableData = response.data
          // 为分组增加等级标识
          this.tableData.forEach(key => {
            const _level = key.shop_cat_pid === 0 ? 1 : 2
            this.$set(key, 'level', _level)
          })
          // 平行结构数据转换树形结构数据
          this.tableData = this.transData(this.tableData)
          // 为分组数据增加展开状态
          this.add_expanded(this.tableData)
        }).catch(() => { this.loading = false })
      },

      /** 删除分组 */
      handleDeleteGoodsCategory(row) {
        const _id = row.shop_cat_id
        API_goodsCategory.deleteGoodsCategory(_id).then(() => {
          this.GET_GoodsCategoryList()
          this.$message.success('删除商品成功！')
        })
      },

      /** 新增商品分组 */
      addGoodsCategory() {
        this.is_edit = 1
        this.goodsCategoryShow = true
        this.categorytitle = '增加分组'
        this.goodsCatData = {
          category_name: '',
          sort: '',
          is_show: 1
        }
      },

      /** 编辑商品分组 */
      handleEditGoodsCategory($index, row) {
        this.is_edit = 2
        this.goodsCategoryShow = true
        this.categorytitle = '编辑分组'
        this.categoryID = row.shop_cat_id
        const _shop_cat_pid = row.shop_cat_pid === 0 ? '' : row.shop_cat_pid
        this.goodsCatData = {
          category_name: row.shop_cat_name,
          category_parent: _shop_cat_pid,
          sort: row.sort,
          is_show: row.is_show
        }
      },

      /** 新增商品下级分组 */
      handleAddSonCategory($index, row) {
        this.is_edit = 1
        this.goodsCategoryShow = true
        this.categorytitle = '增加子分组'
        this.goodsCatData = {
          category_name: '',
          category_parent: row.shop_cat_id,
          sort: '',
          is_show: 1
        }
      },

      /** 保存商品分组 */
      reserveCategoryGoods() {
        let params = {}
        if (this.goodsCatData.category_parent) {
          params = {
            shop_cat_pid: this.goodsCatData.category_parent,
            shop_cat_name: this.goodsCatData.category_name,
            disable: this.goodsCatData.is_show,
            sort: this.goodsCatData.sort
          }
        } else {
          params = {
            shop_cat_name: this.goodsCatData.category_name,
            disable: this.goodsCatData.is_show,
            sort: this.goodsCatData.sort
          }
        }
        if (this.is_edit === 1) { // 添加
          API_goodsCategory.addGoodsCategory(params).then(response => {
            this.goodsCategoryShow = false
            this.$message.success('添加成功')
            this.GET_GoodsCategoryList()
          })
        } else { // 编辑
          API_goodsCategory.updateGoodsCategory(this.categoryID, params).then(response => {
            this.goodsCategoryShow = false
            this.$message.success('编辑成功')
            this.GET_GoodsCategoryList()
          })
        }
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
              if (arr.indexOf(value.shop_cat_id) > -1) {
                this.removeByValue(this.tableData, value.shop_cat_id)
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

      /** 获取子级分组id */
      getChildCategoryId(data, emptyArr) {
        Array.from(data).forEach((record) => {
          record.level !== 1 && emptyArr.push(record.shop_cat_id)
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
          if (arr[i].shop_cat_id === val) {
            arr.splice(i, 1)
            break
          }
        }
      },

      /** 平行结构转树形结构数据 */
      transData(data) {
        const _datafirst = this.datafirst = data.filter(key => { return key.level === 1 })
        const _dataseconed = data.filter(key => { return key.level === 2 })
        _datafirst.forEach(key => {
          this.$set(key, 'children', [])
          _dataseconed.forEach(item => {
            if (item.shop_cat_pid === key.shop_cat_id) {
              key.children.push(item)
            }
          })
        })
        return _datafirst
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

  .showstatus {
    margin: 2px;
    padding: 2px;
    border-radius: 5px;
  }

  .showed {
    color: #5CB85C;
    border: 1px solid #5cb85c;
  }

  .notshow {
    color: #888888;
    border: 1px solid #888888;
  }

  .icon_expanded_level1 {
    margin-left: 100px;
    cursor: pointer;
    border: 1px solid #ddd;
  }

  .icon_expanded_level2 {
    margin-left: 125px;
  }
</style>
