<template>
  <div>
    <en-tabel-layout
      :toolbar="false"
      :pagination="false"
      :tableData="tableData"
      :loading="loading"
    >
      <template slot="table-columns">
        <el-table-column prop="buy_num" label="购买频次"/>
        <el-table-column prop="member_num" label="下单会员数量"/>
      </template>
    </en-tabel-layout>
  </div>
</template>

<script>
  import * as API_Statistics from '@/api/statistics'
  import { TableLayout } from '@/components'
  import { Foundation } from '@/framework'

  export default {
    name: 'customerPriceDistributionFrequency',
    components: {
      [TableLayout.name]: TableLayout
    },
    props: ['params', 'curTab', 'change_flag'],
    data() {
      return {
        loading: false,
        /** 列表数据 */
        tableData: null
      }
    },
    watch: {
      'change_flag': 'GET_CustomerPriceDistributionFrequency'
    },
    methods: {
      GET_CustomerPriceDistributionFrequency() {
        if (this.curTab !== 'frequency' || this.loading) return
        this.loading = true
        API_Statistics.getBuyFrequency(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
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
