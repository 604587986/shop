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
      <draggable v-model="floorList" :options="floorOptions" class="floor-list">
        <div
          v-for="item in floorList"
          :class="'item-' + item.tpl_id"
          v-html="item.tpl_content"
          class="floor-item"
        >
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import * as API_Floor from '@/api/floor'
  export default {
    name: 'mobileFloorManage',
    components: { draggable },
    data() {
      return {
        /** 模板列表 */
        tplList: [],
        /** 模板配置 */
        tplOptions: {
          group: {
            name: 'tplGroup',
            pull: 'clone',
            put: false
          },
          sort: false
        },
        /** 楼层列表 */
        floorList: [],
        /** 楼层配置 */
        floorOptions: {
          group: {
            name: 'tplGroup',
            put: true
          },
          sort: true
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
          this.tplList = response
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
    background-color: #fff;
    padding: 10px;
    min-height: 500px;
  }
  .draggable-box {
    display: flex;
    justify-content: center;
    width: 50%;
    &.floor { align-items: start }
  }
  .tpl-list {
    display: flex;
    flex-wrap: wrap;
    width: 122px * 3;
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
  .floor-list {
    width: 322px;
    height: auto;
    min-height: 500px;
  }
  .floor-item {
    width: 100%;
    min-height: 50px;
    border: 1px dashed #ccc;
    margin-bottom: -1px;
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
  }
</style>
