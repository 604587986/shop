<template>
  <div id="shipping-address">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li class="active">收货地址管理</li>
      </ul>
    </div>
    <div class="address-list">
      <el-alert
        title="友情提示"
        type="warning"
        description="最多只能保存10个收货地址"
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
        <el-table-column prop="province" label="所在地区" width="200" :formatter="areaFormatter"/>
        <el-table-column prop="address" label="详细地址" width="300" align="left"/>
        <el-table-column prop="mobile" label="联系方式" width="150"/>
        <el-table-column label="默认" width="70">
          <template slot-scope="scope">{{ scope.row.is_default ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleEaitAddress(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" class="delete-btn" @click="handleDeleteAddress(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="addressForm" style="display: none">

    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'shipping-address',
    data() {
      return {
        addressForm: ''
      }
    },
    created() {
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
      /** 编辑地址 */
      handleEaitAddress(row) {
        this.addressForm = row
        this.$layer.open({
          type: 1,
          title: '编辑地址',
          area: '500px',
          scrollbar: false,
          content: $('#addressForm'),
          btn: ['确认', '取消']
        })
      },
      /** 删除地址 */
      handleDeleteAddress(row) {
        this.$layer.confirm('确认要删除这个地址吗？', () => {
          this.deleteAddress(row.address_id).then(() => this.$message.success('删除成功！'))
        })
      },
      ...mapActions({
        getAddressData: 'address/getAddressDataAction',
        deleteAddress: 'address/deleteAddressAction'
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .address-list {
    /deep/ .el-alert { margin: 10px 0}
    /deep/ .delete-btn { color: #f42424 }
    /deep/ .address-cell {
      text-align: center;
    }
  }
</style>
