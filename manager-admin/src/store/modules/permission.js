import { asyncRouterMap, constantRouterMap } from '@/router'
import * as API_User from '@/api/login'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.rolse) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        API_User.getUserRolesPermissions().then(response => {
          let accessedRouters = filterRoleRouter(asyncRouterMap, response)
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        })
      })
    }
  }
}

/**
 * 递归筛选出有权限的路由
 * @param routers
 * @param names
 * @returns {Array}
 */
function filterRoleRouter(routers, names) {
  const _routers = []
  routers.forEach(item => {
    if (names.includes(item.name) || item.hidden) {
      if (item.children) {
        item.children = filterRoleRouter(item.children, names)
      }
      _routers.push(item)
    }
  })
  return _routers
}

export default permission
