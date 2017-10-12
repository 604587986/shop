import * as types from './mutation-types'

// 新建一个Tab
export const layoutNewTab = ({ commit }, props) => {
  commit(types.LAYOUT_NEW_TAB, props)
}

// 关闭一个Tab
export const layoutCloseTab = ({ commit }, tabName) => {
  commit(types.LAYOUT_CLOSE_TAB, tabName)
}

// 关闭当前Tab
export const layoutCloseCurrentTab = ({ commit }) => {
  commit(types.LAYOUT_CLOSE_CURRENT_TAB)
}

// 关闭其它Tab
export const layoutCloseOtherTab = ({ commit }) => {
  commit(types.LAYOUT_CLOSE_OTHER_TAB)
}

// 关闭全部Tab
export const layoutCloseAllTab = ({ commit }) => {
  commit(types.LAYOUT_CLOSE_ALL_TAB)
}
