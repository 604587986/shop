<template>
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
</template>

<script>
  export default {
    name: 'systemSettingsPoint',
    data() {
      return {
        /** 积分设置 */
        pointForm: {},
        pointRules: {}
      }
    },
    mounted() {},
    methods: {
    }
  }
</script>
