<template>
  <div class="floor-layout tpl-2">
    <div v-for="(column, columnIndex) in data.columnList" :key="columnIndex" class="layout-main">
      <div class="layout-title" :style="colors(columnIndex).title">
        <h3 class="layout-item bz-tit">{{ column.title }}</h3>
        <div class="bz-tags">
          <el-tag
            v-for="(tag, index) in column.tagList"
            :key="index"
            :closable="isEdit"
            :disable-transitions="false"
            class="bz-tag-item"
            @close="() => {}">
            {{ tag.text }}
          </el-tag>
          <el-button v-if="isEdit" class="button-new-tag" size="mini" @click="() => {}">+ 添加</el-button>
        </div>
      </div>
      <div class="layout-body">
        <div class="lo-bz lo-bz-1">
          <div class="bz-cover">
            <layout-item :block="column.blockList[0]" @handle-edit="handleEditBlock(columnIndex, 0)"/>
          </div>
          <div class="bz-mt bz-mt-4">
            <layout-item
              v-for="(_block, blockIndex) in column.blockList.slice(1,5)"
              :key="blockIndex"
              :block="_block"
              @handle-edit="handleEditBlock(0, blockIndex + 1)"
              class="bz-mt-item">
              <template slot-scope="{ block }">
                <p class="bz-mt-tit" :style="colors().color(0)">{{ block.block_opt.opt_title }}</p>
                <p class="bz-mt-des">{{ block.block_opt.opt_desc }}</p>
              </template>
            </layout-item>
          </div>
          <div class="bz-more">
            <layout-item
              v-for="(_block, blockIndex) in column.blockList.slice(5,8)"
              :key="blockIndex"
              :block="_block" @handle-edit="handleEditBlock(0, blockIndex + 5)" class="bz-bm-item"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '../mixin'

  export default {
    name: 'tpl-2',
    mixins: [mixin],
    title: '模块2',
    dataTpl: {
      tpl_id: 2,
      tpl_type: 'ADV',
      columnList: [
        {
          title: '全球购',
          titleColors: ['#0fab85', '#0a906f'],
          tagList: [
            { text: '净化器', opt_type: 'KEYWORD', opt_value: '净化器' }
          ],
          blockList: [...new Array(8)].map(() => {
            return {
              block_type: 'IMAGE',
              block_value: '',
              block_opt: {
                opt_type: 'NONE',
                opt_value: ''
              }
            }
          })
        },
        {
          title: '全球购',
          titleColors: ['#ecd451', '#e3c20c'],
          tagList: [
            { text: '空气净化器', opt_type: 'KEYWORD', opt_value: '空气净化器' },
            { text: '时尚名包', opt_type: 'KEYWORD', opt_value: '时尚名包' },
            { text: '蓝牙耳机', opt_type: 'KEYWORD', opt_value: '蓝牙耳机' },
            { text: '顶尖好货', opt_type: 'KEYWORD', opt_value: '顶尖好货' }
          ],
          blockList: [...new Array(8)].map(() => {
            return {
              image: '',
              opt_type: 'NONE',
              opt_value: ''
            }
          })
        }
      ]
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .layout-main {
    float: left;
    width: 600px;
    overflow: hidden;
    &:nth-child(1) {
      margin-right: 10px;
    }
  }
  .layout-body {
    height: 420px;
  }
  .layout-title {
    .bz-tags {
      max-width: 440px;
    }
  }
  .lo-bz {
    float: left;
    width: 580px;
    &.lo-bz-2 {
      width: 579px;
      margin-left: 15px;
      padding-left: 15px;
      border-left: 1px solid #E6E6E6;
    }
  }
</style>
