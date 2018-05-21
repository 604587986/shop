/**
 * Created by andste.cc@gmail.com on 2018/5/17.
 */

import mixin from '../mixin'

export default {
  // 单列单张大图模块
  23: {
    mixins: [mixin],
    title: '单列单张大图模块',
    dataTpl: {
      tpl_id: 23,
      blockList: [
        { block_type: 'IMAGE', block_value: '' }
      ]
    },
    template: `<div class="floor-layout tpl-23">
                 <div class="layout-main">
                   <div class="layout-item">
                       <floor-image :url="data.blockList[0].block_value"/>
                       <floor-mask @click="selectImg(0)"/>
                     </div>
                 </div>
               </div>`
  },
  // 左一右二图片模块
  24: {
    mixins: [mixin],
    title: '左一右二图片模块',
    dataTpl: {
      tpl_id: 24,
      blockList: [
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' }
      ]
    },
    template: `<div class="floor-layout tpl-24">
                 <div class="layout-main">
                   <div class="left">
                     <div class="layout-item">
                       <floor-image :url="data.blockList[0].block_value"/>
                       <floor-mask @click="selectImg(0)"/>
                     </div>
                   </div>
                   <div class="right">
                     <div class="layout-item top">
                       <floor-image :url="data.blockList[1].block_value"/>
                       <floor-mask @click="selectImg(1)"/>
                     </div>
                     <div class="layout-item">
                       <floor-image :url="data.blockList[2].block_value"/>
                       <floor-mask @click="selectImg(2)"/>
                     </div>
                   </div>
                 </div>
               </div>`
  },
  // 左二右一图片模块
  25: {
    mixins: [mixin],
    title: '左二右一图片模块',
    dataTpl: {
      tpl_id: 25,
      blockList: [
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' }
      ]
    },
    template: `<div class="floor-layout tpl-25">
                 <div class="layout-main">
                   <div class="left">
                     <div class="layout-item top">
                       <floor-image :url="data.blockList[0].block_value"/>
                       <floor-mask @click="selectImg(0)"/>
                     </div>
                     <div class="layout-item">
                       <floor-image :url="data.blockList[1].block_value"/>
                       <floor-mask @click="selectImg(1)"/>
                     </div>
                   </div>
                 <div class="right">
                     <div class="layout-item">
                       <floor-image :url="data.blockList[2].block_value"/>
                       <floor-mask @click="selectImg(2)"/>
                     </div>
                   </div>
                 </div>
               </div>`
  },
  // 三列单行图片模块
  26: {
    mixins: [mixin],
    title: '三列单行图片模块',
    dataTpl: {
      tpl_id: 26,
      blockList: [
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' }
      ]
    },
    template: `<div class="floor-layout tpl-26">
                 <div class="layout-main">
                   <div class="layout-item">
                     <floor-image :url="data.blockList[0].block_value"/>
                     <floor-mask @click="selectImg(0)"/>
                   </div>
                   <div class="layout-item">
                     <floor-image :url="data.blockList[1].block_value"/>
                     <floor-mask @click="selectImg(1)"/>
                   </div>
                   <div class="layout-item">
                     <floor-image :url="data.blockList[2].block_value"/>
                     <floor-mask @click="selectImg(2)"/>
                   </div>
                 </div>
               </div>`
  },
  // 五列单行小图模块
  27: {
    mixins: [mixin],
    title: '五列单行小图模块',
    dataTpl: {
      tpl_id: 27,
      blockList: [
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' }
      ]
    },
    template: `<div class="floor-layout tpl-27">
                 <div class="layout-main">
                   <div class="layout-item">
                     <floor-image :url="data.blockList[0].block_value"/>
                     <floor-mask @click="selectImg(0)"/>
                   </div>
                   <div class="layout-item">
                     <floor-image :url="data.blockList[1].block_value"/>
                     <floor-mask @click="selectImg(1)"/>
                   </div>
                   <div class="layout-item">
                     <floor-image :url="data.blockList[2].block_value"/>
                     <floor-mask @click="selectImg(2)"/>
                   </div>
                   <div class="layout-item">
                     <floor-image :url="data.blockList[3].block_value"/>
                     <floor-mask @click="selectImg(3)"/>
                   </div>
                   <div class="layout-item">
                     <floor-image :url="data.blockList[4].block_value"/>
                     <floor-mask @click="selectImg(4)"/>
                   </div>
                 </div>
               </div>`
  },
  // 焦点广告图模块
  28: {
    mixins: [mixin],
    title: '焦点广告图模块',
    dataTpl: {
      tpl_id: 28,
      blockList: [
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' }
      ]
    },
    template: `<div class="floor-layout">28</div>`
  },
  // 四列单行图片模块
  29: {
    mixins: [mixin],
    title: '四列单行图片模块',
    dataTpl: {
      tpl_id: 29,
      blockList: [
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' }
      ]
    },
    template: `<div class="floor-layout tpl-29">
                 <div class="layout-main">
                   <div class="layout-item">
                     <floor-image :url="data.blockList[0].block_value"/>
                     <floor-mask @click="selectImg(0)"/>
                   </div>
                   <div class="layout-item">
                     <floor-image :url="data.blockList[1].block_value"/>
                     <floor-mask @click="selectImg(1)"/>
                   </div>
                   <div class="layout-item">
                     <floor-image :url="data.blockList[2].block_value"/>
                     <floor-mask @click="selectImg(2)"/>
                   </div>
                   <div class="layout-item">
                     <floor-image :url="data.blockList[3].block_value"/>
                     <floor-mask @click="selectImg(3)"/>
                   </div>
                 </div>
               </div>`
  },
  // 标题或间隔性模块
  30: {
    mixins: [mixin],
    title: '标题或间隔性模块',
    dataTpl: {
      tpl_id: 30,
      blockList: [
        { block_type: 'IMAGE', block_value: '' }
      ]
    },
    template: `<div class="floor-layout tpl-30">
                 <div class="layout-main">
                   <div class="layout-item">
                     <floor-image :url="data.blockList[0].block_value"/>
                     <floor-mask @click="selectImg(0)"/>
                   </div>
                 </div>
               </div>`
  },
  // 四列单行小图模块
  31: {
    mixins: [mixin],
    title: '四列单行小图模块',
    dataTpl: {
      tpl_id: 31,
      blockList: [
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' }
      ]
    },
    template: `<div class="floor-layout tpl-31">
                 <div class="layout-main">
                   <div class="layout-item">
                     <floor-image :url="data.blockList[0].block_value"/>
                     <floor-mask @click="selectImg(0)"/>
                   </div>
                   <div class="layout-item">
                     <floor-image :url="data.blockList[1].block_value"/>
                     <floor-mask @click="selectImg(1)"/>
                   </div>
                   <div class="layout-item">
                     <floor-image :url="data.blockList[2].block_value"/>
                     <floor-mask @click="selectImg(2)"/>
                   </div>
                   <div class="layout-item">
                     <floor-image :url="data.blockList[3].block_value"/>
                     <floor-mask @click="selectImg(3)"/>
                   </div>
                 </div>
               </div>`
  },
  // 左一右二竖排模板
  32: {
    mixins: [mixin],
    title: '左一右二竖排模板',
    dataTpl: {
      tpl_id: 32,
      blockList: [
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' }
      ]
    },
    template: `<div class="floor-layout tpl-32">
                 <div class="layout-main">
                   <div class="left">
                     <div class="layout-item">
                       <floor-image :url="data.blockList[0].block_value"/>
                       <floor-mask @click="selectImg(0)"/>
                     </div>
                   </div>
                   <div class="right">
                     <div class="layout-item">
                       <floor-image :url="data.blockList[1].block_value"/>
                       <floor-mask @click="selectImg(1)"/>
                     </div>
                     <div class="layout-item">
                       <floor-image :url="data.blockList[2].block_value"/>
                       <floor-mask @click="selectImg(2)"/>
                     </div>
                   </div>
                 </div>
               </div>`
  },
  // 手动选择商品模块
  37: {
    mixins: [mixin],
    title: '手动选择商品模块',
    dataTpl: {
      tpl_id: 37,
      blockList: [
        { block_type: 'IMAGE', block_value: '' },
        { block_type: 'IMAGE', block_value: '' }
      ]
    },
    template: `<div class="floor-layout">37</div>`
  },
  // 文本模块
  42: {
    mixins: [mixin],
    title: '文本模块',
    dataTpl: {
      tpl_id: 42,
      blockList: [
        { block_type: 'TEXT', block_value: '' }
      ]
    },
    template: `<div class="floor-layout">
                 <div class="layout-main">
                   <div class="layout-item">
                     <floor-mask/>
                   </div>
                 </div>
               </div>`
  }
}
