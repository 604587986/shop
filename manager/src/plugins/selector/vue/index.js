import AreaSelectorDialog from './AreaSelectorDialog'
import GoodsSelectorDialog from './GoodsSelectorDialog'
import GoodsSelectorDialogWithPanel from './GoodsSelectorDialogWithPanel'
import SkuEditor from './SkuEditor'
import SkuRender from './SkuRender'
import TextSelectorDialog from './TextSelectorDialog'

export default {
  install: Vue => {
    Vue.component(`En${AreaSelectorDialog.name}`, AreaSelectorDialog)
    Vue.component(`En${GoodsSelectorDialog.name}`, GoodsSelectorDialog)
    Vue.component(
      `En${GoodsSelectorDialogWithPanel.name}`,
      GoodsSelectorDialogWithPanel
    )
    Vue.component(`En${SkuEditor.name}`, SkuEditor)
    Vue.component(`En${SkuRender.name}`, SkuRender)
    Vue.component(`En${TextSelectorDialog.name}`, TextSelectorDialog)
  }
}
