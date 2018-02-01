<template>
  <div>
    <en-tabel-layout
      :toolbar="true"
      :pagination="true"
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddGroupBuy">添加</el-button>
        </div>
      </div>

      <template slot="table-columns">
        <el-table-column prop="act_name" label="活动名称"/>
        <el-table-column label="开始时间">
          <template slot-scope="scope">{{ scope.row.start_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column label="结束时间">
          <template slot-scope="scope">{{ scope.row.end_time | unixToDate }}</template>
        </el-table-column>
        <el-table-column label="活动状态">
          <template slot-scope="scope">{{ scope.row.status | statusFilter }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleOperateGroupBuy(scope.$index, scope.row)">管理</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteGroupBuy(scope.$index, scope.row)">删除</el-button>
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

    <!--添加团购 dialog-->
    <el-dialog title="添加团购" :visible.sync="dialogAddGroupBuyVisible" width="650px">
      <el-form :model="groupBuyForm" :rules="groupBuyRules" ref="groupBuyForm" label-width="120px">
        <!--团购活动名称-->
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="groupBuyForm.name" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="活动时间段" prop="time_range">
          <el-date-picker
            v-model="groupBuyForm.time_range"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :editable="false"
            value-format="yyyy-MM-dd hh:mm:ss"
            :picker-options="{disabledDate(time) { return time.getTime() < Date.now() }}">
          </el-date-picker>
        </el-form-item>
        <!--报名截止时间-->
        <el-form-item label="报名截止时间" prop="apply_deadline">
          <el-date-picker
            v-model="groupBuyForm.apply_deadline"
            type="datetime"
            :editable="false"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="报名截止时间"
            :picker-options="{disabledDate(time) { return time.getTime() < Date.now() }}">
          </el-date-picker>
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
  import { TableLayout } from '@/components'
  export default {
    name: 'groupBuyList',
    components: {
      [TableLayout.name]: TableLayout
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

        /** 添加团购 表单 */
        groupBuyForm: {},

        /** 添加团购 表单规则 */
        groupBuyRules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          time_range: [
            { required: true, message: '请选择活动时间段', trigger: 'blur' }
          ],
          apply_deadline: [
            { required: true, message: '请选择截止报名时间', trigger: 'blur' }
          ]
        },

        /** 添加团购 dialog */
        dialogAddGroupBuyVisible: false
      }
    },
    mounted() {
      this.GET_GroupBuyList()
    },
    filters: {
      statusFilter(val) {
        return val
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_GroupBuyList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_GroupBuyList()
      },

      /** 添加团购 */
      handleAddGroupBuy() {
        this.groupBuyForm = {}
        this.dialogAddGroupBuyVisible = true
      },

      /** 管理团购 */
      handleOperateGroupBuy(index, row) {},

      /** 删除团购 */
      handleDeleteGroupBuy() {},

      /** 添加团购 提交表单 */
      submitAddGroupBuyForm() {},

      /** 获取会员列表 */
      GET_GroupBuyList() {
        this.loading = true
        API_GroupBuy.getGroupBuyList(this.params).then(response => {
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
      }
    }

  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
