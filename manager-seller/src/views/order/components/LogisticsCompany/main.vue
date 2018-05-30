<template>
  <en-tabel-layout
    toolbar
    pagination
    :tableData="logisticsTableData"
    :loading="loading"
  >
    <template slot="table-columns">
      <!--模板名称-->
      <el-table-column prop="logistics_name" label="物流公司"/>
      <!--首重（kg）-->
      <el-table-column label="公司状态">
        <template slot-scope="scope">
          <span v-if="!scope.row.shop_id">未选择</span>
          <span v-if="scope.row.shop_id" class="company-choosed">已选择</span>
        </template>
      </el-table-column>
      <!--操作-->
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            v-if="!scope.row.shop_id"
            @click="handleLogisticsSwitch(scope.row)">开启
          </el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="scope.row.shop_id"
            @click="handleLogisticsSwitch(scope.row)">关闭
          </el-button>
        </template>
      </el-table-column>
    </template>
  </en-tabel-layout>
</template>

<script>
  import * as API_logistics from '@/api/expressCompany'
  export default {
    name: 'LogisticsCompany',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 物流公司列表参数 */
        logisticsParams: {},

        /** 物流公司列表数据 */
        logisticsTableData: null
      }
    },
    mounted() {
      this.GET_logisticsList()
    },
    methods: {
      /** 获取物流公司信息*/
      GET_logisticsList() {
        this.loading = true
        API_logistics.getExpressCompanyList({}).then(response => {
          this.loading = false
          this.logisticsTableData = response.data
        }).catch(error => {
          this.$message.error(error)
        })
      },

      /** 物流公司信息开启 /关闭 */
      handleLogisticsSwitch(row) {
        const _tip = row.shop_id ? '关闭' : '开启'
        this.$confirm(`确定要${_tip}么?`, '确认信息')
          .then(() => {
            row.shop_id ? this.closeLogistics(row) : this.openLogistics(row)
          })
          .catch(() => {
          })
      },

      /** 执行关闭  */
      closeLogistics(row) {
        API_logistics.closeExpressPower(row.logistics_id, {}).then(response => {
          this.$message.success('关闭成功')
          this.GET_logisticsList()
        }).catch(error => {
          this.$message.error(error)
        })
      },

      /** 执行开启 */
      openLogistics(row) {
        API_logistics.openExpressPower(row.logistics_id, {}).then(response => {
          this.$message.success('开启成功')
          this.GET_logisticsList()
        }).catch(error => {
          this.$message.error(error)
        })
      }
    }
  }
</script>

<style lang="scss" type="scss" scoped>
  .company-choosed {
    font-weight: bold;
    color: #e90101;
  }
</style>
