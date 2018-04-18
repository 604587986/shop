<template>
  <div v-loading="loading">
    <el-steps :active="activestep" align-center finish-status="success">
      <el-step title="1.选择商品品类" description=""></el-step>
      <el-step title="2.编辑基本信息" description=""></el-step>
      <el-step title="3.编辑商品详情" description=""></el-step>
    </el-steps>
    <!--步骤一-->
    <div class="content-goods-publish" v-if="activestep === 0">
      <div class="goods-category">
        <ul v-if="categoryListLevel1 && categoryListLevel1.length > 0">
          <li
            v-for="(item,index) in categoryListLevel1"
            :class="{'activeClass':index == activeCategoryIndex1}"
            @click="handleSelectCategory(item, index, 1)">
            <span>{{ item.category_name }}</span> <span>》</span>
          </li>
        </ul>
        <ul v-if="categoryListLevel2 && categoryListLevel2.length > 0">
          <li
            v-for="(item,index) in categoryListLevel2"
            :class="{'activeClass':index == activeCategoryIndex2}"
            @click="handleSelectCategory(item,index, 2)">
            <span>{{ item.category_name }}</span> <span>》</span>
          </li>
        </ul>
        <ul v-if="categoryListLevel3 && categoryListLevel3.length > 0">
          <li
            v-for="(item,index) in categoryListLevel3"
            :class="{'activeClass':index == activeCategoryIndex3}"
            @click="handleSelectCategory(item,index, 3)">
            <span>{{ item.category_name }}</span> <span>》</span>
          </li>
        </ul>
      </div>
      <p class="current-goods-category">
        您当前选择的商品类别是：
        <span>{{ activeCategoryName1 }}</span>
        <span v-show="activeCategoryName2"> > {{ activeCategoryName2 }}</span>
        <span v-show="activeCategoryName3"> > {{ activeCategoryName3 }}</span>
      </p>
    </div>
    <!--步骤2-->
    <div class="content-goods-publish" v-if="activestep === 1">
      <el-tabs v-model="activeName" type="card" @tab-click="handleBaseInfoClick">
        <el-tab-pane label="商品详情" name="goodsDetails">
          <el-row :gutter="20">
            <el-col :span="4">
              <div>
                基本信息
              </div>
            </el-col>
            <el-col :span="19">

            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <div>
                商品信息
              </div>
            </el-col>
            <el-col :span="19">

            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <div>
                商品规格
              </div>
            </el-col>
            <el-col :span="19">

            </el-col>
          </el-row>
          <el-row :gutter="19">
            <el-col :span="4">
              <div>
                seo
              </div>
            </el-col>
            <el-col :span="19">

            </el-col>
          </el-row>
          <el-row :gutter="19">
            <el-col :span="4">
              <div>
                物流/其他
              </div>
            </el-col>
            <el-col :span="19">

            </el-col>
          </el-row>
          <el-row :gutter="19">
            <el-col :span="4">
              <div>
                兑换许可
              </div>
            </el-col>
            <el-col :span="19">
            </el-col>
          </el-row>
          <el-row :gutter="19">
            <el-col :span="4">
              <div>
                积分配置
              </div>
            </el-col>
            <el-col :span="19">
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="goodsParameter">
          <el-form label-position="80" label-width="80px" :model="goodsParams">
            <el-form-item label="生产许可证编号">
              <el-input v-model="goodsParams.productionLicenseId"></el-input>
            </el-form-item>
            <el-form-item label="产品标准号">
              <el-input v-model="goodsParams.productStandard"></el-input>
            </el-form-item>
            <el-form-item label="储藏方式">
              <el-input v-model="goodsParams.resverseWay"></el-input>
            </el-form-item>
            <el-form-item label="保质期">
              <el-input v-model="goodsParams.qualityGuaranteePeriod"></el-input>
            </el-form-item>
            <el-form-item label="净含量">
              <el-input v-model="goodsParams.netContent"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--步骤3-->
    <div class="content-goods-publish" v-if="activestep === 2">
      363
    </div>
    <div class="footer">
      <el-button-group>
        <el-button type="primary" @click="pre" v-if="activestep === 1 || activestep === 2">上一步</el-button>
        <el-button
          type="primary"
          @click="next"
          v-if="(currentStatus === 0 && activestep === 0) || activestep === 1">下一步</el-button>
        <el-button
          type="primary"
          @click="aboveGoods"
          v-if="(currentStatus === 0 && activestep === 2) || (currentStatus === 1 && activestep !== 0) || (currentStatus === 2 && activestep === 1)"
        >上架</el-button>
        <el-button
          type="primary"
          @click="underGoods"
          v-if="(currentStatus === 1 && activestep === 1) || activestep === 2"
        >下架</el-button>
        <el-button
          type="primary"
          @click="saveDraft"
          v-if="(currentStatus != 1 && activestep != 0)"
        >保存草稿</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import * as API_goods from '@/api/goods'
  import * as API_goodsCategory from '@/api/goodsCategory'
  export default {
    name: 'goodsPublish',
    data() {
      return {
        /** 加载中。。。 */
        loading: false,

        /** 当前状态 默认发布商品0 编辑商品1 编辑草稿箱商品2 */
        currentStatus: 0,

        /** 当前激活步骤*/
        activestep: 0,

        /** 当前点击的1级分类索引*/
        activeCategoryIndex1: -1,

        /** 当前点击的2级分类索引*/
        activeCategoryIndex2: -1,

        /** 当前点击的3级分类索引*/
        activeCategoryIndex3: -1,

        /** 当前商品分类名称1*/
        activeCategoryName1: '',

        /** 当前商品分类名称2*/
        activeCategoryName2: '',

        /** 当前商品分类名称3*/
        activeCategoryName3: '',

        /** 当前商品id*/
        activeGoodsId: '',

        /** 测试数据 */
        categoryLevel: 0,

        /** 1级分类列表*/
        categoryListLevel1: [],

        /** 2级分类列表*/
        categoryListLevel2: [],

        /** 3级分类列表*/
        categoryListLevel3: [],

        /** 商品详情 和 商品参数 切换*/
        activeName: 'goodsDetails',

        /** 商品参数 */
        goodsParams: {
          /** 生产许可证 编号*/
          productionLicenseId: '',

          /** 产品标准号 */
          productStandard: '',

          /** 储藏方式 */
          resverseWay: '',

          /** 厂址*/
          factoryAddress: '',

          /** 保质期 */
          qualityGuaranteePeriod: '',

          /** 厂名 */
          factoryName: '',

          /** 净含量 */
          netContent: ''
        }

      }
    },
    mounted() {
      this.GET_NextLevelCategory()
      // 默认当前状态 发布商品
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.$route.query) {
          vm.currentStatus = vm.$route.query.isdraft || 0
          vm.activeGoodsId = vm.$route.query.goodsid
          vm.activestep = vm.$route.query.isdraft ? 1 : 0
        }
        vm.GET_NextLevelCategory()
        next()
      })
    },
    methods: {
      /** 上一步*/
      pre() {
        if (this.activestep-- < 0) this.activestep = 0
      },

      /** 下一步*/
      next() {
        // 1级校验
        if (!this.activeCategoryName && this.activestep === 0) {
          this.$message.error('请选择商品分类')
          return
        }
        if (this.activestep++ > 2) return
      },

      /** 保存草稿 */
      saveDraft() {

      },

      /** 上架 */
      aboveGoods() {

      },

      /** 下架 */
      underGoods() {

      },

      /** 查询下一级 商品分类*/
      GET_NextLevelCategory(row, level) {
        this.loading = true
        const _id = row && row.parent_id || 0
        API_goodsCategory.getGoodsCategoryLevelList(_id, { categoryLevel: this.categoryLevel }).then((response) => {
          if (level === 1) {
            this.categoryListLevel2 = response.data
            this.categoryListLevel3 = []
          } else if (level === 2) {
            this.categoryListLevel3 = response.data
          } else if (!level) {
            this.categoryListLevel1 = response.data
          }
          this.categoryLevel = level
          this.loading = false
        }).catch(() => this.$message.error('获取分类出错，请稍后再试！'))
      },

      /** 选择商品分类 */
      handleSelectCategory(row, index, level) {
        if (level === 1) {
          this.activeCategoryName1 = row.category_name
          this.activeCategoryName2 = this.activeCategoryName3 = ''
          this.activeCategoryIndex1 = index
          this.activeCategoryIndex2 = -1
          this.activeCategoryIndex3 = -1
        } else if (level === 2) {
          this.activeCategoryName2 = row.category_name
          this.activeCategoryName3 = ''
          this.activeCategoryIndex2 = index
          this.activeCategoryIndex3 = -1
        } else {
          this.activeCategoryName3 = row.category_name
          this.activeCategoryIndex3 = index
        }
        this.GET_NextLevelCategory(row, level)
      },

      /** 商品详情 和 商品参数 切换 */
      handleBaseInfoClick(tab, event) {
        this.activeName = tab.name
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /*选择商品品类*/
  .content-goods-publish {
    padding: 15px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #ddd;
    background: none repeat scroll 0 0 #fff;

    /*商品品类*/
    .goods-category {
      text-align: left;
      padding: 10px;
      background: #fafafa;
      border: 1px solid #e6e6e6;
      ul {
        padding: 8px 4px 8px 8px;
        list-style: none;
        width: 300px;
        background: none repeat scroll 0 0 #fff;
        border: 1px solid #e6e6e6;
        display: inline-block;
        letter-spacing: normal;
        margin-right: 15px;
        vertical-align: top;
        word-spacing: normal;
        li {
          line-height: 20px;
          padding: 5px;
          cursor: pointer;
          color: #333;
          font-size: 12px;
          display: flex;
          flex-wrap: nowrap;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    /** 当前品类被选中的样式 */
    .activeClass {
      background-color: #d9edf7;
      border: 1px solid #bce8f1;
      color: #3a87ad;
    }

    /*当前选择的商品品类文字*/
    .current-goods-category {
      text-align: left;
      padding: 10px;
      width: 100%;
      border: 1px solid #fbeed5;
      color: #c09853;
      background-color: #fcf8e3;
      margin: 10px auto;
      padding: 8px 35px 8px 14px;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
      font-size: 12px;
      font-weight: bold;
    }
  }


  /** 底部步骤 */
  .footer {
    width: 88.7%;
    padding: 10px;
    background-color: #ffc;
    position: fixed;
    bottom: 20px;
    left: 10%;
    text-align: center;
  }

</style>
