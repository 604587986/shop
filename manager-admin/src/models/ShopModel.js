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
  /** 银行开户名 */
  @ServerName('bank_account_name')
  bank_account_name

  /** 银行所在城市 */
  @ServerName('bank_city')
  bank_city

  /** 银行所在城市ID */
  @ServerName('bank_city_id')
  bank_city_id

  /** 开户银行许可证图片 */
  @ServerName('bank_img')
  bank_img

  /** 银行名称 [开户银行支行名称] */
  @ServerName('bank_name')
  bank_name

  /** 银行账号 */
  @ServerName('bank_number')
  bank_number

  /** 银行所在省份 */
  @ServerName('bank_province')
  bank_province

  /** 银行所在省份ID */
  @ServerName('bank_province_id')
  bank_province_id

  /** 银行所在地区 */
  @ServerName('bank_region')
  bank_region

  /** 银行所在地区ID */
  @ServerName('bank_region_id')
  bank_region_id

  /** 银行所在乡镇 */
  @ServerName('bank_town')
  bank_town

  /** 银行所在乡镇ID */
  @ServerName('bank_town_id')
  bank_town_id

  /** 组织机构代码证图片 */
  @ServerName('code_img')
  code_img

  /**  */
  @ServerName('compant_address')
  compant_address

  /**  */
  @ServerName('compant_email')
  compant_email

  /**  */
  @ServerName('compant_phone')
  compant_phone

  /**  */
  @ServerName('company_name')
  company_name

  /**  */
  @ServerName('employee_num')
  employee_num

  /** 公司成立时间 */
  @ServerName('establish_date')
  establish_date

  /** 店铺经营分类 */
  @ServerName('goods_management_category')
  goods_management_category

  /**  */
  @ServerName('goods_num')
  goods_num

  /**  */
  @ServerName('goods_warning_count')
  goods_warning_count

  /**  */
  @ServerName('id')
  id

  /** 法定代表人省份证号 */
  @ServerName('legal_id')
  legal_id

  /** 法人身份证图片 */
  @ServerName('legal_img')
  legal_img

  /** 法定代表人名字 */
  @ServerName('legal_name')
  legal_name

  /** 营业执照有效期 [结束] */
  @ServerName('licence_end')
  licence_end

  /** 营业执照图片 */
  @ServerName('licence_img')
  licence_img

  /** 营业执照有效期 [开始] */
  @ServerName('licence_start')
  licence_start

  /** 营业执照所在地详细地址 */
  @ServerName('license_add')
  license_address

  /**  */
  @ServerName('license_city')
  license_city

  /**  */
  @ServerName('license_city_id')
  license_city_id

  /** 营业执照编号 */
  @ServerName('license_num')
  license_num

  /** 营业执照所在省份 */
  @ServerName('license_province')
  license_province

  /** 营业执照所在省份ID */
  @ServerName('license_province_id')
  license_province_id

  /** 营业执照所在地区 */
  @ServerName('license_region')
  license_region

  /** 营业执照所在地区ID */
  @ServerName('license_region_id')
  license_region_id

  /** 营业执照所在乡镇 */
  @ServerName('license_town')
  license_town

  /** 营业执照所在乡镇ID */
  @ServerName('license_town_id')
  license_town_id

  /**  */
  @ServerName('link_name')
  link_name

  /**  */
  @ServerName('link_phone')
  link_phone

  /**  */
  @ServerName('member_id')
  member_id

  /**  */
  @ServerName('member_name')
  member_name

  /**  */
  @ServerName('name_auth')
  name_auth

  /** 组织机构代码 */
  @ServerName('organization_code')
  organization_code

  /**  */
  @ServerName('reg_monety')
  reg_monety

  /** 法定经营范围 */
  @ServerName('scope')
  scope

  /** 店铺所在地详细地址 */
  @ServerName('shop_add')
  shop_addr

  /**  */
  @ServerName('shop_auth')
  shop_auth

  /** 店铺横幅 */
  @ServerName('shop_banner')
  shop_banner

  /** 店铺所在城市 */
  @ServerName('shop_city')
  shop_city

  /** 店铺所在城市ID */
  @ServerName('shop_city_id')
  shop_city_id

  /** 店铺收藏数 */
  @ServerName('shop_collect')
  shop_collect

  /**  */
  @ServerName('shop_commission')
  shop_commission

  /**  */
  @ServerName('shop_createtime')
  shop_create_time

  /**  */
  @ServerName('shop_credit')
  shop_credit

  /**  */
  @ServerName('shop_deliverycredit')
  shop_delivery_credit

  /**  */
  @ServerName('shop_desc')
  shop_desc

  /**  */
  @ServerName('shop_desccredit')
  shop_desccredit

  /** 店铺状态 */
  @ServerName('shop_disable')
  shop_status

  /** 店铺有效期 */
  @ServerName('shop_endtime')
  shop_end_time

  /** 店铺ID */
  @ServerName('shop_id')
  shop_id

  /** 店铺等级 */
  @ServerName('shop_level')
  shop_level

  /**  */
  @ServerName('shop_level_apply')
  shop_level_apply

  /** 店铺LOGO */
  @ServerName('shop_logo')
  shop_logo

  /** 店铺名称 */
  @ServerName('shop_name')
  shop_name

  /**  */
  @ServerName('shop_praise_rate')
  shop_praise_rate

  /** 店铺所在省份 */
  @ServerName('shop_province')
  shop_province

  /** 店铺所在省份ID */
  @ServerName('shop_province_id')
  shop_province_id

  /** 店铺联系QQ */
  @ServerName('shop_qq')
  shop_qq

  /**  */
  @ServerName('shop_recommend')
  shop_recommend

  /** 店铺所在地区 */
  @ServerName('shop_region')
  shop_region

  /** 店铺所在地区ID */
  @ServerName('shop_region_id')
  shop_region_id

  /**  */
  @ServerName('shop_servicecredit')
  shop_servicecredit

  /** 店铺模板路径 */
  @ServerName('shop_theme_path')
  shop_theme_path

  /** 店铺模板ID */
  @ServerName('shop_themeid')
  shop_theme_id

  /** 店铺所在乡镇 */
  @ServerName('shop_town')
  shop_town

  /** 店铺所在乡镇ID */
  @ServerName('shop_town_id')
  shop_town_id

  /**  */
  @ServerName('store_space_capacity')
  store_space_capacity

  /** 税务登记证图片 */
  @ServerName('taxes_certificate_img')
  taxes_certificate_img

  /** 税务登记证号 */
  @ServerName('taxes_certificate_num')
  taxes_certificate_num

  /** 纳税人识别号 */
  @ServerName('taxes_distinguish_num')
  taxes_distinguish_num

  /** 一般纳税人图片 */
  @ServerName('taxes_img')
  taxes_img

  /** WAP模板路径 */
  @ServerName('wap_theme_path')
  wap_theme_path

  /** WAP模板ID */
  @ServerName('wap_themeid')
  wap_theme_id
}
