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
        </div>
        <div class="toolbar-search">
          <en-table-search
            @search="searchEvent"
            @advancedSearch="advancedSearchEvent"
            advanced
          >
            <template slot="advanced-content">
              <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
                <el-form-item label="会员名称">
                  <el-input size="medium" v-model="advancedForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                  <el-input size="medium" v-model="advancedForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="评论内容">
                  <el-input size="medium" v-model="advancedForm.goods_sn"></el-input>
                </el-form-item>
                <el-form-item label="评价">
                  <el-select v-model="commentStatus" placeholder="请选择">
                    <el-option label="全部" :value="0"/>
                    <el-option label="好评" :value="1"/>
                    <el-option label="中评" :value="2"/>
                    <el-option label="差评" :value="3"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="回复状态">
                  <el-select v-model="replyStatus" placeholder="请选择">
                    <el-option label="全部" :value="0"/>
                    <el-option label="已回复" :value="1"/>
                    <el-option label="未回复" :value="2"/>
                  </el-select>
                </el-form-item>
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>
    </en-tabel-layout>
    <table class="my-table" v-loading="loading">
      <thead>
      <tr class="bg-order">
        <th class="shoplist-header">评论</th>
        <th style="width: 120px;">用户</th>
        <th style="width: 240px;">时间</th>
        <th style="width: 120px;">操作</th>
      </tr>
      </thead>
      <tbody v-for="item in tableData">
      <tr style="width: 100%;height: 10px;"></tr>
      <tr class="bg-order">
        <!--商品名称-->
        <td colspan="4"><a href="" class="shop-name">{{ item.shop_name }}</a></td>
      </tr>
      <tr>
        <!--评论-->
        <td>
          <div class="comment-content">
            <!--评论内容-->
            <p v-if="item.comment_content" class="comment-info">
              <i class="comment-content-name">评论内容 :</i> {{ item.comment_content }}
            </p>
            <!--评论图片信息-->
            <p v-if="item.comment_images && item.comment_images.length > 0">
              <img v-for="imgsrc in item.comment_images" :src="imgsrc" class="goods-image"/>
            </p>
            <!--回复评论-->
            <p v-if="item.seller_reply " class="reply-comment">
              <i class="seller-reply">回复评论 :</i> {{ item.seller_reply }}
            </p>
          </div>
        </td>
        <!--用户-->
        <td>{{ item.member_name }}</td>
        <!--时间-->
        <td>{{item.create_time | unixToDate }}</td>
        <!--操作-->
        <td>
          <el-button
            size="mini"
            type="primary"
            v-if="item.seller_replied==0"
            @click="handleReplyComment(item)">回复
          </el-button>
        </td>
      </tr>
      </tbody>
    </table>
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
    <el-dialog title="回复评论" :visible.sync="replyCommentShow" width="30%">
      <el-form :model="commentForm">
        <el-form-item label="审核" :label-width="formLabelWidth">
          <el-radio-group v-model="commentForm.isPass">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="0">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="评论内容" :label-width="formLabelWidth">
          <span>{{commentForm.comment_content}}</span>
        </el-form-item>
        <el-form-item label="评论图片" :label-width="formLabelWidth">
          <img v-for="imgsrc in commentForm.comment_imgs" :src="imgsrc" alt=""
               style="margin-right:3px;width:50px;height:50px;">
        </el-form-item>
        <el-form-item label="回复内容" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="commentForm.reply_content" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="replyCommentShow = false">取 消</el-button>
        <el-button type="primary" @click="saveCommentReply">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_comment from '@/api/comment'
  import { TableLayout, TableSearch, CategoryPicker } from '@/components'

  export default {
    name: 'goodsList',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
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

        /** 高级搜索数据 */
        advancedForm: {
          goods_name: '',
          goods_sn: '',
          shop_name: '',
          category_id: ''
        },

        /** 商品库存显示*/
        goodsStockshow: false,

        /** 库存商品数量*/
        goodsStocknums: 1,

        /** 商品库存列表数据*/
        goodsStockData: null,

        /** 评论状态*/
        commentStatus: 0,

        /** 回复状态 */
        replyStatus: 0,

        /** 是否显示回复（审核）框*/
        replyCommentShow: false,

        formLabelWidth: '120px',
        /** 弹框 表单*/
        commentForm: {
          /** 是否通过 */
          isPass: 1,

          /** 评论内容 */
          comment_content: '',

          /** 评论图片数组 */
          comment_imgs: '',

          /** 回复内容 */
          reply_content: ''
        }
      }
    },
    mounted() {
      this.GET_CommmentsList()
    },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_CommmentsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_CommmentsList()
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.GET_CommmentsList()
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
        this.params = {
          ...this.params,
          ...this.advancedForm
        }
        delete this.params.keyword
        this.GET_CommmentsList()
      },

      GET_CommmentsList() {
        this.loading = true
        API_comment.getCommentList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsFiltered
          }
          this.tableData = response.data
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },

      /** 商家回复*/
      handleReplyComment(item) {
        this.replyCommentShow = true
        this.commentForm = {
          isPass: 1,
          comment_content: item.comment_content,
          comment_imgs: item.comment_images,
          reply_content: ''
        }
      },

      /** 保存评论回复*/
      saveCommentReply() {
        API_comment.replyComment(this.commentForm).then(response => {
          this.replyCommentShow = false
          this.$message.success('保存成功')
        }).catch(error => {
          this.$message.error('保存失败，请稍后再试！')
          console.log(error)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
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

  /*表格信息*/
  .my-table {
    .bg-order {
      background: #FAFAFA;
    }
    width: 100%;
    background: #ffffff;
    border-collapse: collapse;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    font-size: 14px;
    font-bold: 700;
    thead {
      th {
        border: 1px solid #ebeef5;
        border-collapse: collapse;
        color: #909399;
        padding: 20px;
      }
    }
    tbody {
      margin-top: 10px;
      td {
        border: 1px solid #ebeef5;
        border-collapse: collapse;
        vertical-align: middle;
        text-align: center;
        padding: 20px;
      }
      td:first-child {
        text-align: left;
      }
      /*商品名称*/
      a.shop-name {
        color: #0579c6;
        outline: none;
        font-weight: bold;
      }
      /*评论内容*/
      .comment-content {
        margin: 0;
        p {
          margin: 10px 0;
          i {
            font-weight: bold;
          }
        }
        p.comment-info {
          color: #999999;
        }
        p.reply-comment {
          color: #f42424;
        }
      }
    }
    /*图片*/
    .goods-image {
      width: 50px;
      height: 50px;
      margin: 3px;
    }
  }

  /*分页信息*/
  .el-pagination {
    text-align: right;
    width: 100%;
    background: #ffffff;
    height: 40px;
  }

</style>

