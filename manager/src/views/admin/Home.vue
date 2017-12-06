<template>
    <div class="home-container">
      <sku-editor></sku-editor>
      <el-row :gutter="20">
        <!--新增商品 start-->
        <el-col :span="16">
          <el-card>
            <div slot="header" class="clearfix">
              <span>新增商品</span>
              <el-button style="float: right; padding: 3px 0" type="text">查看详细</el-button>
            </div>
            <el-table :data="goodsList" border :height="tableHeight" style="width: 100%;">
              <el-table-column prop="username" label="商品图片" width="120">
                <template slot-scope="scope">
                  <img :src="scope.row.image" class="goods-image"/>
                </template>
              </el-table-column>
              <el-table-column prop="sn" label="商品编号" width="180"></el-table-column>
              <el-table-column prop="name" label="商品名称"/>
              <el-table-column prop="price" label="销售价" width="110"/>
            </el-table>
          </el-card>
        </el-col>
        <!--新增商品 end-->
        <!--销售统计 start-->
        <el-col :span="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>销售统计</span>
              <el-button style="float: right; padding: 3px 0" type="text">查看详细</el-button>
            </div>
            <div id="salesStatistics" :style="{height: tableHeight + 'px'}"></div>
          </el-card>
        </el-col>
        <!--销售统计 end-->
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>新增会员</span>
              <el-button style="float: right; padding: 3px 0" type="text">查看详细</el-button>
            </div>
            <el-table :data="memberList" border :height="tableHeight" style="width: 100%;">
              <el-table-column prop="username" label="会员名称"/>
              <el-table-column prop="mobile" label="手机号"/>
              <el-table-column prop="email" label="电子邮箱"/>
              <el-table-column prop="create_time" label="注册时间"/>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>商品统计</span>
            </div>
            <div class="goods-statistics" :style="{height: tableHeight + 'px'}">
              <el-button type="primary">热卖商品排行</el-button>
              <el-button type="success">商品销售明细</el-button>
              <el-button type="warning">商品收藏明细</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import GoodsListModel from '@/models/GoodsListModel'
  import MemberInfoModel from '@/models/MemberInfoModel'
  import SkuEditor from '@/plugins/selector/vue/SkuEditor'
  const goodsListModel = new GoodsListModel()
  const memberInfoModel = new MemberInfoModel()

  export default {
    name: 'Home',
    mounted() {
      this.GET_Dashboard()
      window.onresize = this.countTableHeight
      this.$nextTick(() => {
        this.sesalChart = this.$echarts.init(document.getElementById('salesStatistics'))
      })
    },
    data() {
      return {
        goodsList: null,
        memberList: null,
        tableHeight: ((window.innerHeight / 2) - 100) - 55
      }
    },
    methods: {
      /** 窗口缩放时计算table高度 */
      countTableHeight() {
        this.tableHeight = ((window.innerHeight / 2) - 100) - 55
        /** 图表刷新 */
        setTimeout(this.sesalChart.resize)
      },
      /** 获取仪表盘数据 */
      GET_Dashboard() {
        this.$http.get('/dashboard')
          .then(response => {
            /** 新增商品 */
            this.goodsList = goodsListModel.map(response.data.data.goodsList)
            /** 新增会员 */
            this.memberList = memberInfoModel.map(response.data.data.memberList)
            /** 销售统计 */
            this.sesalChart.setOption({
              title: { text: '2017年11月销售统计', subtext: '单位(元)', x: 'center' },
              tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
              legend: { orient: 'vertical', left: 'left', data: ['收款金额', '实收金额', '退款金额'] },
              series: [
                { name: '访问来源',
                  type: 'pie',
                  radius: '55%',
                  center: ['55%', '70%'],
                  data: [
                    { value: 2000, name: '收款金额' },
                    { value: 1800, name: '实收金额' },
                    { value: 200, name: '退款金额' }
                  ],
                  itemStyle: { emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
                }
              ]
            })
          })
          .catch(error => console.log(error))
      }
    },
    components: {
      SkuEditor
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .home-container {
    height: 100%;
    /deep/ .el-card__body {
      padding: 10px;
    }
    .goods-statistics {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      button {
        display: block;
        margin: 0;
        width: 75%;
      }
    }
  }
  .el-row {
    position: relative;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
</style>
