<template>
  <div v-if="activityData" class="sign-up-bg">
    <el-row :gutter="20">
      <el-col :span="4">
        <div>
          活动日期
        </div>
      </el-col>
      <el-col :span="19">
        <p>{{ activityData.start_time | unixToDate }}</p>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <div>
          报名截止日期
        </div>
      </el-col>
      <el-col :span="19">
        <p>{{ activityData.sign_end_time | unixToDate }}</p>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <div>
          申请规则
        </div>
      </el-col>
      <el-col :span="19">
        <p>{{activityData.application_rules}}</p>
      </el-col>
    </el-row>
    <el-row :gutter="19">
      <el-col :span="4">
        <div>
          抢购阶段
        </div>
      </el-col>
      <el-col :span="19">
        <div v-for="(item, $index) in activityData.panic_buy">
          <div class="panic-buy">
            <span>{{ item }}:00</span>
            <el-button type="primary" @click="selectgoodslist($index)">选择商品</el-button>
          </div>
          <div>
            <en-tabel-layout
              v-if="tableData && tableData.length >= 1"
              :tableData="tableData[$index]"
              :loading="loading"
            >
              <template slot="table-columns">
                <el-table-column label="商品名称">
                  <template slot-scope="scope">
                    <a href="" target="_blank" style="color: #00a2d4;">{{ scope.row.goods_name }}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="price" label="商品价格" width="100"/>
                <el-table-column label="活动价">
                  <template slot-scope="scope">
                    <el-input ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="售空数量">
                  <template slot-scope="scope">
                    <el-input ></el-input>
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
      </el-col>
    </el-row>
    <div style="text-align: center;">
      <el-button type="success" @click="handleSignUp">确定报名</el-button>
    </div>
    <en-goods-selector :show="showDialog" :api="goods_api" :defaultData="tableData" :maxLength="maxsize"
                       @confirm="refreshFunc" @closed="showDialog = false"/>
  </div>
</template>

<script>
  import * as API_limitTime from '@/api/limitTime'
  import { CategoryPicker } from '@/components'
  import { GoodsSelector } from '@/plugins/selector/vue'
  export default {
    name: 'addTimeLimit',
    components: {
      [CategoryPicker.name]: CategoryPicker,
      [GoodsSelector.name]: GoodsSelector
    },
    data() {
      return {
        /** loading状态*/
        loading: false,

        /** 活动信息*/
        activityData: null,

        /** 活动ID*/
        activityID: '',

        /** 表格信息*/
        tableData: [],

        /** 当前操作的表格序列*/
        _order: 0,

        /** 报名表单信息*/
        signForm: {},

        /** 商品选择器最大长度*/
        maxsize: 0,

        /** 商品选择器列表api*/
        goods_api: process.env.BASE_API + '/shop/seller/goods/search.do',

        /** 显示/隐藏商品选择器 */
        showDialog: false
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
          this.activityData = response.data
        })
      },

      /** 确定报名 */
      handleSignUp() {
        API_limitTime.signUpLimitTimeActivity(this.signForm).then(response => {
          this.$message.success('报名成功')
          this.$router.push({ path: '/promotions/activity-goods-data' })
        })
      },

      /** 删除已选中的商品*/
      handleDelgoods($index, row) {
        this.tableData[$index].forEach((elem, index) => {
          if (row.goods_id === elem.goods_id) {
            this.tableData[$index].splice(index, 1)
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
        this.tableData[this._order] = val
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /*背景颜色*/
  .sign-up-bg {
    background: #fff;
    border: 1px solid #F8F8F8;
    padding: 15px;
  }
  .el-col{
    background-color: #F8F8F8;
    min-height: 80px;
    line-height: 80px;
    margin: 0 8px 8px 0;
    padding:5px ;
    div {
      width: 100%;
      text-align: center;
    }
    div.panic-buy {
      text-align: left;
      span {
        display: inline-block;
        width: 300px;
        line-height: 38px;
        text-align: center;
        background-color: #fff;
        color: #333;
        font-size: 20px;
        border: 1px dotted #ccc;
      }
    }
    p {
      margin: 0;
    }
  }
  .icon-close {
    cursor: pointer;
  }
  /*表格样式修正*/
  .has-gutter th {
    height: 50px;
    line-height: 50px;
  }
</style>
