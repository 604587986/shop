import GradeEditor from './GradeEditor'
import ShopPicker from './ShopPicker'
import UE from './UE'

const components = {
  GradeEditor,
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
  ShopPicker,
  UE
}
