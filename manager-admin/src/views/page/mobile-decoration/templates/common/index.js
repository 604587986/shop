/**
 * Created by andste.cc@gmail.com on 2018/5/17.
 */

import mixin from '../mixin'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  // 单列单张大图模块
  23: {
    mixins: [mixin],
    title: '单列单张大图模块',
    dataTpl: {
      tpl_id: 23,
      blockList: [
        { block_type: 'IMAGE', block_value: '', block_opt: '' }
      ]
    },
    template: `<div class="floor-layout tpl-23">
                 <div class="layout-main">
                   <div class="layout-item">
                       <floor-image :url="data.blockList[0].block_value"/>
                       <floor-mask @click="onClickMask(0)"/>
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
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' }
      ]
    },
    template: `<div class="floor-layout tpl-24">
                 <div class="layout-main">
                   <div class="left">
                     <div class="layout-item">
                       <floor-image :url="data.blockList[0].block_value"/>
                       <floor-mask @click="onClickMask(0)"/>
                     </div>
                   </div>
                   <div class="right">
                     <div class="layout-item top">
                       <floor-image :url="data.blockList[1].block_value"/>
                       <floor-mask @click="onClickMask(1)"/>
                     </div>
                     <div class="layout-item">
                       <floor-image :url="data.blockList[2].block_value"/>
                       <floor-mask @click="onClickMask(2)"/>
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
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' }
      ]
    },
    template: `<div class="floor-layout tpl-25">
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
               </div>`
  },
  // 三列单行图片模块
  26: {
    mixins: [mixin],
    title: '三列单行图片模块',
    dataTpl: {
      tpl_id: 26,
      blockList: [
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' }
      ]
    },
    template: `<div class="floor-layout tpl-26">
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
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' }
      ]
    },
    template: `<div class="floor-layout tpl-27">
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
               </div>`
  },
  // 轮播图模块
  28: {
    mixins: [mixin],
    title: '轮播图模块',
    dataTpl: {
      tpl_id: 28,
      blockList: [
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' }
      ]
    },
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          }
        }
      }
    },
    components: { swiper, swiperSlide },
    template: `<div class="floor-layout tpl-28">
                 <div class="layout-main">
                   <swiper :options="swiperOption">
                     <swiper-slide v-for="(block, index) in data.blockList" :key="index">
                       <div class="layout-item">
                         <floor-image :url="block.block_value"/>
                         <floor-mask :is-edit="isEdit" @click="onClickMask(index)"/>
                       </div>
                     </swiper-slide>
                     <div class="swiper-pagination" slot="pagination"></div>
                   </swiper>
                 </div>
               </div>`
  },
  // 四列单行图片模块
  29: {
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
    },
    template: `<div class="floor-layout tpl-29">
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
               </div>`
  },
  // 标题或间隔性模块
  30: {
    mixins: [mixin],
    title: '标题或间隔性模块',
    dataTpl: {
      tpl_id: 30,
      blockList: [
        { block_type: 'IMAGE', block_value: '', block_opt: '' }
      ]
    },
    template: `<div class="floor-layout tpl-30">
                 <div class="layout-main">
                   <div class="layout-item">
                     <floor-image :url="data.blockList[0].block_value"/>
                     <floor-mask @click="onClickMask(0)"/>
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
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' }
      ]
    },
    template: `<div class="floor-layout tpl-31">
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
               </div>`
  },
  // 左一右二竖排模板
  32: {
    mixins: [mixin],
    title: '左一右二竖排模板',
    dataTpl: {
      tpl_id: 32,
      blockList: [
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' }
      ]
    },
    template: `<div class="floor-layout tpl-32">
                 <div class="layout-main">
                   <div class="left">
                     <div class="layout-item">
                       <floor-image :url="data.blockList[0].block_value"/>
                       <floor-mask @click="onClickMask(0)"/>
                     </div>
                   </div>
                   <div class="right">
                     <div class="layout-item">
                       <floor-image :url="data.blockList[1].block_value"/>
                       <floor-mask @click="onClickMask(1)"/>
                     </div>
                     <div class="layout-item">
                       <floor-image :url="data.blockList[2].block_value"/>
                       <floor-mask @click="onClickMask(2)"/>
                     </div>
                   </div>
                 </div>
               </div>`
  },
  // 商品模块
  37: {
    mixins: [mixin],
    title: '商品模块',
    dataTpl: {
      tpl_id: 37,
      blockList: [
        { block_type: 'GOODS', block_value: '', block_opt: '' },
        { block_type: 'GOODS', block_value: '', block_opt: '' }
      ]
    },
    filters: {
      formatPrice(price) {
        if (!price) return ''
        return '￥' + String(Number(price).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    },
    template: `<div class="floor-layout tpl-37">
                 <div class="layout-main">
                   <div class="layout-item">
                     <div class="goods-item">
                       <div class="image-goods">
                         <img :src="data.blockList[0].block_value.goods_image">
                       </div>
                       <div class="name-goods">{{ data.blockList[0].block_value.goods_name }}</div>
                       <div class="price-goods">{{ data.blockList[0].block_value.goods_price | formatPrice }}</div>
                     </div>
                     <floor-mask @click="onClickMask(0)"/>
                   </div>
                   <div class="layout-item">
                     <div class="goods-item">
                       <div class="image-goods">
                         <img :src="data.blockList[1].block_value.goods_image">
                       </div>
                       <div class="name-goods">{{ data.blockList[1].block_value.goods_name }}</div>
                       <div class="price-goods">{{ data.blockList[1].block_value.goods_price | formatPrice }}</div>
                     </div>
                     <floor-mask @click="onClickMask(1)"/>
                   </div>
                 </div>
               </div>`
  },
  // 文本模块
  42: {
    mixins: [mixin],
    title: '文本模块',
    dataTpl: {
      tpl_id: 42,
      blockList: [
        { block_type: 'TEXT', block_value: '', block_opt: '' }
      ]
    },
    template: `<div class="floor-layout tpl-42">
                 <div class="layout-main">
                   <div class="layout-item">
                     <div>{{ data.blockList[0].block_value }}</div>
                     <floor-mask @click="onClickMask(0)"/>
                   </div>
                 </div>
               </div>`
  }
}
