<template>
  <div class="transfer" :style="{width,height}">
    <!-- 左侧穿梭框 原料框 -->
    <div class="transfer-left">
      <h3 class="transfer-title">
        <!--全选按钮-->
        <el-button plain size="mini" @click="chooseAll(1, from_data)">全选</el-button>
        <!--源列表标题-->
        <span class="u-right">{{ fromTitle }}</span>
      </h3>
      <!-- 内容区 -->
      <div class="transfer-main">
        <el-input v-if="filter" placeholder="输入关键字进行过滤" v-model="filterFrom" size="small" class="filter-tree"></el-input>
        <en-tree-list :treeData="from_data" :key="1" @getChooseData="data => { selected_from_data = data }" class="trees"></en-tree-list>
      </div>
    </div>
     <!--穿梭区 按钮框-->
    <div class="transfer-center">
      <template v-if='button_text'>
        <p class="transfer-center-item">
          <el-button type="primary" @click="addTo" :disabled="from_disabled">
            {{ fromButton || '添加'}}
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </p>
        <p class="transfer-center-item">
          <el-button type="primary" @click='removeTo' :disabled="to_disabled" icon="el-icon-arrow-left">{{ toButton || '移除'}}</el-button>
        </p>
      </template>
      <template v-else>
        <p class="transfer-center-item">
          <el-button type="primary" @click="addToAims" icon="el-icon-arrow-right" circle :disabled="from_disabled"></el-button>
        </p>
        <p class="transfer-center-item">
          <el-button type="primary" @click='removeToSource' :disabled="to_disabled" icon="el-icon-arrow-left" circle></el-button>
        </p>
      </template>
    </div>
     <!--右侧穿梭框 目标框-->
    <div class="transfer-right">
      <h3 class="transfer-title">
        <!--全选按钮-->
        <el-button plain size="mini" @click="chooseAll(2, to_data)">全选</el-button>
        <!--源列表标题-->
        <span class="u-right">{{ toTitle }}</span>
      </h3>
      <!-- 内容区 -->
      <div class="transfer-main">
        <el-input v-if="filter" placeholder="输入关键字进行过滤" v-model="filterTo" size="small" class="filter-tree"></el-input>
        <en-tree-list :treeData="to_data"  @getChooseData="data => { selected_to_data = data }" :key="2"></en-tree-list>
      </div>
    </div>
  </div>
</template>

<script>
  import TreeList from './TreeList'
  export default {
    name: 'EnTransferTree',
    data() {
      return {
        from_disabled: false, // 添加按钮是否禁用
        to_disabled: false, // 移除按钮是否禁用
        filterFrom: '', // 源数据筛选
        filterTo: '', // 目标数据筛选
        isfromchooseAll: false, // 源数据是否全选
        istochooseAll: false, // 目标数据是否全选
        selected_from_data: '', // 源数据选中项
        selected_to_data: '' // 目标数据选中项
      }
    },
    components: { [TreeList.name]: TreeList },
    props: {
      // 宽度
      width: {
        type: String,
        default: '100%'
      },
      // 高度
      height: {
        type: String,
        default: '320px'
      },
      // 标题
      title: {
        type: Array,
        default: () => ['源列表', '目标列表']
      },

      // 穿梭按钮名字
      button_text: Array,

      // 源数据
      from_data: {
        type: Object,
        default: () => {}
      },

      // 选中数据
      to_data: {
        type: Object,
        default: () => {}
      },

      // el-tree 配置项
      defaultProps: {
        type: Object,
        default: () => {
          return { label: 'label', children: 'children' }
        }
      },

      // el-tree id 必须唯一
      id: {
        type: String,
        default: 'id'
      },

      // 自定义 pid参数名
      pid: {
        type: String,
        default: 'pid'
      },

      // 是否只返回叶子节点
      leafOnly: {
        type: Boolean,
        default: false
      },

      // 是否启用筛选
      filter: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      // 添加按钮 执行添加操作 1.源数据更新 把源数据选中项删除 2.目标数据更新 把源数据选中项整合进目标数据 释放当前源数据 目标数据
      addToAims() {
        // this.from_data
        // this.to_data
        // this.selected_from_data
      },
      // 移除按钮 执行移除操作 1.目标数据更新 把目标数据选中项删除 2.源数据更新 把目标数据选中项整合进源数据 释放当前源数据 目标数据
      removeToSource() {

      },

      // 源数据 筛选
      filterNodeFrom(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },

      // 目标数据筛选
      filterNodeTo(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },

      /** 全选 */
      chooseAll(is_from, data) {
        // 为每一项设置选中属性 isSelected Boolean值
        let stack = []
        for (let i = 0, len = data.length; i < len; i++) {
          stack.push(data[i])
        }
        let item
        while (stack.length) {
          item = stack.shift()
          if (is_from === 1) {
            item.isSelected = !this.isfromchooseAll
          } else if (is_from === 2) {
            item.isSelected = !this.istochooseAll
          }
          // 如果该节点有子节点，继续添加进入栈顶
          if (item.children && item.children.length) {
            stack = item.children.concat(stack)
          }
        }
        if (is_from === 1) {
          this.isfromchooseAll = !this.isfromchooseAll
        } else if (is_from === 2) {
          this.istochooseAll = !this.istochooseAll
        }
      }
    },
    computed: {
      // 左侧菜单名
      fromTitle() {
        let [text] = this.title
        return text
      },
      // 右侧菜单名
      toTitle() {
        let [, text] = this.title
        return text
      },
      // 上部按钮名
      fromButton() {
        if (this.button_text === undefined) {
          return
        }
        let [text] = this.button_text
        return text
      },
      // 下部按钮名
      toButton() {
        if (this.button_text === undefined) {
          return
        }
        let [, text] = this.button_text
        return text
      }
    },
    watch: {
      // 左侧 状态监测
      from_data(val) {
        this.from_disabled = val.length > 0
      },
      // 右侧 状态监测
      to_data(val) {
        this.from_disabled = val.length > 0
      }
      // // 左侧 数据筛选
      // filterFrom(val) {
      //   this.$refs['from-tree'].filter(val)
      // },
      // // 右侧 数据筛选
      // filterTo(val) {
      //   this.$refs['to-tree'].filter(val)
      // }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .el-tree {
    min-width: 100%;
    display: inline-block !important;
  }

  .transfer {
    position: relative;
    overflow: hidden;
  }

  .transfer-left {
    position: absolute;
    top: 0;
    left: 0;
  }

  .transfer-right {
    position: absolute;
    top: 0;
    right: 0;
  }

  .transfer-main {
    padding: 10px;
    height: calc(100% - 41px);
    box-sizing: border-box;
    overflow: auto;
  }

  .transfer-left,.transfer-right {
    border: 1px solid #ebeef5;
    width: 40%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    vertical-align: middle;
  }

  .transfer-center {
    position: absolute;
    top: 50%;
    left: 40%;
    width: 20%;
    transform: translateY(-50%);
    text-align: center;
  }

  .transfer-center-item {
    padding: 10px;
    overflow: hidden;
  }

  .transfer-title {
    border-bottom: 1px solid #ebeef5;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    color: #333;
    font-size: 16px;
    background-color: #f5f7fa;
  }

  .transfer-title .el-checkbox {
    margin-right: 10px;
  }

  .filter-tree {
    margin-bottom: 10px;
  }
</style>


