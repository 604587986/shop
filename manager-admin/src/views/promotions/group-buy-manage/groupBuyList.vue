<template>
  <div>
    <en-tabel-layout
      :tableData="tableData.data"
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
        v-if="tableData"
        slot="pagination"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="params.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="params.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.data_total">
      </el-pagination>
    </en-tabel-layout>

    <!--添加团购 dialog-->
    <el-dialog title="添加团购" :visible.sync="dialogAddGroupBuyVisible" width="650px">
      <el-form :model="groupBuyForm" :rules="groupBuyRules" ref="groupBuyForm" label-width="120px">
        <!--团购活动名称-->
        <el-form-item label="活动名称" prop="act_name">
          <el-input v-model="groupBuyForm.act_name" :maxlength="20"></el-input>
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
        <el-form-item label="报名截止时间" prop="join_end_time">
          <el-date-picker
            v-model="groupBuyForm.join_end_time"
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
  import * as API_Promotion from '@/api/promotion'

  export default {
    name: 'groupBuyList',
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
        tableData: '',

        /** 添加团购 表单 */
        groupBuyForm: {},

        /** 添加团购 表单规则 */
        groupBuyRules: {
          act_name: [this.MixinRequired('请输入活动名称！')],
          time_range: [this.MixinRequired('请选择活动时间段！')],
          join_end_time: [this.MixinRequired('请选择截止报名时间！')]
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
      handleOperateGroupBuy(index, row) {
        this.$router.push({ path: `/promotions/group-buy-manage/group-buy-goods/${row.act_id}` })
      },

      /** 删除团购 */
      handleDeleteGroupBuy(index, row) {
        this.$confirm('确定要删除这个团购活动吗？', '提示', { type: 'warning' }).then(() => {
          API_Promotion.deleteGroupBuyActivity(row.act_id).then(response => {
            this.$message.success('删除成功！')
            this.GET_GroupBuyList()
          })
        }).catch(() => {})
      },

      /** 添加团购 提交表单 */
      submitAddGroupBuyForm(formName) {
        const _time_range = this.groupBuyForm.time_range
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.groupBuyForm.apply_deadline > _time_range[0]) {
              this.$message.error('报名时间不能大于开始时间！')
              return false
            }
            this.groupBuyForm.start_time = _time_range[0]
            this.groupBuyForm.end_time = _time_range[1]
            API_Promotion.addGrouBuyActivity(this.groupBuyForm).then(response => {
              this.dialogAddGroupBuyVisible = false
              this.$message.success('添加成功！')
              this.GET_GroupBuyList()
            })
          } else {
            this.$message.error('表单填写有误，请检查！')
          }
        })
      },

      /** 获取会员列表 */
      GET_GroupBuyList() {
        this.loading = true
        API_Promotion.getGroupBuyActives(this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => { this.loading = false })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
