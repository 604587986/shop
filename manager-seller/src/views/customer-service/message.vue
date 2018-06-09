<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
      :selectionChange="handleSelectionChange"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <div class="conditions">
            <span>消息类型:</span>
            <el-select v-model="current_category" placeholder="请选择"  @change="handleChangeMsgCategory">
              <el-option
                v-for="item in msg_categorys"
                :key="item.msg_category_id"
                :label="item.msg_category_label"
                :value="item.msg_category_id">
              </el-option>
            </el-select>
          </div>
          <el-button @click="handleDeleteAllMsgs" type="danger">全部删除</el-button>
          <el-button @click="handleSignReadAllMsgs" type="primary">标记为已读</el-button>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="msg_content" label="内容"/>
        <el-table-column label="发送时间" width="200" >
          <template slot-scope="scope">{{ scope.row.send_time | unixToDate('yyyy-MM-dd hh:mm') }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteMsgs(scope.row)">删除
            </el-button>
            <el-button
              size="mini"
              type="primary"
              v-if="!scope.row.is_read"
              @click="handleSignRead(scope.row)">标记为已读
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
  import * as API_Messages from '@/api/message'
  import { CategoryPicker } from '@/components'

  export default {
    name: 'message',
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

        /** 选中项的msg_id们 */
        selectionids: [],

        /** 消息类型*/
        current_category: 0,

        /** 消息类型列表 */
        msg_categorys: [
          {
            /** 消息类型id*/
            msg_category_id: 0,

            /** 消息类型文本*/
            msg_category_label: '所有'
          }, {
            msg_category_id: 1,
            msg_category_label: '商品相关消息'
          }, {
            msg_category_id: 2,
            msg_category_label: '订单相关消息'
          }, {
            msg_category_id: 3,
            msg_category_label: '售后相关消息'
          }
        ]

      }
    },
    mounted() {
      this.GET_MsgsList()
    },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_MsgsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_MsgsList()
      },

      /** 获取消息列表*/
      GET_MsgsList() {
        this.loading = true
        API_Messages.getMsgsList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          this.tableData = response.data
        })
      },

      /** 改变分类*/
      handleChangeMsgCategory(val) {
        this.current_category = val
        this.params = {
          ...this.params,
          current_category: val
        }
        this.GET_MsgsList()
      },

      /** 获取选中项*/
      handleSelectionChange(val) {
        this.selectionids = val.map(item => item.msg_id)
      },

      /** 删除消息 */
      handleDeleteMsgs(row) {
        this.$confirm('确认删除此消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.Delete_messages(row.msg_id)
        }).catch(() => {
          this.$message.info({ message: '已取消删除' })
        })
      },

      /** 全部删除*/
      handleDeleteAllMsgs() {
        if (this.selectionids.length <= 0) {
          this.$message.warning('请选择要删除的项')
          return
        }
        const _ids = this.selectionids.toString()
        this.Delete_messages(_ids)
      },

      /** 执行删除*/
      Delete_messages(ids) {
        API_Messages.deleteMsgs(ids, {}).then(response => {
          this.$message.success('删除成功！')
          this.GET_MsgsList()
        })
      },

      /** 标记为已读 */
      handleSignRead(row) {
        this.signReadMsgs(row.msg_id)
      },

      /** 标记为已读 批量*/
      handleSignReadAllMsgs() {
        if (this.selectionids.length <= 0) {
          this.$message.warning('请选择要标记的项')
          return
        }
        const _ids = this.selectionids.toString()
        this.signReadMsgs(_ids)
      },

      /** 执行标记为已读*/
      signReadMsgs(ids) {
        API_Messages.signMsgs(ids, {}).then(response => {
          this.GET_MsgsList()
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

  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .inner-toolbar {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  div.toolbar-btns {
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

  .toolbar-search {
    margin-right: 10px;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }

</style>

