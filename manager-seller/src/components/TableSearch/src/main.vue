<template>
  <div class="en-search">
    <div style="width: 330px">
      <el-input
        size="small"
        clearable
        :placeholder="placeholder"
        v-model="keyword"
        @keyup.native.enter="search"
      >
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div v-if="advanced">
      <el-popover
        placement="bottom-start"
        :width="advancedWidth"
        v-model="popoverVisible"
      >
        <slot name="advanced-content"></slot>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="advancedSearch">确定</el-button>
        </div>
        <el-button
          size="small"
          style="margin-left: 10px"
          slot="reference"
        >
          高级搜索
        </el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EnTableSearch',
    props: {
      // 是否为高级搜索
      advanced: {
        type: Boolean,
        default: false
      },
      advancedWidth: {
        default: 405
      },
      placeholder: {
        type: String,
        default: '请输入关键字'
      }
    },
    data() {
      return {
        keyword: '',
        popoverVisible: false
      }
    },
    methods: {
      /** 普通搜索 */
      search() {
        this.popoverVisible = false
        this.$emit('search', this.$data.keyword)
      },
      /** 高级搜索 */
      advancedSearch() {
        this.popoverVisible = false
        this.$emit('advancedSearch', this.$data.keyword)
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .en-search {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
