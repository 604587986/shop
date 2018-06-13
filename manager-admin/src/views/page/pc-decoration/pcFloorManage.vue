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
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddTpl">添加</el-button>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column prop="floor_name" label="楼层名称"/>
        <el-table-column prop="floor_sort" label="楼层排序"/>
        <el-table-column label="显示">
          <template slot-scope="scope">{{ scope.row.visible === 1 ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditFloor(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteFloor(scope.$index, scope.row)">删除</el-button>
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
  </div>
</template>

<script>
  export default {
    name: 'pcFloorManage',
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
        pageData: null
      }
    },
    mounted() {
      this.GET_FloorList()
    },
    filters: {
      typeFitler(val) {
        switch (val) {
          case 'main': return '主面板'
          case 'normal': return '普通面板'
        }
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_FloorList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_FloorList()
      },

      /** 添加模板 */
      handleAddTpl() {},

      /** 修改模板 */
      handleEditFloor(index, row) {
        console.log(row)
      },

      /** 删除模板 */
      handleDeleteFloor(index, row) {
        this.$confirm('确定要删除这个模板吗？', '提示', { type: 'warning' }).then(() => {
          // API_Decoration.deleteTpl(row.tpl_id).then(response => {
          //   this.$message.success('删除成功！')
          //   this.GET_FloorList()
          // }).catch(error => console.log(error))
        }).catch(() => {})
      },

      /** 获取模板列表 */
      GET_FloorList() {
        this.loading = true
        // API_Decoration.getFloorList('PC', this.params).then(response => {
        //   this.loading = false
        //   this.tableData = response.data
        //   this.pageData = {
        //     page_no: response.draw,
        //     page_size: 10,
        //     data_total: response.recordsTotal
        //   }
        // }).catch(error => {
        //   this.loading = false
        //   console.log(error)
        // })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
