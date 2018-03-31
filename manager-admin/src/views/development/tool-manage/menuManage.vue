<template>
  <div class="menus-container">
    <el-tree
      :data="meuns"
      node-key="name"
      :expand-on-click-node="true"
    >
      <span class="custom-tree-node" slot-scope="{node, data}">
        <span>{{ data.title }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            :disabled="node.level === 3"
            icon="el-icon-plus"
            :title="node.level === 3 ? '菜单最多添加三级' : '增加'"
            @click.stop="handleAddMenu(data)"
          />
          <el-button
            type="text"
            size="mini"
            icon="el-icon-minus"
            title="删除"
            @click.stop="handleDeleteMenu(node, data)"
          />
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit"
            title="编辑"
            @click.stop="handleEditMenu(data)"
          />
        </span>
      </span>
    </el-tree>
    <el-dialog
      :title="menuForm.menu_name ? '编辑菜单' : '添加菜单'"
      :visible.sync="dialogMenuVisible"
      width="500px">
      <el-form :model="menuForm" :rules="menuRules" ref="menuForm" label-width="100px">
        <el-form-item label="菜单标题" prop="title">
          <el-input v-model="menuForm.title"></el-input>
        </el-form-item>
        <el-form-item label="菜单标识" prop="name">
          <el-input v-model="menuForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMenuVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitMenuForm('menuForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_MenusManage from '@/api/menusManage'
  export default {
    name: 'menuManage',
    data() {
      return {
        meuns: [],
        /** 添加、编辑菜单 表单 */
        menuForm: {},
        /** 添加、编辑菜单 表单规则 */
        menuRules: {},
        /** 添加、编辑菜单 dialog */
        dialogMenuVisible: false,
        /** 当前操作的menu */
        currentMenu: ''
      }
    },
    created() {
      this.GET_Memus()
    },
    methods: {
      /** 添加菜单 */
      handleAddMenu(menu) {
        this.menuForm = {}
        this.currentMenu = menu
        this.dialogMenuVisible = true
      },
      /** 删除菜单 */
      handleDeleteMenu(node, menu) {
        this.$confirm('确定要删除这个菜单吗？如果有子菜单，子菜单也会被一并删除！', '提示', { type: 'warning' }).then(() => {
          API_MenusManage.deleteMenu(menu.id).then(() => {
            const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex(d => d.name === menu.name)
            children.splice(index, 1)
          })
        }).catch(() => {})
      },
      /** 编辑菜单 */
      handleEditMenu(menu) {
        this.menuForm = JSON.parse(JSON.stringify(menu))
        this.menuForm.id = 123
        this.currentMenu = menu
        this.dialogMenuVisible = true
      },
      /** 添加、编辑菜单 表单提交 */
      submitMenuForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.menuForm.id) {
              API_MenusManage.editMenu(this.menuForm.id, this.menuForm).then(response => {
                this.currentMenu = {
                  ...this.currentMenu,
                  ...this.menuForm
                }
                this.dialogMenuVisible = false
                this.$message.success('保存成功！')
              })
            } else {
              API_MenusManage.addMenu(this.menuForm).then(response => {
                const data = this.currentMenu
                if (!data.children) this.$set(data, 'children', [])
                data.children.push(this.menuForm)
                this.dialogMenuVisible = false
                this.$message.success('保存成功！')
              })
            }
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },
      /** 获取菜单 */
      GET_Memus() {
        API_MenusManage.getMenus().then(response => {
          this.meuns = response
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .menus-container {
    padding: 10px;
    background-color: #fff;
    /deep/ .el-tree {
      width: 500px;
    }
    /deep/ .el-icon-minus {
      color: #F56C6C;
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
