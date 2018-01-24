<template>
  <div class="">
    <el-tabs type="border-card">
      <el-tab-pane label="编辑会员">
        <el-form :model="editMmberForm" :rules="editMmberRules" ref="editMmberForm" inline label-width="100px">
          <el-form-item label="用户名" prop="uname">
            <el-input v-model="editMmberForm.uname" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="editMmberForm.password" placeholder="不填则不更改" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editMmberForm.email" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="editMmberForm.nickname" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile" :maxlength="11">
            <el-input v-model="editMmberForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-date-picker
              v-model="editMmberForm.birthday"
              type="date"
              :editable="false"
              value-format="yyyy-MM-dd"
              placeholder="选择生日"
              :picker-options="{disabledDate(time) { return time.getTime() > Date.now() }}">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="性别" prop="sex" class="form-item-sex">
            <el-radio v-model="editMmberForm.sex" :label="1">男</el-radio>
            <el-radio v-model="editMmberForm.sex" :label="0">女</el-radio>
          </el-form-item>
          <el-form-item label="地区" class="form-item-region">
            <en-address-select :changed="addressSelectChanged"/>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="editMmberForm.address" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="邮编">
            <el-input v-model="editMmberForm.zip" :maxlength="6"></el-input>
          </el-form-item>
          <el-form-item label="固定电话">
            <el-input v-model="editMmberForm.tel"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary">保存修改</el-button>
      </el-tab-pane>
      <el-tab-pane label="TA的订单">
        <el-table
          :data="orderList"
          style="width: 100%">
          <el-table-column prop="sn" label="订单号"/>
          <el-table-column prop="name" label="订单状态"></el-table-column>
          <el-table-column prop="address" label="支付状态"></el-table-column>
          <el-table-column prop="address" label="下单日期"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="TA的积分">
        <el-form :model="editPointForm" ref="editPointForm" label-width="100px">
          <el-form-item label="当前积分">
            {{ editPointForm.currentPoint }}
          </el-form-item>
          <el-form-item label="调整积分">
            <el-input-number v-model="editPointForm.changedPoint" :min="1" :max="99999999" label="描述文字"></el-input-number>
          </el-form-item>
        </el-form>
        <el-button type="primary">保存修改</el-button>
      </el-tab-pane>
      <el-tab-pane label="等级积分">
        <el-table
          :data="levelPointList"
          style="width: 100%">
          <el-table-column prop="sn" label="日期"/>
          <el-table-column prop="name" label="类型"></el-table-column>
          <el-table-column prop="address" label="摘要"></el-table-column>
          <el-table-column prop="address" label="积分"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="消费积分">
        <el-table
          :data="consPointList"
          style="width: 100%">
          <el-table-column prop="sn" label="日期"/>
          <el-table-column prop="name" label="类型"></el-table-column>
          <el-table-column prop="address" label="摘要"></el-table-column>
          <el-table-column prop="address" label="积分"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="TA的咨询">
        <el-table
          :data="askList"
          style="width: 100%">
          <el-table-column prop="sn" label="发表时间"/>
          <el-table-column prop="name" label="显示状态"></el-table-column>
          <el-table-column prop="address" label="咨询内容"></el-table-column>
          <el-table-column prop="address" label="商家回复"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="TA的评论">
        <el-table
          :data="commentList"
          style="width: 100%">
          <el-table-column prop="sn" label="发表时间"/>
          <el-table-column prop="name" label="显示状态"></el-table-column>
          <el-table-column prop="address" label="咨询内容"></el-table-column>
          <el-table-column prop="address" label="商家回复"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="会员备注">
        <el-form :model="memberRemarkForm" ref="memberRemarkForm" label-width="100px">
          <el-form-item label="会员备注">
            <el-input
              placeholder="请输入会员备注"
              v-model="memberRemarkForm.remark"
              clearable>
            </el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary">保存修改</el-button>
      </el-tab-pane>
      <el-tab-pane label="TA的收货地址">
        <el-table
          :data="shipList"
          style="width: 100%">
          <el-table-column prop="sn" label="收货人"/>
          <el-table-column prop="name" label="所在地区"></el-table-column>
          <el-table-column prop="address" label="详细地址"></el-table-column>
          <el-table-column prop="address" label="手机号码"></el-table-column>
          <el-table-column prop="address" label="默认"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { AddressSelect } from '@/plugins/selector/vue'
  export default {
    name: 'memberEdit',
    components: {
      [AddressSelect.name]: AddressSelect
    },
    data() {
      return {
        member_id: this.$route.params.id,
        // 编辑会员 表单
        editMmberForm: { sex: 1 },
        // 编辑会员 表单规则
        editMmberRules: {
          uname: [
            { required: true, message: '请输入会员名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入昵称', trigger: 'blur' }
          ],
          birthday: [
            { required: true, message: '请选择生日', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ]
        },
        // 会员订单列表
        orderList: [],
        // 编辑积分 表单
        editPointForm: {
          currentPoint: 4399,
          changedPoint: 4399
        },
        // 等级积分列表
        levelPointList: [],
        // 消费积分列表
        consPointList: [],
        // 咨询列表
        askList: [],
        // 评论列表
        commentList: [],
        // 会员备注 表单
        memberRemarkForm: {
          remark: ''
        },
        // 收货地址列表
        shipList: []
      }
    },
    methods: {
      /** 编辑会员 地址发生改变 */
      addressSelectChanged(region) {},

      /** 获取会员详情 */
      GET_MemberDetail() {}
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .el-date-editor.el-input {
    width: 180px;
  }
  /deep/ .form-item-sex .el-form-item__content{
    width: 180px;
  }
  /deep/ .form-item-region .el-form-item__content {
    min-width: 180px;
  }
  /deep/ .el-tabs__content {
    overflow: initial;
  }
  /deep/ .el-tab-pane .el-button {
    margin-left: 100px;
  }
</style>
