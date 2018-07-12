<template>
  <div id="website-message">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li class="active">站内消息</li>
      </ul>
    </div>
    <div class="message-container">
      <ul>
        <li v-for="message in messageData.data" :key="message.id" class="message-item">
          <div class="msg-time">{{ message.send_time | unixToDate }}</div>
          <div class="msg-box">
            <div class="msg-title">
              <h4>{{ message.message_title || '站内消息' }}</h4>
              <i class="el-icon-close" @click="handleDeleteMessage(message)"></i>
            </div>
            <div class="msg-content clearfix">
              <div>{{ message.content }}</div>
              <!--<nuxt-link to="#">查看详情 > </nuxt-link>-->
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="member-pagination" v-if="messageData">
      <el-pagination
        @current-change="handleCurrentPageChange"
        :current-page.sync="params.page_no"
        :page-size="params.page_size"
        layout="total, prev, pager, next"
        :total="messageData.data_total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'website-message',
    data() {
      return {
        params: {
          page_no: 1,
          page_size: 5
        }
      }
    },
    mounted() {
      this.getMessageData(this.params).then(() => this.MixinScrollToTop())
    },
    computed: {
      ...mapGetters({
        messageData: 'message/messageData'
      })
    },
    methods: {
      /** 当前页数发生改变 */
      handleCurrentPageChange(page) {
        this.params.page_no = page
        this.getMessageData(this.params).then(() => {
          this.MixinScrollToTop()
        })
      },
      /** 删除消息 */
      handleDeleteMessage(message) {
        this.$confirm('确定要删除这条消息吗？', () => {
          this.deleteMessage(message.id).then(() => {
            this.$message.success('删除成功！')
          })
        })
      },
      ...mapActions({
        getMessageData: 'message/getMessageDataAction',
        deleteMessage: 'message/deleteMessageAction'
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .message-container {
    padding-top: 10px;
  }
  .message-item {
    text-align: center;
    margin-bottom: 15px;
    .msg-time {
      display: inline-block;
      background-color: #f7f7f7;
      height: 20px;
      padding: 0 10px;
      margin-bottom: 10px;
      border-radius: 1px;
      text-align: center;
    }
    .msg-box {
      padding: 10px 20px;
      background-color: #f3f3f3;
      border: 1px solid #FFF;
      text-align: left;
      &:hover { border: 1px solid #dbdbdb }
      .msg-title {
        position: relative;
        height: 32px;
        line-height: 32px;
        border-bottom: 1px solid #d3d3d3;
        .el-icon-close {
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          cursor: pointer;
        }
      }
      .msg-content {
        width: 100%;
        padding-top: 10px;
        a { float: right }
      }
    }
  }
</style>
