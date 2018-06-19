/**
 * Created by andste.cc@gmail.com on 2018/5/17.
 */

import mixin from '../mixin'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  // 模块1
  1: {
    mixins: [mixin],
    title: '模块1',
    dataTpl: {
      tpl_id: 1,
      blockList: [
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' }
      ]
    },
    template: `<div class="floor-layout tpl-1">
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
  // 模块2
  2: {
    mixins: [mixin],
    title: '模块2',
    dataTpl: {
      tpl_id: 2,
      blockList: [
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' },
        { block_type: 'IMAGE', block_value: '', block_opt: '' }
      ]
    },
    template: `<div class="floor-layout tpl-1">
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
  }
}
