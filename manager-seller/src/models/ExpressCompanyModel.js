/**
 * 物流公司模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ExpressCompanyModel extends DataModel {
  /** 物流公司ID */
  @ServerName('id')
  logistics_id

  /** 物流公司code */
  @ServerName('code')
  logistics_code

  /** 物流公司名称 */
  @ServerName('name')
  logistics_name

  /** 用于判断物流公司状态 如果存在则开启 不存在则关闭 */
  @ServerName('shop_id')
  shop_id

  /** 物流公司客户号 */
  @ServerName('customer_name')
  logistics_customer_name

  /** 物流公司电子面单密码 */
  @ServerName('customer_pwd')
  logistics_customer_pwd

  /** 是否支持电子面单1：支持 0：不支持 */
  @ServerName('is_waybill')
  is_waybill

  /** 快递鸟物流公司code */
  @ServerName('kdcode')
  kdcode
}
