<template>
  <div class="ckt-item info">
    <div class="top-ckt">
      <span class="title-top">收货人信息</span>
      <span class="other-top"><a href="javascript:;" @click="handleAddAddress">新增收货地址</a></span>
      <div class="clearfix"></div>
    </div>

    <!--地址列表-->
    <div class="center-ckt-info"
         :style="{height: (expanded ? address.length * 42 : 114) + 'px'}"
    >
      <ul id="address_list">
        <li
          v-for="item in addressList"
          :key="item.addr_id"
          :class="['li-ckt-info', addressId === item.addr_id && 'selected']"
        >
          <div class="ckt-checkbox info" @click="handleSelectAddress(item)"> <!--w: 150px-->
            <span v-if="item.ship_address_name" :title="item.ship_address_name">{{ item.ship_address_name }}</span>
            <span v-else :title="item.name">{{ item.name }}</span>
          </div>
          <div class="name-li-ckt-info" :title="item.name">{{ item.name }}</div>
          <div class="address-li-ckt-info" :title="formatterAddress(item)">{{ formatterAddress(item) }}</div>  <!--40个字符长度-->
          <div class="mobile-li-ckt-info" :title="item.mobile">{{ item.mobile }}</div>
          <div v-if="item.def_addr" class="default-li-ckt-info">默认地址</div>
          <div class="operate-li-ckt-info">
            <a v-if="!item.def_addr" href="javascript:;" class="set" @click="handleSetDefaultAddress(item)">设置为默认</a>
            <a href="javascript:;" class="edit" @click="handleEaitAddress(item)">编辑</a>
            <a v-if="!item.def_addr" href="javascript:;" class="delete" @click="handleDeleteAddress(item)">删除</a>
          </div>
        </li>
      </ul>
    </div>
    <!--地址列表 end-->
    <div
      v-if="address.length > 3"
      :class="['collapse-ckt-info', expanded && 'more']"
      @click="() => { expanded = !expanded }"
    >
      <span class="more-collapse-ckt">{{ expanded ? '收起地址' : '展开地址' }}</span>
      <i class="icon-collapse-ckt-info"></i>
    </div>
    <div class="placeholder-20"></div>
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
  /**
   * 结算页
   * 收货地址组件
   */
  import Vue from 'vue'
  import { Checkbox, Form, FormItem } from 'element-ui'
  Vue.use(Checkbox)
  Vue.use(Form)
  Vue.use(FormItem)
  import { mapGetters, mapActions } from 'vuex'
  import addressMixin from '@/pages/member/addressMixin'
  import * as API_Trade from '@/api/trade'
  export default {
    name: 'checkout-address',
    // 和个人中心共用mixin
    mixins: [addressMixin],
    props: ['addressId'],
    data() {
      return {
        expanded: false
      }
    },
    watch: {
      address(newVal) {
        const initAddress = newVal.filter(item => item.addr_id === this.addressId)[0]
        this.$emit('change', initAddress)
      }
    },
    computed: {
      /** 把选中的地址放到第一个 */
      addressList() {
        const address = JSON.parse(JSON.stringify(this.$store.getters.address))
        if (!address || address.length === 0) return address
        const selIndex = address.findIndex(item => item.addr_id === this.addressId)
        if (selIndex === -1) return []
        const selAddress = JSON.parse(JSON.stringify(address[selIndex]))
        address.splice(selIndex, 1)
        address.splice(0, 0, selAddress)
        return address
      }
    },
    methods: {
      /** 格式化地址信息 */
      formatterAddress(address) {
        return `${address.province} ${address.city} ${address.county} ${address.town} ${address.addr}`
      },
      /** 选择收货地址 */
      handleSelectAddress(item) {
        if (item.addr_id === this.addressId) return
        API_Trade.setAddressId(item.addr_id).then(response => {
          this.$message.success('设置成功！')
          this.$emit('change', item)
        })
      }
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
