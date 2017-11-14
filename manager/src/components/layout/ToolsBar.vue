<template>
  <div class="tools-bar-container" :style="mainWidth">
    <div class="narrow-tools-bar">
      <el-button
        type="text"
        icon="el-icon-enation-three-bars"
        @click="layoutSidebarCollapse"
        :style="{transform: isCollapse ? 'rotateZ(90deg)' : 'rotateZ(0deg)'}"
      ></el-button>
    </div>
    <div class="breadcrumb-tools-bar">
      <el-breadcrumb v-if="tabPath" separator="/">
        <el-breadcrumb-item v-for="(item, index) in tabPath" :key="index">{{ item.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="operate-tools-bar">
      <div class="btns-tools-bar">
        <el-tooltip class="item" effect="dark" :content="'有' + notification_count + '条未读消息'" placement="bottom">
          <el-badge :value="notification_count" :max="99" class="item">
            <el-button type="text" icon="el-icon-enation-bells"></el-button>
          </el-badge>
        </el-tooltip>
      </div>
      <div v-if="userInfo" class="user-info">
        <el-dropdown @command="handleUserCommand" size="small" trigger="click">
          <span class="el-dropdown-link">
            {{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="website">浏览网站</el-dropdown-item>
            <el-dropdown-item command="password">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <img class="user-avatar" :src="userInfo.avatar" :alt="userInfo.username">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'ToolsBar',
    data() {
      const _sidebarMenu = JSON.parse(window.localStorage.getItem('sidebarMenu'))
      return {
        sidebarMenu: _sidebarMenu,
        tabPath: [_sidebarMenu[0]]
      }
    },
    computed: {
      ...mapGetters(['mainWidth', 'isCollapse', 'userInfo', 'currentTabName', 'notification_count'])
    },
    watch: {
      currentTabName(newVal, oldVal) {
        this.filterMenu(newVal)
      }
    },
    methods: {
      ...mapActions(['layoutSidebarCollapse', 'logoutSuccess']),
      /** 筛选出当前tab的路径 */
      filterMenu(path) {
        const _temp = []
        path.split('-').forEach((item, index) => {
          if (index === 0) {
            _temp.push(this.sidebarMenu[item])
          } else {
            _temp.push(_temp[index - 1].children[item])
          }
        })
        this.tabPath = _temp
      },

      /** 用户操作 */
      handleUserCommand(command) {
        command === 'website' && window.open('http://v64.javamall.com.cn/')
        command === 'password' && this.$message.success('修改密码')
        command === 'logout' && this.POST_Logout()
      },

      /** 退出账号 */
      POST_Logout() {
        this.$confirm('确定退出账号吗？', '提示')
          .then(() => {
            this.$http.post('/logout')
              .then(() => {
                this.$message.success('退出成功！')
                setTimeout(this.logoutSuccess, 1000)
              })
              .catch(error => {
                error.response
                && error.response.data
                && this.$message.error(error.response.data.error_message)
              })
          })
          .catch(() => {})
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  @import "../../styles/color";
  @import "../../styles/mixin";

  .tools-bar-container {
    position: fixed;
    top: 0;
    left: 200px;
    width: calc(100% - 200px);
    height: 50px;
    background-color: #ffffff;
    @include transition(all ease-out .2s);
  }
  .narrow-tools-bar {
    margin: 8px;
    display: inline-block;
    button {
      font-weight: 400;
      font-size: 22px;
      padding: 6px 15px;
      color: #495060;
      &:focus {
        color: #495060;
      }
    }
  }
  .breadcrumb-tools-bar {
    display: inline-block;
    background-color: #fff;
    .el-breadcrumb__inner {
      color: #5a5e66;
      cursor: text;
    }
  }
  .operate-tools-bar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    float: right;
    width: 200px;
    height: 50px;
    text-align: right;
    padding: 0 10px;

    .btns-tools-bar {
      margin-right: 30px;
      .el-badge .el-button--text {
        color: #495060;
        padding: 0;
      }
    }

    .user-info {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 50px;
      .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
        font-size: 12px;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
      .user-avatar {
        width: 32px;
        height: 32px;
        border-radius: 100%;
        margin-left: 10px;
      }
    }
  }
</style>
