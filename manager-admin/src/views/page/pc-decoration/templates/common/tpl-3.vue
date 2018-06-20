<template>
  <div class="floor-layout tpl-3">
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
          <div class="bz-mt bz-mt-2">
            <layout-item
              v-for="(_block, blockIndex) in column.blockList.slice(1,3)"
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
              v-for="(_block, blockIndex) in column.blockList.slice(3,6)"
              :key="blockIndex"
              :block="_block" @handle-edit="handleEditBlock(0, blockIndex + 3)" class="bz-bm-item"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '../mixin'

  export default {
    name: 'tpl-3',
    mixins: [mixin],
    title: '模块3',
    dataTpl: {
      tpl_id: 3,
      tpl_type: 'ADV',
      columnList: [
        {
          title: '全球购',
          titleColors: ['#3aaba9', '#299b9a'],
          tagList: [
            { text: '耳机', opt_type: 'KEYWORD', opt_value: '耳机' },
            { text: '时尚名包', opt_type: 'KEYWORD', opt_value: '时尚名包' }
          ],
          blockList: [...new Array(5)].map(() => {
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
          titleColors: ['#568e7d', '#447e6c'],
          tagList: [
            { text: '净化器', opt_type: 'KEYWORD', opt_value: '净化器' },
            { text: '时尚名包', opt_type: 'KEYWORD', opt_value: '时尚名包' }
          ],
          blockList: [...new Array(5)].map(() => {
            return {
              image: '',
              opt_type: 'NONE',
              opt_value: ''
            }
          })
        },
        {
          title: '全球购',
          titleColors: ['#5a7259', '#425f41'],
          tagList: [
            { text: '哈萨克', opt_type: 'KEYWORD', opt_value: '哈萨克' },
            { text: '音箱', opt_type: 'KEYWORD', opt_value: '音箱' },
            { text: '炮车', opt_type: 'KEYWORD', opt_value: '炮车' }
          ],
          blockList: [...new Array(5)].map(() => {
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
    width: 397px;
    overflow: hidden;
    margin-right: 10px;
    &:last-child {
      width: 396px;
      margin-right: 0;
    }
  }
  .layout-body {
    height: 420px;
  }
  .layout-title {
    .bz-tags {
      max-width: 240px;
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
