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
            <el-table-column  label="运费（元）">
              <template slot-scope="scope">
                <span>{{ scope.row.first_price }}</span>
              </template>
            </el-table-column>
            <!--续重（kg）-->
            <el-table-column prop="continued_company" label="续重（kg）"/>
            <!--运费（元）-->
            <el-table-column prop="receipt_type" label="运费（元）">
              <template slot-scope="scope">
                <span>{{ scope.row.continued_price }}</span>
              </template>
            </el-table-column>
            <!--模板类型-->
            <el-table-column prop="tpl_type" label="模板类型"/>
            <!--操作-->
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleEditMould(scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="text"
                  @click="handleDeleteMould(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </template>
        </en-tabel-layout>
      </el-tab-pane>
      <el-tab-pane label="新增模板" name="add">
        <el-form :model="mouldForm" status-icon :rules="rules" ref="mouldForm" label-width="100px" class="demo-ruleForm" style="width: 30%;margin-left: 10%;">
          <el-form-item label="模板名称" prop="tpl_name">
            <el-input type="text" v-model="mouldForm.tpl_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="mouldForm.tpl_type === 'weight' ? '首重（kg）': '首件（个）'" prop="first_company">
            <el-input type="text" v-model.number="mouldForm.first_company" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="运费（元）" prop="first_price">
            <el-input v-model.number="mouldForm.first_price"></el-input>
          </el-form-item>
          <el-form-item :label="mouldForm.tpl_type === 'weight' ? '续重（kg）': '续件（个）'" prop="continued_company">
            <el-input v-model.number="mouldForm.continued_company"></el-input>
          </el-form-item>
          <el-form-item  :label="mouldForm.tpl_type === 'weight' ? '续重运费（元）': '续件运费（元）'"  prop="continued_price">
            <el-input v-model.number="mouldForm.continued_price"></el-input>
          </el-form-item>
          <el-form-item label="模板类型" prop="tpl_type">
            <el-select v-model="mouldForm.tpl_type" placeholder="请选择">
              <el-option
                label="重量算运费"
                value="weight">
              </el-option>
              <el-option
                label="计件算运费"
                value="amount">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择配送地区" prop="area">
            <el-button type="primary">选择地区</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveMould('mouldForm')">保存模板</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="物流公司" name="logistics">
        <en-tabel-layout
          toolbar
          pagination
          :tableData="logisticsTableData"
          :loading="loading"
        >
          <template slot="table-columns">
            <!--模板名称-->
            <el-table-column prop="logistics_name" label="物流公司"/>
            <!--首重（kg）-->
            <el-table-column label="公司状态">
              <template slot-scope="scope">
                <span v-if="scope.row.logistics_status == 0">未选择</span>
                <span v-if="scope.row.logistics_status == 1" class="company-choosed">已选择</span>
              </template>
            </el-table-column>
            <!--操作-->
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  v-if="scope.row.logistics_status == 0"
                  @click="handleLogisticsSwitch(scope.row)">开启</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  v-if="scope.row.logistics_status == 1"
                  @click="handleLogisticsSwitch(scope.row)">关闭</el-button>
              </template>
            </el-table-column>
          </template>
        </en-tabel-layout>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import * as API_express from '@/api/expressMould'
  import * as API_logistics from '@/api/expressCompany'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'
  export default {
    name: 'logisticsManage',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      return {
        /** 当前面板的名字*/
        activeName: 'express',

        /** 列表loading状态 */
        loading: false,

        /** 快递模板列表参数 */
        params: {},

        /** 快递模板列表数据*/
        tableData: null,

        /** 新增模板表单信息*/
        mouldForm: {
          tpl_id: '',
          tpl_name: '',
          first_company: '',
          first_price: '',
          continued_company: '',
          continued_price: '',
          tpl_type: '',
          area: []
        },

        /** 表单校验规则*/
        rules: {
          tpl_name: [
            { required: true, message: '请输入模板名称', trigger: 'blur' }
          ],
          first_company: [
            { required: true, message: '请输入首重数量', trigger: 'blur' }
          ],
          first_price: [
            { required: true, message: '请输入首重运费', trigger: 'blur' }
          ],
          continued_company: [
            { required: true, message: '请输入续重数量', trigger: 'blur' }
          ],
          continued_price: [
            { required: true, message: '请输入续重运费', trigger: 'blur' }
          ],
          tpl_type: [
            { required: true, message: '请选择模板类型', trigger: 'blur' }
          ]
        },

        /** 物流公司列表参数 */
        logisticsParams: {},

        /** 物流公司列表数据 */
        logisticsTableData: null
      }
    },
    mounted() {
      this.GET_ExpressMould()
    },
    methods: {
      /** 切换*/
      handleToggleClick(tab, event) {
        this.activeName = tab.name
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
        } else if (this.activeName === 'logistics') {
          this.GET_logisticsList()
        }
      },

      /** 获取快递模板信息*/
      GET_ExpressMould() {
        this.loading = true
        API_express.getExpressMouldList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
        }).catch(error => {
          console.log(error)
        })
      },

      /** 编辑模板*/
      handleEditMould(row) {
        this.activeName = 'add'
        this.mouldForm = {
          tpl_id: row.tpl_id,
          tpl_name: row.tpl_name,
          first_company: row.first_company,
          first_price: row.first_price,
          continued_company: row.continued_company,
          continued_price: row.continued_price,
          tpl_type: row.tpl_type,
          area: []
        }
      },

      /** 删除模板*/
      handleDeleteMould(ids) {
        this.$confirm(`确定要删除模板么?`, '确认信息')
          .then(() => {
            API_express.deleteExpressMould(ids, {}).then(() => {
              this.$message.success('删除成功')
            }).catch(error => {
              console.log(error)
            })
          })
          .catch(() => {})
      },
      /** 新增模板 */
      handleAddMould() {
        this.activeName = 'add'
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
      },

      /** 保存模板 */
      saveMould(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API_express.saveExpressMould(this.mouldForm.tpl_id, this.mouldForm).then(() => {
              this.$message.success('保存成功')
            }).catch(error => {
              this.$message.success('保存失败，请稍后再试！')
              console.log(error)
            })
          } else {
            return false
          }
        })
      },

      /** 获取物流公司信息*/
      GET_logisticsList() {
        this.loading = true
        API_logistics.getExpressCompanyList(this.logisticsParams).then(response => {
          this.loading = false
          this.logisticsTableData = response.data
        }).catch(error => {
          console.log(error)
        })
      },

      /** 物流公司信息开启 /关闭 */
      handleLogisticsSwitch(row) {
        const _tip = row.logistics_status === 1 ? '关闭' : '开启'
        this.$confirm(`确定要${_tip}么?`, '确认信息')
          .then(() => this.switchLogistics(row))
          .catch(() => {})
      },
      switchLogistics(row) {
        const _tip = row.logistics_status === 1 ? '关闭' : '开启'
        API_logistics.switchExpressPower(row.logistics_id, row).then(response => {
          this.$message.success(`${_tip}成功`)
          this.GET_logisticsList()
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .company-choosed{
    font-weight: bold;
    color: #e90101;
  }
</style>

