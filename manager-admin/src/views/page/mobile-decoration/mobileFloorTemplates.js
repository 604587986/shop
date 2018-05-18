/**
 * Created by andste.cc@gmail.com on 2018/5/17.
 */

import Vue from 'vue'

/** mixin */
const mixin = {
  props: ['data'],
  data() {
    return {
      aa: 'bb'
    }
  },
  methods: {
    cc() {
      console.log('cc')
    }
  }
}

/** 遮罩 */
Vue.component('floor-mask', {
  functional: true,
  render: function(createElement, context) {
    const { click } = context.listeners
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

export default {
  // 单列单张大图模块
  23: {
    mixins: [mixin],
    template: `<div class="floor-layout tpl-23">
                 <div class="layout-main">
                   <div class="layout-item">
                     <floor-mask @click="cc"/>
                   </div>
                 </div>
               </div>`
  },
  // 左一右二图片模块
  24: {
    mixins: [mixin],
    template: `<div class="floor-layout tpl-24">
                 <div class="layout-main">
                   <div class="left">
                     <div class="layout-item">
                       <floor-mask @click="cc"/>
                     </div>
                   </div>
                   <div class="right">
                     <div class="layout-item top">
                       <floor-mask @click="cc"/>
                     </div>
                     <div class="layout-item">
                       <floor-mask @click="cc"/>
                     </div>
                   </div>
                 </div>
               </div>`
  },
  // 左二右一图片模块
  25: {
    mixins: [mixin],
    template: `<div class="floor-layout tpl-25">
                 <div class="layout-main">
                   <div class="left">
                     <div class="layout-item top">
                       <floor-mask @click="cc"/>
                     </div>
                     <div class="layout-item">
                       <floor-mask @click="cc"/>
                     </div>
                   </div>
                 <div class="right">
                     <div class="layout-item">
                       <floor-mask @click="cc"/>
                     </div>
                   </div>
                 </div>
               </div>`
  },
  // 三列单行图片模块
  26: {
    mixins: [mixin],
    template: `<div class="floor-layout">
                 <floor-mask @click="cc"/>
               </div>`
  },
  // 五列单行小图模块
  27: {
    mixins: [mixin],
    template: `<div class="floor-layout">27</div>`
  },
  // 焦点广告图模块
  28: {
    mixins: [mixin],
    template: `<div class="floor-layout">28</div>`
  },
  // 四列单行图片模块
  29: {
    mixins: [mixin],
    template: `<div class="floor-layout">29</div>`
  },
  // 标题或间隔性模块
  30: {
    mixins: [mixin],
    template: `<div class="floor-layout">30</div>`
  },
  // 四列单行小图模块
  31: {
    mixins: [mixin],
    template: `<div class="floor-layout">31</div>`
  },
  // 左一右二竖排模板
  32: {
    mixins: [mixin],
    template: `<div class="floor-layout">32</div>`
  },
  // 手动选择商品模块
  37: {
    mixins: [mixin],
    template: `<div class="floor-layout">37</div>`
  },
  // 文本模块
  42: {
    mixins: [mixin],
    template: `<div class="floor-layout">42</div>`
  }
}
