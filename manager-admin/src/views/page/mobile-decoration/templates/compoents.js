/**
 * Created by andste.cc@gmail.com on 2018/5/18.
 * 手机楼层公共组件
 */

import Vue from 'vue'

/** 遮罩 */
Vue.component('floor-mask', {
  props: ['isEdit'],
  template: `<div v-if="isEdit === undefined ? $parent.isEdit : isEdit" class="mask-floor" @click="$emit('click')">
               <div class="mask-bg-floor">
                 <button type="button" class="mask-btn-floor">
                   <svg-icon icon-class="pen-leather"></svg-icon>编辑
                 </button>
               </div>
             </div>`
})

/** 楼层图片【如果链接为空，则显示占位图】 */
Vue.component('floor-image', {
  props: ['url'],
  template: `<div class="layout-image">
               <img v-if="url" :src="url">
               <div v-else-if="$parent.isEdit" class="no-image"></div>
             </div>`
})
