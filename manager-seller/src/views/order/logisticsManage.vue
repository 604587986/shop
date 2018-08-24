<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleToggleClick">
      <el-tab-pane label="快递模板" name="express">
        <en-table-layout
          toolbar
          pagination
          :tableData="tableData"
          :loading="loading">
          <div slot="toolbar" class="inner-toolbar">
            <div class="toolbar-btns">
              <el-button type="primary" @click="handleAddMould">新增模板</el-button>
            </div>
          </div>
          <template slot="table-columns">
            <!--模板名称-->
            <el-table-column prop="name" label="模板名称"/>
            <!--首重（kg）-->
            <el-table-column prop="first_company" label="首重（kg）"/>
            <!--运费（元）-->
            <el-table-column label="运费（元）">
              <template slot-scope="scope">
                <span>{{ scope.row.first_price | unitPrice('￥') }}</span>
              </template>
            </el-table-column>
            <!--续重（kg）-->
            <el-table-column prop="continued_company" label="续重（kg）"/>
            <!--运费（元）-->
            <el-table-column prop="receipt_type" label="运费（元）">
              <template slot-scope="scope">
                <span>{{ scope.row.continued_price | unitPrice('￥') }}</span>
              </template>
            </el-table-column>
            <!--操作-->
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  @click="handleEditMould(scope.row)">编辑
                </el-button>
                <el-button
                  type="danger"
                  @click="handleDeleteMould(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </template>
        </en-table-layout>
      </el-tab-pane>
      <el-tab-pane :label="tplOperaName" name="add">
        <el-form
          :model="mouldForm"
          status-icon
          :rules="rules"
          ref="mouldForm"
          label-width="120px"
          class="demo-ruleForm">
          <el-form-item label="模板名称:" prop="name">
            <el-input v-model="mouldForm.name" id="tplName"></el-input>
          </el-form-item>
          <el-form-item label="计费方式:" prop="type">
            <span v-if="mouldForm.template_id">{{ mouldForm.type | typeStatus }}</span>
            <el-radio-group v-model="mouldForm.type" v-else>
              <el-radio :label="1">按件数计费</el-radio>
              <el-radio :label="2">按重量计费</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="配送区域:" prop="items">
            <el-table
              :data="mouldForm.items"
              style="width: 80%"
              border>
              <el-table-column label="可配送区域" align="left" >
                <template slot-scope="scope">
                  <div class="dispatchingAreas">
                    <!--地区名称显示-->
                    <div>

                    </div>
                    <el-button type="text" plain @click="editArea(scope.row, scope.$index)">编辑</el-button>
                    <el-button type="text" plain @click="delArea(scope.row, scope.$index)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="mouldForm.type === 1 ? '首件（个）': '首重（kg）'" prop="id" align="center" width="200">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.first_company"
                    @blur="intFirstCompany(scope.row)"
                    clearable></el-input>
                </template>
              </el-table-column>
              <el-table-column label="运费（元）" prop="name" align="center" width="200">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.first_price" @blur="intMoney(scope.row)" clearable></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="mouldForm.type === 1 ? '续件（个）': '续重（kg）'" prop="desc" align="center" width="200">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.continued_company" @blur="intContinuedCompany(scope.row)" clearable></el-input>
                </template>
              </el-table-column>
              <el-table-column label="续费（元）" prop="desc" align="center" width="200">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.continued_price" @blur="intMoney(scope.row)" clearable></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item prop="area">
            <el-button type="text" plain @click="chooseArea">指定可配送区域和运费</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveMould('mouldForm')">保存模板</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="物流公司" name="logistics">
        <en-table-layout
          :tableData="logisticsTableData"
          :loading="loading">
          <template slot="table-columns">
            <!--物流公司-->
            <el-table-column prop="name" label="物流公司"/>
            <!--公司状态-->
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
                  type="success"
                  v-if="!scope.row.shop_id"
                  @click="handleLogisticsSwitch(scope.row)">开启
                </el-button>
                <el-button
                  type="danger"
                  v-if="scope.row.shop_id"
                  @click="handleLogisticsSwitch(scope.row)">关闭
                </el-button>
              </template>
            </el-table-column>
          </template>
        </en-table-layout>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="选择可配送区域" align="center" :visible.sync="isShowArea" width="34%">
      <en-transfer-Tree
        height="400px"
        :from_data="fromData"
        :to_data="toData"
        filter
        pid="parent_id"
        :title="['可选省、市、区', '已选省、市、区']"
        :defaultProps="{label:'local_name'}"
        @addBtn='addArea'
        @removeBtn='removeArea'></en-transfer-Tree>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_express from '@/api/expressMould'
  import * as API_logistics from '@/api/expressCompany'
  import { RegExp } from '~/ui-utils'
  import { AreaSelectorDialog } from '@/plugins/selector/vue'
  import { TransferTree } from '@/components'

  export default {
    name: 'logisticsManage',
    components: {
      [AreaSelectorDialog.name]: AreaSelectorDialog,
      [TransferTree.name]: TransferTree
    },
    data() {
      const checkFirstPrice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('首重运费不能为空'))
        }
        setTimeout(() => {
          if (!RegExp.money.test(value)) {
            callback(new Error('请输入正确的金额'))
          } else {
            callback()
          }
        }, 1000)
      }
      const checkContinuedPrice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('续重运费不能为空'))
        }
        setTimeout(() => {
          if (!RegExp.money.test(value)) {
            callback(new Error('请输入正确的金额'))
          } else {
            callback()
          }
        }, 1000)
      }
      return {
        /** 当前面板的名字*/
        activeName: 'express',

        /** 新增模版/修改模版 */
        tplOperaName: '新增模版',

        /** 列表loading状态 */
        loading: false,

        /** 快递模板列表参数 */
        params: {},

        /** 快递模板列表数据 */
        tableData: [],

        /** 模板表单信息 */
        mouldForm: {
          /** 模板id */
          template_id: '',

          /** 模板名称 */
          name: '',

          /** 模版类型 */
          type: 1,

          items: [
            {
              /** 首重 */
              first_company: 1,

              /** 首重价格 */
              first_price: 0,

              /** 续重*/
              continued_company: 0,

              /** 续重价格 */
              continued_price: 0,

              /** 模板地区*/
              area: []
            }
          ]
        },

        /** 是否是编辑模式 */
        isEdit: false,

        /** 是否显示地区选择器 */
        isShowArea: false,

        /** 原始 全部数据 */
        originData: [],

        /** 源数据 */
        fromData: [],

        /** 目标数据 当前项默认数据*/
        toData: [],

        /** 已选数据 */
        choosedData: [],

        /** 当前操作行索引 */
        currentIndex: 0,

        /** 物流公司列表数据 */
        logisticsTableData: [],

        /** 表单校验规则*/
        rules: {
          name: [
            { required: true, message: '请输入模板名称', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择模板类型', trigger: 'change' }
          ]
        }
      }
    },
    filters: {
      typeStatus(type) {
        return type === 1 ? '重量算运费' : '计件算运费'
      }
    },
    mounted() {
      this.GET_ExpressMould()
    },
    methods: {
      /** 切换模块 */
      handleToggleClick(tab, event) {
        this.activeName = tab.name
        this.tplOperaName = '新增模版'
        if (this.activeName === 'express') {
          this.GET_ExpressMould()
        } else if (this.activeName === 'add') {
          // console.log(132)
        } else {
          this.GET_logisticsList()
        }
      },

      /** 选择配送地区 配置源数据 */
      chooseArea() {
        // 获取地区数据
        API_express.getAreaList().then(response => {
          this.isShowArea = true
          this.originData = response
          this.fromData = response
          // this.fromData = this.retainData(this.originData, this.choosedData)
          this.isEdit = false
        })
      },

      /** 过滤已选数据 */
      retainData(origin, choosed) {
        let result = []
        if (!(origin.length && choosed.length)) {
          return origin
        }
        origin.forEach(key => {
          choosed.forEach(item => {
            if (key.id !== item.id) {
              result.push(key)
            } else {
              if (key.children && item.children) {
                key.children = this.retainData(key.children, item.children)
              }
            }
          })
        })
        return result
      },

      /** 过滤first_company */
      intFirstCompany(row) {
        if (!RegExp.integer.test(row.first_company)) {
          row.first_company = 1
        }
      },

      /** 过滤continued_company */
      intContinuedCompany(row) {
        if (!RegExp.integer.test(row.continued_company) && row.continued_company !== 0) {
          row.continued_company = 0
        }
      },

      /** 过滤first_price continued_price */
      intMoney(row) {
        if (!RegExp.money.test(row.first_price)) {
          row.first_price = 0.00
        } else {
          row.first_price = Number.parseFloat(row.first_price).toFixed(2)
        }
        if (!RegExp.money.test(row.continued_price)) {
          row.continued_price = 0.00
        } else {
          row.continued_price = Number.parseFloat(row.continued_price).toFixed(2)
        }
      },

      /** 编辑子地区 */
      editArea(row, $index) {
        this.isShowArea = true
        this.isEdit = true
        // 更新目标数据
        this.toData = row.area
        this.currentIndex = $index
        // 更新源数据
        this.fromData = this.retainData(this.originData, this.choosedData)
      },

      /** 删除子地区 */
      delArea(row, $index) {
        this.$confirm('确定删除?', '提示', { type: 'warning' }).then(() => {
          // 更新源数据
          // this.fromData.push(row.area)
          // 更新表格数据
          this.mouldForm.items.splice($index, 1)
        })
      },

      // 添加地区回调
      addArea(fromData, toData, obj) {
        // console.log(toData, obj)
        // if (this.isEdit) { // 编辑
        //   // 更新当前项默认数据（更新表格数据）
        //   this.mouldForm.items[this.currentIndex].area = this.toData = toData
        // } else {
        //   // 添加表格数据
        //   this.mouldForm.items.push({
        //     area: toData,
        //
        //     first_company: 1,
        //
        //     first_price: 0,
        //
        //     continued_company: 0,
        //
        //     continued_price: 0
        //   })
        // }
        // // 更新已选数据 把toData融合进choosedData中
        // if (!this.choosedData.length) {
        //   this.choosedData = toData
        // } else {
        //   this.choosedData = this.getChoosedData(this.choosedData, toData)
        // }
      },

      /** 获取已选数据 */
      getChoosedData(choosedData, toData) {
        let result = []
        if (!(choosedData.length && toData.length)) {
          return choosedData
        }
        choosedData.forEach((key) => {
          toData.forEach(item => {
            if (key.id === item.id) {
              if (key.children && item.children) {
                key.children = this.getChoosedData(key.children, item.children)
              }
            } else {
              result.push(item)
            }
          })
        })
        return result
      },

      // 移除地区
      removeArea(fromData, toData, obj) {
        console.log(fromData)
        // this.fromData.push(fromData)
        // 去除已选数据
        // console.log(fromData)
        // console.log(toData)
        // console.log(obj)
      },

      /** 获取快递模板信息*/
      GET_ExpressMould() {
        this.loading = true
        API_express.getTplList(this.params).then(response => {
          this.loading = false
          this.tableData = response
        })
      },

      /** 编辑模板*/
      handleEditMould(row) {
        this.activeName = 'add'
        this.tplOperaName = '修改模版'
        API_express.getSimpleTpl(row.template_id, {}).then((response) => {
          this.mouldForm = { ...response }
          this.mouldForm.area = response.area_json
          this.area = JSON.parse(response.area_json)
        })
      },

      /** 删除模板*/
      handleDeleteMould(row) {
        const _id = row.template_id
        this.$confirm(`确定要删除模板么?`, '确认信息', { type: 'warning' })
          .then(() => {
            API_express.deleteExpressMould(_id, {}).then(() => {
              this.GET_ExpressMould()
              this.$message.success('删除成功')
            })
          })
      },

      /** 新增模板 */
      handleAddMould() {
        this.activeName = 'add'
        this.tplOperaName = '新增模板'
        this.mouldForm = {
          template_id: '',

          name: '',

          first_company: '',

          first_price: '',

          continued_company: '',

          continued_price: '',

          type: 2,

          area: []
        }
        this.area = []
      },

      /** 保存模板 */
      saveMould(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _params = {
              name: this.mouldForm.name,
              type: Number.parseInt(this.mouldForm.type),
              items: this.mouldForm.items
            }
            if (this.mouldForm.template_id) { // 修改
              API_express.saveExpressMould(this.mouldForm.template_id, _params).then(() => {
                this.$message.success('修改成功')
                this.GET_ExpressMould()
                this.activeName = 'express'
                this.tplOperaName = '新增模板'
              })
            } else { // 添加
              delete _params.template_id
              API_express.addExpressMould(_params).then(() => {
                this.$message.success('添加成功')
                this.GET_ExpressMould()
                this.activeName = 'express'
              })
            }
          }
        })
      },

      /** 获取物流公司信息*/
      GET_logisticsList() {
        this.loading = true
        API_logistics.getExpressCompanyList({}).then(response => {
          this.loading = false
          this.logisticsTableData = response
        })
      },

      /** 物流公司信息开启 /关闭 */
      handleLogisticsSwitch(row) {
        const _tip = row.shop_id ? '关闭' : '开启'
        this.$confirm(`确定要${_tip}么?`, '确认信息').then(() => {
          row.shop_id ? this.closeLogistics(row) : this.openLogistics(row)
        })
      },

      /** 执行关闭  */
      closeLogistics(row) {
        API_logistics.closeExpressPower(row.logi_id, {}).then(() => {
          this.$message.success('关闭成功')
          this.GET_logisticsList()
        })
      },

      /** 执行开启 */
      openLogistics(row) {
        API_logistics.openExpressPower(row.logi_id, {}).then(() => {
          this.$message.success('开启成功')
          this.GET_logisticsList()
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ div.toolbar {
    display: none;
  }
  /deep/ #tplName {
    width: 20%;
  }
  /deep/ .el-table__body {
    .el-input {
      width: 60%;
      .el-input__inner {
        text-align: center;
        padding-right: 15px;
      }
    }
  }

  /deep/ .el-tabs__content {
    padding-top: 20px;
    background-color: #fff;
  }
  /deep/ .el-button.is-plain:focus, .el-button.is-plain:hover {
    border: none;
  }
</style>

