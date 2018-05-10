/**
 * 快递模板模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ExpressMouldModel extends DataModel {
  /** 快递模板ID */
  @ServerName('template_id')
  tpl_id

  /** 快递模板名称 */
  @ServerName('name')
  tpl_name

  /** 首重 */
  @ServerName('first_company')
  first_company

  /** 首重运费*/
  @ServerName('first_price')
  first_price

  /** 续重 */
  @ServerName('continued_company')
  continued_company

  /** 续重运费 */
  @ServerName('continued_price')
  continued_price

  /** 模板类型 */
  @ServerName('type')
  tpl_type

  /** 地区 */
  @ServerName('area')
  tpl_area

  /** 地区ID */
  @ServerName('area_id')
  tpl_area_id

  /** 地区json */
  @ServerName('area_json')
  tpl_area_json
}
