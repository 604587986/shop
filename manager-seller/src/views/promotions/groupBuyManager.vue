<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <div class="conditions">
            <span>活动状态:</span>
            <el-select v-model="currentGroupBuyStatus" placeholder="请选择" @change="groupBuyStatusChange">
            <el-option
                v-for="item in groupBuyStatus"
                :key="item.group_buy_status_id"
                :label="item.group_buy_status_name"
                :value="item.group_buy_status_id">
              </el-option>
            </el-select>
          </div>
          <el-button type="primary" class="" @click="handleAddGroupBuyGoods">新增团购商品</el-button>
        </div>
        <div class="toolbar-search">
          <en-table-search @search="searchEvent"/>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column label="商品图片" >
          <template slot-scope="scope">
            <img :src="scope.row.group_buy_image" class="goods-image"/>
          </template>
        </el-table-column>
        <el-table-column label="团购名称" >
          <template slot-scope="scope">
            <div><a href="" style="color: #00a2d4;">{{ scope.row.activity_name }}</a></div>
            <div>{{ scope.row.activity_subname }}</div>
          </template>
        </el-table-column>
        <el-table-column  label="活动信息" >
          <template slot-scope="scope">
            <div>{{ scope.row.activity_name }}</div>
            <div>{{ scope.row.start_time | unixToDate('yyyy-MM-dd') }}
              - {{ scope.row.start_time | unixToDate('yyyy-MM-dd') }}
            </div>
          </template>
        </el-table-column>
        <!--已团购数量-->
        <el-table-column prop="buy_num" label="已团购" />
        <el-table-column label="活动状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.activity_status == 1">已审核</span>
            <span v-if="scope.row.activity_status == 0">已驳回</span>
            <span v-if="scope.row.activity_status == 2">审核中</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              v-if="scope.row.examine_status !== 1"
              @click="handleEditGroupGoods(scope.row)">编辑
            </el-button>
            <el-button
              type="danger"
              v-if="scope.row.examine_status !== 1"
              @click="handleDeleteGroupGoods(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </template>
      <el-pagination
        slot="pagination"
        v-if="pageData"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="pageData.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageData.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.data_total">
      </el-pagination>
    </en-tabel-layout>
  </div>
</template>

<script>
  import * as API_groupBuy from '@/api/groupBuy'
  import { CategoryPicker } from '@/components'
  export default {
    name: 'groupBuyManager',
    components: {
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null,

        /** 当前团购状态*/
        currentGroupBuyStatus: 0,

        /** 团购状态*/
        groupBuyStatus: [
          { group_buy_status_id: 0, group_buy_status_name: '全部团购' },

          { group_buy_status_id: 1, group_buy_status_name: '未审核' },

          { group_buy_status_id: 2, group_buy_status_name: '审核失败' },

          { group_buy_status_id: 3, group_buy_status_name: '已通过' },

          { group_buy_status_id: 4, group_buy_status_name: '已结束' }
        ]
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.GET_GroupGoodsList()
        next()
      })
    },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_GroupGoodsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_GroupGoodsList()
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          activity_name: data
        }
        this.GET_GroupGoodsList()
      },

      /** 团购状态发生改变*/
      groupBuyStatusChange(val) {
        this.params = {
          ...this.params,
          gb_status: val
        }
        this.GET_GroupGoodsList()
      },

      GET_GroupGoodsList() {
        this.loading = true
        API_groupBuy.getGroupBuyGoodsList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
          this.tableData = response.data
        })
      },

      /** 新增团购商品商品 */
      handleAddGroupBuyGoods() {
        this.$router.push({ path: 'add-group-buy-goods' })
      },

      /** 编辑团购商品 */
      handleEditGroupGoods(row) {
        this.$router.push({ path: `edit-group-buy-goods/${row.gb_id}` })
      },

      /** 删除团购商品 */
      handleDeleteGroupGoods(row) {
        this.$confirm('确认删除此团购商品, 是否继续?', '提示', { type: 'warning' }).then(() => {
          API_groupBuy.deleteGroupBuyGoods(row.gb_id, {}).then(() => {
            this.GET_GroupGoodsList()
            this.$message.success('删除团购商品成功！')
          })
        }).catch(() => {
          this.$message.info({ message: '已取消删除' })
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ div.toolbar {
    height: 70px;
    padding: 20px 0;
  }

  div.toolbar-btns {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    div {
      span {
        display: inline-block;
        font-size: 14px;
        color: #606266;
      }
    }
    .conditions {
      margin-right: 30px;
    }
  }

  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .inner-toolbar {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .toolbar-search {
    margin-right: 10px;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }

</style>
