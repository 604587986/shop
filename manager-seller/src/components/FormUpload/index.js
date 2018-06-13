import Vue from 'vue'
import FormUpload from './src/main'

FormUpload.install = () => {
  Vue.component(FormUpload.name, FormUpload)
}

export default FormUpload
