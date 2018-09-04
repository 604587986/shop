<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleToggleClick">
      <el-tab-pane label="快递模板" name="express">
        <div style="margin-bottom: 10px;">
          <el-button type="primary" @click="handleAddMould">新增模板</el-button>
        </div>
        <el-collapse v-for="(item, index) in tableData" :key="index">
          <el-collapse-item>
            <template slot="title">
              <div class="colla-title">
                <span>{{ item.name }}</span>
                <div>
                  <el-button type="text"plain @click="handleEditMould(item)">编辑</el-button>
                  <el-button type="text" plain @click="handleDeleteMould(item)">删除</el-button>
                </div>
              </div>
            </template>
            <en-table-layout
              :stripe="false"
              border
              :tableData="item.items"
              :loading="loading">
              <template slot="table-columns">
                <!--可配送区域-->
                <el-table-column label="可配送区域" align="left">
                  <template slot-scope="scope">
                    <div class="dispatchingAreas">
                      <span v-for="(item, index) in formatAreaJson(scope.row.area)">
                        <span v-if="item.level === 1" style="color: #333;"> {{ item.local_name }}
                          <span v-if="++index !== formatAreaJson(scope.row.area).length">、</span>
                        </span>
                        <span v-if="item.level === 2" style="color: #777;"> {{ item.local_name }}
                          <span v-if="item.children && item.children.length" style="color: #aaa;">(</span>
                          <span v-if="item.children && item.children.length" v-for="(child, _index) in item.children" style="color: #aaa;">
                            {{ child.local_name }}<span v-if="++_index !== item.children.length">,</span>
                          </span>
                          <span v-if="item.children && item.children.length" style="color: #aaa;">)</span>
                          <span v-if="++index !== formatAreaJson(scope.row.area).length">、</span>
                        </span>
                      </span>
                    </div>
                  </template>
                </el-table-column>
                <!--首重（kg）-->
                <el-table-column prop="first_company" :label="item.type === 1 ? '首重（kg）': '首件（个）'"  width="200"/>
                <!--运费（元）-->
                <el-table-column label="运费（元）" width="200">
                  <template slot-scope="scope">
                    <span>{{ scope.row.first_price | unitPrice('￥') }}</span>
                  </template>
                </el-table-column>
                <!--续重（kg）-->
                <el-table-column prop="continued_company" :label="item.type === 1 ? '续重（kg）': '续件（个）'" width="200"/>
                <!--续费（元）-->
                <el-table-column label="续费（元）" width="200">
                  <template slot-scope="scope">
                    <span>{{ scope.row.continued_price | unitPrice('￥') }}</span>
                  </template>
                </el-table-column>
              </template>
            </en-table-layout>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane :label="tplOperaName" name="add">
        <el-form
          :model="mouldForm"
          status-icon
          :rules="rules"
          ref="mouldForm"
          label-width="120px"
          class="demo-ruleForm">
          <el-form-item label="模板名称:" prop="name" id="tplName">
            <el-input v-model="mouldForm.name"></el-input>
          </el-form-item>
          <el-form-item label="计费方式:" prop="type" v-if="!mouldForm.template_id">
            <el-radio-group v-model="mouldForm.type" >
              <el-radio :label="2">按件数计费</el-radio>
              <el-radio :label="1">按重量计费</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="计费方式:" v-if="mouldForm.template_id">
            <div style="color: #909399;font-size: 13px;">{{ mouldForm.type | typeStatus }}</div>
          </el-form-item>
          <el-form-item label="配送区域:" prop="items">
            <el-table
              :data="mouldForm.items"
              style="width: 80%"
              border>
              <el-table-column label="可配送区域" align="left" >
                <template slot-scope="scope">
                  <div class="dispatchingAreas">
                    <span v-for="(item, index) in formatAreaJson(scope.row.area)">
                      <span v-if="item.level === 1" style="color: #333;"> {{ item.local_name }}
                        <span v-if="++index !== formatAreaJson(scope.row.area).length">、</span>
                      </span>
                      <span v-if="item.level === 2" style="color: #777;"> {{ item.local_name }}
                        <span v-if="item.children && item.children.length" style="color: #aaa;">(</span>
                        <span v-if="item.children && item.children.length" v-for="(child, _index) in item.children" style="color: #aaa;">
                          {{ child.local_name }}<span v-if="++_index !== item.children.length">,</span>
                        </span>
                        <span v-if="item.children && item.children.length" style="color: #aaa;">)</span>
                        <span v-if="++index !== formatAreaJson(scope.row.area).length">、</span>
                      </span>
                    </span>
                    <div style="float: right;">
                      <el-button type="text" plain @click="editArea(scope.row, scope.$index)">编辑</el-button>
                      <el-button type="text" plain @click="delArea(scope.row, scope.$index)">删除</el-button>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="mouldForm.type === 1 ? '首重（kg）': '首件（个）'" prop="id" align="center" width="200">
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
              <el-table-column :label="mouldForm.type === 1 ? '续重（kg）': '续件（个）'" prop="desc" align="center" width="200">
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
            <en-area-selector-dialog
              :api="areaApi"
              :showDialog="areaDialog"
              :defaultData="defaultArea"
              :filterData="filterData"
              @confirmFunc="confirmFunc"
              @hideDialogFunc="hideDialogFunc"
            ></en-area-selector-dialog>
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
  </div>
