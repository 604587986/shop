<template>
  <div class="floor-layout tpl-42">
    <div class="layout-main">
      <div class="layout-item">
        <div>{{ data.blockList[0].block_value }}</div>
        <floor-mask @click="onClickMask(0)"/>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '../mixin'

  export default {
    name: 'tpl_42',
    mixins: [mixin],
    title: '文本模块',
    dataTpl: {
      tpl_id: 42,
      blockList: [
        { block_type: 'TEXT', block_value: '', block_opt: '' }
      ]
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
