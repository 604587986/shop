<template>
  <div class="container">
    <el-card class="box-card">
      <el-form label-width="80px">
        <el-form-item label="导出类型">
          <el-radio-group v-model="output_type">
            <el-radio :label="1">b2b2c</el-radio>
            <el-radio :label="0" disabled>b2c</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleOutputData" :loading="output_loading">导出<i class="el-icon-download el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import * as API_SiteData from '@/api/siteData'
  export default {
    name: 'dataOutput',
    data() {
      return {
        output_type: 1,
        output_loading: false
      }
    },
    methods: {
      /** 导出数据 */
      handleOutputData() {
        this.output_loading = true
        API_SiteData.outputData(this.output_type).then(response => {
          this.output_loading = false
          let blob = new Blob([response + ''], { type: 'text\/xml' })
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = `data-${this.output_type === 1 ? 'b2b2c' : 'b2c'}.xml`
          link.click()
        }).catch(error => {
          this.output_loading = false
          console.log(error)
        })
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
