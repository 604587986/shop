/**
 * 店铺导航模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ShopNavModel extends DataModel {
  /** 导航id */
  @ServerName('id')
  nav_id

  /** 店铺id */
  @ServerName('shop_id')
  shop_id

  /** 排序 */
  @ServerName('sort')
  shop_nav_sort

  /** 导航名称 */
  @ServerName('name')
  shop_nav_name

  /** 是否显示 */
  @ServerName('disable')
  shop_nav_show

  /** URL */
  @ServerName('nav_url')
  shop_nav_url

  /** 是否新窗口打开 */
  @ServerName('target')
  open_new_blank
}