</template>

<script>
  import * as API_express from '@/api/expressMould'
  import * as API_logistics from '@/api/expressCompany'
  import { RegExp } from '~/ui-utils'
  import { api } from '~/ui-domain'
  import { cloneObj } from '@/utils/index'
  import { AreaSelectorDialog } from '@/plugins/selector/vue'

  export default {
    name: 'logisticsManage',
    components: {
      [AreaSelectorDialog.name]: AreaSelectorDialog
    },
    data() {
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

          items: []
        },

        /** 地区选择器 */
        areaDialog: false,

        areaApi: `${api.base}/regions/depth/3`,

        /** 全部地区信息 */
        areaData: [],

        /** 默认地区信息 */
        defaultArea: [],

        /** 是否是编辑模式 */
        isEdit: false,

        /** 操作当前行索引 */
        currentIndex: -1,

        /** 过滤地区数据 */
        filterData: [],

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
      this.getAreaList()
    },
    methods: {
      /** 获取全部地区数据 方便使用 */
      getAreaList() {
        API_express.getAreaList().then(response => {
          this.areaData = response
        })
      },

      /** 切换模块 */
      handleToggleClick(tab, event) {
        this.activeName = tab.name
        this.tplOperaName = '新增模版'
        if (this.activeName === 'express') {
          this.GET_ExpressMould()
        } else if (this.activeName === 'add') {
          this.mouldForm = {
            /** 模板id */
            template_id: '',

            /** 模板名称 */
            name: '',

            /** 模版类型 */
            type: 1,

            items: []
          }
          this.defaultArea = []
        } else {
          this.GET_logisticsList()
        }
      },

      /** 选择配送地区 */
      chooseArea() {
        this.areaDialog = true
        this.isEdit = false
        // 默认数据
        this.defaultArea = []
      },

      /** 地区选择器确认回调 */
      confirmFunc(val) {
        if (this.isEdit) { // 编辑模式
          // 更新表格地区数据
          const _area = typeof this.mouldForm.items[this.currentIndex].area === 'string' ? JSON.parse(this.mouldForm.items[this.currentIndex].area) : this.mouldForm.items[this.currentIndex].area
          this.mouldForm.items[this.currentIndex].area = val
          this.mouldForm.items[this.currentIndex].area_json = JSON.stringify(val)
          this.mouldForm.items[this.currentIndex].area_id = JSON.stringify(val.map(key => { return key.id }))
          // 更新过滤数据 删除
          this.filterData.forEach((key, index) => {
            _area.forEach(item => {
              if (key.region_id === item.region_id) {
                this.filterData.splice(index, 1)
              }
            })
          })
          // 更新过滤数据 添加
          this.filterData = this.filterData.concat(val)
          // 过滤数据对象数组去重
          let obj = {}
          this.filterData = this.filterData.reduce((item, next) => {
            obj[next.region_id] ? '' : obj[next.region_id] = true && item.push(next)
            return item
          }, [])
          // 更新当前默认数据
          this.defaultArea = val
        } else { // 添加
          if (!val.length) return
          // 更新表格数据（添加操作）
          this.mouldForm.items.push({
            area: val,
            area_id: JSON.stringify(val.map(key => { return key.id })),
            area_json: JSON.stringify(val),
            first_company: 1,
            first_price: 0,
            continued_company: 0,
            continued_price: 0
          })
          // 更新过滤地区数据 添加
          this.filterData = this.filterData.concat(val)
          // 更新当前默认数据
          this.defaultArea = []
        }
        this.areaDialog = false
      },

      /** 地区选择器取消回调 */
      hideDialogFunc() {
        this.areaDialog = false
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
        this.areaDialog = true
        this.isEdit = true
        // 更新当前默认数据
        this.defaultArea = typeof row.area === 'string' ? JSON.parse(row.area) : row.area
        // 更新当前操作索引
        this.currentIndex = $index
      },

      /** 删除子地区 */
      delArea(row, $index) {
        this.$confirm('确定删除?', '提示', { type: 'warning' }).then(() => {
          // 更新表格数据
          this.mouldForm.items.splice($index, 1)
          // 更新过滤数据 删除
          const _area = typeof row.area === 'string' ? JSON.parse(row.area) : row.area
          let _filterData = _area.map(key => { return key.id })
          this.filterData.forEach((key, index) => {
            if (_filterData.includes(key.id)) {
              this.filterData.splice(index, 1)
            }
          })
        })
      },

      /** 获取快递模板列表信息*/
      GET_ExpressMould() {
        this.loading = true
        API_express.getTplList().then(response => {
          this.loading = false
          this.tableData = response
        })
      },

      /** 编辑模板*/
      handleEditMould(row) {
        this.activeName = 'add'
        this.tplOperaName = '修改模版'
        API_express.getSimpleTpl(row.template_id).then((response) => {
          this.mouldForm = { ...response }
          // 初始化过滤地区
          response.items.forEach(key => {
            this.filterData = JSON.parse(key.area)
          })
        })
      },

      /** 删除模板*/
      handleDeleteMould(row) {
        const _id = row.template_id
        this.$confirm(`确定要删除模板么?`, '确认信息', { type: 'warning' })
          .then(() => {
            API_express.deleteExpressMould(_id).then(() => {
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
          /** 模板id */
          template_id: '',

          /** 模板名称 */
          name: '',

          /** 模版类型 */
          type: 1,

          items: []
        }
        // 重置默认数据
        this.defaultArea = []
        // 重置过滤地区
        this.filterData = []
      },

      /** 格式化数据 */
      formatAreaJson(area) {
        let _area = area
        let resultArea = []
        if (typeof area === 'string') {
          _area = JSON.parse(area)
        }
        const _ids = _area.map(key => { return key.id })
        let _resultIds = []
        _area.forEach(key => {
          if (key.level === 1) {
            resultArea.push(key)
          } else if (key.level === 2) {
            if (!_ids.includes(key.parent_id)) { resultArea.push(key) }
          } else if (key.level === 3) {
            if (!_ids.includes(key.parent_id)) { // 如果其父id不存在
              // 首先检测resultArea中是否存在父id，如果存在（必存在children字段信息,children为数组）：则找出此二级项，并向此children中添加当前三级项信息；
              if (_resultIds.includes(key.parent_id)) {
                resultArea.forEach(item => {
                  if (item.id === key.parent_id) { item.children.push(key) }
                })
                // 如果不存在：去全部数据中追寻其父id的项，把其父项添加进来作为resultArea一维数组的一项，并且添加children属性，将当前三级项添加进入children中
              } else {
                this.areaData.forEach(ele => {
                  if (ele.children) {
                    ele.children.forEach(item => {
                      if (item.id === key.parent_id) {
                        let _item = cloneObj(item)
                        _item.children = []
                        _item.children.push(key)
                        resultArea.push(_item)
                      }
                    })
                  }
                })
              }
            }
            // 三级项更新后 更新当前二级项id信息
            _resultIds = resultArea.map(key => { return key.id })
          }
        })
        return resultArea
      },

      /** 保存模板 */
      saveMould(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.mouldForm.items.forEach(key => {
              key.area = typeof key.area === 'string' ? key.area : JSON.stringify(key.area)
            })
            if (this.mouldForm.template_id) { // 修改
              API_express.saveExpressMould(this.mouldForm.template_id, this.mouldForm).then(() => {
                this.$message.success('修改成功')
                this.GET_ExpressMould()
                this.activeName = 'express'
                this.tplOperaName = '新增模板'
              })
            } else { // 添加
              delete this.mouldForm.template_id
              API_express.addExpressMould(this.mouldForm).then(() => {
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
    width: 25%;
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
    padding: 20px;
    background-color: #fff;
  }
  /deep/ .el-button.is-plain, .el-button.is-plain:hover {
    border: none;
  }
  /deep/ .el-collapse {
    border-bottom: none;
    .el-collapse-item__header {
      background-color: transparent;
    }
    .el-collapse-item{
      margin-bottom: 10px;
      background-color: #f6f6f6;
    }
    .el-collapse-item__wrap {
      border-bottom: 0;
    }
  }
  .colla-title {
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    background-color: #f6f6f6;
  }
  /deep/ .el-button.is-plain:hover {
    background-color: transparent;
  }
</style>

