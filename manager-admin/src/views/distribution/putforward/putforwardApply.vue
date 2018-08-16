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
        <el-table-column prop="id" label="ID"/>
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
            <el-button size="mini" type="primary" @click="handleNext(scope.row)">{{ row.status | operaName }}</el-button>
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
    <!--查看提现记录-->
    <el-dialog title="查看提现记录" :visible.sync="isShowPutForwardRecoreds" width="50%" align="center">
      <div align="center">
        <div class="d-header"> 提现基本信息 </div>
        <table class="putforawrd-baseinfo">
          <tr>
            <td>申请金额</td>
            <td></td>
          </tr>
          <tr>
            <td>申请时间</td>
            <td></td>
          </tr>
          <tr>
            <td>申请备注</td>
            <td></td>
          </tr>
          <tr>
            <td>操作</td>
            <td>
              <el-button type="success"  size="mini" @click="handleAudit('VIA_AUDITING')">通过审核</el-button>
              <el-button type="danger" size="mini" @click="handleAudit('FAIL_AUDITING')">不能通过</el-button>
            </td>
          </tr>
        </table>
        <!--提现日志-->
        <div class="d-header"> 提现日志 </div>
        <en-table-layout :tableData="putforwardLogs" class="pop-table" border>
          <template slot="table-columns">
            <el-table-column  prop="apply_time" :formatter="MixinUnixToDate" label="操作时间"/>
            <el-table-column  prop="ship_num" label="操作名称"/>
            <el-table-column  prop="ship_num" label="备注"/>
            <el-table-column  prop="ship_num" label="操作人"/>
          </template>
        </en-table-layout>
      </div>
    </el-dialog>
    <el-dialog title="审核拒绝备注" :visible.sync="isShowAuthRemarks" width="23%" align="center">
      <div align="center">
        <el-input type="textarea" v-model="authRemarks" clearable></el-input>
      </div>
    </el-dialog>
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
          page_size: 10,
          uname: ''
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
          { label: '审核失败', value: 'FAIL_AUDITING' },
          { label: '审核通过', value: 'VIA_AUDITING' },
          { label: '已转账', value: 'RANSFER_ACCOUNTS' },
          { label: '申请中', value: 'APPLY' }
        ],

        /** 是否显示提现记录 */
        isShowPutForwardRecoreds: false,

        /** 当前操作行 */
        currentRow: {},

        /** 提现日志 */
        putforwardLogs: [],

        /** 是否显示审核备注 */
        isShowAuthRemarks: false,

        /** 审核备注 */
        authRemarks: ''
      }
    },
    mounted() {
      this.GET_WithdrawApplyList()
    },
    filters: {
      operaName(status) {
        return status === 'VIA_AUDITING' ? '设为已转账' : '查看'
      }
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
      changeStatus(val) {
        this.params = {
          ...this.params,
          status: val
        }
        this.GET_WithdrawApplyList()
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

      /** 下一步操作 */
      handleNext(row) {
        if (row.status === 'VIA_AUDITING') { // 设为已转帐
          API_distribution.setTransferAccounts({ apply_id: row.id, remark: row.apply_remark }).then(() => {
            this.GET_WithdrawApplyList()
          })
        } else { // 查看
          this.isShowPutForwardRecoreds = true
          this.currentRow = row
        }
      },

      /** 审核 */
      handleAudit(operaName) {
        if (operaName !== 'FAIL_AUDITING') {
          const _params = {
            apply_id: this.currentRow.id,
            audit_result: operaName,
            remark: this.authRemarks
          }
          API_distribution.authWithdrawApply(_params).then(() => {
            this.$message.success('已保存审核结果')
            this.GET_WithdrawApplyList()
          })
        } else {
          this.isShowAuthRemarks = true
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
    padding: 0 20px;
  }

  /*提现基本信息*/
  .putforawrd-baseinfo {
    width: 100%;
    border: 1px solid #ddd;
    border-collapse: collapse;
    tr, td {
      border: 1px solid #ddd;
      border-collapse: collapse;
      line-height: 40px;
      padding: 0 15px;
    }
    td:first-child {
      width: 200px;
    }
  }
  /*提现日志*/
  div.d-header {
    width: 100%;
    line-height: 40px;
    background-color: #ddd;
    text-align: left;
    padding:0 15px;
    & + .container {
      padding: 0;
      /deep/ .toolbar {
        display: none;
      }
    }
  }

</style>










