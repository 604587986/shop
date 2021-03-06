/**
 * 站点鉴权
 * @param store
 * @param redirect
 * @param route
 * @returns {*}
 */
export default function ({ store, error }) {
  if (store.getters.site.siteon === 0) {
    return error({ statusCode: 503, message: '站点已关闭' })
  }
}
