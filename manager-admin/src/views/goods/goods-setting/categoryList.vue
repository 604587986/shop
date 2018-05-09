<template>
  <div>
    <en-goods-cats-edit
      ref="goodscatsedit"
      canEdit
      :add-cat="handleAddCat"
      :item-btns="itemBtns"
    />
    <!--添加、编辑分类dialog-->
    <el-dialog title="添加分类" width="500px" :visible.sync="dialogCatVisible">
      <el-form :model="catForm" :rules="catRules" ref="catForm" label-width="100px">
        <!--分类名称-->
        <el-form-item label="分类名称" prop="category_name">
          <el-input v-model="catForm.category_name"></el-input>
        </el-form-item>
        <!--分类图片-->
        <el-form-item label="分类图片" prop="cat_img">
          <el-upload
            :action="MixinUploadApi"
            list-type="picture"
            :on-success="onImgUploadSuccess"
            :on-remove="onImgRemove"
            :file-list="catForm.catImageList"
            :multiple="false"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">&nbsp;只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-form-item>
        <!--上级分类-->
        <el-form-item v-if="catForm.parent_datas" label="上级分类" prop="parent_id">
          <el-select v-model="catForm.parent_id" placeholder="请选择上级分类">
            <el-option v-for="item in catForm.parent_datas" :label="item.name" :value="item.category_id" :key="item.category_id"/>
          </el-select>
        </el-form-item>
        <!--排序-->
        <el-form-item label="排序" prop="category_order">
          <el-input-number v-model="catForm.category_order" controls-position="right" :min="0" :max="99999"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCatVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCatForm('catForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑关联品牌dialog-->
    <el-dialog :title="brandForm.brandTitle" width="500px" :visible.sync="dialogBrandVisible">
      <el-form :model="brandForm" :rules="brandRules" ref="brandForm">
        <el-form-item label="选择品牌">
          <el-select v-model="brandForm.selectedBrandList" placeholder="请选择关联品牌" multiple filterable style="width: 350px">
            <el-option
              v-for="item in brandForm.brandList"
              :key="item.id"
              :label="item.text"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogBrandVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBrandForm('brandForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑关联规格dialog-->
    <el-dialog :title="specsForm.specsTitle" width="500px" :visible.sync="dialogSpecsVisible">
      <el-form :model="specsForm" :rules="specsRules" ref="specsForm">
        <el-form-item label="选择规格">
          <el-select v-model="specsForm.selectedSpecsList" placeholder="请选择关联规格" multiple filterable style="width: 350px">
            <el-option
              v-for="item in specsForm.specsList"
              :key="item.id"
              :label="item.text"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSpecsVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSpecsForm('specsForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { GoodsCatsEdit } from '@/plugins/selector/vue'
  import * as API_category from '@/api/category'
  export default {
    name: 'categoryList',
    components: {
      [GoodsCatsEdit.name]: GoodsCatsEdit
    },
    data() {
      return {
        itemBtns: [
          { text: '参数', onClick: this.handleEditParams },
          { text: '品牌', onClick: this.handleEditBrand },
          { text: '规格', onClick: this.handleEditSpecs },
          { text: '编辑', onClick: this.handleEditCat },
          { text: '删除', textStyle: 'color: red', onClick: this.handleDeleteCat }
        ],
        // 添加、编辑分类 dialog
        dialogCatVisible: false,
        // 编辑关联品牌 dialog
        dialogBrandVisible: false,
        // 编辑关联规格 dialog
        dialogSpecsVisible: false,
        // 添加、编辑分类 表单
        catForm: {
          parent_id: '10',
          category_name: '',
          category_image: '',
          parent_datas: null,
          category_order: 0,
          category_id: null,
          catImageList: []
        },
        // 添加、编辑分类 表单规则
        catRules: {
          category_name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ]
        },
        // 编辑关联品牌 表单
        brandForm: {
          brandTitle: '关联品牌',
          category_id: null,
          selectedBrandList: [],
          brandList: []
        },
        // 编辑关联品牌 表单规则
        brandRules: {},
        // 编辑关联规格 表单
        specsForm: {
          specsTitle: '关联规格',
          category_id: null,
          selectedSpecsList: [],
          specsList: []
        },
        // 编辑关联规格 表单规则
        specsRules: {}
      }
    },
    methods: {
      /** 添加分类 */
      handleAddCat(cat) {
        const { parentData } = cat
        this.catForm = {
          ...this.catForm,
          form_type: 'add',
          parent_id: parentData ? parentData.data.category_id : 0,
          parent_datas: parentData ? parentData.datas : null,
          category_image: '',
          category_name: null,
          category_id: null,
          category_order: 0,
          catImageList: []
        }
        this.dialogCatVisible = true
      },

      /** 编辑分类 */
      handleEditCat(cat) {
        const { parentData } = cat
        console.log(cat)
        this.catForm = {
          ...this.catForm,
          form_type: 'eidt',
          parent_id: parentData ? parentData.data.category_id : 0,
          parent_datas: parentData ? parentData.datas : null,
          category_image: cat.image,
          category_name: cat.text,
          category_id: cat.id,
          category_order: cat.order,
          catImageList: cat.image ? [{ name: 'cat-img', url: cat.image }] : []
        }
        this.dialogCatVisible = true
      },
      /** 图片上传成功时 */
      onImgUploadSuccess(res) {
        this.catForm.category_image = res
      },
      /** 图片被移除时 */
      onImgRemove() {
        this.catForm.category_image = ''
      },

      /** 添加、编辑分类 表单提交 */
      submitCatForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.catForm.form_type === 'add') {
              API_category.addCategory(this.catForm).then(() => {
                this.$message.success('保存成功！')
                this.dialogCatVisible = false
                this.handleRefresh()
              })
            } else {
              API_category.editCategory(this.catForm.category_id, this.catForm).then(() => {
                this.$message.success('保存成功！')
                this.dialogCatVisible = false
                this.handleRefresh()
              })
            }
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 编辑分类参数 */
      handleEditParams(cat) {
        this.$router.push({ name: 'categoryParams', params: { id: cat.id }})
      },
      /** 编辑关联品牌 */
      handleEditBrand(cat) {
        this.brandForm.brandTitle = '关联品牌 - ' + cat.text
        API_category.getBrandByCategoryId(cat.id).then(response => {
          this.brandForm = {
            ...this.brandForm,
            category_id: cat.id,
            brandList: response,
            selectedBrandList: response.filter(item => item.selected).map(item => item.id)
          }
        }).catch(error => console.log(error))
        this.dialogBrandVisible = true
      },

      /** 编辑关联品牌 表单提交 */
      submitBrandForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API_category.editCategoryBrand(this.brandForm.category_id, this.brandForm.selectedBrandList)
              .then(response => {
                this.$message.success('编辑成功！')
                this.dialogBrandVisible = false
                this.handleRefresh()
              }).catch(error => console.log(error))
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 编辑关联规格 */
      handleEditSpecs(cat) {
        this.specsForm.specsTitle = '关联规格 - ' + cat.text
        API_category.getSpecsByCategoryId(cat.id).then(response => {
          this.specsForm = {
            ...this.specsForm,
            category_id: cat.id,
            specsList: response,
            selectedSpecsList: response.filter(item => item.selected).map(item => item.id)
          }
        }).catch(error => console.log(error))
        this.dialogSpecsVisible = true
      },
      /** 编辑关联规格 表单提交 */
      submitSpecsForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API_category.editCategorySpecs(this.specsForm.category_id, this.specsForm.selectedSpecsList)
              .then(response => {
                this.$message.success('保存成功！')
                this.dialogSpecsVisible = false
                this.handleRefresh()
              }).catch(error => console.log(error))
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },

      /** 删除分类确认 */
      handleDeleteCat(cat) {
        this.$confirm('确定要删除这个分类吗？', '提示', { type: 'warning' })
          .then(() => { this.DELETE_Cat(cat.id) })
          .catch(() => {})
      },

      /** 调用插件内部刷新方法 */
      handleRefresh() {
        this.$refs.goodscatsedit.refresh()
      },

      /** 删除分类请求 */
      DELETE_Cat(ids) {
        API_category.deleteCategory(ids).then(() => {
          this.$message.success('删除成功！')
          this.handleRefresh()
        }).catch(error => console.log(error))
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
