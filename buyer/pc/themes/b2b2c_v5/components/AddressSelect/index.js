import Vue from 'vue'
import AddressSelect from './main'

AddressSelect.install = () => {
  Vue.component(AddressSelect.name, AddressSelect)
}

export default AddressSelect
