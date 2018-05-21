/**
 * Created by andste.cc@gmail.com on 2018/5/18.
 * 手机楼层公共组件
 */

import Vue from 'vue'

/** 遮罩 */
Vue.component('floor-mask', {
  functional: true,
  render: function(createElement, context) {
    const { click = () => {} } = context.listeners
    return createElement(
      'div',
      { class: 'mask-floor' },
      [
        createElement(
          'div',
          { class: 'mask-bg-floor' },
          [
            createElement(
              'button',
              { type: 'button', class: 'mask-btn-floor', on: { click }},
              [createElement('svg-icon', { props: { 'icon-class': 'pen-leather' }}), '编辑']
            )
          ]
        )
      ]
    )
  }
})

/** 楼层图片【如果链接为空，则显示占位图】 */
Vue.component('floor-image', {
  props: ['url'],
  template: `<div class="layout-image">
               <img v-if="url" :src="url">
               <div v-else class="no-image"></div>
             </div>`
})
