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
      <div v-show="type === 2" class="points-detail"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'my-points',
    data() {
      return {
        type: 1
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .points-container {
    padding-top: 10px;
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
    h2 {
      font-size: 16px;
      margin-bottom: 10px;
    }
    p {
      margin-bottom: 5px;
    }
  }
</style>
