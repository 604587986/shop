/**
 * 快递公司模型
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
  /** 快递公司代码 */
  @ServerName('code')
  code

  /** 备注名称 */
  @ServerName('customer_name')
  customer_name

  /** 备注密码 */
  @ServerName('customer_pwd')
  customer_pwd

  /** 快递公司ID */
  @ServerName('id')
  id

  /** 是否支持电子面单 */
  @ServerName('is_waybill')
  support_waybill

  /** 快递鸟代码 */
  @ServerName('kdcode')
  kd_code

  /** 快递公司名称 */
  @ServerName('name')
  name
  // Andste_TODO 2018/5/14: 模型未适配
}
