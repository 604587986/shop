/**
 * 商城联系方式模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class BrandModel extends DataModel {
  /** 创建时间 */
  @ServerName('add_time')
  create_time

  /** 文章分类ID */
  @ServerName('cat_id')
  category_id

  /** 文章分类名称 */
  @ServerName('cat_name')
  category_name

  /** 文章内容 */
  @ServerName('content')
  content

  /** 文章ID */
  @ServerName('id')
  id

  /** 文章图片 */
  @ServerName('image')
  image

  /** 上一次更改时间 */
  @ServerName('lastmodified')
  last_modified

  /** 文章页面标题 */
  @ServerName('page_title')
  page_title

  /** 导航码 */
  @ServerName('site_code')
  site_code

  /** 排序 */
  @ServerName('sort')
  sort

  /** 文章标题 */
  @ServerName('title')
  title
}
