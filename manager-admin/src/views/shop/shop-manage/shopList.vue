<template>
  <div>
    <en-table-layout
      :tableData="tableData.data"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button type="primary" @click="dialogAddShopVisible = true">新建店铺</el-button>
        </div>
        <div class="toolbar-search">
          <en-table-search
            @search="searchEvent"
            @advancedSearch="advancedSearchEvent"
            advanced
            advancedWidth="465"
            placeholder="请输入店铺名称"
          >
            <template slot="advanced-content">
              <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
                <el-form-item label="店铺名称">
                  <el-input size="medium" v-model="advancedForm.shop_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="会员名称">
                  <el-input size="medium" v-model="advancedForm.member_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="店铺状态">
                  <el-select v-model="advancedForm.shop_disable" placeholder="请选择" clearable>
                    <el-option label="全部" value="ALL"/>
                    <el-option label="已开启" value="OPEN"/>
                    <el-option label="已关闭" value="CLOSED"/>
                    <el-option label="待审核" value="APPLY"/>
                    <el-option label="审核未通过" value="REFUSED"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="注册日期">
                  <el-date-picker
                    v-model="advancedForm.shop_time_range"
                    type="daterange"
                    align="center"
                    :editable="false"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp"
                    :picker-options="{ disabledDate(time) { return time.getTime() > Date.now() }, shortcuts: MixinPickerShortcuts }">
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>
      <template slot="table-columns">
        <!--店铺ID-->
        <el-table-column prop="shop_id" label="店铺ID"/>
        <!--店铺名称-->
        <el-table-column prop="shop_name" label="店铺名称"/>
        <!--会员名称-->
        <el-table-column prop="member_name" label="会员名称"/>
        <!--创建时间-->
        <el-table-column prop="shop_createtime" :formatter="MixinUnixToDate" label="创建时间"/>
        <!--店铺状态-->
        <el-table-column label="店铺状态">
          <template slot-scope="scope">{{ scope.row.shop_disable | statusFilter }}</template>
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.shop_disable !== 'APPLY'"
              size="mini"
              type="primary"
              @click="handleEditShop(scope.$index, scope.row)">修改</el-button>
            <el-button
              v-if="scope.row.shop_disable === 'APPLY'"
              size="mini"
              type="primary"
              @click="$router.push({ path: `/shop/shop-manage/edit/${scope.row.shop_id}?audit=1` })">审核</el-button>
            <el-button
              v-if="scope.row.shop_disable === 'OPEN'"
              size="mini"
              type="danger"
              @click="handleCloseShop(scope.$index, scope.row)">关闭</el-button>
            <el-button
              v-if="scope.row.shop_disable === 'CLOSED'"
              size="mini"
              type="success"
              @click="handleOpenShop(scope.$index, scope.row)">开启</el-button>
          </template>
        </el-table-column>
      </template>
      <el-pagination
        v-if="tableData"
        slot="pagination"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="tableData.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="tableData.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.data_total">
      </el-pagination>
    </en-table-layout>
    <!--新建店铺 dialog-->
		<el-dialog title="新建店铺" :visible.sync="dialogAddShopVisible" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-alert
          title="创建基本信息后，再去完善详细信息，并开启"
          type="info"
          :closable="false"
          style="margin-bottom:20px"
          >
        </el-alert>
			<el-form :model="addShopForm" ref="addShopForm" :rules="addShopRules" label-width="100px">
				<el-form-item label="所属会员" prop="member_id">
            <el-button type="success" @click="dialogMemberVisible = true">选择会员</el-button>
            <span v-if="addShopForm.member_id">当前：{{addShopForm.member_name}}</span>
				</el-form-item>
				<el-form-item label="店铺名称" prop="shop_name">
          <el-input v-model="addShopForm.shop_name"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogAddShopVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitAddShopForm('addShopForm')">确 定</el-button>
			</span>
		</el-dialog>

    <!--会员列表 dialog-->
		<el-dialog title="会员列表" :visible.sync="dialogMemberVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="80%">
      <member-component @selectMember="handleSelect"></member-component>
		</el-dialog>

  </div>
