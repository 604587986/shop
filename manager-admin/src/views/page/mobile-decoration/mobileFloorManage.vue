<template>
  <div class="floor-container">
    <div class="draggable-box floor">
      <draggable v-model="tplList" :options="tplOptions" class="tpl-list">
        <div v-for="item in tplList" :class="'item-' + item.tpl_id" class="tpl-item">
          <div class="img-tpl"></div>
          <span class="text-tpl">{{ item.tpl_name }}</span>
        </div>
      </draggable>
    </div>
    <div class="draggable-box">
      <div class="floor-top"></div>
      <div class="floor-body">
        <draggable v-model="floorList" :options="floorOptions" class="floor-list">
          <div v-for="(item, index) in floorList" :class="'item-' + item.tpl_id" class="floor-item">
            <component :is="templates[item.tpl_id]" :data="item"></component>
            <div class="panel-handle">
              <span class="icon-handle handle-move"><svg-icon icon-class="list-move"/></span>
              <span class="icon-handle handle-delete" @click="floorList.splice(index, 1)"><svg-icon icon-class="delete"/></span>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import * as API_Floor from '@/api/floor'
  import templates from './mobileFloorTemplates'
  export default {
    name: 'mobileFloorManage',
    components: { draggable },
    data() {
      return {
        templates,
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
        }
      }
    },
    mounted() {
      this.GET_FloorTplList()
    },
    methods: {
      /** 获取模板列表 */
      GET_FloorTplList() {
        API_Floor.getTpllist('mobile').then(response => {
          this.tplList = response.map(item => {
            item.isEdit = true
            return item
          })
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
    &.floor { align-items: start }
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
    min-height: 50px;
    box-sizing: border-box;
    &.item-23 { height: 130px }
    &.item-24 { height: 130px }
    &.item-25 { height: 130px }
    &.item-26 { height: 130px }
    &.item-27 { height: 64px }
    &.item-28 { height: 150px }
    &.item-29 { height: 105px }
    &.item-30 { height: 40px }
    &.item-31 { height: 65px }
    &.item-32 { height: 125px }
    &.item-37 { height: 220px }
    &.item-42 { height: 40px }
    .panel-handle {
      display: none;
      position: absolute;
      top: 0;
      right: -27px;
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
