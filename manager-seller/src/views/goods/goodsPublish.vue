<template>
  <div v-loading="loading">
    <el-steps :active="activestep" finish-status="success" process-status="process"	 simple style="margin-top: 20px">
      <el-step title="1.选择商品品类" ></el-step>
      <el-step title="2.编辑基本信息" ></el-step>
      <el-step title="3.编辑商品详情" ></el-step>
    </el-steps>
    <!--步骤1-->
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
      <el-form
        :model="baseInfoForm"
        status-icon
        :rules="baseInfoFormRule"
        label-position="right"
        ref="baseInfoForm"
        label-width="120px"
        class="demo-ruleForm">
        <!--商品详情-->
        <!--基本信息-->
        <div class="base-info-item">
          <h4>基本信息</h4>
          <div>
            <el-form-item label="商品分类：" style="width: 100%; text-align: left;">
              <span>{{ activeCategoryName1 }}</span>
              <span v-show="activeCategoryName2"> > {{ activeCategoryName2 }}</span>
              <span v-show="activeCategoryName3"> > {{ activeCategoryName3 }}</span>
            </el-form-item>
            <el-form-item label="商品分组：" >
              <!--商品分类 获取分类列表 传入默认值-->
              <en-category-picker @changed="changeGoodsCateGory" :clearable='true'/>
            </el-form-item>
            <p class="goods-group-manager">
              商品可以从属于店铺的多个分类之下，店铺分类可以由 "商家中心 -> 商品 -> 分组管理" 中自定义
            </p>
            <el-form-item label="商品品牌：" >
              <el-select
                v-model="baseInfoForm.brand"
                filterable
                @visible-change="getGoodsBrandList"
                @change="changeGoodsBrand"
                placeholder="请选择">
                <el-option
                  v-for="item in brandList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <!--商品信息-->
        <div class="base-info-item">
          <h4>商品信息</h4>
          <div>
            <el-form-item label="商品名称：" prop="goods_name">
              <el-input v-model="baseInfoForm.goods_name" placeholder="3-60个字符"></el-input>
            </el-form-item>
            <el-form-item label="商品编号：" prop="goods_sn">
              <el-input v-model.number="baseInfoForm.goods_sn"></el-input>
            </el-form-item>
            <el-form-item label="市场价格：" prop="market_price">
              <el-input v-model.number="baseInfoForm.market_price"></el-input>
            </el-form-item>
            <el-form-item label="商品价格：" prop="goods_price">
              <el-input v-model.number="baseInfoForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="成本价格：" prop="cost" >
              <el-input v-model.number="baseInfoForm.cost"></el-input>
            </el-form-item>
            <el-form-item label="商品重量(kg)：" prop="weight">
              <el-input v-model.number="baseInfoForm.weight"></el-input>
            </el-form-item>
            <el-form-item label="商品图片：" style="width: 90%;text-align: left;">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeAvatarUpload"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png/jqeg文件，且不超过1mb</div>
              </el-upload>
              <el-dialog :visible.sync="dialogImage">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </div>
        </div>
        <!--商品规格-->
        <div class="base-info-item">
          <h4>商品规格</h4>
          <div>
            <el-form-item label="商品规格："  style="width: 90%;text-align: left;">
              <!--规格选择器-->
            </el-form-item>
            <el-form-item label="总库存：" prop="summary_stock" style="width: 20%;text-align: left;">
              <el-input v-model="baseInfoForm.summary_stock" disabled></el-input>
            </el-form-item>
          </div>
        </div>
        <!--seo-->
        <div class="base-info-item">
          <h4>seo</h4>
          <div>
            <el-form-item label="seo标题：">
              <el-input placeholder="3-60个字符"></el-input>
            </el-form-item>
            <el-form-item label="seo关键字：" >
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="seo描述：" >
              <el-input type="textarea"></el-input>
            </el-form-item>
          </div>
        </div>
        <!--物流/其他-->
        <div class="base-info-item">
          <h4>物流/其他</h4>
          <div>
            <el-form-item label="运费：" style="width: 50%;">
              <el-radio-group v-model="baseInfoForm.goods_transfee_charge">
                <el-radio :label="1">卖家承担运费</el-radio>
                <el-radio :label="0">买家承担运费</el-radio>
              </el-radio-group>
              <el-select
                v-model="baseInfoForm.template_id"
                placeholder="请选择运费模板"
                v-show="baseInfoForm.goods_transfee_charge === 0 "
                @visible-change="getTplList"
                @change="changeTpl"
              >
                <el-option
                  v-for="item in tplList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <!--兑换许可-->
        <div class="base-info-item">
          <h4>兑换许可</h4>
          <div>
            <el-form-item label="积分兑换：" >
              <el-switch
                v-model="baseInfoForm.exchange.enable_exchange"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="开启"
                inactive-text="关闭"
                @change="handleSwitchexchange">
              </el-switch>
            </el-form-item>
            <p class="exchange-tip">添加为积分换购商品后,自今日起一年后自动过期</p>
          </div>
        </div>
        <!--积分配置-->
        <div class="base-info-item" v-show="isShowExchangeConfig">
          <h4>积分配置</h4>
          <div>
            <el-form-item label="兑换积分：" style="width: 50%;">
              <el-input v-model="baseInfoForm.exchange.exchange_money" style="width: 100px;"></el-input> 元 +
              <el-input v-model="baseInfoForm.exchange.exchange_point" style="width: 100px;"></el-input> 积分 可兑换此商品
            </el-form-item>
            <el-form-item label="积分商品分类：" >
              <el-select
                v-model="baseInfoForm.exchange.category_id"
                placeholder="请选择积分商品分类"
                @visible-change="getGoodsCatrgory"
                @change="changeExangeCategory"
              >
                <el-option
                  v-for="item in exchangeGoodsCatrgoryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <!--商品参数-->
        <el-collapse>
          <!--商品参数-->
          <!--<el-collapse-item title="seo" v-for="">-->
            <!--<el-form-item label="seo标题：" v-for="">-->
              <!--<el-input placeholder="3-60个字符"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="seo关键字：" >-->
              <!--<el-input type="textarea"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="seo描述：" >-->
              <!--<el-input type="textarea"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-collapse-item>-->
        </el-collapse>
      </el-form>
    </div>
    <!--步骤3-->
    <div class="content-goods-publish" v-if="activestep === 2">
      <el-form
        :model="baseInfoForm"
        status-icon
        :rules="baseInfoFormRule"
        label-position="right"
        ref="baseInfoForm"
        label-width="120px"
        class="demo-ruleForm">
        <el-form-item label="商品描述：">
          <UE v-model="baseInfoForm.goods_desc" :defaultMsg="baseInfoForm.goods_desc"></UE>
        </el-form-item>
      </el-form>
    </div>
    <!--底部-->
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
          @click="handleUnderGoods"
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
  import { TableLayout, TableSearch, CategoryPicker, SkuSelector, UE } from '@/components'
  export default {
    name: 'goodsPublish',
    components: {
      [TableLayout.name]: TableLayout,
      [TableSearch.name]: TableSearch,
      [CategoryPicker.name]: CategoryPicker,
      [SkuSelector.name]: SkuSelector,
      [UE.name]: UE
    },

    data() {
      var checkMarket = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('市场价格不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < this.baseInfoForm.cost) {
              callback(new Error('市场价格必须大于成本价格'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      var checkCost = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('成本价格不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value > this.baseInfoForm.market_price) {
              callback(new Error('市场价格必须大于成本价格'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
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
        },

        /** 商品详情信息提交表单 */
        baseInfoForm: {

          /** 商品名称 */
          goods_name: '',

          /** 商品编号 */
          goods_sn: '',

          /** 市场价格 */
          market_price: '',

          /** 成本价格 */
          cost: '',

          /** 商品重量 */
          weight: '',

          /** 商品相册列表 */
          goods_images: [],

          /** 商品总库存 */
          summary_stock: 0,

          /** 卖家承担运费1 买家承担运费0 */
          goods_transfee_charge: 1,

          /** 模板运费id */
          template_id: '',

          /** 积分兑换 */
          exchange: {
            /** 积分兑换所属分类 */
            category_id: 0,

            /** 是否允许积分兑换  1是 0否*/
            enable_exchange: 1,

            /** 兑换所需金额 */
            exchange_money: 0,

            /** 积分兑换使用的积分 */
            exchange_point: 0
          },

          /** 商品描述 anytype*/
          goods_desc: null
        },

        /** 品牌列表 */
        brandList: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],

        /** 运费模板列表 */
        tplList: [{
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],

        /** 积分商品列表 */
        exchangeGoodsCatrgoryList: [{
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],

        /** 商品图片放大地址 */
        dialogImageUrl: '',

        /** 是否显示放大图片弹框 */
        dialogImage: false,

        /** 是否显示积分配置*/
        isShowExchangeConfig: false,

        /** 商品详情的校验规则 */
        baseInfoFormRule: {
          goods_name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          goods_sn: [
            { required: true, message: '请输入商品编号', trigger: 'blur' },
            { type: 'number', message: '请输入数字值', trigger: 'blur' }
          ],
          market_price: [
            { required: true, message: '请输入市场价格', trigger: 'blur' },
            { validator: checkMarket, trigger: 'blur' }
          ],
          goods_price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' },
            { type: 'number', message: '请输入数字值', trigger: 'blur' }
          ],
          cost: [
            { required: true, message: '请输入成本价格', trigger: 'blur' },
            { validator: checkCost, trigger: 'blur' }
          ],
          weight: [
            { required: true, message: '请输入商品重量', trigger: 'blur' },
            { type: 'number', message: '请输入数字值', trigger: 'blur' }
          ],
          goods_images: [
            { required: true, message: '请选择商品相册', trigger: 'blur' }
          ],
          summary_stock: [
            { required: true, message: '请填写总库存', trigger: 'blur' }
          ]
        }

      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.$route.query && vm.$route.query.goodsid) {
          vm.currentStatus = vm.$route.query.isdraft || 0
          vm.activeGoodsId = vm.$route.query.goodsid
          vm.activestep = vm.$route.query.isdraft ? 1 : 0
          if (vm.currentStatus === 1 && vm.$route.query.goodsid) {
            vm.GET_GoodData()
          } else if (vm.currentStatus === 2 && vm.$route.query.goodsid) {
            vm.GET_GoodDraftData()
          }
        } else {
          vm.GET_NextLevelCategory()
        }
        if (vm.activestep === 1) {
          vm.GET_GoodsGroupList()
        }
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
        /** 1级校验 */
        if (this.activestep === 0) {
          if (!this.activeCategoryName1) {
            this.$message.error('请选择商品分类')
            return
          } else {
            this.GET_GoodsBaseData()
          }
        }

        /** 2级校验 */
        if (this.activestep === 1) {
          this.$refs.baseInfoForm.validate((valid) => {
            if (valid) {
              if (this.activestep++ > 2) return
            }
          })
          return
        }
        // 下一步
        if (this.activestep++ > 2) return
      },

      /** 保存草稿 */
      saveDraft() {
        API_goods.saveDraft(this.baseInfoForm).then(response => {
          this.$message.success('保存草稿成功')
          this.$router.push({ path: '/goods/draft-list' })
        }).catch(error => {
          this.$message.success('保存草稿失败，请稍后重试！')
          console.log(error)
        })
      },

      /** 上架  */
      aboveGoods() {
        if (this.currentStatus === 0) {
          /** 正常商品 */
          API_goods.aboveGoods(this.baseInfoForm).then(response => {
            this.$message.success('上架商品成功')
            this.$router.push({ path: '/goods/goods-list' })
          }).catch(error => {
            this.$message.success('上架商品失败，请稍后重试！')
            console.log(error)
          })
        } else {
          /**  草稿箱商品 */
          API_goods.aboveDraftGoods(this.activeGoodsId, this.baseInfoForm).then(response => {
            this.$message.success('上架草稿箱商品成功')
            this.$router.push({ path: '/goods/goods-list' })
          }).catch(error => {
            this.$message.success('上架草稿箱商品失败，请稍后重试！')
            console.log(error)
          })
        }
      },

      /** 查询下一级 商城商品分类*/
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

      /** 选择商城商品分类 */
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

      /** 查询单个商品信息*/
      GET_GoodData() {
        // this.loading = true
        API_goods.getGoodData(this.activeGoodsId, {}).then((response) => {
          this.loading = false
          this.baseInfoForm = response.data
        }).catch(() => this.$message.error('获取分类出错，请稍后再试！'))
      },

      /** 商家下架商品*/
      handleUnderGoods() {
        // this.loading = true
        API_goods.underGoods(this.activeGoodsId, { }).then((response) => {
          this.loading = false
          this.$message.success('下架成功')
        }).catch(() => this.$message.error('下架商品失败，请稍后再试！'))
      },

      /** 查询单个草稿箱商品信息 */
      GET_GoodDraftData() {
        // this.loading = true
        API_goods.getGoodDraftData(this.activeGoodsId, { }).then((response) => {
          this.loading = false
          this.baseInfoForm = response.data
        }).catch(() => this.$message.error('获取分类出错，请稍后再试！'))
      },

      /** 商品基本信息 包括商品参数在内的所有所需信息 */
      GET_GoodsBaseData() {

      },

      /** 商品分组列表*/
      GET_GoodsGroupList() {

      },

      /** 商品分组 改变时触发 */
      changeGoodsCateGory(val) {

      },

      /** 商品品牌列表 */
      getGoodsBrandList(val) {
        if (val) {
          API_goods.getGoodsBrandList(this.activeGoodsId, { }).then((response) => {
            this.brandList = response.data
          }).catch(() => {})
        }
      },

      /** 商品品牌 改变时触发 */
      changeGoodsBrand(val) {

      },

      /** 运费模板列表 */
      getTplList(val) {
        if (val) {
          API_goods.getTplList(this.activeGoodsId, { }).then((response) => {
            this.tplList = response.data
          }).catch(() => {})
        }
      },

      /** 运费模板改变时触发 */
      changeTpl(val) {

      },

      /** 积分商品商城分类列表 */
      getGoodsCatrgory() {
        API_goodsCategory.getGoodsCategoryLevelList(0, { categoryLevel: this.categoryLevel }).then((response) => {
          this.exchangeGoodsCatrgoryList = response.data
          this.loading = false
        }).catch(() => this.$message.error('获取分类出错，请稍后再试！'))
      },

      /** 积分商品商城分类 改变时触发*/
      changeExangeCategory(val) {

      },

      /** 文件列表移除文件时的钩子*/
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },

      /** 点击已上传的文件链接时的钩子*/
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogImage = true
      },

      /** 图片上传之前的校验  */
      beforeAvatarUpload(file) {
        const isType = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isType) {
          this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传商品相册图片大小不能超过 1MB!')
        }
        return isType && isLt1M
      },

      /** 积分兑换开关值改变时触发 */
      handleSwitchexchange(val) {
        this.isShowExchangeConfig = val
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

  /*编辑基本信息*/
  .el-form {
    padding-bottom: 80px;
    .el-form-item {
      width: 100%;
      text-align: left;
    }
  }

  /*平铺*/
  div.base-info-item {
    h4 {
      padding:0 10px;
      border: 1px solid #ddd;
      background-color: #f8f8f8;
      font-weight: bold;
      color: #333;
      font-size: 14px;
      line-height: 40px;
      text-align: left;
    }
    .el-form-item {
      margin-left: 5%;
      width: 22%;
      min-width: 300px;
    }
    .el-form-item__content {
      margin-left: 120px;
      text-align: left;
    }
    p.goods-group-manager {
      padding-left: 12.3%;
      text-align: left;
      color: #999;
      font-size: 13px;
    }

    /*积分提示*/
    p.exchange-tip {
      margin:0;
      padding: 10px;
      padding-left: 15%;
      text-align: left;
      color: #8a6d3b;
      background: #fcf8e3;
      border: 1px solid #faebcc;
    }
  }

  /*折叠面板*/
  .el-collapse-item {
    /deep/ .el-collapse-item__header {
      text-align: left;
      background-color: #f8f8f8;
      padding:0 10px;
      font-weight: bold;
      color: #333;
      font-size: 14px;
    }
    .el-form-item {
      margin-left: 5%;
      width: 25%;
    }
    /deep/ .el-form-item__content {
      margin-left: 120px;
      text-align: left;
    }
    p.goods-group-manager {
      padding-left: 12%;
      text-align: left;
      color: #999;
    }
    /*积分提示*/
    p.exchange-tip {
      margin:0;
      padding: 10px;
      padding-left: 12%;
      text-align: left;
      color: #8a6d3b;
      background: #fcf8e3;
      border: 1px solid #faebcc;
    }
    /deep/ .el-collapse-item__content {
      padding: 10px 0;
      text-align: left;
    }
  }

  /*商品描述*/
  #editor {
    min-height: 500px;
  }

  /** 底部步骤 */
  .footer {
    width: 88.7%;
    padding: 10px;
    background-color: #ffc;
    position: fixed;
    bottom: 0px;
    left: 10%;
    text-align: center;
  }

</style>