</template>

<script>
/* eslint-disable */
  import * as API_Shop from '@/api/shop'
  import memberComponent from './memberComponent'

  export default {
    name: 'shopList',
    data() {
      return {
        /** 列表loading状态 */
        loading: false,
        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10,
          shop_disable: 'ALL'
        },
        /** 列表数据 */
        tableData: '',
        /** 高级搜索数据 */
        advancedForm: {},
        /** 新建店铺dialog */
        dialogAddShopVisible:false,
        /** 新建店铺表单 */
        addShopForm:{
          member_id:null,
          member_name:null,
          shop_name:null
        },
        /** 会员列表dialog */
        dialogMemberVisible:false,

       /** 添加店铺 表单规则 */
        addShopRules: {
          shop_name: [
            this.MixinRequired('请输入店铺名称！')
          ],
          member_id: [{ required: true, pattern: /^\S.*$/gi, message: '请选择会员', trigger: 'change' },]
        },
      }
    },
    mounted() {
      this.GET_ShopList()
    },
    components:{
      memberComponent
    },
    filters: {
      statusFilter(val) {
        switch (val) {
          case 'REFUSED': return '审核未通过'
          case 'APPLY': return '待审核'
          case 'OPEN': return '开启中'
          case 'CLOSED': return '已关闭'
          default: return '未知状态'
        }
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_ShopList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_ShopList()
      },

      /** 编辑店铺 */
      handleEditShop(index, row) {
        this.$router.push({ name: 'shopEdit', params: { id: row.shop_id, callback: this.GET_ShopList }})
      },

      /** 关闭店铺 */
      handleCloseShop(index, row) {
        this.$confirm('确定要关闭这个店铺吗？', '提示', { type: 'warning' }).then(() => {
          API_Shop.closeShop(row.shop_id).then(response => {
            this.$message.success('关闭成功！')
            this.GET_ShopList()
          })
        }).catch(() => {})
      },

      /** 开启店铺 */
      handleOpenShop(index, row) {
        this.$confirm('确定要开启这个店铺吗？', '提示', { type: 'warning' }).then(() => {
          API_Shop.recoverShop(row.shop_id).then(response => {
            this.$message.success('开启成功！')
            this.GET_ShopList()
          })
        }).catch(() => {})
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.params.page_no = 1
        this.GET_ShopList()
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
        this.params = {
          ...this.params,
          ...this.advancedForm
        }
        delete this.params.start_time
        delete this.params.end_time
        const { shop_time_range } = this.advancedForm
        if (shop_time_range) {
          this.params.start_time = parseInt(shop_time_range[0] /= 1000)
          this.params.end_time = parseInt(shop_time_range[1] /= 1000)
        }
        delete this.params.keyword
        delete this.params.shop_time_range
        this.params.page_no = 1
        this.GET_ShopList()
      },

      /** 获取店铺列表 */
      GET_ShopList() {
        this.loading = true
        API_Shop.getShopList(this.params).then(response => {
          this.loading = false
          this.tableData = response
        }).catch(() => { this.loading = false })
      },

      /** 新建店铺 表单提交 */
      submitAddShopForm(formName){
        
          this.$refs[formName].validate((valid) => {
          if (valid) {
            API_Shop.addShop(this.addShopForm).then(response=>{
              this.dialogAddShopVisible = false
              this.$message.success('添加成功,请去完善店铺信息！')
              this.GET_ShopList()
            })
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })

      },

      /** 选择会员 */
      handleSelect(row){
        this.addShopForm.member_id = row.member_id;
        this.addShopForm.member_name = row.uname;
        this.dialogMemberVisible = false;
      }
    }
  }
</script>
