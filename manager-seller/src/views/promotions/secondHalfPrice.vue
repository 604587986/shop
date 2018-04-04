<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleToggleClick">
      <el-tab-pane label="第二件半价列表" name="seconedHalfList">
        <en-tabel-layout
          toolbar
          pagination
          :tableData="tableData"
          :loading="loading"
        >
          <div slot="toolbar" class="inner-toolbar">
            <div class="toolbar-btns">
              <el-button type="success" @click="handleAddSeconedHalf">新增</el-button>
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
      <el-tab-pane label="新增第二件半价活动" name="add">
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
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="活动描述">
                  <UE v-model="activityForm.activity_desc"></UE>
                </el-form-item>
              </div>
              <div class="dicount-set">
                <el-form-item label="优惠方式">
                  第二件半价
                </el-form-item>
              </div>
              <div class="activity-goods">
                <el-form-item label="活动商品">
                  <el-radio-group v-model="activityForm.activity_goods">
                    <el-radio :label="1">全部商品参与</el-radio>
                    <el-radio :label="0">部分商品参与</el-radio>
                  </el-radio-group>
                  <!--商品选择器-->
                  <div></div>
                </el-form-item>
              </div>
              <el-form-item>
                <el-button type="primary" @click="handleSaveActivity('activityForm')">保存设置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import * as API_activity from '@/api/activity'
  import { TableLayout, TableSearch, CategoryPicker, UE } from '@/components'

  export default {
    name: 'secondHalfPrice',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPicker.name]: CategoryPicker,
      [UE.name]: UE
    },
    data() {
      return {
        /** 当前面板的名字*/
        activeName: 'seconedHalfList',

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

          /** 优惠方式*/
          discount_mode: '',

          /** 活动商品*/
          activity_goods: ''
        },

        /** 表单校验规则*/
        rules: {
          activity_name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 0, max: 60, message: '长度在60个字符之内', trigger: 'blur' }
          ],
          take_effect_time: [
            { type: 'array', required: true, message: '请选择生效时间', trigger: 'change' }
          ]
        }
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

      /** 切换*/
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
            discount_mode: '',
            activity_goods: ''
          }
        }
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
        this.activityForm = {}
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
      handleAddSeconedHalf() {
        this.activeName = 'add'
        this.activityForm = {
          activity_name: '',
          take_effect_time: [],
          activity_desc: '',
          discount_mode: '',
          activity_goods: ''
        }
      },

      /** 保存表单设置*/
      handleSaveActivity(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.activityForm.activity_id) {
              API_activity.saveActivity(this.activityForm.activity_id, this.activityForm).then(response => {
                this.$message.success('保存设置成功！')
                this.activeName === 'seconedHalfList'
                this.GET_ActivityList()
              }).catch(error => {
                console.log(error)
                this.$message.error('保存设置失败，请稍后再试！')
              })
            } else {
              API_activity.addActivity(this.activityForm).then(response => {
                this.$message.success('保存设置成功！')
                this.activeName === 'seconedHalfList'
                this.GET_ActivityList()
              }).catch(error => {
                console.log(error)
                this.$message.error('保存设置失败，请稍后再试！')
              })
            }
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
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
    height: 80px;
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


