<template>
  <div class="">
    <el-tabs type="border-card">
      <el-tab-pane label="编辑会员">
        <el-form :model="editMemberForm" :rules="editMemberRules" ref="editMemberForm" inline label-width="100px">
          <!--<el-form-item label="用户名" prop="username">
            <el-input v-model="editMemberForm.username" :maxlength="20"></el-input>
          </el-form-item>-->
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="editMemberForm.nickname" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="editMemberForm.password" placeholder="不填则不更改" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="地区" prop="region" class="form-item-region">
            <en-region-picker :api="MixinRegionApi" :default="defaultRegion" @changed="(object) => { editMemberForm.region = object.last_id }"/>
          </el-form-item>
          <el-form-item label="会员备注">
            <el-input placeholder="请输入会员备注" v-model="editMemberForm.remark" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editMemberForm.email" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="editMemberForm.mobile" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-date-picker
              v-model="editMemberForm.birthday"
              type="date"
              :editable="false"
              value-format="timestamp"
              placeholder="选择生日"
              :picker-options="{disabledDate(time) { return time.getTime() > Date.now() }}">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="性别" prop="sex" class="form-item-sex">
            <el-radio v-model="editMemberForm.sex" :label="1">男</el-radio>
            <el-radio v-model="editMemberForm.sex" :label="0">女</el-radio>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="editMemberForm.address" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="邮编">
            <el-input v-model="editMemberForm.zip" :maxlength="6"></el-input>
          </el-form-item>
          <el-form-item label="固定电话">
            <el-input v-model="editMemberForm.tel"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitEditMemberForm('editMemberForm')">保存修改</el-button>
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
        <el-button type="primary" @click="submitEditMemberForm('editMemberForm')">保存修改</el-button>
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
      <el-tab-pane label="TA的收货地址">
        <member-list-address :member-id="member_id"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import * as API_Member from '@/api/member'
  import { RegExp } from '~/ui-utils'
  import MemberListAddress from './memberListAddress'

  export default {
    name: 'memberEdit',
    components: {
      MemberListAddress
    },
    data() {
      return {
        member_id: this.$route.params.id,
        // 编辑会员 表单
        editMemberForm: {},
        // 编辑会员 表单规则
        editMemberRules: {
          // username: [
          //   this.MixinRequired('请输入会员名称！'),
          //   { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          // ],
          email: [
            this.MixinRequired('请输入邮箱！'),
            { validator: (rule, value, callback) => {
              if (!RegExp.email.test(value)) {
                callback(new Error('邮箱格式有误！'))
              } else {
                callback()
              }
            } }
          ],
          nickname: [
            this.MixinRequired('请输入昵称！'),
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          region: [this.MixinClone('请选择地区！')],
          mobile: [
            this.MixinRequired('请输入手机号！'),
            { validator: (rule, value, callback) => {
              if (!RegExp.mobile.test(value)) {
                callback(new Error('手机格式格式有误！'))
              } else {
                callback()
              }
            } }
          ],
          birthday: [this.MixinRequired('请选择生日！')],
          address: [this.MixinRequired('请输入详细地址！')]
        },
        /** 地区id数组 */
        defaultRegion: null,
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
        // 收货地址列表
        shipList: []
      }
    },
    mounted() {
      this.GET_MemberDetail()
    },
    methods: {
      /** 提交修改会员表单 */
      submitEditMemberForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const params = this.MixinClone(this.editMemberForm)
            params.birthday /= 1000
            API_Member.editMember(params.member_id, params).then(response => {
              this.$message.success('修改成功！')
              console.log(response)
            })
          } else {
            this.$message.error('表单填写有误，请检查！')
            return false
          }
        })
      },
      /** 获取会员详情 */
      GET_MemberDetail() {
        API_Member.getMemberDetail(this.member_id).then(response => {
          response.birthday *= 1000
          this.editMemberForm = response
          if (response.province_id) {
            this.defaultRegion = [response.province_id, response.city_id, response.county_id || -1, response.town_id || -1]
          }
        })
      }
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
