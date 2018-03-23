<template>
  <div>
    <el-steps :active="activestep" align-center finish-status="success">
      <el-step title="1.选择商品品类" description=""></el-step>
      <el-step title="2.编辑基本信息" description=""></el-step>
      <el-step title="3.编辑商品详情" description=""></el-step>
    </el-steps>
    <div class="content-goods-publish" v-if="activestep === 0">
      <div>
        <ul v-if="">
          <li></li>
        </ul>
        <ul v-if="">
          <li></li>
        </ul>
        <ul v-if="">
          <li></li>
        </ul>
      </div>
      <p>您当前选择的商品类别是：
        <sapn></sapn>
      </p>
    </div>
    <div class="content-goods-publish" v-if="activestep === 1">
      000
    </div>
    <div class="content-goods-publish" v-if="activestep === 2">
      363
    </div>
    <div class="footer">
      <el-button-group>
        <el-button type="primary" @click="pre">上一步</el-button>
        <el-button type="primary" @click="next">下一步</el-button>
        <el-button type="primary" @click="aboveGoods">上架</el-button>
        <el-button type="primary" @click="underGoods">下架</el-button>
        <el-button type="primary" @click="saveDraft">保存草稿</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'goodsPublish',
    data() {
      return {
        /** 当前激活步骤*/
        activestep: 2
      }
    },
    methods: {
      /** 上一步*/
      pre() {
        if (this.activestep-- < 0) this.activestep = 0
      },

      /** 下一步*/
      next() {
        if (this.activestep++ > 2) this.activestep = 0
      },

      /** 保存草稿 */
      saveDraft() {

      },

      /** 上架 */
      aboveGoods() {

      },

      /** 下架 */
      underGoods() {

      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .content-goods-publish {
    padding: 15px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #ddd;
  }

  .footer {
    width: 100%;
    position: fixed;
    bottom: 20px;
    left: 5%;
    text-align: center;
  }
</style>
