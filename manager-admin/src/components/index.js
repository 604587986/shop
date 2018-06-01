import GradeEditor from './GradeEditor'
import CategoryPicker from './CategoryPicker'
import ShopPicker from './ShopPicker'
import UE from './UE'

const components = {
  GradeEditor,
  CategoryPicker,
  ShopPicker
}

components.install = function(Vue) {
  Object.keys(components).forEach(key => {
    key !== 'install' && Vue.component(components[key].name, components[key])
  })
}

export default components

export {
  GradeEditor,
  CategoryPicker,
  ShopPicker,
  UE
}
