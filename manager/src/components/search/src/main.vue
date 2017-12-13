<template>
  <div class="en-search">
    <div style="width: 330px">
      <el-input size="small" clearable placeholder="请输入商品关键字" v-model="keyword">
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
          <el-button type="primary" size="mini" @click="search">确定</el-button>
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
    name: 'EnSearch',
    props: {
      // 是否为高级搜索
      advanced: {
        type: Boolean,
        default: false
      },
      advancedWidth: {
        default: 405
      }
    },
    data() {
      return {
        keyword: '',
        popoverVisible: false
      }
    },
    methods: {
      search() {
        this.popoverVisible = false
        this.$emit('search', this.$data)
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
