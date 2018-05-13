<template>
  <div :id="'grade-picker-' + _uid" class="grade-picker">
    <div v-for="(column, columnIdnex) in data" class="column" :style="columnWdith">
      <div class="inner-column">
        <div
          v-for="(item, itemIndex) in column"
          :key="item.$id"
          v-show="!item.hidden"
          @click="handleClickItem(item, itemIndex, columnIdnex)"
          :class="['item', item.$active && 'active']">
          <div class="text-item">{{ item.text }}</div>
          <div class="btns-item">
            <div class="inner-btns">
              <a
                v-for="(btn, btnIndex) in btns"
                :style="{color: btn.color || '#0a89c7'}"
                @click="handleClickItemBtn(item, btn, btnIndex)"
                href="javascript:;"
              >{{ btn.text }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from './mixin'
  export default {
    name: 'GradePicker',
    mixins: [mixin]
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "./styles";
</style>
