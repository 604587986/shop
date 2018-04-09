/**
 * 店铺设置模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ShopSettingsModel extends DataModel {
  /** 店铺id */
  @ServerName('shop_id')
  shop_id

  /** 身份证号 */
  @ServerName('card_id')
  card_id

  /** 店铺地址 */
  @ServerName('shop_address')
  shop_address

  /** 详细地址 */
  @ServerName('details_address')
  details_address

  /** 联系电话 */
  @ServerName('shop_phone')
  shop_phone

  /** QQ */
  @ServerName('shop_qq')
  shop_qq

  /** 店铺简介 */
  @ServerName('shop_intro')
  shop_intro

  /** 店铺logo */
  @ServerName('shop_logo')
  shop_logo

  /** 店铺横幅 */
  @ServerName('shop_banner')
  shop_banner
}
