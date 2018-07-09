<template>
  <div id="my-comments">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li class="active">我的评论</li>
      </ul>
    </div>
    <template v-if="comments && comments.data.length > 0">
      <div class="comments-container">
        <ul>
          <li v-for="comment in comments.data" :key="comment.comment_id" class="comment-item">
            <div class="comment-title">
              <nuxt-link :to="'/goods/' + comment.goods_id">{{ comment.goods_name }}</nuxt-link>
              <span>{{ comment.create_time | unixToDate }}</span>
            </div>
            <div class="comment-body">
              <strong>我的评论：</strong>
              <div>
                <p>{{ comment.content }}</p>
                <div v-if="comment.images && comment.images.length > 0" class="comment-gallery">
                  <template v-for="(image, index) in comment.comment.images">
                    <img :src="image" :key="index" class="comment-thumbnail">
                  </template>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="member-pagination" v-if="comments">
        <el-pagination
          @current-change="handleCurrentPageChange"
          :current-page.sync="params.page_no"
          :page-size="params.page_size"
          layout="total, prev, pager, next"
          :total="comments.data_total">
        </el-pagination>
      </div>
    </template>
    <empty-member v-else>暂无评论</empty-member>
  </div>
</template>

<script>
  import * as API_Members from '@/api/members'
  export default {
    name: 'my-comments',
    data() {
      return {
        comments: '',
        params: {
          page_no: 1,
          page_size: 10
        }
      }
    },
    mounted() {
      this.GET_Comments()
    },
    methods: {
      /** 当前页数发生改变 */
      handleCurrentPageChange(page) {
        this.params.page_no = page
        this.GET_Comments()
      },
      GET_Comments() {
        API_Members.getComments(this.params).then(response => {
          this.comments = response
          this.MixinScrollToTop()
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .comments-container {
    padding-top: 10px;
  }
  .comment-item {
    margin-bottom: 10px;
  }
  .comment-title {
    padding: 5px 0;
    border: 1px solid #e7e7e7;
    background: #fafafa;
    overflow: hidden;
    a {
      color: #0279b9;
      margin-left: 10px;
      margin-right: 20px;
      &:hover { color: #f42424 }
    }
  }
  .comment-body {
    display: flex;
    border: 1px solid #e7e7e7;
    overflow: hidden;
    padding: 10px;
    border-top: none;
    .comment-gallery {
      margin-top: 10px;
    }
    .comment-thumbnail {
      width: 100px;
      height: 100px;
      margin-right: 10px;
    }
  }
</style>
