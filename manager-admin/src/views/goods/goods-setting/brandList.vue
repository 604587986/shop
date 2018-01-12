<template>
  <div>
    <en-tabel-layout
      :toolbar="true"
      :pagination="true"
      :tableData="tableData"
      :loading="loading"
      :selection-change="handleSelectionChange"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddBrand">添加</el-button>
        </div>
        <div class="toolbar-search">
          <en-table-search @search="searchEvent"/>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column type="selection" width="100"/>
        <!--品牌图片-->
        <el-table-column label="品牌图片" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.image" class="goods-image"/>
          </template>
        </el-table-column>
        <!--品牌名称-->
        <el-table-column prop="name" label="品牌名称" width="250" />
        <!--品牌网址-->
        <el-table-column prop="url" label="品牌网址" />
        <!--查看详细-->
        <el-table-column label="查看详细" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleViewBrandDetail(scope.$index, scope.row)">查看详细</el-button>
          </template>
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditBrand(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteBrand(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
      <template slot="pagination-toolbar">
        <el-button type="danger" size="mini" @click="deleteTheBrand">删除选中</el-button>
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
    <el-dialog :title="dialogBrandTitle" :visible.sync="dialogBrandVisible">
      <el-form :model="brandForm" :rules="brandRules" ref="brandForm" label-width="100px">
        <!--品牌名称-->
        <el-form-item label="品牌名称" prop="name">
          <el-input v-model="brandForm.name"></el-input>
        </el-form-item>
        <!--品牌网址-->
        <el-form-item label="品牌网址" prop="url">
          <el-input placeholder="请输入地址" v-model="brandForm.url_href" class="input-with-select">
            <el-select v-model="brandForm.url_protocol" slot="prepend" placeholder="请选择">
              <el-option label="https://" value="https://"></el-option>
              <el-option label="http://" value="http://"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <!--品牌图片-->
        <el-form-item label="品牌图片" prop="logo">
          <el-upload
            action="http://localhost:9090/javashop/core/upload.do"
            list-type="picture"
            :on-success="onImgUploadSuccess"
            :on-remove="onImgRemoved"
            :file-list="brandForm.imgFileList"
            :multiple="false"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">&nbsp;只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-form-item>
        <!--详细信息-->
        <el-form-item label="详细信息">
          <UE :defaultMsg="UE_defaultMsg" :config="UE_config" ref="ue"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogBrandVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBrandForm('brandForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--查看品牌详情-->
    <el-dialog title="查看品牌详情" :visible.sync="dialogBrandDetailVisible" center>
      <div v-html="brandDetail"/>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_brand from '@/api/brand'
  import { TableLayout, TableSearch, UE } from '@/components'
  export default {
    name: 'brandList',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      UE
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

        /** 被选数据 */
        selectedData: [],

        // 添加、修改品牌dialogTitle
        dialogBrandTitle: '添加品牌',
        // 添加、修改品牌 dialog
        dialogBrandVisible: false,
        // 查看品牌详情 dialog
        dialogBrandDetailVisible: false,

        /** 品牌详情dialog 内容 */
        brandDetail: '',

        /** 添加、修改品牌 表单 */
        brandForm: {
          name: '',
          url: '',
          url_protocol: 'https://',
          logo: '',
          brief: '',
          imgFileList: []
        },
        /** 添加、修改品牌 表单规则 */
        brandRules: {
          name: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ]
        },
        UE_defaultMsg: '',
        UE_config: {
          initialFrameWidth: null,
          initialFrameHeight: 125,
          zIndex: 20000
        }
      }
    },
    mounted() {
      this.GET_BrandList()
    },
    methods: {
      /** 查看详情 */
      handleViewBrandDetail(index, row) {
        this.brandDetail = row.brief || '暂无详情...'
        this.dialogBrandDetailVisible = true
      },
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_BrandList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_BrandList()
      },

      /** 当选择项发生变化 */
      handleSelectionChange(val) {
        this.selectedData = val.map(item => item.id)
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        this.GET_BrandList()
      },

      /** 图片上传成功触发 */
      onImgUploadSuccess(response) {
        this.brandForm.logo = response
      },
      /** 图片移除触发 */
      onImgRemoved() {
        this.brandForm.logo = ''
      },

      /** 修改品牌操作 */
      handleEditBrand(index, row) {
        if (!row.url) row.url = ''
        const _match = row.url.match(/(http(s*):\/\/)(.*)/)
        this.brandForm = {
          ...this.brandForm,
          ...row,
          url_href: _match ? _match[3] : '',
          url_protocol: _match ? _match[1] : 'https://',
          logo: row.image,
          form_type: 'edit',
          imgFileList: row.image ? [{ name: 'logo', url: row.image }] : []
        }
        this.UE_defaultMsg = row.brief
        this.dialogBrandTitle = '修改品牌 - ' + row.name
        this.dialogBrandVisible = true
      },
      /** 删除品牌操作 */
      handleDeleteBrand(index, row) {
        this.$confirm('确定要删除这个品牌吗？', '提示', { type: 'warning' })
          .then(() => { this.DELETE_Brand(row.id) })
          .catch(() => {})
      },
      /** 删除选中品牌操作 */
      deleteTheBrand() {
        if (this.selectedData.length < 1) {
          this.$message.error('您未选中任何品牌！')
        } else {
          this.$confirm('确定要删除这些品牌吗？', '提示', { type: 'warning' })
            .then(() => { this.DELETE_Brand(this.selectedData) })
            .catch(() => {})
        }
      },

      /** 添加品牌触发事件 */
      handleAddBrand() {
        this.brandForm = {
          name: '',
          url_href: '',
          url_protocol: 'https://',
          logo: '',
          brief: '',
          form_type: 'add',
          imgFileList: []
        }
        this.UE_defaultMsg = ''
        this.dialogBrandTitle = '添加品牌'
        this.dialogBrandVisible = true
      },

      /** 添加、修改品牌 表单提交 */
      submitBrandForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.brandForm.brief = this.$refs['ue'].getUEContent()
            if (this.brandForm.url_href) {
              this.brandForm.url = this.brandForm.url_protocol + this.brandForm.url_href
            } else {
              this.brandForm.url = ''
            }
            if (this.brandForm.form_type === 'add') {
              API_brand.addBrand(this.brandForm).then(() => {
                this.$message.success('添加成功！')
                this.dialogBrandVisible = false
                this.GET_BrandList()
              }).catch(error => console.log(error))
            } else {
              API_brand.editBrand(this.brandForm.id, this.brandForm).then(() => {
                this.$message.success('保存成功！')
                this.dialogBrandVisible = false
                this.GET_BrandList()
              }).catch(error => console.log(error))
            }
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 获取品牌列表 */
      GET_BrandList() {
        this.loading = true
        API_brand.getBrandList(this.params).then(response => {
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
      },

      /** 删除品牌 */
      DELETE_Brand(ids) {
        API_brand.deleteBrand(ids).then(() => {
          this.$message.success('删除成功！')
          this.GET_BrandList()
        }).catch(error => console.log(error))
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
    padding: 0 20px;
  }

  .goods-image {
    max-width: 85px;
    height: 50px;
  }

  /deep/ .el-select .el-input {
    width: 100px;
  }

  /deep/ .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  /deep/ .el-form-item__content .edui-editor {
    line-height: normal;
  }
</style>
