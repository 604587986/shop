/**
 * 发票模型
 */

import { DataModel, ServerName } from '@/framework'

export default class ReceiptModel extends DataModel {
  /** 是否需要发票 */
  @ServerName('need_receipt')
  need_receipt

  /** 发票类型 */
  @ServerName('receipt_type')
  receipt_type

  /** 发票抬头 */
  @ServerName('receipt_title')
  receipt_title

  /** 发票内容 */
  @ServerName('receipt_content')
  receipt_content

  /** 税号 */
  @ServerName('duty_invoice')
  duty_invoice
}

/** 发票内容模型 */
export class ReceiptContentModel extends DataModel {
  /** 发票内容ID */
  @ServerName('id')
  id

  /** 发票内容 */
  @ServerName('content')
  content
}
