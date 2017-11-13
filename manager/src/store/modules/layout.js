import * as types from '../mutation-types'
import NotFound from '@/components/404.vue'

/** initial state */
const _state = {
  curTabName: '0',
  tabIndex: 0,
  tabs: [],
  isCollapse: false,
  mainWidth: { width: 'calc(100% - 200px)', left: '200px' },
  sidebarWidth: { width: '200px' }
}

/** getters */
const getters = {
  tabs: state => state.tabs,
  /** 返回当前tab名称 */
  currentTabName: state => state.curTabName,
  /** 返回当前tabs */
  currentTabs: state => state.tabs,
  /** 返回sidebar当前展开状态 */
  isCollapse: state => state.isCollapse,
  /** 返回宽度 */
  mainWidth: state => state.mainWidth,
  /** 返回侧边栏宽度 */
  sidebarWidth: state => state.sidebarWidth
}

/** actions */
const actions = {
  /** 新建一个Tab */
  layoutNewTab: ({ commit }, props) => {
    commit(types.LAYOUT_NEW_TAB, props)
  },
  /** 关闭一个Tab */
  layoutCloseTab: ({ commit }, tabName) => {
    commit(types.LAYOUT_CLOSE_TAB, tabName)
  },
  /** 关闭当前Tab */
  layoutCloseCurrentTab: ({ commit }) => {
    commit(types.LAYOUT_CLOSE_CURRENT_TAB)
  },
  /** 关闭其它Tab */
  layoutCloseOtherTab: ({ commit }) => {
    commit(types.LAYOUT_CLOSE_OTHER_TAB)
  },
  /** 关闭全部Tab */
  layoutCloseAllTab: ({ commit }) => {
    commit(types.LAYOUT_CLOSE_ALL_TAB)
  },
  /** 展开或收起sidebar */
  layoutSidebarCollapse: ({ commit }) => {
    commit(types.LAYOUT_COLLASPE_SIDEBAR)
  }
}

/** mutations */
const mutations = {
  /**
   * 新建一个Tab
   * @param state
   * @param newTab
   */
  [types.LAYOUT_NEW_TAB](state, newTab) {
    const { title: _title, name: _name, component: _component } = newTab
    if (typeof _name !== 'string') throw new Error('...layoutNewTab no name!')
    const _index = findTabIndex(state, _name)
    // 如果没有找到对应的tab，添加一个
    if (_index === -1) {
      ++state.tabIndex
      const { tabs } = state
      if (!_title) newTab.title = '没有标题'
      if (!_component) newTab.component = NotFound
      state.tabs = [...tabs, newTab]
      state.curTabName = _name
    } else {
      //  ..swtch to this tab
      state.curTabName = _name
    }
  },
  /**
   * 关闭一个Tab
   * @param state
   * @param tabName
   */
  [types.LAYOUT_CLOSE_TAB](state, tabName) {
    closeTabByTabNames(state, tabName)
  },
  /**
   * 关闭当前Tab
   * @param state
   */
  [types.LAYOUT_CLOSE_CURRENT_TAB](state) {
    closeTabByTabNames(state, state.curTabName)
  },
  /**
   * 关闭其它Tab
   * @param state
   */
  [types.LAYOUT_CLOSE_OTHER_TAB](state) {
    const { tabs, curTabName } = state
    const _temp = []
    tabs.forEach(item => {
      if (item.name !== curTabName) _temp.push(item.name)
    })
    closeTabByTabNames(state, _temp)
  },
  /**
   * 关闭全部Tab
   * @param state
   */
  [types.LAYOUT_CLOSE_ALL_TAB](state) {
    closeTabByTabNames(state, state.tabs.map(item => item.name))
  },
  /**
   * 展开或收起sidebar
   * @param state
   * @param collapse
   */
  [types.LAYOUT_COLLASPE_SIDEBAR](state) {
    state.isCollapse = !state.isCollapse
    state.mainWidth = state.isCollapse
      ? { width: 'calc(100% - 64px)', left: '64px' }
      : { width: 'calc(100% - 200px)', left: '200px' }
    state.sidebarWidth = state.isCollapse
      ? { width: '64px' }
      : { width: '200px' }
  }
}

/**
 * 返回根据name查找tab的index
 * @param state
 * @param tabName
 * @returns {number}
 */
const findTabIndex = (state, tabName) => {
  return state.tabs.findIndex(item => item.name === tabName)
}

/**
 * 关闭Tab公共方法
 * @param state
 * @param tabNames
 */
const closeTabByTabNames = (state, tabNames) => {
  const { tabs } = state
  if (!Array.isArray(tabNames)) {
    tabNames = [tabNames]
  }
  tabNames.forEach(tabName => {
    if (tabName === '0') return
    const _index = findTabIndex(state, tabName)
    if (_index !== -1) {
      let activeName = state.curTabName
      if (activeName === tabName) {
        tabs.forEach((tab, index) => {
          if (tab.name === tabName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      tabs.splice(_index, 1)
      state.curTabName = activeName
    }
  })
  state.tabs = [...tabs]
}

/** export */
export default {
  state: _state,
  getters,
  actions,
  mutations
}
