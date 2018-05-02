/**
 * Created by Andste on 2018/5/2.
 */

import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
import uuidv1 from 'uuid/v1'

export default ({ store, isHMR }) => {
  const isClient = process.client
  if (isHMR || !isClient) return
  window.onNuxtReady(nuxt => [
    createPersistedState({
      getState() {
        let uuid = Cookies.get('uuid')
        if (!uuid) {
          uuid = uuidv1()
          Cookies.set('uuid', uuid)
        }
        return {
          uuid: uuid
        }
      }
    })(store)
  ])
}
