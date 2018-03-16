/**
 * 商品分类模型
 */
import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class GoodsCategoryModel extends DataModel {
  /** 商品分类D */
  @ServerName('category_id')
  category_id

  /** 商品分类名称 */
  @ServerName('category_name')
  category_name

  /** 商品分类顺序 */
  @ServerName('sort')
  sort

  /** 商品分类显示 */
  @ServerName('is_show')
  is_show
}

