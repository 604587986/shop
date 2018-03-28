<template>
  <div id="shipping-address">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li class="active">收货地址管理</li>
      </ul>
      <el-button size="mini" class="add-address-btn" @click="handleAddAddress">添加地址</el-button>
    </div>
    <div class="address-list">
      <el-alert
        title="友情提示"
        type="warning"
        description="最多只能保存20个收货地址"
        close-text="我知道了"
        show-icon>
      </el-alert>
      <el-table
        :data="addressList"
        :header-cell-style="{textAlign: 'center'}"
        cell-class-name="address-cell"
        style="width: 100%"
      >
        <el-table-column prop="ship_name" label="收货人" width="100"/>
        <el-table-column label="所在地区" width="200" :formatter="areaFormatter"/>
        <el-table-column prop="ship_address" label="详细地址" width="280" align="left"/>
        <el-table-column prop="ship_alias" label="地址别名" width="100" align="left"/>
        <el-table-column prop="ship_mobile" label="联系方式" width="120"/>
        <el-table-column label="默认" width="60">
          <template slot-scope="scope">{{ scope.row.is_default ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column label="操作" width="110">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleEaitAddress(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" class="delete-btn" @click="handleDeleteAddress(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="addressForm" style="display: none">
      <el-form :model="addressForm" :rules="addressRules" ref="addressForm" label-width="100px">
        <el-form-item label="收货人姓名" prop="ship_name">
          <el-input v-model="addressForm.ship_name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="ship_mobile">
          <el-input v-model="addressForm.ship_mobile" size="small" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="收货地区">
          <en-address-select :default="addressForm.regions" @changed="handleAddressSelectChanged"/>
        </el-form-item>
        <el-form-item label="详细地址" prop="ship_address">
          <el-input v-model="addressForm.ship_address" size="small"></el-input>
        </el-form-item>
        <el-form-item label="地址别名" prop="ship_alias">
          <el-input v-model="addressForm.ship_alias" size="small"></el-input>
        </el-form-item>
        <el-form-item label="设置为默认">
          <el-checkbox v-model="addressForm.is_default" :true-label="1" :false-label="0">默认</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import { mapActions, mapGetters } from 'vuex'
  import { AddressSelect } from '@/components'
  import * as regExp from '@/utils/RegExp'
  export default {
    name: 'shipping-address',
    components: {
      [AddressSelect.name]: AddressSelect
    },
    data() {
      return {
        /** 添加、编辑地址 表单 */
        addressForm: {},
        /** 添加、编辑地址 表单规则 */
        addressRules: {
          ship_name: [
            { required: true, message: '请输入收货人姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          ship_mobile: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
            { validator: (rule, value, callback) => {
              if (!regExp.mobile.test(value)) {
                callback(new Error('手机格式有误！'))
              } else {
                callback()
              }
           }, trigger: 'blur' }
          ],
          ship_address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ]
        },
        /** 当前选好的地区数据 */
        selectedRegions: ''
      }
    },
    mounted() {
      window.axios = axios
      this.getAddressData()
    },
    computed: {
      ...mapGetters({
        addressList: 'address/addressList'
      })
    },
    methods: {
      areaFormatter(row) {
        return row.province + row.city + row.region + row.town
      },
      /** 添加地址 */
      handleAddAddress() {
        this.addressForm = {
          is_default: 0,
          ship_alias: ''
        }
        this.selectedRegions = ''
        this.openLayer({
          title: '添加地址',
          yes: index => {
            this.submitAddressForm('add', index)
          }
        })
      },
      /** 编辑地址 */
      handleEaitAddress(row) {
        this.addressForm = {...row}
        this.addressForm.regions = [row.province_id, row.city_id, row.region_id || -1, row.town_id || -1]
        this.selectedRegions = ''
        this.openLayer({
          yes: index => {
            this.submitAddressForm('edit', index)
          }
        })
      },
      /** 删除地址 */
      handleDeleteAddress(row) {
        this.$layer.confirm('确认要删除这个地址吗？', () => {
          this.deleteAddress(row.address_id).then(() => this.$message.success('删除成功！'))
        })
      },
      submitAddressForm(type, index) {
        this.$refs['addressForm'].validate((valid) => {
          if (valid) {
            const regions = this.selectedRegions.regions
            if (!regions) {
              this.$message.error('您还没有选择地址！')
              return false
            }
            const _params = {
              ...this.addressForm,
              ...regions
            }
            if (type === 'add') {
              this.addAddress(_params).then(() => {
                this.$layer.close(index)
                this.$message.success('保存成功！')
              })
            } else {
              this.editAddress(_params).then(() => {
                this.$layer.close(index)
                this.$message.success('保存成功！')
              })
            }
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },
      /** 地址选择插件发生改变 */
      handleAddressSelectChanged(object) {
        this.selectedRegions = object
      },
      /** 打开layer弹窗 */
      openLayer(params) {
        this.$layer.open({
          type: 1,
          title: '编辑地址',
          area: '500px',
          scrollbar: false,
          content: $('#addressForm'),
          btn: ['确认', '取消'],
          ...params
        })
      },
      ...mapActions({
        getAddressData: 'address/getAddressDataAction',
        deleteAddress: 'address/deleteAddressAction',
        addAddress: 'address/addAddressAction',
        editAddress: 'address/editAddressAction'
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .add-address-btn {
    position: absolute;
    top: 0;
    right: 0;
  }
  .address-list {
    /deep/ .el-alert { margin: 10px 0}
    /deep/ .delete-btn { color: #f42424 }
    /deep/ .address-cell {
      text-align: center;
    }
  }
  #addressForm{
    padding: 10px 20px;
    /deep/ .app-address { margin-top: 7px }
  }
</style>
