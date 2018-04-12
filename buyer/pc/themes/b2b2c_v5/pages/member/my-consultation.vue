<template>
  <div id="my-consultation">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li class="active">我的咨询</li>
      </ul>
    </div>
    <div class="consultation-container">
      <ul>
        <li v-for="consultation in consultation.data" :key="consultation.consultation_id" class="comment-item">
          <div class="comment-title">
            <nuxt-link :to="'/goods/' + consultation.goods.goods_id" target="_blank">{{ consultation.goods.goods_name }}</nuxt-link>
            <span>{{ consultation.consultation_time | unixToDate }}</span>
          </div>
          <div class="comment-body">
            <div class="comment-content">
              <strong>咨询内容：</strong>
              <div>
                <p>{{ consultation.consultation_content }}</p>
              </div>
            </div>
            <div class="comment-content seller-reply">
              <strong>商家回复：</strong>
              <div>
                <p>{{ consultation.seller_reply }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="member-pagination" v-if="consultation">
      <el-pagination
        @current-change="handleCurrentPageChange"
        :current-page.sync="params.page_no"
        :page-size="params.page_size"
        layout="total, prev, pager, next"
        :total="consultation.data_total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import * as API_Consultation from '@/api/comments'
  export default {
    name: 'my-consultation',
    data() {
      return {
        consultation: '',
        params: {
          page_no: 1,
          page_size: 10
        }
      }
    },
    mounted() {
      this.GET_Consulatation()
    },
    methods: {
      /** 当前页数发生改变 */
      handleCurrentPageChange(page) {
        this.params.page_no = page
        this.GET_Consulatation()
      },
      /** 获取我的咨询 */
      GET_Consulatation() {
        API_Consultation.getConsultations(this.params).then(response => {
          this.consultation = response
          this.MixinScrollToTop()
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .consultation-container {
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
      float: left;
      color: #0279b9;
      margin-left: 10px;
      margin-right: 20px;
      display: -webkit-box;
      max-width: 500px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      &:hover { color: #f42424 }
    }
  }
  .comment-body {
    border: 1px solid #e7e7e7;
    overflow: hidden;
    padding: 10px;
    border-top: none;
  }
  .comment-content {
    strong { flex-shrink: 0 }
    display: flex;
    margin-bottom: 5px;
    &.seller-reply { color: #FF5722 }
  }
</style>
