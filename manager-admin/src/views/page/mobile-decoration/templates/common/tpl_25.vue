<template>
  <div class="floor-layout tpl-25">
    <div class="layout-main">
      <div class="left">
        <div class="layout-item top">
          <floor-image :url="data.blockList[0].block_value"/>
          <floor-mask @click="onClickMask(0)"/>
        </div>
        <div class="layout-item">
          <floor-image :url="data.blockList[1].block_value"/>
          <floor-mask @click="onClickMask(1)"/>
        </div>
      </div>
      <div class="right">
        <div class="layout-item">
          <floor-image :url="data.blockList[2].block_value"/>
          <floor-mask @click="onClickMask(2)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '../mixin'

  export default {
    name: 'tpl_25',
    mixins: [mixin],
    title: '左二右一图片模块',
    dataTpl: {
      tpl_id: 25,
      blockList: [
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' }
      ]
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
