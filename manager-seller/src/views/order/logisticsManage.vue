<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleToggleClick">
      <el-tab-pane label="快递模板" name="express">
        <en-tabel-layout
          toolbar
          pagination
          :tableData="tableData"
          :loading="loading"
        >
          <div slot="toolbar" class="inner-toolbar">
            <div class="toolbar-btns">
              <el-button type="success" @click="handleAddMould">新增模板</el-button>
            </div>
          </div>
          <template slot="table-columns">
            <!--模板名称-->
            <el-table-column prop="tpl_name" label="模板名称"/>
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
            <!--模板类型-->
            <el-table-column prop="tpl_type" label="模板类型" :formatter="typeStatus"/>
            <!--操作-->
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleEditMould(scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  @click="handleDeleteMould(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </template>
        </en-tabel-layout>
      </el-tab-pane>
      <el-tab-pane :label="tplOperaName" name="add">
        <el-form
          :model="mouldForm" status-icon
          :rules="rules" ref="mouldForm"
          label-width="160px"
          class="demo-ruleForm"
          style="width: 30%;margin-left: 3%;">
          <el-form-item label="模板名称:" prop="tpl_name">
            <el-input type="text" v-model="mouldForm.tpl_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="mouldForm.tpl_type === 1 ? '首重（kg）:': '首件（个）:'" prop="first_company">
            <el-input type="text" v-model.number="mouldForm.first_company" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="运费（元）:" prop="first_price">
            <el-input v-model.number="mouldForm.first_price"></el-input>
          </el-form-item>
          <el-form-item :label="mouldForm.tpl_type === 1 ? '续重（kg）:':'续件（个）:'" prop="continued_company">
            <el-input v-model.number="mouldForm.continued_company"></el-input>
          </el-form-item>
          <el-form-item :label="mouldForm.tpl_type === 1? '续重运费（元）:':'续件运费（元）:'" prop="continued_price">
            <el-input v-model.number="mouldForm.continued_price"></el-input>
          </el-form-item>
          <el-form-item label="模板类型:" prop="tpl_type">
            <el-select v-model.number="mouldForm.tpl_type" placeholder="请选择">
              <el-option
                v-for="item in tplTypeList"
                :label="item.label"
                :key="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择配送地区:" prop="area">
            <el-button type="primary" @click="chooseArea">选择地区</el-button>
            <en-area-selector-dialog
              :propertys="props"
              :api="areaApi"
              :showDialog="areaDialog"
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
        <logistics-company></logistics-company>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import * as API_express from '@/api/expressMould'
  import { LogisticsCompany } from './components'
  import { AreaSelectorDialog } from '@/plugins/selector/vue'

  export default {
    name: 'logisticsManage',
    components: {
      [LogisticsCompany.name]: LogisticsCompany,
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
        tableData: null,

        /** 地区选择器 */
        areaDialog: false,

        areaApi: `${process.env.BASE_REGION}/regions/depth/3`,

        /** 地址选择器 映射属性 */
        props: {
          /** 等级 */
          level: 'level',

          /** 标签名 */
          local_name: 'localName',

          /** 父地区id */
          p_regions_id: 'parentId',

          /**  地区id */
          region_id: 'id',

          /** 子选项 */
          children: 'children'
        },

        /** 模板表单信息 */
        mouldForm: {
          /** 模板id */
          tpl_id: '',

          /** 模板名称 */
          tpl_name: '',

          /** 首重 */
          first_company: '',

          /** 首重价格 */
          first_price: '',

          /** 续重*/
          continued_company: '',

          /** 续重价格 */
          continued_price: '',

          /** 模板类型 */
          tpl_type: '',

          /** 模板地区*/
          tpl_area: ''
        },

        /** 模板类型列表 */
        tplTypeList: [
          { label: '重量算运费', value: 1 },
          { label: '计件算运费', value: 2 }
        ],

        /** 表单校验规则*/
        rules: {
          tpl_name: [
            { required: true, message: '请输入模板名称', trigger: 'blur' }
          ],
          first_company: [
            { required: true, message: '请输入首重数量', trigger: 'blur' },
            { type: 'number', message: '请输入数字值', trigger: 'blur' }
          ],
          first_price: [
            { required: true, message: '请输入首重运费', trigger: 'blur' },
            { type: 'number', message: '请输入数字值', trigger: 'blur' }
          ],
          continued_company: [
            { required: true, message: '请输入续重数量', trigger: 'blur' },
            { type: 'number', message: '请输入数字值', trigger: 'blur' }
          ],
          continued_price: [
            { required: true, message: '请输入续重运费', trigger: 'blur' },
            { type: 'number', message: '请输入数字值', trigger: 'blur' }
          ],
          tpl_type: [
            { required: true, message: '请选择模板类型', trigger: 'blur' }
          ]
        }
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
          this.mouldForm = {
            tpl_id: '',
            tpl_name: '',
            first_company: '',
            first_price: '',
            continued_company: '',
            continued_price: '',
            tpl_type: '',
            area: []
          }
        }
      },

      /** 模板类型格式化 */
      typeStatus(row, column, cellValue) {
        return row.tpl_type === 1 ? '重量算运费' : '计件算运费'
      },

      /** 选择配送地区 */
      chooseArea() {
        this.areaDialog = true
      },

      /** 地区选择器确认回调 */
      confirmFunc(val) {
        this.mouldForm.tpl_area = val
        this.areaDialog = false
      },

      /** 地区选择器取消回调 */
      hideDialogFunc() {
        this.areaDialog = false
      },

      /** 获取快递模板信息*/
      GET_ExpressMould() {
        this.loading = true
        API_express.getTplList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
        })
      },

      /** 编辑模板*/
      handleEditMould(row) {
        this.activeName = 'add'
        this.tplOperaName = '修改模版'
        API_express.getSimpleTpl(row.tpl_id, {}).then((response) => {
          this.mouldForm = { ...response }
          this.mouldForm.area = response.tpl_area_json
        })
      },

      /** 删除模板*/
      handleDeleteMould(row) {
        const _id = row.tpl_id
        this.$confirm(`确定要删除模板么?`, '确认信息')
          .then(() => {
            API_express.deleteExpressMould(_id, {}).then(() => {
              this.GET_ExpressMould()
              this.$message.success('删除成功')
            })
          }).catch(() => { this.$message.info('取消删除操作') })
      },

      /** 新增模板 */
      handleAddMould() {
        this.activeName = 'add'
        this.tplOperaName = '新增模板'
        this.mouldForm = {
          tpl_id: '',

          tpl_name: '',

          first_company: '',

          first_price: '',

          continued_company: '',

          continued_price: '',

          tpl_type: '',

          tpl_area: ''
        }
      },

      /** 保存模板 */
      saveMould(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _params = {
              name: this.mouldForm.tpl_name,
              first_company: this.mouldForm.first_company,
              first_price: this.mouldForm.first_price,
              continued_company: this.mouldForm.continued_company,
              continued_price: this.mouldForm.continued_price,
              type: parseInt(this.mouldForm.tpl_type),
              area: JSON.stringify(this.mouldForm.tpl_area)
            }
            if (this.mouldForm.tpl_id) {
              API_express.saveExpressMould(this.mouldForm.tpl_id, _params).then(() => {
                this.$message.success('修改成功')
                this.GET_ExpressMould()
                this.activeName = 'express'
                this.tplOperaName = '新增模板'
              })
            } else {
              delete _params.template_id
              API_express.addExpressMould(_params).then(() => {
                this.$message.success('添加成功')
                this.GET_ExpressMould()
                this.activeName = 'express'
              })
            }
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>

