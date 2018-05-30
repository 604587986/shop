<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
      :selection-change="handleSelectionChange"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddGroupBuy">添加</el-button>
        </div>
      </div>

      <template slot="table-columns">
        <el-table-column type="selection" width="100"/>
        <el-table-column prop="name" label="活动名称"/>
        <el-table-column prop="order" label="排序"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteGroupBuy(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>

      <template slot="pagination-toolbar">
        <el-button type="danger" size="mini" @click="deleteSelected">删除选中</el-button>
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

    <!--添加团购分类 dialog-->
    <el-dialog title="添加团购分类" :visible.sync="dialogAddGroupBuyVisible" width="500px">
      <el-form :model="groupBuyForm" :rules="groupBuyRules" ref="groupBuyForm" label-width="120px">
        <!--分类名称-->
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="groupBuyForm.name" :maxlength="20" clearable></el-input>
        </el-form-item>
        <!--排序-->
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="groupBuyForm.order" controls-position="right" :min="1" :max="99999999"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddGroupBuyVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddGroupBuyForm('groupBuyForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_GroupBuy from '@/api/groupBuy'

  export default {
    name: 'groupBuyCategory',
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

        /** 被选数据 */
        selectedData: [],

        /** 添加团购分类 表单 */
        groupBuyForm: {},

        /** 添加团购分类 表单规则 */
        groupBuyRules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ]
        },

        /** 添加团购分类 dialog */
        dialogAddGroupBuyVisible: false
      }
    },
    mounted() {
      this.GET_GroupBuyCategoryList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_GroupBuyCategoryList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_GroupBuyCategoryList()
      },

      /** 当选择项发生变化 */
      handleSelectionChange(val) {
        this.selectedData = val.map(item => item.id)
      },

      /** 添加团购分类 */
      handleAddGroupBuy() {
        this.groupBuyForm = {
          order: (() => Math.max.apply(null, this.tableData.map(item => item.order)))() + 1
        }
        this.dialogAddGroupBuyVisible = true
      },

      /** 删除团购 */
      handleDeleteGroupBuy(index, row) {
        this.$confirm('确定要通过申请吗？', '提示', { type: 'warning' }).then(() => {
          this.DELETE_GroupBuyCategory(row.id)
        }).catch(() => {})
      },

      /** 添加团购分类 提交表单 */
      submitAddGroupBuyForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API_GroupBuy.addGroupBuyCategory(this.groupBuyForm).then(response => {
              this.dialogAddGroupBuyVisible = false
              this.$message.success('添加成功！')
              this.GET_GroupBuyCategoryList()
            }).catch(error => console.log(error))
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 删除选中 */
      deleteSelected() {
        if (this.selectedData.length < 1) {
          this.$message.error('您未选中任何会员！')
        } else {
          this.$confirm('确定要删除这些会员吗？', '提示', { type: 'warning' }).then(() => {
            this.DELETE_GroupBuyCategory(this.selectedData)
          }).catch(() => {})
        }
      },

      /** 获取会员列表 */
      GET_GroupBuyCategoryList() {
        this.loading = true
        API_GroupBuy.getGroupBuyCategoryList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsTotal
          }
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },

      /** 删除团购分类 */
      DELETE_GroupBuyCategory(ids) {
        API_GroupBuy.deleteGroupBuyCategory(ids).then(response => {
          this.$message.success('删除成功！')
          this.GET_GroupBuyCategoryList()
        }).catch(error => console.log(error))
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
