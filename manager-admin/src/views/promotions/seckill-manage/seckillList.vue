<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading"
    >
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddSeckill">添加</el-button>
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column prop="seckill_name" label="活动名称"/>
        <el-table-column label="活动开始时间">
          <template slot-scope="scope">{{ scope.row.start_day }}</template>
        </el-table-column>
        <el-table-column label="报名截止时间">
          <template slot-scope="scope">{{ scope.row.apply_end_time }}</template>
        </el-table-column>
        <el-table-column prop="status_text" label="状态"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 'EDITING'"
              size="mini"
              type="primary"
              @click="handleEditSeckill(scope.$index, scope.row)">编辑</el-button>
            <el-button
              v-if="scope.row.status === 'RELEASE'"
              size="mini"
              type="primary"
              @click="handleAuditSeckill(scope.$index, scope.row)">审核</el-button>
            <el-button
              v-if="scope.row.status === 'RELEASE'"
              size="mini"
              type="primary"
              @click="handleViewSeckillGoods(scope.$index, scope.row)">查看商品</el-button>
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
    <el-dialog title="添加限时抢购" :visible.sync="dialogSeckillVisible" width="500px">
      <el-form :model="seckillForm" :rules="seckillRules" ref="seckillForm" label-width="120px">
        <el-form-item label="活动名称" prop="seckill_name">
          <el-input v-model="seckillForm.seckill_name" :maxlength="20" clearable></el-input>
        </el-form-item>
        <el-form-item label="报名截止时间" prop="apply_end_time">
          <el-date-picker
            v-model="seckillForm.apply_end_time"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd hh:mm:ss"
            :picker-options="{disabledDate(time) { return time.getTime() < Date.now() }}">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动日期" prop="start_day">
          <el-date-picker
            v-model="seckillForm.start_day"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="{disabledDate(time) { return time.getTime() < Date.now() }}">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="抢购阶段">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            class="time-tag"
            @close="handleTagClose(tag)">
            {{ tag < 10 ? '0' + tag : tag }} : 00
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model.number="inputValue"
            type="number"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleTagInputConfirm"
            @blur="handleTagInputConfirm"
            :min="0" :max="23"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+ 添加时间段</el-button>
        </el-form-item>
        <el-form-item label="申请规则" prop="seckill_rule">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入申请规则"
            v-model="seckillForm.seckill_rule"
            :maxlength="200"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlePublishSeckill">立即发布</el-button>
          <el-button @click="handleSaveSeckill">保存活动</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_Seckill from '@/api/seckill'
  import { TableSearch } from '@/components'

  export default {
    name: 'seckillList',
    components: {
      [TableSearch.name]: TableSearch
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

        /** 添加、编辑限时抢购 dialog */
        dialogSeckillVisible: false,

        /** 添加、编辑限时抢购 表单 */
        seckillForm: {},

        /** 添加、编辑限时抢购 表单规则 */
        seckillRules: {
          seckill_name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          apply_end_time: [
            { required: true, message: '请选择截止报名时间', trigger: 'blur' }
          ],
          start_day: [
            { required: true, message: '请选择活动日期', trigger: 'blur' }
          ]
        },
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      }
    },
    mounted() {
      this.GET_SeckillList()
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_SeckillList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_SeckillList()
      },

      /** 添加限时抢购 */
      handleAddSeckill() {
        this.seckillForm = { id: 0 }
        this.dynamicTags = []
        this.dialogSeckillVisible = true
      },

      /** 编辑限时抢购 */
      handleEditSeckill(index, row) {
        this.seckillForm = row
        this.dynamicTags = this.seckillForm.range_list || []
        this.dialogSeckillVisible = true
      },

      /** 审核 */
      handleAuditSeckill(index, row) {
        this.$router.push({ path: `/promotions/seckill-manage/seckill-list/audit/${row.id}` })
      },

      /** 查看限时抢购商品 */
      handleViewSeckillGoods(index, row) {
        this.$router.push({ path: `/promotions/seckill-manage/seckill-list/pass/${row.id}` })
      },

      /** 时间段Tag删除 */
      handleTagClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      },

      // 显示时间段Tag输入框
      showTagInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      // 时间段Tag输入确认事件
      handleTagInputConfirm() {
        let inputValue = this.inputValue
        if (inputValue !== undefined && inputValue !== '') {
          if (inputValue < 0 || inputValue > 23) {
            this.$message.error('时间段应在0-23之间！')
            this.$refs.saveTagInput.$refs.input.focus()
            return false
          }
          if (inputValue <= this.dynamicTags[this.dynamicTags.length - 1]) {
            this.$message.error('不能小于或等于上一时间段！')
            this.$refs.saveTagInput.$refs.input.focus()
            return false
          }
          this.dynamicTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      },

      /** 验证限时抢购表单 */
      validateSeckillForm() {
        return new Promise((resolve, reject) => {
          this.$refs['seckillForm'].validate((valid) => {
            if (!valid) {
              reject('表单填写有误，请检查！')
            } else if (this.dynamicTags.length < 1) {
              reject('请至少添加一个时间段！')
            } else {
              this.seckillForm.range_list = this.dynamicTags
              resolve()
            }
          })
        })
      },

      /** 发布限时抢购 */
      handlePublishSeckill() {
        this.validateSeckillForm().then(() => {
          API_Seckill.publishSeckill(this.seckillForm.id, this.seckillForm).then(response => {
            this.dialogSeckillVisible = false
            this.$message.success('发布成功！')
            this.GET_SeckillList()
          }).catch(error => console.log(error))
        }).catch(error => this.$message.error(error))
      },

      /** 保存限时抢购 */
      handleSaveSeckill() {
        this.validateSeckillForm().then(() => {
          API_Seckill.saveSeckill(this.seckillForm.id, this.seckillForm).then(response => {
            this.dialogSeckillVisible = false
            this.$message.success('保存成功！')
            this.GET_SeckillList()
          }).catch(error => console.log(error))
        }).catch(error => this.$message.error(error))
      },

      /** 获取限时抢购列表 */
      GET_SeckillList() {
        this.loading = true
        API_Seckill.getSeckillList(this.params).then(response => {
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
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .time-tag {
    display: block;
    width: 80px;
    margin: 5px 0;
  }
  .input-new-tag {
    width: 112px;
  }

  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
</style>
