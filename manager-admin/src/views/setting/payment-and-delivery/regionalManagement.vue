<template>
  <div>
    <grade-editor
      ref="regionEditor"
      :api="regionApi"
      :btns="btns"
      :maxLevel="4"
      @add-click="handleAdd"
    />
    <el-dialog
      :title="regionForm.id ? '编辑地区' : '添加地区'"
      width="500px"
      :visible.sync="dialogRegionVisible"
    >
      <el-form :model="regionForm" :rules="regionRules" ref="regionForm" label-width="130px">
        <el-form-item label="地区名称" prop="local_name">
          <el-input v-model="regionForm.local_name"></el-input>
        </el-form-item>
        <el-form-item label="邮政编号" prop="zipcode">
          <el-input v-model="regionForm.zipcode" :maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="是否支持货到付款" prop="cod">
          <el-radio-group v-model="regionForm.cod">
            <el-radio :label="1">支持</el-radio>
            <el-radio :label="0">不支持</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRegionVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRegionForm('regionForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { GradeEditor } from '@/components'
  import * as API_Region from '@/api/region'
  export default {
    name: 'regionalManagement',
    components: { GradeEditor },
    data() {
      return {
        // api
        regionApi: API_Region.Api,
        btns: [
          { text: '编辑', onClick: this.handleEdit },
          { text: '删除', onClick: this.handleDelete, color: 'red' }
        ],
        /** 地区 表单 */
        regionForm: {},
        /** 地区 表单规则 */
        regionRules: {
          local_name: [
            { required: true, message: '请输入地区名称', trigger: 'blur' }
          ],
          zipcode: [
            { required: true, message: '请输入邮政编码', trigger: 'blur' }
          ]
        },
        /** 地区表单 dialog */
        dialogRegionVisible: false
      }
    },
    methods: {
      /** 编辑地区 */
      handleEdit(region) {
        region = JSON.parse(JSON.stringify(region))
        this.regionForm = {
          region_id: region.id,
          local_name: region.text,
          zipcode: region.zipcode,
          cod: Number(region.cod) || 0
        }
        this.dialogRegionVisible = true
      },
      /** 删除地区 */
      handleDelete(region) {
        this.$confirm('确认要删除这个地区吗？').then(() => {
          API_Region.deleteRegion(region.id).then(() => {
            this.$message.success('删除成功！')
            this.$refs['regionEditor'].refresh('delete')
          })
        }).catch(() => {})
      },
      /** 添加地区 */
      handleAdd(region, parent) {
        this.regionForm = {
          p_region_id: parent.id,
          cod: 1
        }
        this.dialogRegionVisible = true
      },
      /** 提交地区表单 */
      submitRegionForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { region_id } = this.regionForm
            if (!region_id) {
              API_Region.addRegion(this.regionForm).then(response => {
                this.dialogRegionVisible = false
                this.$message.success('添加成功！')
                this.$refs['regionEditor'].refresh('add')
              })
            } else {
              API_Region.editRegion(region_id, this.regionForm).then(response => {
                this.dialogRegionVisible = false
                this.$message.success('保存成功！')
                this.$refs['regionEditor'].refresh('edit', {
                  ...this.regionForm,
                  id: this.regionForm.region_id,
                  text: this.regionForm.local_name
                })
              })
            }
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
