/**
 * 店铺幻灯模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ShopSlideModel extends DataModel {
  /** 店铺幻灯片id */
  @ServerName('banner_id')
  shop_banner_id

  /** 店铺幻灯片链接 */
  @ServerName('banner_link')
  shop_banner_link

  /** 店铺幻灯片图片 */
  @ServerName('banner_image')
  shop_banner_image
}
