/**
 * 路由鉴权
 * @param store
 * @param redirect
 * @param route
 * @returns {*}
 */
export default function ({ store, redirect, route }) {
  if (!store.state.user.accessToken) {
    return redirect(`/login?forward=${route.fullPath}`)
  }
}
