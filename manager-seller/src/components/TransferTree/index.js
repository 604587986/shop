import Vue from 'vue'
import TransferTree from './TransferTree'

TransferTree.install = () => {
  Vue.component(TransferTree.name, TransferTree)
}

export default TransferTree
