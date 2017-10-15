<template>
    <div class="nav-bar-container">
      <div class="nav-bar-logo">
        <layout-member></layout-member>
      </div>
      <div class="nav-bar-tabs">
        <el-tabs
          v-model="curTabName"
          type="card"
          @tab-remove="layoutCloseTab"
        >
          <el-tab-pane
            v-for="(item, index) in tabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            :closable="item.closable"
            :disabled="item.disabled"
          >
            <layout-main>
              <component :is="item.component"></component>
            </layout-main>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="nav-bar-oper">
        <el-dropdown
          size="small"
          :hide-on-click="false"
          @command="handleCommand"
        >
          <el-button type="text">
            页面操作<i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a"> 关闭当前页面 </el-dropdown-item>
            <el-dropdown-item command="b"> 关闭其它页面 </el-dropdown-item>
            <el-dropdown-item command="c"> 关闭全部页面 </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import LayoutMember from './Member.vue'
  import LayoutMain from './Main.vue'

  export default {
    name: 'LayoutNavTabs',
    data () {
      return {}
    },
    computed: {
      // 当前tab的name
      curTabName: {
        get: function () {
          return this.$store.state.layout.curTabName
        },
        set: function (name) {
          this.$store.state.layout.curTabName = name
        }
      },
      // 当前index计数
      tabIndex: {
        get: function () {
          return this.$store.state.layout.tabIndex
        },
        set: function (index) {
          this.$store.state.layout.tabIndex = index
        }
      },
      ...mapState({
        tabs: state => state.layout.tabs
      })
    },
    methods: {
      ...mapActions([
        'layoutNewTab',
        'layoutCloseTab',
        'layoutCloseCurrentTab',
        'layoutCloseOtherTab',
        'layoutCloseAllTab'
      ]),
      handleCommand (command) {
        command === 'a' && this.layoutCloseCurrentTab()
        command === 'b' && this.layoutCloseOtherTab()
        command === 'c' && this.layoutCloseAllTab()
      }
    },
    components: {
      LayoutMember,
      LayoutMain
    }
  }
</script>

<style type="text/scss" lang="scss">
  @import "../../styles/_color.scss";

  .nav-bar-container {
    display: flex;
    flex-direction: row;
    position: fixed;
    width: 100%;
    height: 56px;
    background: $nav-bar_background;
    text-align: center;
    .nav-bar-logo {
      width: 200px;
      height: 100%;
    }

    .el-tabs__header {
      margin: 0;
    }

    .nav-bar-tabs {
      width: calc(100% - 200px - 150px);
      margin-top: calc(56px - 45px);
    }

    .el-tabs--card>.el-tabs__header {
      border: none;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__nav {
      border: none;
      border-radius: 0;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item {
      min-width: 80px;
      height: 45px;
      line-height: 45px;
      color: $nav-bar_text;
      border: none;
      user-select: none;
      transition: color .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1), background-color .3s cubic-bezier(.645,.045,.355,1);
      &.is-active {
        background-color: #fff;
        color: $nav-bar_text-active;
      }
    }

    .nav-bar-oper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 100%;
      .el-dropdown .el-dropdown__caret-button::before {
        content: normal;
      }
    }
  }
</style>
