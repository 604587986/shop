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
    <el-dialog
      title="选择配送区域"
      v-loading="loadArea"
      @open="loadArea = false"
      align="center"
      :visible.sync="areaDialog"
      width="30%">
      <en-transfer-tree
        :title="title"
        :resolveGrade="2"
        :from_data="fromData"
        :to_data="toData"
        height="400px"
        @from_data_change="fromDataChange"
        @to_data_change="toDataChange"
        @from_load_more="fromLoadMore"
        @to_load_more="toLoadMore"
      ></en-transfer-tree>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_express from '@/api/expressMould'
  import * as API_logistics from '@/api/expressCompany'
  import { RegExp } from '~/ui-utils'
  import { api } from '~/ui-domain'
  import { cloneObj } from '@/utils/index'
  import { AreaSelectorDialog } from '@/plugins/selector/vue'
  import { TransferTree } from '@/components'

  export default {
    name: 'logisticsManage',
    components: {
      [AreaSelectorDialog.name]: AreaSelectorDialog,
      [TransferTree.name]: TransferTree
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
        },

        /** 树形地区选择器加载中 */
        loadArea: false,

        /** 树形地区选择器源数据 */
        fromData: {},

        /** 树形地区选择器目标数据 */
        toData: {},

        /** 树形地区选择器静态数据 用于存储用户操作的原始数据 */
        staticData: {},

        /** 树形地区选择器标题 */
        title: ['可选省、市、县', '已选省、市、县']
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
      /** 获取全部地区数据 计算出用户操作变化的原始静态数据 方便使用 */
      getAreaList() {
        API_express.getAreaList().then(response => {
          response.pop()
          this.areaData = response
          // 为每一项设置选中属性 isSelected Boolean值
          let stack = []
          let parallel = []
          for (let i = 0, len = this.areaData.length; i < len; i++) {
            stack.push(this.areaData[i])
          }
          let item
          while (stack.length) {
            item = stack.shift()
            // 如果该节点有子节点，继续添加进入栈顶
            this.$set(item, 'isSelected', false)
            // 把当前项添加进入平行数组
            parallel.push(item)
            if (item.children && item.children.length) {
              stack = item.children.concat(stack)
            }
          }
          // 平行结构转换对象
          this.staticData = this.buildTree(parallel)
          this.initArea()
        })
      },

      /**
       * 将一维的扁平数组转换为多层级对象
       * @param  {[type]} list 一维数组，数组中每一个元素需包含id和parent_id两个属性
       * @return {[type]} tree 多层级树状结构
       */
      buildTree(list) {
        let temp = {}
        let tree = {}
        for (let i in list) {
          temp[list[i].id] = list[i]
        }
        for (let i in temp) {
          if (temp[i].parent_id) {
            if (Array.isArray(temp[temp[i].parent_id].children)) {
              temp[temp[i].parent_id].children = {}
            }
            temp[temp[i].parent_id].children[temp[i].id] = temp[i]
          } else {
            tree[temp[i].id] = temp[i]
          }
        }
        return tree
      },

      /** 切换标签模版 */
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

      /** 初始化源数据 & 目标数据  每次只能给15条用来进行渲染*/
      initArea() {
        // 初始化源数据
        const init_from = Object.keys(this.staticData).slice(0, 8)
        init_from.forEach(key => {
          this.fromData[key] = this.staticData[key]
        })
        // 初始化目标数据
        this.toData = {}
      },

      /** 选择配送地区 */
      chooseArea() {
        this.areaDialog = true
        this.loadArea = true
        this.isEdit = false
        // 默认数据
        this.defaultArea = []
      },

      /** 滚动监听触发 继续加载更多源数据 */
      fromLoadMore() {
        // console.log('滚动加载源数据')
      },

      /** 滚动监听触发 继续加载更多目标数据 */
      toLoadMore() {
        // console.log('滚动加载目标数据')
      },

      /** 源数据更新*/
      fromDataChange(data, type) {
        if (type) { // 如果type 为1 则进行添加 否则移除
          // 如果源数据（fromData）是空对象 则直接赋值 如果不是 则进行对象合并
          if (!Object.keys(this.fromData).length) {
            this.fromData = JSON.parse(JSON.stringify(data))
          } else {
            this.objAssign(this.fromData, data)
          }
        } else { // 移除
          this.objDel(this.fromData, data)
        }
        this.resetSelected(this.fromData)
      },

      /** 目标数据更新 */
      toDataChange(data, type) {
        if (type) { // 如果type 为1 则进行添加 否则移除
          // 如果目标数据（toData）是空对象 则直接赋值 如果不是 则进行对象合并
          if (!Object.keys(this.toData).length) {
            this.toData = JSON.parse(JSON.stringify(data))
          } else {
            this.objAssign(this.toData, data)
          }
        } else { // 移除
          this.objDel(this.toData, data)
        }
        this.resetSelected(this.toData)
      },

      // 对象合并 同名对象子节点添加
      objAssign(origins, data) {
        for (let i in data) {
          if (!origins[i]) { // 如果level1中被整合的目标数据中不存在当前选中项 直接把当前level1进行赋值
            this.$set(origins, i, JSON.parse(JSON.stringify(data[i])))
          } else { // 在level1中存在被整合的目标数据中不存在当前选中项 则进行检测下一级别（level2）
            for (let j in data[i].children) { // 如果level2中被整合的目标数据中不存在当前选中项 直接把当前level2进行赋值
              if (!origins[i].children[j]) {
                this.$set(origins[i].children, j, JSON.parse(JSON.stringify(data[i].children[j])))
              } else { // 在level2中存在被整合的目标数据中不存在当前选中项 则进行检测下一级别（level3）
                for (let k in data[i].children[j].children) { // 如果level3中被整合的目标数据中不存在当前选中项 直接把当前level3进行赋值
                  if (!origins[i].children[j].children[k]) {
                    this.$set(origins[i].children[j].children, k, JSON.parse(JSON.stringify(data[i].children[j].children[k])))
                  }
                }
              }
            }
          }
        }
      },

      // 对象递归移除 同名对象子节点移除
      objDel(origins, data) {
        for (let i in data) {
          if (data[i].isSelected) { // level1全选
            this.$delete(origins, i)
          } else {
            for (let j in data[i].children) { // level1级别未全选 则循环检查level2
              if (data[i].children[j].isSelected) { // level2全选
                this.$delete(origins[i].children, j)
              } else { // level2级别未全选 则循环检查level3
                for (let k in data[i].children[j].children) {
                  if (data[i].children[j].children[k].isSelected) {
                    this.$delete(origins[i].children[j].children, k)
                  }
                }
              }
            }
          }
        }
      },

      /** 重置选中数据 isSelected 为false*/
      resetSelected(model) {
        let stack = []
        for (let i in model) {
          stack.push(model[i])
        }
        let item
        while (stack.length) {
          item = stack.shift()
          // 如果当前节点的兄弟节点 全部跟当前节点一样 则父节点保持同步
          item.isSelected = false
          // 如果该节点有子节点，继续添加进入栈顶
          if (item && item.children && !Array.isArray(item.children)) {
            for (let i in item.children) {
              stack.push(item.children[i])
            }
          }
        }
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
        if (!RegExp.integer.test(row.continued_company)) {
          row.continued_company = 1
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
        this.loadArea = true
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
        API_express.getSimpleTpl(row.id).then((response) => {
          this.mouldForm = { ...response }
          // 初始化过滤地区
          response.items.forEach(key => {
            this.filterData = JSON.parse(key.area)
          })
        })
      },

      /** 删除模板*/
      handleDeleteMould(row) {
        const _id = row.id
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
            if (this.mouldForm.id) { // 修改
              API_express.saveExpressMould(this.mouldForm.id, this.mouldForm).then(() => {
                this.$message.success('修改成功')
                this.GET_ExpressMould()
                this.activeName = 'express'
                this.tplOperaName = '新增模板'
              })
            } else { // 添加
              delete this.mouldForm.id
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

