import GradeEditor from './GradeEditor'
import RegionPick from './RegionPick'
import CategoryPicker from './CategoryPicker'
import ShopPicker from './ShopPicker'
import UE from './UE'

const components = {
  GradeEditor,
  RegionPick,
  CategoryPicker,
  ShopPicker
}

components.install = function(Vue) {
  Object.keys(components).forEach(key => {
    Vue.component(components[key].name, components[key])
  })
}

export default components

export {
  GradeEditor,
  RegionPick,
  CategoryPicker,
  ShopPicker,
  UE
}
