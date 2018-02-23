/**
 * 文章相关模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

/** 文章模型 */
export class Article extends DataModel {
  /** 添加时间 */
  @ServerName('add_time')
  create_time

  /** 文章模型简述 */
  @ServerName('brief')
  brief

  /** 表名 */
  @ServerName('english_name')
  table_name

  /** 模型名称 */
  @ServerName('china_name')
  name

  /** if_audit */
  @ServerName('if_audit')
  if_audit

  /** is_unlock */
  @ServerName('is_unlock')
  is_unlock

  /** 模型ID */
  @ServerName('model_id')
  id

  /** project_name */
  @ServerName('project_name')
  project_name
}

/** 文章字段 */
export class ArticleField extends DataModel {
  /** 添加时间 */
  @ServerName('add_time')
  create_time

  /** 字段名称 */
  @ServerName('china_name')
  name

  /** data_size */
  @ServerName('data_size')
  data_size

  /** dict_id */
  @ServerName('dict_id')

  /** 字段名称 */
  @ServerName('english_name')
  field_name

  /** 字段ID */
  @ServerName('field_id')
  id

  /** inputHtml */
  @ServerName('inputHtml')
  inputHtml

  /** is_show */
  @ServerName('is_show')
  is_show

  /** is_validate */
  @ServerName('is_validate')
  is_validate

  /** 模型ID */
  @ServerName('model_id')
  model_id

  /** save_value */
  @ServerName('save_value')
  save_value

  /** show_form */
  @ServerName('show_form')
  show_form

  /** show_value */
  @ServerName('show_value')
  show_value

  /** 排序 */
  @ServerName('taxis')
  sort
}
