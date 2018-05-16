<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleToggleClick">
      <el-tab-pane label="满优惠列表" name="fullList">
        <en-tabel-layout
          toolbar
          pagination
          :tableData="tableData"
          :loading="loading"
        >
          <div slot="toolbar" class="inner-toolbar">
            <div class="toolbar-btns">
              <el-button type="success" @click="handleAddFullCut">新增</el-button>
            </div>
            <div class="toolbar-search">
              <en-table-search @search="searchEvent"/>
            </div>
          </div>
          <template slot="table-columns">
            <!--活动名称-->
            <el-table-column prop="activity_name" label="活动名称"/>
            <!--开始时间-->
            <el-table-column label="开始时间">
              <template slot-scope="scope">
                <span>{{ scope.row.start_time | unixToDate }}</span>
              </template>
            </el-table-column>
            <!--结束时间-->
            <el-table-column label="结束时间">
              <template slot-scope="scope">
                <span>{{ scope.row.end_time | unixToDate }}</span>
              </template>
            </el-table-column>
            <!--活动类型-->
            <el-table-column prop="activity_type" label="活动类型"/>
            <!--活动状态-->
            <el-table-column label="活动状态">
              <template slot-scope="scope">
                <span>{{ scope.row.activity_status }}</span>
              </template>
            </el-table-column>
            <!--操作-->
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEditMould(scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteFullCut(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </template>
        </en-tabel-layout>
      </el-tab-pane>
      <el-tab-pane label="新增满优惠" name="add">
        <div class="content-goods-publish">
          <el-form
            :model="activityForm"
            status-icon
            :rules="rules"
            label-position="right"
            ref="activityForm"
            label-width="120px"
            class="demo-ruleForm">
            <!--活动信息-->
            <div class="base-info-item">
              <h4>活动信息</h4>
              <div>
                <el-form-item  label="活动名称：" prop="activity_name">
                  <el-input v-model="activityForm.activity_name" style="width: 300px" placeholder="不超过60个字符" ></el-input>
                </el-form-item>
                <el-form-item label="生效时间" prop="take_effect_time">
                  <el-date-picker
                    v-model="activityForm.take_effect_time"
                    type="datetimerange"
                    value-format="timestamp"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="活动描述">
                  <UE v-model="activityForm.activity_desc" :defaultMsg="activityForm.activity_desc"></UE>
                </el-form-item>
              </div>
            </div>
            <!--优惠设置-->
            <div class="base-info-item">
              <h4>优惠设置</h4>
              <div>
                <el-form-item label="优惠门槛：" prop="discount_threshold">
                  <div>
                    满 <el-input v-model="activityForm.discount_threshold" style="width: 100px;"></el-input>
                    元  <span class="discount-tip">消费达到此金额即可参与优惠</span>
                  </div>
                </el-form-item>
                <el-form-item label="优惠方式：" class="discount-model">
                  <!--减现金-->
                  <div>
                    <el-checkbox :label="reduceCashTxt" v-model="isReduceCash" @change="changeReduceCash"></el-checkbox>
                    <span class="integral-show" v-show="isReduceCash"><el-input  size="mini" v-model="activityForm.reduce_cash"></el-input> 元</span>
                  </div>
                  <!--打折-->
                  <div>
                    <el-checkbox :label="discountTxt" v-model="isDiscount" @change="changeDiscount"></el-checkbox>
                    <span class="integral-show" v-show="isDiscount"><el-input  size="mini" v-model="activityForm.discount_val"></el-input> 折</span>
                  </div>
                  <!--送积分-->
                  <div>
                    <el-checkbox :label="integralTxt" v-model="isIntegral" @change="changeIntegral"></el-checkbox>
                    <span class="integral-show" v-show="isIntegral"><el-input  size="mini" v-model="activityForm.integral"></el-input> 分</span>
                  </div>
                  <!--免邮费-->
                  <div>
                    <el-checkbox label="免邮费" v-model="freePostage" @change="changeFreePostage"></el-checkbox>
                  </div>
                  <!--送优惠券-->
                  <div>
                    <el-checkbox :label="couponTxt" v-model="isCoupon" @change="isChangeCoupon"></el-checkbox>
                    <el-select v-show="isCoupon" v-model="activityForm.couponId" placeholder="请选择">
                      <el-option
                        v-for="item in couponList"
                        @change="changeCoupon"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-button type="text" v-show="isCoupon" @click="addCoupon">新增</el-button>
                  </div>
                  <!--送赠品-->
                  <div>
                    <el-checkbox :label="giftTxt" v-model="isGift" @change="isChangeGift"></el-checkbox>
                    <el-select v-show="isGift" v-model="activityForm.giftId" placeholder="请选择">
                      <el-option
                        v-for="item in giftList"
                        @change="changeGift"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-button type="text" v-show="isGift" @click="addGift">新增</el-button>
                  </div>
                </el-form-item>
              </div>
            </div>
            <!--活动商品-->
            <div class="base-info-item">
              <h4>活动商品</h4>
              <div>
                <div class="activity-goods">
                    <el-form-item label="活动商品">
                      <el-radio-group v-model="activityForm.is_all_joined" @change="changeJoinGoods">
                        <el-radio :label="1">全部商品参与</el-radio>
                        <el-radio :label="0">部分商品参与</el-radio>
                      </el-radio-group>
                      <!--商品表格-->
                      <div v-show="!goodsShow">
                        <en-tabel-layout
                          toolbar
                          :tableData="goodsData"
                          :loading="loading"
                          :selectionChange="selectionChange"
                        >
                          <div slot="toolbar" class="inner-toolbar">
                            <div class="toolbar-btns">
                              <el-button type="success" @click="showGoodsSelector">选择商品</el-button>
                              <el-button type="danger" @click="cancelall">批量取消</el-button>
                            </div>
                          </div>
                          <template slot="table-columns">
                            <el-table-column type="selection"/>
                            <!--商品信息-->
                            <el-table-column  label="商品信息">
                              <template slot-scope="scope">
                                <div>
                                  <img :src="scope.row.thumbnail" alt="" class="goods-image">
                                  <div>
                                    <span>{{ scope.row.goods_name }}</span>
                                    <span>{{ scope.row.price | unitPrice('￥') }}</span>
                                  </div>
                                </div>
                              </template>
                            </el-table-column>
                            <!--库存-->
                            <el-table-column prop="enable_quantity" label="库存" />
                            <!--操作-->
                            <el-table-column label="操作" width="150">
                              <template slot-scope="scope">
                                <el-button
                                  size="mini"
                                  type="primary"
                                  @click="handleCancleJoin(scope.$index, scope.row)">取消参加
                                </el-button>
                              </template>
                            </el-table-column>
                          </template>
                        </en-tabel-layout>
                      </div>
                    </el-form-item>
                  </div>
              </div>
            </div>
            <!--提交按钮-->
            <div class="btn-submit">
              <el-form-item>
                <el-button type="success" @click="handleSaveActivity('activityForm')">保存设置</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--商品选择器-->
    <en-goods-selector
      :show="showDialog" :api="goods_api" :defaultData="tableData"
      :maxLength="maxsize" @confirm="refreshFunc" @closed="showDialog = false"/>
    <!--赠品组件-->
    <add-gift
      :giftModelShow="giftModelShow"
      @saveGift="saveGift"/>
    <!--优惠券组件-->
    <Coupon
      :couponModelShow="couponModelShow"
      @saveCoupon="saveCoupon"
    ></Coupon>
  </div>
</template>

<script>
  import * as API_activity from '@/api/activity'
  import { TableLayout, TableSearch, CategoryPicker, UE } from '@/components'
  import { GoodsSelector } from '@/plugins/selector/vue'
  import { AddGift, Coupon } from './components'

  export default {
    name: 'fullCut',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPicker.name]: CategoryPicker,
      [UE.name]: UE,
      [GoodsSelector.name]: GoodsSelector,
      [AddGift.name]: AddGift,
      [Coupon.name]: Coupon
    },
    data() {
      return {
        /** 当前面板的名字*/
        activeName: 'fullList',

        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {},

        /** 列表数据*/
        tableData: null,

        /** 新增满减表单信息*/
        activityForm: {
          /** 活动ID*/
          activity_id: '',

          /** 活动名称*/
          activity_name: '',

          /** 生效时间*/
          take_effect_time: [],

          /** 活动描述*/
          activity_desc: '',

          /** 优惠门槛*/
          discount_threshold: '',

          /** 是否满减 1打折/2减现金  */
          isDiscount: 1,

          /** 打几折 */
          discount_val: '',

          /** 减多少钱*/
          reduce_cash: '',

          /** 是否送积分 */
          isIntegral: 1,

          /** 积分 */
          integral: 0,

          /** 是否免邮费 1免邮费*/
          freePostage: 1,

          /** 是否有赠品  */
          isGift: 1,

          /** 赠品id */
          giftId: '',

          /** 是否送优惠券 */
          isCoupon: 1,

          /** 优惠券Id */
          couponId: '',

          /** 是否全部商品参与*/
          is_all_joined: '',

          /** 活动商品*/
          activity_goods: []
        },

        /** 是否减现金  */
        isReduceCash: false,

        /** 减现金文本 */
        reduceCashTxt: '减现金(与打折活动只能选择一种)',

        /** 是否打折 */
        isDiscount: false,

        /** 打折文本 */
        discountTxt: '打折(与减现金活动只能选择一种)',

        /** 是否送积分 */
        isIntegral: false,

        /** 积分文本 */
        integralTxt: '送积分',

        /** 是否免邮费 1免邮费*/
        freePostage: false,

        /** 是否送优惠券 */
        isCoupon: false,

        /** 优惠券显示文本 */
        couponTxt: '送优惠券',

        /** 优惠券列表 */
        couponList: [],

        /** 显示优惠券弹框 */
        couponModelShow: false,

        /** 是否有赠品  */
        isGift: false,

        /** 赠品显示文本 */
        giftTxt: '送赠品',

        /** 赠品列表 */
        giftList: [],

        /** 显示赠品弹框 */
        giftModelShow: false,

        /** 表单校验规则*/
        rules: {
          activity_name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 0, max: 60, message: '长度在60个字符之内', trigger: 'blur' }
          ],
          take_effect_time: [
            { type: 'array', required: true, message: '请选择生效时间', trigger: 'blur' }
          ],
          discount_threshold: [
            { required: true, message: '请输入优惠门槛', trigger: 'blur' }
          ]
        },

        /** 是否显示商品表格*/
        goodsShow: true,

        /** 表格商品数据*/
        goodsData: null,

        /** 选择的goods_id*/
        selectionids: [],

        /** 商品选择器最大长度*/
        maxsize: 0,

        /** 商品选择器列表api*/
        goods_api: process.env.BASE_API + '/goods',

        /** 显示/隐藏商品选择器 */
        showDialog: false
      }
    },
    mounted() {
      this.GET_ActivityList()
      /** 赠品列表 */
      this.GET_giftList()
    },
    methods: {

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        this.GET_ActivityList()
      },

      /** 切换面板 */
      handleToggleClick(tab, event) {
        this.activeName = tab.name
        if (this.activeName === 'express') {
          this.GET_ActivityList()
        } else if (this.activeName === 'add') {
          this.activityForm = {
            activity_id: '',

            activity_name: '',

            discount_mode: '',

            take_effect_time: [],

            activity_desc: '',

            discount_threshold: '',

            is_all_joined: '',

            activity_goods: ''
          }
        }
      },

      /** 是否全选商品*/
      changeJoinGoods(val) {
        this.goodsShow = val === 1
      },

      /** 保存商品选择器选择的商品 */
      refreshFunc(val) {
        this.goodsData = val
      },

      /** 显示商品选择器*/
      showGoodsSelector() {
        this.showDialog = true
      },

      /** 取消参加*/
      handleCancleJoin(index, row) {
        this.goodsData.forEach((elem, _index) => {
          if (index === _index) {
            this.goodsData.splice(_index, 1)
          }
        })
      },

      selectionChange(val) {
        this.selectionids = val.map(item => item.goods_id)
      },

      /** 批量取消 */
      cancelall() {
        this.selectionids.forEach(key => {
          this.goodsData.forEach((elem, index) => {
            if (elem.goods_id === key) {
              this.goodsData.splice(index, 1)
            }
          })
          this.$message.success('批量取消成功！')
        })
      },

      /** 获取活动信息*/
      GET_ActivityList() {
        this.loading = true
        API_activity.getActivityList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
        }).catch(error => {
          console.log(error)
        })
      },

      /** 编辑满减优惠 */
      handleEditMould(row) {
        this.activeName = 'add'
        this.activityForm = {
          ...row,
          take_effect_time: [parseInt(row.start_time) * 1000, parseInt(row.end_time) * 1000]
        }
        this.goodsShow = this.activityForm.is_all_joined === 1
      },

      /** 删除满减优惠活动 */
      handleDeleteFullCut(row) {
        this.$confirm('确认删除当前项？', '确认信息')
          .then(() => this.toDelActivity(row))
          .catch(() => {
          })
      },

      /** 执行删除*/
      toDelActivity(row) {
        API_activity.deleteActivity(row.activity_id, row).then(response => {
          this.$message.success('删除成功！')
          this.GET_ActivityList()
        }).catch(error => {
          console.log(error)
          this.$message.error('删除失败，请稍后再试！')
        })
      },

      /** 新增满减优惠 */
      handleAddFullCut() {
        this.activeName = 'add'
        this.activityForm = {
          activity_id: '',

          activity_name: '',

          discount_mode: '',

          take_effect_time: [],

          activity_desc: '',

          discount_threshold: '',

          is_all_joined: '',

          activity_goods: ''
        }
      },

      /** 是否打折 */
      changeDiscount(val) {
        this.isDiscount = val
        if (val) {
          this.isReduceCash = !this.isDiscount
          this.reduceCashTxt = this.isReduceCash ? '减' : '减现金(与打折活动只能选择一种)'
        }
        this.discountTxt = this.isDiscount ? '打' : '打折(与减现金活动只能选择一种)'
      },

      /** 是否减现金 */
      changeReduceCash(val) {
        this.isReduceCash = val
        if (val) {
          this.isDiscount = !this.isReduceCash
          this.discountTxt = this.isDiscount ? '打' : '打折(与减现金活动只能选择一种)'
        }
        this.reduceCashTxt = this.isReduceCash ? '减' : '减现金(与打折活动只能选择一种)'
      },

      /** 是否送积分 */
      changeIntegral(val) {
        this.integralTxt = val ? '送' : '送积分'
      },

      /** 是否免邮费改变 */
      changeFreePostage(val) {
        this.freePostage = val
        this.activityForm.freePostage = this.freePostage ? 1 : 0
      },

      /** 是否送优惠券 */
      isChangeCoupon(val) {
        this.isCoupon = val
        this.activityForm.isCoupon = this.isCoupon ? 1 : 0
        this.couponTxt = this.isCoupon ? '送' : '送优惠券'
      },

      /** 获取优惠券列表 */
      GET_CouponsList() {

      },

      /** 所选优惠券变化时 */
      changeCoupon(val) {
        this.activityForm.couponId = val
      },

      /** 新增优惠券 */
      addCoupon() {
        this.couponModelShow = true
      },

      /** 优惠券监听 */
      saveCoupon(target) {
        this.couponModelShow = false
        target && this.GET_CouponsList()
      },

      /** 是否送赠品 */
      isChangeGift(val) {
        this.isGift = val
        this.activityForm.isGift = this.isGift ? 1 : 0
        this.giftTxt = this.isGift ? '送' : '送赠品'
      },

      /** 获取赠品列表 */
      GET_giftList() {

      },

      /** 所选赠品变化时 */
      changeGift(val) {
        this.activityForm.giftId = val
      },

      /** 新增赠品 */
      addGift() {
        this.giftModelShow = true
      },

      /** 赠品监听  */
      saveGift(target) {
        this.giftModelShow = false
        target && this.GET_giftList()
      },

      /** 保存表单设置*/
      handleSaveActivity(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.activityForm.activity_id) {
              API_activity.saveActivity(this.activityForm.activity_id, this.activityForm).then(response => {
                this.$message.success('保存设置成功！')
                this.activeName === 'express'
                this.GET_ActivityList()
              }).catch(error => this.$message.error(error))
            } else {
              API_activity.addActivity(this.activityForm).then(response => {
                this.$message.success('保存设置成功！')
                this.activeName === 'express'
                this.GET_ActivityList()
              }).catch(error => this.$message.error(error))
            }
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .goods-image {
    width: 50px;
    height: 50px;
  }

  /deep/ .el-form-item__content {
    width: 80%;
    .el-input .el-input--medium {
      max-width: 80%;
    }
  }

  /*百度UE*/
  /deep/ #edui1 {
    width: 100% !important;
  }

  .content-goods-publish {
    padding: 15px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #ddd;
    background: none repeat scroll 0 0 #fff;
  }

  /*表单信息*/
  .el-form {
    padding-bottom: 80px;
    .el-form-item {
      width: 100%;
      text-align: left;

      /*送积分*/
      .integral-show {
        .el-input {
          width: 50px;
        }
      }
      /** 下拉列表 */
      /deep/ .el-select .el-select--medium {
        width: 160px;
      }
    }
    .discount-model {
      div {
        margin: 5px 0;
      }
    }

    /*提交按钮*/
    /deep/ .btn-submit {
      width: 100%;
      .el-form-item__content {
        text-align: center;
      }
    }
  }

  /*平铺*/
  div.base-info-item {
    h4 {
      padding:0 10px;
      border: 1px solid #ddd;
      background-color: #f8f8f8;
      font-weight: bold;
      color: #333;
      font-size: 14px;
      line-height: 40px;
      text-align: left;
    }
    h4 + div {
      margin-top: 15px;
    }
    .el-form-item {
      margin-left: 5%;
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
</style>


