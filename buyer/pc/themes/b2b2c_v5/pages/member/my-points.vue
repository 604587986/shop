<template>
  <div id="my-points">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li :class="[type === 1 && 'active']" @click="type = 1">我的积分</li>
        <li :class="[type === 2 && 'active']" @click="type = 2">积分明细</li>
      </ul>
    </div>
    <div class="points-container">
      <div v-show="type === 1" class="points-my">
        <el-alert type="warning" title="" :closable="false">
          <h2>积分规则:</h2>
          <p>当积分已达到某一兑换积分标准时，顾客可将累计积分依照网站相应积分及兑换标准兑换回馈商品，网站将即时从用户会员积分中扣减相应积分。</p>
          <p>各项回馈项目（包含各项商品、服务或抵用券等）及兑换标准及兑换规则均以兑换当时最新回馈活动公告或目录为准。</p>
          <p>部分兑换商品有数量限制的，兑完为止。</p>
          <p>公告或目录如有有效期限的，逾期即不得兑换。</p>
          <p>积分兑换区的商品为只可用积分兑换的商品(如积分价格：100积分)</p>
        </el-alert>
        <el-alert type="info" title="" :closable="false">
          <h2>消费积分</h2>
          <p>可用积分：105</p>
          <h2>等级积分</h2>
          <p>可用积分：205</p>
        </el-alert>
      </div>
      <div v-show="type === 2" class="points-detail">
        <el-table
          :data="pointsData.data"
          :header-cell-style="{textAlign: 'center'}"
          style="width: 100%"
        >
          <el-table-column label="日期" align="center">
            <template slot-scope="scope">{{ scope.row.time | unixToDate }}</template>
          </el-table-column>
          <el-table-column prop="point_detail" label="明细" align="center"/>
          <el-table-column label="等级积分" align="center" width="120">
            <template slot-scope="scope">{{ scope.row.level_point | filterType }}</template>
          </el-table-column>
          <el-table-column label="消费积分" align="center" width="120">
            <template slot-scope="scope">{{ scope.row.consumption_point | filterType }}</template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="pointsData"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="pointsData.data_total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API_Points from '@/api/points'
  export default {
    name: 'my-points',
    data() {
      return {
        type: 1,
        params: {
          page_no: 1,
          page_size: 10
        },
        pointsData: ''
      }
    },
    created() {
      this.GET_Points()
    },
    filters: {
      filterType(val) {
        return (val > 0 ? '+' : '-') + val
      }
    },
    methods: {
      /** 当前分页发生变化 */
      handleCurrentChange(page) {
        this.params.page_no = page
        this.GET_Points()
      },
      GET_Points() {
        API_Points.getPointsData(this.params).then(response => {
          this.pointsData = response
          this.MixinScrollToTop()
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .points-container {
    padding-top: 10px;
    /deep/ .cell { font-size: 12px }
    /deep/ .el-pagination {
      text-align: right;
      margin-top: 15px;
    }
  }
  .points-my /deep/ .el-alert--warning {
    h2 {
      font-size: 18px;
      margin-bottom: 10px;
    }
    p {
      margin-bottom: 5px;
    }
  }
  .points-my /deep/ .el-alert--info {
    margin-top: 15px;
    h2 {
      font-size: 16px;
      margin-bottom: 10px;
    }
    p {
      margin-bottom: 5px;
    }
  }
</style>
