<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleToggleClick">
      <el-tab-pane label="单品立减列表" name="singleCutList">
        <en-tabel-layout
          toolbar
          pagination
          :tableData="tableData"
          :loading="loading"
        >
          <div slot="toolbar" class="inner-toolbar">
            <div class="toolbar-btns">
              <el-button type="success" @click="handleAddSingleCut">新增</el-button>
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
      <el-tab-pane label="新增单品立减" name="add">
        <el-row :gutter="20" type="flex" justify="space-around" >
          <el-col :span="4">
            <div class="activity-info activity-title">活动信息</div>
            <div class="dicount-set activity-title">优惠设置</div>
            <div class="activity-goods activity-title">活动商品</div>
          </el-col>
          <el-col :span="20">
            <el-form
              :model="activityForm" status-icon
              :rules="rules" ref="activityForm"
              label-width="100px"
              class="demo-ruleForm">
              <div class="activity-info">
                <el-form-item  label="活动名称" prop="activity_name">
                  <el-input v-model="activityForm.activity_name" type="text" placeholder="不超过60个字符" ></el-input>
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
              <div class="dicount-set">
                <el-form-item label="优惠方式" prop="price_reduction">
                  单品立减 <el-input v-model.number="activityForm.price_reduction" style="width: 150px;"></el-input> 元
                </el-form-item>
              </div>
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
              <el-form-item>
                <el-button type="success" @click="saveActivity('activityForm')">保存设置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!--商品选择器-->
    <en-goods-selector :show="showDialog" :api="goods_api" :defaultData="tableData" :maxLength="maxsize"
                       @confirm="refreshFunc" @closed="showDialog = false"/>
  </div>
</template>

<script>
  import * as API_activity from '@/api/activity'
  import { TableLayout, TableSearch, CategoryPicker, UE } from '@/components'
  import { GoodsSelector } from '@/plugins/selector/vue'

  export default {
    name: 'singleCut',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPicker.name]: CategoryPicker,
      [UE.name]: UE,
      [GoodsSelector.name]: GoodsSelector
    },
    data() {
      return {
        /** 当前面板的名字*/
        activeName: 'singleCutList',

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

          /** 优惠方式 减价金额*/
          price_reduction: 20,

          /** 是否全部商品参与*/
          is_all_joined: '',

          /** 活动商品*/
          activity_goods: []
        },

        /** 表单校验规则*/
        rules: {
          activity_name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 0, max: 60, message: '长度在60个字符之内', trigger: 'blur' }
          ],
          take_effect_time: [
            { type: 'array', required: true, message: '请选择生效时间', trigger: 'change' }
          ],
          price_reduction: [
            { required: true, message: '请填写优惠金额', trigger: 'change' },
            { type: 'number', message: '请输入数字值' }
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
        goods_api: process.env.BASE_API + '/shop/seller/goods/search.do',
        // goods_api: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/list',

        /** 显示/隐藏商品选择器 */
        showDialog: false
      }
    },
    mounted() {
      this.GET_ActivityList()
    },
    methods: {

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          goods_status: data
        }
        this.GET_ActivityList()
      },

      /** 切换面板*/
      handleToggleClick(tab, event) {
        this.activeName = tab.name
        if (this.activeName === 'express') {
          this.GET_ActivityList()
        } else if (this.activeName === 'add') {
          this.activityForm = {
            activity_id: '',
            activity_name: '',
            take_effect_time: [],
            activity_desc: '',
            discount_threshold: '',
            price_reduction: '',
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

      /** 编辑活动 */
      handleEditMould(row) {
        this.activeName = 'add'
        this.activityForm = {
          ...row,
          take_effect_time: [parseInt(row.start_time) * 1000, parseInt(row.end_time) * 1000]
        }
        this.goodsShow = this.activityForm.is_all_joined === 1
      },

      /** 删除活动 */
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

      /** 新增 */
      handleAddSingleCut() {
        this.activeName = 'add'
        this.activityForm = {
          activity_id: '',
          activity_name: '',
          take_effect_time: [],
          activity_desc: '',
          price_reduction: '',
          activity_goods: ''
        }
      },

      /** 保存表单设置 为此活动保存表单 提交商品goods_id 字符串 用逗号分隔*/
      saveActivity(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _ids = this.activityForm.activity_id || -1
            API_activity.addActivity(_ids, this.activityForm).then(response => {
              this.$message.success('保存设置成功！')
              this.activeName === 'singleCutList'
              this.GET_ActivityList()
            }).catch(error => {
              console.log(error)
              this.$message.error('删除失败，请稍后再试！')
            })
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
  /*新增表单面板*/
  #pane-add {
    background: #fff;
    padding: 10px;
    border: 1px solid #9a9a9a;
  }
  .activity-info {
    height: 460px;
    margin: 10px 0 10px 10px;
    padding: 10px;
    background-color: #f8f8f8;
  }
  .dicount-set {
    height: 80px;
    margin: 10px 0 10px 10px;
    padding: 10px;
    background-color: #f8f8f8;
  }
  .activity-goods {
    min-height: 80px;
    margin: 10px 0 10px 10px;
    padding: 10px;
    background-color: #f8f8f8;
  }
  .activity-title {
    text-align: center;
    padding: 15px;
    color: #333;
    font-size: 14px;
    font-weight: bold;
  }
  .discount-tip {
    font-size: 12px;
    line-height: 30px;
    margin-left: 5px;
    color: red;
  }
</style>


