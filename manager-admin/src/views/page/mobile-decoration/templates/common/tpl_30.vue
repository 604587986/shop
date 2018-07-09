<template>
  <div class="floor-layout tpl-30">
    <div class="layout-main">
      <div class="layout-item">
        <floor-image :url="data.blockList[0].block_value"/>
        <floor-mask @click="onClickMask(0)"/>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '../mixin'

  export default {
    name: 'tpl_30',
    mixins: [mixin],
    title: '标题或间隔性模块',
    dataTpl: {
      tpl_id: 30,
      blockList: [
        { block_type: 'IMAGE', block_value: '', block_opt: '' }
      ]
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
