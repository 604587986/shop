<template>
  <div class="goods-index-container">
    <el-button
      type="primary"
      :disabled="status === 'doing'"
      :loading="status === 'doing'"
      @click="handleCreateGoodsIndex"
    >{{ status === 'doing' ? '生成中' : '生成' }}</el-button>
    <div class="progress-box">
      <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage" :status="status"/>
      <p>{{ status_text }}</p>
    </div>
  </div>
</template>

<script>
  import * as API_GoodsIndex from '@/api/goodsIndex'
  import * as API_Progress from '@/api/progress'
  export default {
    name: 'goodsIndex',
    data() {
      return {
        percentage: 0,
        status: '',
        status_text: ''
      }
    },
    created() {
      API_Progress.hasSameTask('index_create').then(response => {
        if (response.data.has_task === 1) {
          this.status = 'doing'
          this.GET_Progress()
        }
      }).catch(error => console.log(error))
    },
    methods: {
      /** 生成商品索引 */
      handleCreateGoodsIndex() {
        this.$confirm('确定要生成商品索引吗？', '提示', { type: 'warning' }).then(() => {
          API_GoodsIndex.createGoodsIndex().then(response => {
            this.GET_Progress()
          }).catch(error => console.log(error))
        }).catch(() => {})
      },
      /** 获取生成进度 */
      GET_Progress() {
        API_Progress.getProgressById('index_create').then(response => {
          const { percentage, status, status_text } = response.data
          this.percentage = percentage
          this.status = status
          this.status_text = status_text
          if (response.data.status !== 'success') {
            setTimeout(this.GET_Progress, 1000)
          }
        }).catch(error => console.log(error))
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .goods-index-container {
    background-color: #fff;
    padding: 10px;
  }
  .progress-box {
    width: 500px;
    margin-top: 20px;
    p {
      margin-top: 10px;
      font-size: 14px;
    }
  }
  /deep/ .progress-box .el-progress-bar__inner {
    -webkit-transition: width ease-in .2s;
    -moz-transition: width ease-in .2s;
    -ms-transition: width ease-in .2s;
    -o-transition: width ease-in .2s;
    transition: width ease-in .2s;
  }
</style>
