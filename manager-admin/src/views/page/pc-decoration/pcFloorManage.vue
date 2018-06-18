<template>
  <div>
    <div class="floor-container">
      <div class="draggable-box floor">
        <!--<el-button type="primary" @click="handleSaveFloor" class="save-btn">保存发布</el-button>-->
        <draggable v-model="templateArray" :options="tplOptions" class="tpl-list">
          <div v-for="item in templateArray" :class="'item-' + item.tpl_id" class="tpl-item">
            <div class="img-tpl"></div>
            <span class="text-tpl">{{ templates[item.tpl_id].title }}</span>
          </div>
        </draggable>
      </div>
      <div class="draggable-box">
        <div class="floor-top"></div>
        <div class="floor-body">
          <draggable v-model="floorList" :options="floorOptions" class="floor-list">
            <div v-for="(item, index) in floorList" :class="'item-' + item.tpl_id" class="floor-item">
              <component
                :is="templates[item.tpl_id]"
                :data="JSON.parse(JSON.stringify(item))"
                is-edit
                @handle-edit="(target, targetIndex) => handleEditFloor(index, target, targetIndex)"
              ></component>
              <div class="panel-handle">
                <span class="icon-handle handle-move"><svg-icon icon-class="list-move"/></span>
                <span class="icon-handle handle-delete" @click="floorList.splice(index, 1)"><svg-icon icon-class="delete"/></span>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
    <en-image-picker
      :show="dialogImageShow"
      :default-data="defaultImageData"
      @close="dialogImageShow = false"
      @confirm="handleImagePickerConfirm"
      :limit="10"
      multiple
    />
    <en-goods-picker
      :api="goodsListApi"
      :multipleApi="multipleGoodsApi"
      :show="dialogGoodsShow"
      :default-data="defaultGoodsData"
      :limit="1"
      @close="dialogGoodsShow = false"
      @confirm="handleGoodsPickerConfirm"
    />
    <en-text-picker
      :show="dialogTextShow"
      :default-data="defaultTextData"
      :maxlength="15"
      @close="dialogTextShow = false"
      @confirm="handleTextPickerConfirm"
    />
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import * as API_Floor from '@/api/floor'
  import templates, { templateArray } from './templates'

  export default {
    name: 'pcFloorManage',
    components: { draggable },
    data() {
      return {
        // 获取商品列表API
        goodsListApi: process.env.BASE_API + '/goods',
        // 根据商品id，获取商品列表API
        multipleGoodsApi: process.env.BASE_API + '/goods/@ids/details',
        templates,
        templateArray,
        /** 模板列表 */
        tplList: [],
        /** 模板配置 */
        tplOptions: {
          group: { name: 'tplGroup', pull: 'clone', put: false },
          sort: false
        },
        /** 楼层列表 */
        floorList: [],
        /** 楼层配置 */
        floorOptions: {
          animation: 150,
          group: { name: 'tplGroup', put: true },
          sort: true,
          handle: '.handle-move'
        },
        dialogImageShow: false,
        dialogGoodsShow: false,
        dialogTextShow: false,
        /** 图片默认数据 */
        defaultImageData: '',
        /** 商品默认数据 */
        defaultGoodsData: [],
        /** 文本默认数据 */
        defaultTextData: {}
      }
    },
    mounted() {
      this.GET_FloorList()
    },
    methods: {
      handleAddTpl() {
        API_Floor.editFloor('PC', 'INDEX', {
          page_name: 'pc_floor',
          page_data: JSON.stringify([
            {
              floor_name: '数码产品',
              floor_sort: 1,
              floor_data: []
            }
          ])
        }).then(response => {
          this.$message.success('发布成功！')
          console.log(response)
        })
      },
      handleEditFloor(index, target, targetIndex) {
        const type = target.blockList[targetIndex].block_type
        this.editOptions = {
          index,
          target,
          targetIndex
        }
        const blockData = JSON.parse(JSON.stringify(target.blockList[targetIndex]))
        if (type === 'IMAGE') {
          this.defaultImageData = blockData.block_value ? [{
            url: blockData.block_value,
            opt: blockData.block_opt
          }] : null
          this.dialogImageShow = true
        } else if (type === 'GOODS') {
          // 填充默认数据
          this.defaultGoodsData = blockData.block_value ? [blockData.block_value.goods_id] : []
          this.dialogGoodsShow = true
        } else if (type === 'TEXT') {
          const block = target.blockList[targetIndex]
          this.defaultTextData = {
            text: block.block_value,
            opt_type: block.block_opt.opt_type,
            opt_value: block.block_opt.opt_value
          }
          this.dialogTextShow = true
        } else if (type === 'BRAND') {
          console.log('品牌模块')
        }
      },
      /** 图片上传组件确认 */
      handleImagePickerConfirm(fileList) {
        const file = fileList[0]
        let opt = file ? file.operation : {}
        let url = file ? file.response.url : ''
        const { index, target, targetIndex } = this.editOptions
        target.blockList[targetIndex].block_value = url
        target.blockList[targetIndex].block_opt = opt
        this.$set(this.floorList, index, target)
      },
      /** 商品选择器确认 */
      handleGoodsPickerConfirm(list) {
        const { index, target, targetIndex } = this.editOptions
        target.blockList[targetIndex].block_value = this.MixinClone(list[0] || '')
        this.$set(this.floorList, index, target)
      },
      /** 文本选择器确认 */
      handleTextPickerConfirm(data) {
        const { index, target, targetIndex } = this.editOptions
        const block = target.blockList[targetIndex]
        block.block_value = data.text
        block.block_opt.opt_type = data.opt_type
        block.block_opt.opt_value = data.opt_value
        this.$set(this.floorList, index, target)
      },
      /** 保存发布 */
      handleSaveFloor() {
        API_Floor.editFloor('WAP', 'INDEX', {
          page_name: 'mobile_floor',
          page_data: JSON.stringify(this.floorList)
        }).then(() => this.$message.success('保存发布成功！'))
      },
      GET_FloorList() {
        API_Floor.getFloor('PC', 'INDEX').then(response => {
          this.floorList = JSON.parse(response.page_data || '[]')
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .floor-container {
    display: flex;
    justify-content: space-around;
    background-color: #E5E7EA;
    padding: 10px;
    min-height: 500px;
  }
  .draggable-box {
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 50%;
    .save-btn {
      position: absolute;
      top: 30px;
    }
    &.floor { align-items: center }
  }
  .tpl-list {
    display: flex;
    flex-wrap: wrap;
    width: 600px;
    background-color: #fff;
  }
  .tpl-item {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid #D9E0E7;
    &.item-1 .img-tpl {
      background: url("../../../assets/pc-tpl-01.png") no-repeat;
      background-size: 100%;
    }
    &.item-2 .img-tpl {
      background: url("../../../assets/pc-tpl-02.png") no-repeat;
      background-size: 100%;
    }
  }
  .img-tpl {
    width: 100%;
    height: 239px;
  }
  .text-tpl {
    text-align: center;
    margin: 5px 0;
    color: #ACB0B9;
    font-size: 12px;
  }
  .floor-body {
    width: 625px;
    height: 667px;
    overflow-y: scroll;
  }
  .floor-list {
    width: 600px;
    min-height: 667px;
    background-color: #fff;
  }
  .floor-item {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    .panel-handle {
      display: none;
      position: absolute;
      top: 0;
      right: -25px;
      .icon-handle {
        display: block;
        cursor: pointer;
        text-align: center;
      }
      .svg-icon {
        width: 25px;
        height: 25px;
        background-color: #fff;
      }
    }
    &:hover .panel-handle {
      display: block;
    }
  }
  .floor-item + .floor-item {
    margin-top: -1px;
  }
</style>
