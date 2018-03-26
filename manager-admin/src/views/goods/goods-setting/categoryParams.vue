<template>
  <div id="params-container">
    <div id="add-new-group">
      <i class="add-btn" @click="addGroupForm.show = true">+</i>
      <div v-show="addGroupForm.show" class="add-div">
        <span class="add-div-title">参数组名</span>
        <input v-model="addGroupForm.group_name">
        <el-button type="text" size="mini" @click="handleSaveAddParamsGroup">保存</el-button>
        <el-button type="text" size="mini" @click="addGroupForm.show = false">取消</el-button>
      </div>
    </div>
    <el-card v-for="group in paramsGroup" :key="group.group_id">
      <div slot="header" class="clearfix">
        <span>参数组名：{{ group.group_name }}</span>
        <el-dropdown trigger="click" @command="handleGroupCommand" style="float: right">
          <span class="el-dropdown-link">操作<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{type: 'edit', group}">编辑</el-dropdown-item>
            <el-dropdown-item :command="{type: 'delete', group}">删除</el-dropdown-item>
            <el-dropdown-item :command="{type: 'sort_up', group}">上移</el-dropdown-item>
            <el-dropdown-item :command="{type: 'sort_down', group}">下移</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
  import * as API_Category from '@/api/category'
  import * as API_Params from '@/api/params'
  export default {
    name: 'categoryParams',
    data() {
      return {
        /** 分类ID */
        category_id: this.$route.params.id,
        /** 参数组 */
        paramsGroup: [],
        /** 编辑分类参数 dialog */
        dialogParamsVisible: false,
        /** 参数管理 表单 */
        paramsForm: {
          paramsTitle: '参数管理'
        },
        /** 添加参数组 表单 */
        addGroupForm: {
          show: false,
          group_name: ''
        }
      }
    },
    created() {
      this.GET_CategoryParamsGroup()
    },
    methods: {
      /** 新增参数组 */
      handleSaveAddParamsGroup() {
        const _name = this.addGroupForm.group_name
        if (!_name) {
          this.$message.error('请输入参数组名！')
        } else {
          API_Params.addParamsGroup({
            group_name: _name,
            category_id: this.category_id
          }).then(response => {
            this.$message.success('保存成功！')
            this.addGroupForm.group_name = ''
            this.addGroupForm.show = false
            this.GET_CategoryParamsGroup()
          })
        }
      },
      /** 下拉触发 */
      handleGroupCommand(object) {
        switch (object.type) {
          case 'edit':
            this.handleEditGroup(object.group)
            break
          case 'delete':
            this.handleDeleteGroup(object.group)
            break
          case 'sort_up':
            this.handleSortGroup('up', object.group)
            break
          case 'sort_down':
            this.handleSortGroup('down', object.group)
            break
        }
      },
      /** 编辑参数组名 */
      handleEditGroup(group) {
        this.$prompt('编辑参数组名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: group.group_name,
          inputPattern: /.+/,
          inputErrorMessage: '名称格式有误'
        }).then(obj => {
          API_Params.editParamsGroup(group.group_id, {
            group_name: obj.value,
            category_id: this.category_id
          }).then(response => {
            group.group_name = response.group_name
            this.$message.success('修改成功！')
          })
        }).catch(() => {})
      },
      /** 删除参数组 */
      handleDeleteGroup(group) {
        this.$confirm('确定要删除这个参数组吗？', '提示', { type: 'warning' }).then(() => {
          const _id = group.group_id
          API_Params.deleteParamsGroup(_id).then(() => {
            const _list = []
            this.paramsGroup.forEach(item => {
              if (item.group_id !== _id) _list.push(item)
            })
            this.paramsGroup = _list
            this.$message.success('删除成功！')
          })
        }).catch(() => {})
      },
      /** 参数组排序 */
      handleSortGroup(type, group) {
        API_Params.sortParamsGroup(group.group_id, type).then(() => {
          this.$message.success('修改成功！')
          this.GET_CategoryParamsGroup()
        })
      },
      /** 编辑关联规格 表单提交 */
      submitSpecsForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('...')
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },
      /** 获取参数组 */
      GET_CategoryParamsGroup() {
        API_Category.getCategoryParams(this.category_id).then(response => {
          this.paramsGroup = response
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  #params-container {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    background-color: #fff;
    padding: 10px;
    min-height: 150px;
    /deep/ .el-card {
      min-width: 300px;
      max-width: 500px;
      min-height: 100px;
      margin: 10px;
      overflow: hidden;
    }
    /deep/ .el-card__header {
      padding: 10px 15px;
      background-color: #f5f7fa;
    }
    /deep/ .el-card__body {
      padding: 10px 15px;
    }
    /deep/ .el-dropdown-link{
      cursor:pointer;
      color:#409eff
    }
    /deep/ .el-icon-arrow-down{
      font-size:12px
    }
  }
  #add-new-group {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 10;
    min-width: 30px;
    height: 30px;
    background: #475669;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color .3s ease;
    &:hover {
      background-color: rgb(192,204,218);
      cursor: pointer;
      .add-btn { color: rgb(71,86,105) }
    }
    .add-btn {
      display: block;
      width: 30px;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      color: white;
      margin-top: -7px;
    }
    .add-div {
      display: flex;
      background: #324057;
      align-items: center;
      justify-content: space-around;
      min-width: 330px;
      height: 40px;
      position: absolute;
      top: -5px;
      left: 50px;
      padding: 2px 5px;
      color: #F9FAFC;
      box-shadow: 0 0 10px 0 #303133;
      .add-div-title {  font-size: 12px }
    }
  }
</style>
