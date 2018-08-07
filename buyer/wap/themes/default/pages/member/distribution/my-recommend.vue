<template>
  <div id="my-recommend">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li>
          <nuxt-link to="./my-recommend">我推荐的人</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as API_distribution from '@/api/distribution'

  export default {
    name: 'my-recommend',
    data() {
      return {
        /** 分页请求参数 */
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 分页信息 */
        pageData: {
          page_no: 1,
          page_size: 10,
          data_total: 0
        },

        /** 推荐人列表 */
        referee: []
      }
    },
    mounted() {
      this.GET_referee()
    },
    methods: {
      /** 获取推荐人 */
      GET_referee() {
        API_distribution.getRefereeList().then(response => {
          this.referee = response.data
          this.pageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
        })
      },

      /** 当前页数发生改变 */
      handleCurrentPageChange(cur) {
        this.params.page_no = cur
        this.GET_referee()
      },

      /** 查看详情 */
      lookDetails(row) {
        this.$router.push({path: '/member/distribution/my-performance', query: {member_id: row.id}})
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
