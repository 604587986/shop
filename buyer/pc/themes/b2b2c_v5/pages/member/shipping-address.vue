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
        :data="address"
        :header-cell-style="{textAlign: 'center'}"
        cell-class-name="address-cell"
        style="width: 100%"
      >
        <el-table-column prop="name" label="收货人" width="100"/>
        <el-table-column label="所在地区" width="200" :formatter="areaFormatter"/>
        <el-table-column prop="addr" label="详细地址" width="280" align="left"/>
        <el-table-column prop="ship_address_name" label="地址别名" width="100" align="left"/>
        <el-table-column prop="mobile" label="联系方式" width="120"/>
        <el-table-column label="默认" width="60">
          <template slot-scope="scope">{{ scope.row.def_addr ? '是' : '否' }}</template>
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
        <el-form-item label="收货人姓名" prop="name">
          <el-input v-model="addressForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="mobile">
          <el-input v-model="addressForm.mobile" size="small" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="收货地区" prop="region">
          <en-region-picker :api="MixinRegionApi" :default="regions" @changed="(object) => { this.addressForm.region = object.last_id }"/>
        </el-form-item>
        <el-form-item label="详细地址" prop="addr">
          <el-input v-model="addressForm.addr" size="small"></el-input>
        </el-form-item>
        <el-form-item label="地址别名" prop="ship_address_name">
          <el-input v-model="addressForm.ship_address_name" size="small" placeholder="公司、家里、学校或其它"></el-input>
        </el-form-item>
        <el-form-item label="设置为默认">
          <el-checkbox v-model="addressForm.def_addr" :true-label="1" :false-label="0">默认</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapActions, mapGetters } from 'vuex'
  import { RegExp } from '~/ui-utils'
  import EnRegionPicker from "@/components/RegionPicker";
  export default {
    name: 'shipping-address',
    components: { EnRegionPicker },
    data() {
      return {
        /** 添加、编辑地址 表单 */
        addressForm: {},
        /** 添加、编辑地址 表单规则 */
        addressRules: {
          name: [
            this.MixinRequired('请输入收货人姓名！'),
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          mobile: [
            this.MixinRequired('请输入联系方式！'),
            { validator: (rule, value, callback) => {
              if (!RegExp.mobile.test(value)) {
                callback(new Error('手机格式有误！'))
              } else {
                callback()
              }
           }, trigger: 'blur' }
          ],
          region: [this.MixinRequired('请选择地址地区！')],
          addr: [
            this.MixinRequired('请输入详细地址！'),
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ]
        },
        /** 编辑地址时，暂存说操作的地址 */
        regions: ''
      }
    },
    mounted() {
      this.getAddress()
    },
    computed: {
      ...mapGetters(['address'])
    },
    methods: {
      areaFormatter(row) {
        return row.province + row.city + row.county + row.town
      },
      /** 添加地址 */
      handleAddAddress() {
        this.addressForm = {
          def_addr: 0,
          ship_address_name: ''
        }
        this.openLayer({
          title: '添加地址',
          yes: index => {
            this.submitAddressForm('add', index)
          }
        })
      },
      /** 编辑地址 */
      handleEaitAddress(row) {
        this.addressForm = JSON.parse(JSON.stringify(row))
        this.regions = [row.province_id, row.city_id, row.county_id || -1, row.town_id || -1]
        this.openLayer({
          yes: index => {
            this.submitAddressForm('edit', index)
          }
        })
      },
      /** 删除地址 */
      handleDeleteAddress(row) {
        this.$confirm('确认要删除这个地址吗？', () => {
          this.deleteAddress(row.addr_id).then(() => {
            this.$message.success('删除成功！')
            this.getAddress()
          })
        })
      },
      submitAddressForm(type, index) {
        this.$refs['addressForm'].validate((valid) => {
          if (valid) {
            this.$layer.close(index)
            const { addr_id } = this.addressForm
            if (!addr_id) {
              this.addAddress(this.addressForm).then(() => {
                this.$message.success('保存成功！')
              })
            } else {
              this.editAddress(this.addressForm).then(() => {
                this.$message.success('保存成功！')
              })
            }
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
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
        getAddress: 'address/getAddressAction',
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
