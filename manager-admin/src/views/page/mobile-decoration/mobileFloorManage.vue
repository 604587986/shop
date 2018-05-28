<template>
  <div>
    <div class="floor-container">
      <div class="draggable-box floor">
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
      :default-data="defaultData"
      :operation="operation"
      @close="dialogImageShow = false"
      @confirm="handleImagePickerConfirm"
      :limit="10"
      multiple
    />
    <!--api="http://yiqisi.s1.natapp.cc/seller-api/goods"-->
    <en-goods-picker
      :show="dialogGoodsShow"
      @close="dialogGoodsShow = false"
    />
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import { ImagePicker, GoodsPicker } from '~/ui-components'
  import * as API_Floor from '@/api/floor'
  import templates, { templateArray } from './templates'
  export default {
    name: 'mobileFloorManage',
    components: {
      draggable,
      [ImagePicker.name]: ImagePicker,
      [GoodsPicker.name]: GoodsPicker
    },
    data() {
      return {
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
        defaultData: '',
        /** 自定义操作参数 */
        operation: [{
          label: '链接类型',
          name: 'opt_type',
          type: 'select',
          options: [
            { text: '无操作', value: 'none' },
            { text: '连接地址', value: 'link' },
            { text: '关键字', value: 'keyword' },
            { text: '商品序号', value: 'goods-sn' },
            { text: '店铺编号', value: 'shop-sn' },
            { text: '商品分类', value: 'goods-cat' }
          ],
          value: 'none'
        }, {
          label: '链接值',
          name: 'opt_value'
        }, {
          label: '图片描述',
          name: 'opt_detail'
        }]
      }
    },
    mounted() {
      this.GET_FloorList()
    },
    methods: {
      handleEditFloor(index, target, targetIndex) {
        const type = target.blockList[targetIndex].block_type
        this.editOptions = {
          index,
          target,
          targetIndex
        }
        const blockData = JSON.parse(JSON.stringify(target.blockList[targetIndex]))
        if (type === 'IMAGE') {
          this.defaultData = blockData.block_value ? [{
            url: blockData.block_value,
            opt: blockData.block_opt
          }] : null
          this.dialogImageShow = true
        } else if (type === 'GOODS') {
          const goods = {
            goods_id: 123,
            goods_name: 'vivo X9s 4GB+64GB 玫瑰金 移动联通电信4G拍照手机 双卡双待',
            goods_price: 2399.99,
            goods_image: 'http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/4A10ED8667CA49C7BCAE9486DF21D4AC.jpg_300x300'
          }
          this.dialogGoodsShow = true
          const { index, target, targetIndex } = this.editOptions
          target.blockList[targetIndex].block_value = goods
          this.$set(this.floorList, index, target)
        } else if (type === 'TEXT') {
          this.$prompt('请输入文本内容', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /.+/,
            inputErrorMessage: '文本不能为空！'
          }).then(({ value }) => {
            console.log(value)
            // this.data.blockList[0].block_value = value
          }).catch(() => {})
          console.log('文本模块')
        } else if (type === 'BRAND') {
          console.log('品牌模块')
        }
      },
      /** 图片上传组件确认 */
      handleImagePickerConfirm(fileList) {
        const file = fileList[0]
        let opt = file ? file.operation : {}
        let url = file ? file.response.url : ''
        this.dialogImageShow = false
        const { index, target, targetIndex } = this.editOptions
        target.blockList[targetIndex].block_value = url
        target.blockList[targetIndex].block_opt = opt
        this.$set(this.floorList, index, target)
      },
      /** 获取模板列表 */
      GET_FloorList() {
        API_Floor.getFloorList('mobile').then(response => {
          this.floorList = response
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../../assets/floor-mobile";
  .floor-container {
    display: flex;
    justify-content: space-around;
    background-color: #E5E7EA;
    padding: 10px;
    min-height: 500px;
  }
  .draggable-box {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 50%;
    &.floor { align-items: center }
  }
  .tpl-list {
    display: flex;
    flex-wrap: wrap;
    width: 122px * 3;
    background-color: #fff;
  }
  .tpl-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 122px;
    height: 122px;
    box-sizing: border-box;
    border: 1px solid #D9E0E7;
    &.item-23 .img-tpl { background-position: -180px 0 }
    &.item-24 .img-tpl { background-position: -240px 0 }
    &.item-25 .img-tpl { background-position: -300px 0 }
    &.item-26 .img-tpl { background-position: -360px 0 }
    &.item-27 .img-tpl { background-position: -600px 0 }
    &.item-28 .img-tpl { background-position: 0 0 }
    &.item-29 .img-tpl { background-position: -720px 0 }
    &.item-30 .img-tpl { background-position: -120px 0 }
    &.item-31 .img-tpl { background-position: -720px 0 }
    &.item-32 .img-tpl { background-position: -660px 0 }
    &.item-34 .img-tpl { background-position: -360px 0 }
    &.item-37 .img-tpl { background-position: -480px 0 }
    &.item-42 .img-tpl { background-position: -540px 0 }
  }
  .img-tpl {
    width: 50px;
    height: 50px;
    background: url("../../../assets/icons-mobile-template.png") no-repeat;
  }
  .text-tpl {
    margin-top: 10px;
    color: #ACB0B9;
    font-size: 12px;
  }
  .floor-top {
    width: 322px;
    height: 24px;
    background: url("../../../assets/icons-mobile-template.png") no-repeat -30px -100px;
  }
  .floor-body {
    width: 375px;
    height: 667px - 24px;
    overflow-y: scroll;
  }
  .floor-list {
    width: 322px;
    min-height: 667px - 24px;
    background-color: #fff;
  }
  .floor-item {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    &.item-23 { height: 130px }
    &.item-24 { height: 130px }
    &.item-25 { height: 130px }
    &.item-26 { height: 130px }
    &.item-27 { height: 64px }
    &.item-28 { height: 150px }
    &.item-29 { height: 105px }
    &.item-30 { height: 40px }
    &.item-31 { height: 80px }
    &.item-32 { height: 125px }
    &.item-37 { height: 220px }
    &.item-42 { height: 40px }
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
