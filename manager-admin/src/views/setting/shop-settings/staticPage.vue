<template>
  <div class="static-page-container">
    <el-form ref="form" label-width="100px" style="width: 500px;">
      <el-form-item label="静态页地址">
        <el-input v-model="address">
          <el-button slot="append" icon="el-icon-check" @click="handleSaveAddress"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="要生成的页面">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedPages" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="page in pages" :label="page" :key="page.value">{{ page.text }}</el-checkbox>
        </el-checkbox-group>
        <el-button
          type="primary"
          :disabled="status === 'doing'"
          :loading="status === 'doing'"
          @click="handleCreateStaticPage"
        >{{ status === 'doing' ? '生成中' : '生成' }}</el-button>
      </el-form-item>
      <el-form-item label="">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage" :status="status"/>
        <p class="progress-text">{{ status_text }}</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import * as API_StaticPage from '@/api/staticPage'
  import * as API_Progress from '@/api/progress'

  const pageOptions = [
    { text: '首页', value: 'INDEX' },
    { text: '商品页', value: 'GOODS' },
    { text: '帮助中心', value: 'HELP' }
  ]
  export default {
    name: 'staticPage',
    data() {
      return {
        percentage: 0,
        status: '',
        status_text: '',
        address: '',
        checkAll: true,
        checkedPages: pageOptions,
        pages: pageOptions,
        isIndeterminate: true
      }
    },
    created() {
      /** 检查是否有静态页生成任务 */
      API_Progress.hasSameTask('page_create').then(response => {
        if (response.message === true) {
          this.status = 'doing'
          this.GET_Progress()
        }
      })
      /** 获取静态页生成地址 */
      API_StaticPage.getStaticPageAddress().then(response => {
        this.address = response.message
      })
    },
    methods: {
      /** 保存静态页地址 */
      handleSaveAddress() {
        API_StaticPage.saveStaticPageAddress(this.address).then(response => {
          this.$message.success('保存成功！')
        })
      },
      handleCheckAllChange(val) {
        this.checkedPages = val ? pageOptions : []
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.pages.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.pages.length
      },
      /** 生成静态页 */
      handleCreateStaticPage() {
        if (this.checkedPages.length === 0) {
          this.$message.error('请选择要生成的页面！')
          return false
        }
        this.$confirm('确定要生成静态页吗？', '提示', { type: 'warning' }).then(() => {
          const choose = this.checkedPages.map(item => item.value)
          const params = { choosePages: choose }
          API_StaticPage.createStaticPage(params).then(response => {
            console.log(response)
            this.GET_Progress()
          })
        }).catch(() => {})
      },
      /** 获取生成进度 */
      GET_Progress() {
        API_Progress.getProgressById('page_create').then(response => {
          console.log(response)
          // const { percentage, status, status_text } = response.data
          // this.percentage = percentage
          // this.status = status
          // this.status_text = status_text
          // if (response.data.status !== 'success') {
          //   setTimeout(this.GET_Progress, 1000)
          // }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .static-page-container {
    background-color: #fff;
    padding: 10px;
  }
  .progress-text {
    font-size: 14px;
  }
  /deep/ .progress-box .el-progress-bar__inner {
    -webkit-transition: width ease-in .2s;
    -moz-transition: width ease-in .2s;
    -ms-transition: width ease-in .2s;
    -o-transition: width ease-in .2s;
    transition: width ease-in .2s;
  }
</style>
