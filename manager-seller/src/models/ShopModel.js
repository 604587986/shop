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

export default class ShopModel extends DataModel {
  /** 货品预警数量 */
  @ServerName('goods_warning_count')
  goods_warning_count

  /** 法人身份证 */
  @ServerName('legal_id')
  legal_id

  /** 联系姓名 */
  @ServerName('link_name')
  link_name

  /** 联系电话 */
  @ServerName('link_phone')
  link_phone

  /** 店铺所在地详细地址 */
  @ServerName('shop_add')
  shop_add

  /** 店铺横幅 */
  @ServerName('shop_banner')
  shop_banner

  /** 店铺ID */
  @ServerName('shop_id')
  shop_id

  /** 店铺等级 */
  // @ServerName('shop_level')
  // shop_level

  /** 店铺LOGO */
  @ServerName('shop_logo')
  shop_logo

  /** 店铺名称 */
  @ServerName('shop_name')
  shop_name

  /** 店铺简介 */
  @ServerName('shop_desc')
  shop_desc

  /** 店铺联系QQ */
  @ServerName('shop_qq')
  shop_qq

  /** 店铺所在地区 */
  @ServerName('shop_region')
  shop_region

  /** 店铺所在地区ID */
  @ServerName('shop_region_id')
  shop_region_id

  /** 店铺所在省份 */
  @ServerName('shop_province')
  shop_province

  /** 店铺所在省份ID */
  @ServerName('shop_province_id')
  shop_province_id

  /** 店铺所在城市 */
  @ServerName('shop_city')
  shop_city

  /** 店铺所在城市ID */
  @ServerName('shop_city_id')
  shop_city_id

  /** 店铺所在县 */
  @ServerName('shop_county')
  shop_county

  /** 店铺所在县ID */
  @ServerName('shop_county_id')
  shop_county_id

  /** 店铺所在乡镇 */
  @ServerName('shop_town')
  shop_town

  /** 店铺所在乡镇ID */
  @ServerName('shop_town_id')
  shop_town_id
}
