<template>
  <div class="floor-layout tpl-29">
    <div class="layout-main">
      <div class="layout-item">
        <floor-image :url="data.blockList[0].block_value"/>
        <floor-mask @click="onClickMask(0)"/>
      </div>
      <div class="layout-item">
        <floor-image :url="data.blockList[1].block_value"/>
        <floor-mask @click="onClickMask(1)"/>
      </div>
      <div class="layout-item">
        <floor-image :url="data.blockList[2].block_value"/>
        <floor-mask @click="onClickMask(2)"/>
      </div>
      <div class="layout-item">
        <floor-image :url="data.blockList[3].block_value"/>
        <floor-mask @click="onClickMask(3)"/>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '../mixin'

  export default {
    name: 'tpl_29',
    mixins: [mixin],
    title: '四列单行图片模块',
    dataTpl: {
      tpl_id: 29,
      blockList: [
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' }
      ]
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
