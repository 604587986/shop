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
  @ServerName('silde_id')
  shop_banner_id

  /** 店铺id */
  @ServerName('shop_id')
  shop_id

  /** 店铺幻灯片链接 */
  @ServerName('silde_url')
  shop_banner_link

  /** 店铺幻灯片图片 */
  @ServerName('img')
  shop_banner_image
}
