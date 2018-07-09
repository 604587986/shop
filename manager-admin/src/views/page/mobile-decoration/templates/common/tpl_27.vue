<template>
  <div class="floor-layout tpl-27">
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
      <div class="layout-item">
        <floor-image :url="data.blockList[4].block_value"/>
        <floor-mask @click="onClickMask(4)"/>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '../mixin'

  export default {
    name: 'tpl_27',
    mixins: [mixin],
    title: '五列单行小图模块',
    dataTpl: {
      tpl_id: 27,
      blockList: [
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
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
