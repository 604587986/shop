<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      row-key="id"
      :stripe="false"
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddSiteMenu">添加</el-button>
        </div>
      </div>

      <template slot="table-columns">
        <el-table-column prop="name" label="名称"/>
        <el-table-column prop="type" label="类型"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" class="drag-handle">
              <svg-icon icon-class="item-drag" />
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEditSiteMenu(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteSiteMenu(scope.$index, scope.row)">删除</el-button>
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

    <el-dialog :title="(siteMenuForm.id ? '编辑' : '添加') + '导航菜单'" :visible.sync="dialogSiteMenuVisible" width="500px">
      <el-form :model="siteMenuForm" :rules="siteMenuRules" ref="siteMenuForm" label-width="110px">
        <el-form-item label="导航菜单名称" prop="name" clearable :maxlength="4">
          <el-input v-model="siteMenuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="导航菜单链接" prop="url" clearable :maxlength="225">
          <el-input v-model="siteMenuForm.url"></el-input>
        </el-form-item>

        <el-form-item label="导航菜单图片">
          <el-upload
            :action="MixinUploadApi"
            list-type="picture"
            :on-success="onImgUploadSuccess"
            :on-remove="onImgRemoved"
            :file-list="siteMenuForm.image ? [{name: '导航菜单图片', url: siteMenuForm.image}]: []"
            :multiple="false"
            :limit="1">
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">&nbsp;只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSiteMenuVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSiteMenuForm('siteMenuForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_SiteMenu from '@/api/siteMenu'
  import Sortable from 'sortablejs'

  export default {
    name: 'mobileSiteMenu',
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

        /** 添加、编辑导航菜单 dialog */
        dialogSiteMenuVisible: false,

        /** 添加、编辑导航菜单 表单 */
        siteMenuForm: {},

        /** 添加、编辑导航菜单 表单规则 */
        siteMenuRules: {
          name: [
            { required: true, message: '请输入导航菜单名称', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请输入导航菜单链接', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.GET_SiteMenuList()
      const table = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      this.sortable = Sortable.create(table, {
        animation: 150,
        handle: '.drag-handle',
        onEnd({ newIndex, oldIndex }) {
          const targetRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, targetRow)
        }
      })
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_SiteMenuList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_SiteMenuList()
      },

      /** 添加导航菜单 */
      handleAddSiteMenu() {
        this.siteMenuForm = {}
        this.siteMenuForm.form_type = 'add'
        this.dialogSiteMenuVisible = true
      },

      /** 编辑导航菜单 */
      handleEditSiteMenu(index, row) {
        this.siteMenuForm = row
        this.siteMenuForm.form_type = 'edit'
        this.dialogSiteMenuVisible = true
      },

      /** 删除导航菜单 */
      handleDeleteSiteMenu(index, row) {
        this.$confirm('确定要删除这个导航菜单吗？', '提示', { type: 'warning' }).then(() => {
          API_SiteMenu.deleteMobileSiteMenu(row.id).then(response => {
            this.$message.success('删除成功！')
            this.GET_SiteMenuList()
          }).catch(error => console.log(error))
        }).catch(() => {})
      },

      /** 图片上传成功 */
      onImgUploadSuccess(response) {
        this.siteMenuForm.image = response
      },

      /** 图片从已上传列表中移除 */
      onImgRemoved() {
        this.siteMenuForm.image = ''
      },

      /** 添加、编辑导航菜单 提交表单 */
      submitSiteMenuForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.siteMenuForm.image) {
              this.$message.error('请上传导航菜单图片！')
              return false
            }
            if (this.siteMenuForm.form_type === 'add') {
              API_SiteMenu.addMobileSiteMenu(this.siteMenuForm).then(response => {
                this.dialogSiteMenuVisible = false
                this.$message.success('添加成功！')
                this.GET_SiteMenuList()
              }).catch(error => console.log(error))
            } else {
              API_SiteMenu.editMobileSiteMenu(this.siteMenuForm.id, this.siteMenuForm).then(response => {
                this.dialogSiteMenuVisible = false
                this.$message.success('保存成功！')
                this.GET_SiteMenuList()
              }).catch(error => console.log(error))
            }
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 获取导航菜单列表 */
      GET_SiteMenuList() {
        this.loading = true
        API_SiteMenu.getSiteMenuByMobile(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsTotal
          }
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      }
    },
    destroyed() {
      this.sortable && this.sortable.destroy()
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .drag-handle {
    user-select: none;
    width: 50px;
    padding: 10px;
  }
  /deep/ .el-upload-list__item-thumbnail {
    width: auto;
    max-width: 180px;
  }
</style>
