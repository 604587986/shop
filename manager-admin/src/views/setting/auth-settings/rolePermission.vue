<template>
  <div class="permission-container">
    <el-form :model="permissionForm" :rules="permissionRules" ref="permissionForm" label-width="200px" class="demo-ruleForm">
      <el-form-item label="角色名称" prop="role_name">
        <el-input v-model="permissionForm.role_name"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="role_describe">
        <el-input v-model="permissionForm.role_describe"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" prop="permission">
        <el-checkbox :indeterminate="allIndeterminate" v-model="allCheck" @change="handleCheckAll">全部选择</el-checkbox>
        <div v-for="item in permissions" :key="item.identifier" class="level_1">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-checkbox v-model="item.checked" :indeterminate="checkIndeterminate(item.children)" @change="handleCheckItem(item)">
                {{ item.title }}
              </el-checkbox>
            </el-col>
            <el-col :span="20">
              <div v-for="_item in item.children" :key="_item.identifier" class="checkbox-dropdown">
                <el-checkbox v-model="_item.checked" :indeterminate="checkIndeterminate(_item.children)" @change="handleCheckItem(_item, item)">
                  {{ _item.title }}
                </el-checkbox>
                <template v-if="_item.children && _item.children.length">
                  <el-dropdown trigger="click" split-button :hide-on-click="false">
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="__item in _item.children" :key="__item.identifier">
                        <el-checkbox v-model="__item.checked" @change="handleCheckItem(__item, _item)">
                          {{ __item.title }}
                        </el-checkbox>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="small" style="margin-top: 15px" @click="saveRolePermission">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // Andste_TODO 2018/6/26: 返回后刷新表格待优化
  import * as API_Auth from '@/api/auth'
  import * as API_Menus from '@/api/menus'

  export default {
    name: 'rolePermission',
    data() {
      return {
        /** 权限 表单 */
        permissionForm: {
          role_name: ''
        },
        /** 权限 表单规则 */
        permissionRules: {
          role_name: [
            this.MixinRequired('请输入角色名称！'),
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ]
        },
        permissions: []
      }
    },
    mounted() {
      this.role_id = Number(this.$route.params.id)
      this.role_id === 0 ? this.GET_Menus() : this.GET_RolePermission(this.role_id)
    },
    computed: {
      /** 全部选择 选择状态 */
      allCheck: {
        set: function() {},
        get: function() {
          const Len = this.getAllPermissionsLength()
          return (Len.length_checked !== 0) && (Len.length === Len.length_checked)
        }
      },
      /** 全部选择 不确定性 */
      allIndeterminate: {
        set: function() {},
        get: function() {
          const Len = this.getAllPermissionsLength()
          if (Len.length === 0 || Len.length_checked === 0) return false
          if (Len.length === Len.length_checked) return false
          return true
        }
      }
    },
    methods: {
      /** 全选 */
      handleCheckAll(checked) {
        this.allIndeterminate = false
        this.permissions = this.setPermissionsCheck(this.permissions, checked)
      },
      /** 选择 */
      handleCheckItem(item, parent) {
        if (item.children && item.children.length > 0) {
          this.setPermissionsCheck(item.children, item.checked)
        }
        if (parent) {
          const _len = parent.children.length
          const _c_len = parent.children.filter(_item => _item.checked).length
          parent.checked = _c_len !== 0 && _len === _c_len
        }
      },
      /** 设置权限状态 */
      setPermissionsCheck(permissions, checked) {
        permissions.map(item => {
          this.$set(item, 'checked', checked)
          // item.checked = checked
          if (item.children && item.children.length > 0) {
            item.children = this.setPermissionsCheck(item.children, checked)
          }
        })
        return permissions
      },
      /** 检测是否有不确定性 */
      checkIndeterminate(permissions) {
        if (!Array.isArray(permissions)) return false
        const _len = permissions.length
        const __len = permissions.filter(item => item.checked).length
        return (__len !== 0) && (_len !== __len)
      },
      /** 获取所有权限展开后的长度、被选中的长度 */
      getAllPermissionsLength(permissions) {
        permissions = permissions || this.permissions
        const _list = []
        permissions.forEach(item => {
          _list.push(item)
          if (item.children) _list.push(...this.getAllPermissionsLength(item.children).list)
        })
        return {
          list: _list,
          length: _list.length,
          length_checked: _list.filter(_item => _item.checked).length
        }
      },
      /** 保存角色权限 */
      saveRolePermission() {
        this.$refs['permissionForm'].validate(valid => {
          if (valid) {
            const params = {
              ...this.permissionForm,
              menus: this.permissions
            }
            this.role_id === 0
              ? API_Auth.addRolePermission(params).then(() => {
                this.$message.success('保存成功！')
                this.$router.go(-1)
              })
              : API_Auth.editRolePermission(this.role_id, params).then(() => {
                this.$message.success('保存成功！')
                this.$router.go(-1)
              })
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },
      /** 获取权限菜单树 */
      GET_RolePermission(role_id) {
        API_Auth.getRolePermission(role_id).then(response => {
          this.role_id = response.role_id
          this.permissionForm.role_name = response.role_name
          this.permissionForm.role_describe = response.role_describe
          this.permissions = response.menus
        })
      },
      /** 获取菜单 */
      GET_Menus() {
        API_Menus.getMenusChildren().then(response => {
          this.permissions = response
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .permission-container {
    padding: 10px;
    background-color: #fff;
  }
  .level_1 {
    padding: 15px 0;
    border-bottom: 1px dashed #e7e7e7;
    &:last-child{ border-bottom: none }
  }
  /deep/ .el-form-item__content {
    border-left: 1px solid #e7e7e7;
    padding-left: 20px;
    .el-form-item__error {
      padding-left: 20px;
    }
  }
  /deep/ .el-form-item:not(:first-child) {
    border-top: 1px solid #e7e7e7;
    position: relative;
    &::after {
      content: ' ';
      width: 1px;
      height: 22px;
      background-color: #e7e7e7;
      position: absolute;
      top: -22px;
      left: 200px;
    }
  }
  .checkbox-dropdown {
    display: inline-block;
    min-width: 130px;
    cursor: pointer;
    .checked {
      color: #409EFF
    }
    /deep/ .el-button-group {
      display: inline-block;
      .el-button {
        display: inline-block;
        padding: 0;
        border: none;
        &:focus, &:hover {
          color: #606266;
          border-color: #fff;
          background-color: #fff;
        }
      }
    }
  }
</style>
