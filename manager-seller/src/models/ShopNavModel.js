/**
 * 店铺模型
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
  /** 排序 */
  @ServerName('sort')
  shop_nav_sort

  /** 导航名称 */
  @ServerName('nav_name')
  shop_nav_name

  /** 是否显示 */
  @ServerName('show')
  shop_nav_show
}
