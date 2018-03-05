<template>
  <div class="container">
    <el-card class="box-card">
      <el-form label-width="80px">
        <el-form-item label="清除类型">
          <el-radio-group v-model="clear_type">
            <el-radio :label="1">全部示例数据</el-radio>
            <el-radio :label="0">部分示例数据</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            size="small"
            @click="handleClearExampleData"
            :loading="clear_loading"
          >
            清除<i class="el-icon-delete el-icon--right"></i>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import * as API_SiteData from '@/api/siteData'
  export default {
    name: 'clearExampleData',
    data() {
      return {
        clear_type: 1,
        clear_loading: false
      }
    },
    methods: {
      /** 清除示例数据 */
      handleClearExampleData() {
        this.$confirm('确定要清除示例数据吗？', '提示', { type: 'warning' }).then(() => {
          this.clear_loading = true
          API_SiteData.clearExampleData(this.clear_type).then(response => {
            this.clear_loading = false
            this.$message.success('清除成功！')
          }).catch(error => {
            this.clear_loading = false
            console.log(error)
          })
        }).catch(() => {})
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .container {
    background-color: #fff;
    padding: 10px;
  }
  .box-card {
    width: 500px;
  }
</style>
