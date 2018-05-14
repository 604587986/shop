/**
 * Created by andste.cc@gmail.com on 2018/5/13.
 * 层级选择器，提供基础功能
 */

import Vue from 'vue'
import GradePicker from './src/main'

GradePicker.install = () => {
  Vue.component(GradePicker.name, GradePicker)
}

export default GradePicker
