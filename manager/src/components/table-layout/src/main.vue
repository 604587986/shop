<template>
  <div class="container" v-loading="loading">
    <div v-if="toolbar" class="toolbar">
      <slot name="toolbar"></slot>
    </div>
    <el-table
      :data="tableData"
      height="100%"
      border
      stripe
      :header-cell-style="{textAlign: 'center'}"
      :style="{width: '100%', height: 'calc(100% - '+ (pagination ? 42 : 0) +'px - '+ (toolbar ? 44 : 0) +'px)'}"
      @selection-change="selectionChange"
    >
      <slot name="table-columns"></slot>
    </el-table>
    <div v-if="pagination" class="pagination">
      <div class="pagination-toolbar">
        <slot name="pagination-toolbar"></slot>
      </div>
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EnTabelLayout',
    props: {
      /** 是否显示工具栏 */
      toolbar: {
        type: Boolean,
        default: true
      },
      /** 是否显示分页 */
      pagination: {
        type: Boolean,
        default: true
      },
      /** 表格数据 */
      tableData: {
        default: null
      },
      /** 加载状态 */
      loading: {
        type: Boolean,
        default: false
      },
      /** 当选择项发生变化 */
      selectionChange: {
        type: Function,
        default: () => {}
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    .el-table--border {
      border: none;
    }
    .el-table--border::after {
      width: 0;
    }
  }
  /** 工具栏样式 */
  .toolbar {
    display: flex;
    align-items: center;
    height: 44px;
    border-bottom: 1px solid #e6ebf5;
    background-color: #fff;
  }
  /** 分页样式 */
  .pagination {
    display: flex;
    justify-content: space-between;
    height: 32px;
    padding: 5px 20px;
    text-align: right;
    background-color: #ffffff;
    .pagination-toolbar {
      display: flex;
      align-items: center;
    }
  }
</style>
