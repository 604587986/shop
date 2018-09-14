<template>
  <div class="floor-layout tpl-4">
    <div v-for="(column, columnIndex) in data.columnList" :key="columnIndex" class="layout-main">
      <div class="layout-title" :style="colors(0).title">
        <template v-if="isEdit">
          <div class="edit-mask title" @click="handleEditTitle(columnIndex)">
            <button type="button" class="mask-btn-floor">
              <svg-icon icon-class="pen-leather"></svg-icon>编辑
            </button>
          </div>
          <div class="edit-mask tag" @click="handleEditTags(columnIndex)">
            <button type="button" class="mask-btn-floor">
              <svg-icon icon-class="pen-leather"></svg-icon>编辑
            </button>
          </div>
        </template>
        <h3 class="layout-item bz-tit">{{ column.title }}</h3>
        <div class="bz-tags">
          <a
            v-for="(tag, index) in column.tagList"
            :key="index"
            :href="blockHref(tag)"
          >
            <el-tag class="bz-tag-item">{{ tag.block_value }}</el-tag>
          </a>
        </div>
      </div>
      <div class="layout-body">
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '../mixin'
  export default {
    name: 'tpl-4', // 模块名称
    mixins: [mixin],
    title: '模块4', // 模块标题
    dataTpl: { // 默认数据结构
      tpl_id: 4, // 模块ID
      tpl_type: 'ADV', // 模块类型，默认为ADV。（目前只支持ADV）
      columnList: [ // 数据列
        {
          // 当前列数据的标题
          title: '轮播楼层',
          // 当前列数据的标题栏背景渐变色
          titleColors: ['#333377', '#488bad'],
          // mixin.methods.emptyBlock方法用于创建空数据，第一个参数为数据块个数，第二个参数为区块类型
          // 区块类型目前只有【TEXT=文本、IMAGE=图片】
          // 当前列数据中的标签
          tagList: mixin.methods.emptyBlock(2, 'TEXT'),
          // 当前列数据中的图片块，15表示要创建15个空数据块
          blockList: mixin.methods.emptyBlock(5, 'IMAGE')
        },
        {
          title: '四小图',
          titleColors: ['#333377', '#488bad'],
          tagList: mixin.methods.emptyBlock(2, 'TEXT'),
          blockList: mixin.methods.emptyBlock(5, 'IMAGE')
        },
        {
          title: '一大三小',
          titleColors: ['#333377', '#488bad'],
          tagList: mixin.methods.emptyBlock(2, 'TEXT'),
          blockList: mixin.methods.emptyBlock(4, 'IMAGE')
        }
      ]
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .layout-main {
    float: left;
    width: 397px;
    overflow: hidden;
    margin-right: 10px;
    &:last-child {
      width: 396px;
      margin-right: 0;
    }
  }
  .layout-title .edit-mask.tag {
    width: 220px;
  }
</style>
