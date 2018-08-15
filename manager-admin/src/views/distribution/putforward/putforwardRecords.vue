<template>
  <div>
    <en-table-layout
      pagination
      :tableData="tableData"
      :loading="loading">
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <!--状态查询-->
          <div class="conditions">
            <span>状态：</span>
            <el-select
              class="choose-machine"
              v-model="params.status"
              placeholder="请选择"
              @change="changeStatus"
              clearable>
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="toolbar-search">
          <en-table-search
            @search="searchEvent"
            @advancedSearch="advancedSearchEvent"
            advanced
            advancedWidth="465"
            placeholder="请输入关键字">
            <template slot="advanced-content">
              <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
                <el-form-item label="会员姓名">
                  <el-input v-model="advancedForm.uname" clearable></el-input>
                </el-form-item>
                <el-form-item label="申请时间">
                  <el-date-picker
                    v-model="advancedForm.putforward_time_range"
                    type="daterange"
                    align="center"
                    :editable="false"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>
      <template slot="table-columns">
        <!--ID-->
        <el-table-column prop="sn" label="账单号"/>
        <!--申请时间-->
        <el-table-column prop="apply_time" :formatter="MixinUnixToDate" label="申请时间"/>
        <!--申请金额-->
        <el-table-column label="申请金额">
          <template slot-scope="scope">{{ scope.row.apply_money | unitPrice('￥') }}</template>
        </el-table-column>
        <!--会员-->
        <el-table-column prop="member_name" label="会员"/>
        <!--提现状态-->
        <el-table-column prop="status" label="提现状态"/>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <!--<el-button-->
            <!--size="mini"-->
            <!--type="primary"-->
            <!--@click="handleSeeWithDraw(scope.row)">查看</el-button>-->
            <el-button
              size="mini"
              type="primary"
              @click="handleTransferAccounts(scope.row)">设为已转账</el-button>
          </template>
        </el-table-column>
      </template>
      <el-pagination
        v-if="tableData"
        slot="pagination"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="pageData.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageData.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.data_total">
      </el-pagination>
    </en-table-layout>
  </div>
</template>

<script>
  import * as API_distribution from '@/api/distribution'
  export default {
    name: 'put-forward-apply',
    data() {
      return {
        // 列表loading状态
        loading: false,

        // 列表参数
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 高级搜索参数 */
        advancedForm: {
          uname: '',
          start_time: '',
          end_time: '',
          putforward_time_range: []
        },

        // 列表数据
        tableData: [],

        // 分页数据
        pageData: [],

        /** 状态列表 */
        statusList: [
          { label: '全部', value: '1' },
          { label: '审核失败', value: '2' },
          { label: '审核通过', value: '3' },
          { label: '已转账', value: '4' }
        ]
      }
    },
    mounted() {
      this.GET_WithdrawApplyList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_WithdrawApplyList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_WithdrawApplyList()
      },

      /** 获取提现申请列表 */
      GET_WithdrawApplyList() {
        this.loading = true
        API_distribution.getWithdrawApplyList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
          this.pageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
        })
      },

      /** 改变状态 */
      changeStatus() {

      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keywords: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.GET_WithdrawApplyList()
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
        this.params = {
          ...this.params,
          ...this.advancedForm
        }
        delete this.params.start_time
        delete this.params.end_time
        if (this.advancedForm.putforward_time_range) {
          this.params.start_time = this.advancedForm.putforward_time_range[0].getTime() / 1000
          this.params.end_time = this.advancedForm.putforward_time_range[1].getTime() / 1000
        }
        delete this.params.keywords
        delete this.params.putforward_time_range
        this.GET_WithdrawApplyList()
      },

      /** 设为已转账 */
      handleTransferAccounts(row) {
        API_distribution.setTransferAccounts({ apply_id: row.id, remark: row.apply_remark }).then(() => {
          this.$message.success('操作成功')
          this.GET_WithdrawApplyList()
        })
      },

      /** 查看 */
      handleOperateSee(row) {

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
    padding: 0 20px;
  }
</style>






