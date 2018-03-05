/**
 * 进度模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ProgressModel extends DataModel {
  /** 进度百分比 */
  @ServerName('sum_per')
  percentage

  /** 进度状态 */
  @ServerName('task_status')
  status

  /** 进度状态文字描述 */
  @ServerName('text')
  status_text

  /**  */
  @ServerName('task_total')
  task_total

  /**  */
  @ServerName('step_per')
  step_per
}
