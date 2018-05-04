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
  // /** 银行开户名 */
  // @ServerName('bank_account_name')
  // bank_account_name
  //
  // /** 开户银行所在市 */
  // @ServerName('bank_city')
  // bank_city
  //
  // /** 开户银行所在市id */
  // @ServerName('bank_city_id')
  // bank_city_id
  //
  // /** 开户银行许可证电子版 */
  // @ServerName('bank_img')
  // bank_img
  //
  // /** 开户银行支行名称 */
  // @ServerName('bank_name')
  // bank_name

  /** 店铺id */
  @ServerName('shop_id')
  shop_id

  /** 身份证号 */
  @ServerName('legal_id')
  legal_id

  /** 店铺所在省 */
  @ServerName('shop_province')
  shop_province

  /** 店铺所在省id */
  @ServerName('shop_province_id')
  shop_province_id

  /** 店铺所在市 */
  @ServerName('shop_city')
  shop_city

  /** 店铺所在市id */
  @ServerName('shop_city_id')
  shop_city_id

  /** 店铺所在县 */
  @ServerName('shop_region')
  shop_region

  /** 店铺所在县id */
  @ServerName('shop_region_id')
  shop_region_id

  /** 店铺所在乡镇 */
  @ServerName('shop_town')
  shop_town

  /** 店铺所在乡镇id */
  @ServerName('shop_town_id')
  shop_town_id

  /** 详细地址 */
  @ServerName('shop_add')
  shop_add

  /** 联系电话 */
  @ServerName('link_phone')
  link_phone

  /** QQ */
  @ServerName('shop_qq')
  shop_qq

  /** 店铺简介 */
  @ServerName('shop_desc')
  shop_desc

  /** 店铺logo */
  @ServerName('shop_logo')
  shop_logo

  /** 店铺横幅 */
  @ServerName('shop_banner')
  shop_banner

  /** 预警货品数量 */
  @ServerName('goods_warning_count')
  stock_warning_num
}
