<template>
  <div class="sign-up-bg" v-loading="loading">
    <el-form
      :model="activityData"
      v-if="activityData"
      status-icon
      label-position="right"
      :rules="rules"
      ref="activityData"
      label-width="120px"
      class="demo-ruleForm">
      <!--活动日期-->
      <el-form-item  label="活动日期:">
        {{ activityData.start_day | unixToDate }}
      </el-form-item>
      <!--报名截止日期-->
      <el-form-item label="报名截止日期:">
        {{ activityData.apply_end_time | unixToDate }}
      </el-form-item>
      <!--申请规则-->
      <el-form-item label="申请规则:">
        {{ activityData.seckill_rule }}
      </el-form-item>
      <!--抢购阶段-->
      <el-form-item label="抢购阶段:">
        <div v-for="(item, $index) in activityData.goodsData">
          <div class="panic-buy">
            <span class="time_pancy">{{ item.time_line }}:00</span>
            <el-button type="primary" @click="selectgoodslist($index)">选择商品</el-button>
          </div>
          <div :key="$index">
            <en-tabel-layout
              v-if="item.tableData && item.tableData.length >= 1"
              :tableData="item.tableData"
              :loading="loading">
              <template slot="table-columns">
                <el-table-column label="商品名称">
                  <template slot-scope="scope">
                    <a href="" target="_blank" style="color: #00a2d4;">{{ scope.row.goods_name }}</a>
                  </template>
                </el-table-column>
                <el-table-column label="商品价格" width="100"/>
                <el-table-column label="活动价">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.act_price"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="售空数量">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.sold_quantity"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="70">
                  <template slot-scope="scope">
                    <i class="el-icon-error icon-close" @click="handleDelgoods($index,scope.row)"></i>
                  </template>
                </el-table-column>
              </template>
            </en-tabel-layout>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div style="text-align: center;">
      <el-button type="primary" @click="handleSignUp">确定报名</el-button>
    </div>
    <en-goods-selector
      :show="showDialog"
      :api="goods_api"
      :defaultData="tableData"
      :maxLength="maxsize"
      @confirm="refreshFunc"
      @closed="showDialog = false"/>
  </div>
</template>

<script>
  import * as API_limitTime from '@/api/limitTime'
  import { CategoryPicker } from '@/components'
  import Reg from '@/framework/RegExp'
  import { GoodsSelector } from '@/plugins/selector/vue'
  export default {
    name: 'addTimeLimit',
    components: {
      [CategoryPicker.name]: CategoryPicker,
      [GoodsSelector.name]: GoodsSelector
    },
    data() {
      const checkPrice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('价格不能为空'))
        }
        setTimeout(() => {
          if (!Reg.price.test(value)) {
            callback(new Error('请输入正确的价格'))
          } else {
            callback()
          }
        }, 1000)
      }
      const checkQuantity = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('售空数量不能为空'))
        }
        setTimeout(() => {
          if (!Reg.integer.test(value)) {
            callback(new Error('请输入一个正整数'))
          } else {
            callback()
          }
        }, 1000)
      }

      return {
        /** loading状态*/
        loading: false,

        /** 活动信息*/
        activityData: {},

        /** 活动ID*/
        seckillID: '',

        /** 表格信息*/
        tableData: [],

        /** 当前操作的表格序列*/
        _order: 0,

        /** 商品选择器最大长度*/
        maxsize: 0,

        /** 商品选择器列表api*/
        goods_api: process.env.BASE_API + '/goods',

        /** 显示/隐藏商品选择器 */
        showDialog: false,

        /** 校验规则 */
        rules: {
          /** 价格 */
          price: [
            { validator: checkPrice, trigger: 'blur' }
          ],
          /** 售空数量 */
          sold_quantity: [
            { validator: checkQuantity, trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.activityID = this.$route.query._activity_id
      this.GET_limitTimeActivityDetails()
    },
    methods: {
      /** 获取限时活动详情 */
      GET_limitTimeActivityDetails() {
        API_limitTime.getLimitTimeActivityDetails(this.activityID, {}).then(response => {
          this.loading = false
          this.activityData = response
          this.$set(this.activityData, 'goodsData', [])
          this.activityData.range_list.forEach((key, index) => {
            this.activityData.goodsData.push({})
          })
          this.activityData.goodsData.forEach((key, index) => {
            this.$set(key, 'tableData', [])
            this.$set(key, 'time_line', this.activityData.range_list[index])
          })
        })
      },

      /** 确定报名 */
      handleSignUp() {
        let _params = []
        this.activityData.goodsData.forEach(item => {
          if (item.tableData.length !== 0) {
            const _arr = item.tableData.map(key => {
              let _item = {
                goods_id: key.goods_id,
                goods_name: key.goods_name,
                sold_quantity: key.sold_quantity,
                price: Number(key.act_price),
                seckill_id: parseInt(this.activityID),
                time_line: item.time_line,
                start_day: this.activityData.start_day,
                status: this.activityData.seckill_status
              }
              return _item
            })
            _params = _params.concat(_arr)
          }
        })
        API_limitTime.signUpLimitTimeActivity(_params).then(() => {
          this.$message.success('报名成功')
          this.$router.push({ path: '/promotions/activity-goods-data' })
        })
      },

      /** 删除已选中的商品*/
      handleDelgoods($index, row) {
        this.activityData.goodsData[$index].tableData.forEach((elem, index) => {
          if (row.goods_id === elem.goods_id) {
            this.activityData.goodsData[$index].tableData.splice(index, 1)
          }
        })
      },

      /**  显示商品选择器*/
      selectgoodslist($index) {
        this.showDialog = true
        this._order = $index
      },

      /** 保存商品选择器选择的商品 */
      refreshFunc(val) {
        /** 添加活动价格 & 售空数量 */
        val.forEach(key => {
          this.$set(key, 'sold_quantity', 0)
          this.$set(key, 'act_price', 0)
        })
        this.activityData.goodsData[this._order].tableData = val
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /*背景颜色*/
  .sign-up-bg {
    background: #f5f5f5;
    border: 1px solid #F8F8F8;
    padding: 15px;
  }
  .demo-ruleForm {
    margin-left: 4.5%;
  }
  .icon-close {
    cursor: pointer;
  }
  /*表格样式修正*/
  .has-gutter th {
    height: 50px;
    line-height: 50px;
  }

  /*平铺*/
  div.base-info-item {
    .el-form-item {
      margin-left: 5%;
      width: 22%;
      min-width: 300px;
    }
    .el-form-item__content {
      margin-left: 120px;
      text-align: left;
    }
    p.goods-group-manager {
      padding-left: 12.3%;
      text-align: left;
      color: #999;
      font-size: 13px;
    }
  }

   /*抢购时间段*/
  .time_pancy {
    display: inline-block;
    margin: 8px 0;
    text-align: center;
    width: 200px;
    padding: 6px 10px;
    background: #fff;
    border:1px dotted #dddddd;
    font-size: 15px;
  }
</style>
