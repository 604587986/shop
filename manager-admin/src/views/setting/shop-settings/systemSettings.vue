<template>
  <div class="container">
    <el-tabs type="border-card">
      <el-tab-pane label="系统设置">
        <el-form :model="sysForm" :rules="sysRules" ref="sysForm" label-width="130px" style="width: 500px">
          <el-form-item label="主域名" prop="static_domain">
            <el-input v-model="sysForm.static_domain"></el-input>
          </el-form-item>
          <el-form-item label="静态资源域名" prop="server_domain">
            <el-input v-model="sysForm.server_domain"></el-input>
          </el-form-item>
          <el-form-item label="虚拟目录" prop="virtical_list">
            <el-input v-model="sysForm.virtical_list"></el-input>
          </el-form-item>
          <el-form-item label="WAP站" prop="wap_opened">
            <el-input v-model="sysForm.virtical_list"></el-input>
          </el-form-item>
          <el-form-item label="WAP站域名" prop="wap_domain_ip">
            <el-input v-model="sysForm.virtical_list"></el-input>
          </el-form-item>
          <el-form-item label="WAP站模板目录" prop="wap_domain_ip">
            <el-input v-model="sysForm.virtical_list"></el-input>
          </el-form-item>
          <el-form-item label="加密秘钥" prop="wap_domain_ip">
            <el-input v-model="sysForm.virtical_list"></el-input>
          </el-form-item>
          <el-form-item label="后台分页" prop="wap_domain_ip">
            <el-input v-model="sysForm.virtical_list"></el-input>
          </el-form-item>
          <el-form-item label="手机短信支持" prop="wap_domain_ip">
            <el-radio-group v-model="sysForm.sms_sp">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="测试模式" prop="wap_domain_ip">
            <el-radio-group v-model="sysForm.test_model">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否开启集群" prop="wap_domain_ip">
            <el-radio-group v-model="sysForm.sms_sp">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="索引目录" prop="wap_domain_ip">
            <el-input v-model="sysForm.virtical_list"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="站点设置">
        <el-form :model="siteForm" :rules="siteRules" ref="siteForm" label-width="130px" style="width: 500px">
          <el-form-item label="网站名称" prop="name">
            <el-input v-model="siteForm.name"></el-input>
          </el-form-item>
          <el-form-item label="网站标题" prop="title">
            <el-input v-model="siteForm.title"></el-input>
          </el-form-item>
          <el-form-item label="关键字" prop="keyword">
            <el-tag
              class="site-tag"
              v-for="tag in siteForm.tags"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="handleCloseSiteTag(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="site-new-tag-input"
              v-if="siteTagInputVisible"
              v-model="siteTagInputValue"
              ref="saveSiteTagInput"
              size="small"
              @keyup.enter.native="handleSiteTagInputConfirm"
              @blur="handleSiteTagInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showSiteTagInput">+ 添加</el-button>
          </el-form-item>
          <el-form-item label="网站描述" prop="descript">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="siteForm.descript"
              :maxlength="200"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="网站LOGO" prop="logo">
            <el-upload
              class="site-logo"
              :action="MixinUploadApi"
              :show-file-list="false"
              :on-success="handleSiteLogoSuccess"
              :multiple="false">
              <img v-if="siteForm.logo" :src="siteForm.logo" class="site-logo-img">
              <i v-else class="el-icon-plus logo-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="店铺设置">
        <el-form :model="shopForm" :rules="shopRules" ref="shopForm" label-width="130px" style="width: 500px">
          <el-form-item label="商家商品是否审核" prop="auth">
            <el-radio-group v-model="shopForm.auth">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="修改商品是否审核" prop="edit_auth">
            <el-radio-group v-model="shopForm.edit_auth">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="自营商品是否审核" prop="self_auth">
            <el-radio-group v-model="shopForm.self_auth">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="PC模板路径" prop="pc_path">
            <el-input v-model="shopForm.pc_path"></el-input>
          </el-form-item>
          <el-form-item label="WAP模板路径" prop="wap_path">
            <el-input v-model="shopForm.wap_path"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="订单设置">
        <el-form :model="orderForm" :rules="orderRules" ref="orderForm" label-width="130px" style="width: 500px">
          <el-form-item label="自动取消订单天数" prop="cancel_order_day">
            <el-input-number size="small" v-model="orderForm.cancel_order_day"></el-input-number>
          </el-form-item>
          <el-form-item label="自动确认收货天数" prop="name">
            <el-input-number size="small" v-model="orderForm.rog_order_day"></el-input-number>
          </el-form-item>
          <el-form-item label="自动完成订单天数" prop="name">
            <el-input-number size="small" v-model="orderForm.complete_order_day"></el-input-number>
          </el-form-item>
          <el-form-item label="自动支付天数" prop="name">
            <el-input-number size="small" v-model="orderForm.pay_order_day"></el-input-number>
          </el-form-item>
          <el-form-item label="售后失效天数" prop="name">
            <el-input-number size="small" v-model="orderForm.service_expired_day"></el-input-number>
          </el-form-item>
          <el-form-item label="评价超时天数" prop="name">
            <el-input-number size="small" v-model="orderForm.comment_order_day"></el-input-number>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="图片设置" class="image-pane">
        <el-form :model="imageForm" :rules="imageRules" ref="imageForm" label-width="155px" style="width: 500px">
          <el-form-item label="商家模板商品图片尺寸" prop="cancel_order_day">
            <el-input placeholder="300" size="small" v-model="imageForm.a">
              <template slot="prepend">宽</template>
              <template slot="append">px</template>
            </el-input>
            <el-input placeholder="300" size="small" v-model="imageForm.a">
              <template slot="prepend">高</template>
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品小图尺寸" prop="cancel_order_day">
            <el-input placeholder="400" size="small" v-model="imageForm.a">
              <template slot="prepend">宽</template>
              <template slot="append">px</template>
            </el-input>
            <el-input placeholder="400" size="small" v-model="imageForm.a">
              <template slot="prepend">高</template>
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商家相册图片尺寸" prop="cancel_order_day">
            <el-input placeholder="800" size="small" v-model="imageForm.a">
              <template slot="prepend">宽</template>
              <template slot="append">px</template>
            </el-input>
            <el-input placeholder="800" size="small" v-model="imageForm.a">
              <template slot="prepend">高</template>
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="积分设置" class="point-pane">
        <el-form :model="pointForm" :rules="pointRules" ref="pointForm" label-width="210px" label-position="left" style="width: 500px">
          <!--成功注册-->
          <el-form-item prop="cancel_order_day">
            <template slot="label">
              <el-checkbox v-model="pointForm.a">完成注册</el-checkbox>
            </template>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">等级积分</template>
            </el-input>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">消费积分</template>
            </el-input>
          </el-form-item>
          <!--完善个人资料-->
          <el-form-item prop="cancel_order_day">
            <template slot="label">
              <el-checkbox v-model="pointForm.a">完善个人资料</el-checkbox>
            </template>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">等级积分</template>
            </el-input>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">消费积分</template>
            </el-input>
          </el-form-item>
          <!--登录（一天一次有效）-->
          <el-form-item prop="cancel_order_day">
            <template slot="label">
              <el-checkbox v-model="pointForm.a">登录（一天一次有效）</el-checkbox>
            </template>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">等级积分</template>
            </el-input>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">消费积分</template>
            </el-input>
          </el-form-item>
          <!--文字评论-->
          <el-form-item prop="cancel_order_day">
            <template slot="label">
              <el-checkbox v-model="pointForm.a">文字评论</el-checkbox>
            </template>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">等级积分</template>
            </el-input>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">消费积分</template>
            </el-input>
          </el-form-item>
          <!--上传图片评论-->
          <el-form-item prop="cancel_order_day">
            <template slot="label">
              <el-checkbox v-model="pointForm.a">上传图片评论</el-checkbox>
            </template>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">等级积分</template>
            </el-input>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">消费积分</template>
            </el-input>
          </el-form-item>
          <!--每个商品首次评论-->
          <el-form-item prop="cancel_order_day">
            <template slot="label">
              <el-checkbox v-model="pointForm.a">每个商品首次评论</el-checkbox>
            </template>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">等级积分</template>
            </el-input>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">消费积分</template>
            </el-input>
          </el-form-item>
          <!--购买商品（1元等于多少积分）-->
          <el-form-item prop="cancel_order_day">
            <template slot="label">
              <el-checkbox v-model="pointForm.a">购买商品（1元等于多少积分）</el-checkbox>
            </template>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">等级积分</template>
            </el-input>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">消费积分</template>
            </el-input>
          </el-form-item>
          <!--选择网上支付-->
          <el-form-item prop="cancel_order_day">
            <template slot="label">
              <el-checkbox v-model="pointForm.a">选择网上支付</el-checkbox>
            </template>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">等级积分</template>
            </el-input>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">消费积分</template>
            </el-input>
          </el-form-item>
          <!--人民币与积分兑换比例-->
          <el-form-item prop="cancel_order_day">
            <template slot="label">
              <el-checkbox v-model="pointForm.a">人民币与积分兑换比例</el-checkbox>
            </template>
            <el-input placeholder="800" size="small" v-model="pointForm.a">
              <template slot="append">消费积分</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import * as API_SystemSetting from '@/api/systemSetting'
  export default {
    name: 'systemSettings',
    data() {
      return {
        /** 系统设置 */
        sysForm: {},
        sysRules: {},

        /** 站点设置 */
        siteForm: {
          tags: [],
          logo: ''
        },
        siteRules: {},
        siteTagInputVisible: false,
        siteTagInputValue: '',

        /** 店铺设置 */
        shopForm: {
          auth: 0,
          edit_auth: 0,
          self_auth: 0
        },
        shopRules: {},

        /** 订单设置 */
        orderForm: {},
        orderRules: {},

        /** 图片设置 */
        imageForm: {},
        imageRules: {},

        /** 积分设置 */
        pointForm: {},
        pointRules: {}
      }
    },
    mounted() {},
    methods: {
      /** 关键字标签关闭 */
      handleCloseSiteTag(tag) {
        this.siteForm.tags.splice(this.siteForm.tags.indexOf(tag), 1)
      },
      /** 显示关键字输入框 */
      showSiteTagInput() {
        this.siteTagInputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveSiteTagInput.$refs.input.focus()
        })
      },
      /** 关键字输入确认 */
      handleSiteTagInputConfirm() {
        let inputValue = this.siteTagInputValue
        if (this.siteForm.tags.filter(item => item === inputValue).length > 0) {
          this.$message.error('不能出现重复的关键字！')
        } else if (inputValue) {
          this.siteForm.tags.push(inputValue)
        }
        this.siteTagInputVisible = false
        this.siteTagInputValue = ''
      },
      /** 网站LOGO上传成功 */
      handleSiteLogoSuccess(res, file) {
        this.siteForm.logo = res
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .container {
    background-color: #fff;
    padding: 10px;
    position: relative;
  }
  .site-tag {
    margin: 0 3px;
  }
  .site-new-tag-input {
    width: 100px;
  }
  /deep/ .site-logo .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
  .logo-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .site-logo-img {
    width: 120px;
    height: 120px;
    display: block;
  }

  .image-pane .el-input-group {
    width: 200px;
  }
  .point-pane .el-input-group {
    width: 200px;
  }
</style>
