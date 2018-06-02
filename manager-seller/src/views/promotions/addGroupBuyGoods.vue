<template>
  <div class="bg-group-buy">
    <el-form ref="gruopBuyForm" :model="gruopBuyForm" label-width="120px" >
      <!--团购活动-->
      <el-form-item label="团购活动">
        <el-select v-model="gruopBuyForm.group_activity" placeholder="选择要参加的团购活动及时间段">
          <el-option v-for="item in gruopBuyActivitys" :key="item.activity_id"
            :label="item.activity_desc"
            :value="item.activity_id">
          </el-option>
        </el-select>
        <span class="activity-tip">选择要参加的团购活动及时间段</span>
      </el-form-item>
      <!--团购名称-->
      <el-form-item label="团购名称">
        <el-input
          v-model="gruopBuyForm.group_buy_name"
          :style="{ width:inputLength +'px' }"
          placeholder="团购标题名称长度最多可输入30个字符"></el-input>
        <span class="activity-tip">团购标题名称长度最多可输入30个字符</span>
      </el-form-item>
      <!--团购副标题-->
      <el-form-item label="团购副标题">
         <el-input
           v-model="gruopBuyForm.group_buy_subtitle"
           :style="{ width:inputLength +'px' }"
           placeholder="团购副标题针对团购特殊说明"></el-input>
        <span class="activity-tip">团购副标题针对团购特殊说明</span>
      </el-form-item>
      <!--团购商品-->
      <el-form-item label="团购商品">
        <el-button type="primary" @click="chooseGroupBuyGoods" v-if="gruopBuyForm.goods_name">
          {{ gruopBuyForm.goods_name }}
        </el-button>
        <el-button type="primary" @click="chooseGroupBuyGoods" v-else>
          选择商品
        </el-button>
        <span class="activity-tip">点击上方输入框从已发布商品中选择要参加团购的商品，
          如没有找到您想要参加团购的商品，请重新发布该商品后再选择。</span>
      </el-form-item>
      <!--店铺价格-->
      <el-form-item label="店铺价格" v-if="gruopBuyForm.goods_name">
        <span>{{ gruopBuyForm.shop_price | unitPrice('￥')}}</span>
      </el-form-item>
      <!--团购价格-->
      <el-form-item label="团购价格">
        <el-input
          type="text"
          :style="{ width:inputLength +'px' }"
          v-model.number="gruopBuyForm.group_buy_price"></el-input>
        <span class="activity-tip">团购价格为该商品参加活动时的促销价格必须是0.01~1000000之间的数字(单位：元)团购价格应包含邮费，
          团购商品系统默认不收取邮费</span>
      </el-form-item>
      <!--团购图片-->
      <el-form-item label="团购图片">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :file-list="fileList"
          :on-success="handleSuccess"
          list-type="picture">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <img :src="gruopBuyForm.group_buy_image" alt="" class="goods-image">
      </el-form-item>
      <!--商品库存数-->
      <el-form-item label="商品库存数" v-if="gruopBuyForm.goods_name">
        <span>{{ gruopBuyForm.goods_stock}}</span>
      </el-form-item>
      <!--商品总数-->
      <el-form-item label="商品总数">
        <el-input :style="{ width:inputLength +'px' }"  v-model.number="gruopBuyForm.goods_summary"></el-input>
        <span class="activity-tip">团购商品总数应等于或小于该商品库存数量，请提前确认要参与活动的商品库存数量足够充足</span>
      </el-form-item>
      <!--团购类别-->
      <el-form-item label="团购类别">
        <el-select v-model="gruopBuyForm.group_buy_category" placeholder="请选择">
          <el-option
            v-for="item in groupBuyCategorys"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="activity-tip">请选择团购商品的所属类别</span>
      </el-form-item>
      <!--所属区域-->
      <el-form-item label="所属区域" v-if="gruopBuyForm.goods_name">
        <el-select v-model="gruopBuyForm.the_area" placeholder="请选择">
          <el-option
            v-for="item in theAreas"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--虚拟数量-->
      <el-form-item label="虚拟数量">
        <el-input
          type="text"
          v-model="gruopBuyForm.goods_virtual"
          :style="{ width:inputLength +'px' }"
          placeholder="虚拟购买数量，只用于前台显示，不影响成交记录"></el-input>
        <span class="activity-tip">虚拟购买数量，只用于前台显示，不影响成交记录</span>
      </el-form-item>
      <!--限购数量-->
      <el-form-item label="限购数量">
        <el-input
          type="text"
          v-model="gruopBuyForm.goods_limit_buy"
          :style="{ width:inputLength +'px' }"
          placeholder="每个买家ID可团购的最大数量，不限数量请填 '0'"></el-input>
        <span class="activity-tip">每个买家ID可团购的最大数量，不限数量请填 '0'</span>
      </el-form-item>
      <!--团购介绍-->
      <el-form-item label="团购介绍">
        <UE :defaultMsg ="gruopBuyForm.group_buy_intro"></UE>
      </el-form-item>
      <!--查看用户注册协议-->
      <el-form-item>
        <el-checkbox :checked="allowAgreement">
          我已阅读
          <el-button type="text" @click="lookAgreement">团购服务协议</el-button>
          并同意</el-checkbox>
      </el-form-item>
      <!--操作-->
      <el-form-item>
        <el-button type="primary" @click="handleSaveGroupBuyGoods">提交</el-button>
      </el-form-item>
    </el-form>
    <!--商品选择器-->
    <en-goods-selector
      :show="showDialog"
      :api="goods_api"
      :maxLength="maxsize"
      @confirm="refreshFunc" @closed="showDialog = false"/>
    <!--用户注册协议-->
    <el-dialog
      title="用户注册协议"
      :visible.sync="showAgreement"
      width="50%"
      center
      :before-close="handleAgreementClose">
      <div>
        <h4>甲乙双方确认并同意本条款中对于各名词的解释及定义，并同意按照该定义履行相关义务</h4>
        <p>1、团购：通过互联网渠道，一定数量的消费者组团，以较低价格购买同一种商品/服务的商业活动。</p>

        <p> 2、javashop商城：系提供团购交易服务的网络服务平台。</p>

        <p> 3、团购信息：甲方通过javashop商城发布的，在javashop商城网页面上展示的甲方商品/服务信息(如团购价、商品/服务描述、电子券有效期、团购规则等)。该信息为甲方就前述商品/服务向团购用户发出的要约， 一旦团购用户通过javashop商城确认同意购买甲方该商品/服务，即视为甲方与团购用户达成了团购合同。</p>

        <p> 4、团购订单：即团购合同，系团购用户通过美团网与甲方间达成的购买商品/服务的合同。</p>

        <p> 5、优惠券：指甲方提供给团购用户的商品/服务的消费凭证，团购用户可以凭其获取相应的商品/服务; 优惠券的形式包括但不限于javashop商城页面、短信、电子邮件等。</p>

        <p> 6、优惠券消费数：团购用户已实际消费的优惠券数量。因甲方提供的商品/服务需要在javashop商城验证平台上进行验证， 优惠券消费数以javashop商城验证平台上已标记消费的数量为准。</p>

        <p> 7、门店价：签订本合同时，甲方提供的商品/服务不参加团购活动时(即在实体经营场所销售/提供时)的单份销售价格。</p>

        <p> 8、团购价：甲方提供的商品/服务参加团购活动时的单份销售价格。</p>

        <p> 9、代收团购款项：javashop商城实际经营者代甲方收取的团购用户通过javashop商城向甲方支付的已实际消费的优惠券对应的款项。该款项由javashop商城实际经营者代收后转付至乙方，乙方扣除本合同约定的服务费后支付给甲方。计算标准为：团购价乘以优惠券消费数。</p>

        <p> 10、服务费：为了实现甲方进入javashop商城开展经营活动、进行团购交易之目的，乙方为甲方提供本合同第二条约定之服务收取的相关费用。</p>

        <p> 11、服务费价格：团购用户每实际消费一张优惠券，甲方应向乙方支付的服务费数额。</p>

        <p> 12、结算价：针对每一张已实际消费的优惠券，乙方于代收团购款项中扣除应收取的服务费后，应支付给甲方的数额。计算标准为：团购价减服务费价格。</p>

        <p> 13、代收净额：对应团购用户实际消费的优惠券数量，乙方应支付给甲方的实际结算款项。计算标准为：结算价乘以优惠券消费数。</p>

        <p>  14、本协议仅为javashop商城团购协议示例，不作为正式协议使用。</p>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="danger" @click="showAgreement = false, allowAgreement = true ">同意并继续</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_groupBuy from '@/api/groupBuy'
  import { UE } from '@/components'
  import { GoodsSelector } from '@/plugins/selector/vue'
  export default {
    name: 'addGroupBuyGoods',
    components: {
      [UE.name]: UE,
      [GoodsSelector.name]: GoodsSelector
    },
    data() {
      return {
        /** input框长度*/
        inputLength: 300,

        /** 是否同意协议*/
        allowAgreement: true,

        /** 显示用户注册协议框*/
        showAgreement: false,

        /** 商品选择器最大长度*/
        maxsize: 1,

        /** 商品选择器列表api*/
        goods_api: process.env.BASE_API + '/shop/seller/goods/search.do',

        /** 显示/隐藏商品选择器 */
        showDialog: false,

        /** 团购类别*/
        groupBuyCategorys: [
          { value: 0, label: '不限' },
          { value: 1, label: '商家活动' },
          { value: 2, label: '年货采购' }
        ],

        /** 所属区域 */
        theAreas: [
          { value: 0, label: '不限' },
          { value: 1, label: '0' },
          { value: 2, label: '15' },
          { value: 3, label: 'sd ' }
        ],

        /** 团购活动*/
        gruopBuyActivitys: [],

        /** 上传的图片*/
        fileList: [],

        /** 团购活动表单*/
        gruopBuyForm: {
          /** 活动ID */
          activity_id: '',

          /** 活动名称 */
          activity_name: '',

          /** 团购名称 */
          group_buy_name: '',

          /** 团购副标题 */
          group_buy_subtitle: '',

          /** 团购商品ID */
          goods_id: '',

          /** 团购商品名称 */
          goods_name: '',

          /** 店铺价格 */
          shop_price: '',

          /** 团购价格 */
          group_buy_price: '',

          /** 团购图片 */
          group_buy_image: '',

          /** 商品库存数 */
          goods_stock: '',

          /** 商品总数 */
          goods_summary: '',

          /** 团购类别 */
          group_buy_category: '',

          /** 所属区域 */
          the_area: '',

          /** 虚拟数量 */
          goods_virtual: '',

          /** 限购数量 */
          goods_limit_buy: '',

          /** 团购介绍 */
          group_buy_intro: ''
        }
      }
    },
    mounted() {
      this.GET_AllGroupBuyActivitys()
    },
    methods: {
      /** 获取团购活动列表*/
      GET_AllGroupBuyActivitys() {
        API_groupBuy.getGroupBuyActivityList().then(response => {
          this.gruopBuyActivitys = response.data
        })
      },

      /** 显示商品选择器*/
      chooseGroupBuyGoods() {
        this.showDialog = true
      },

      /** 保存商品选择器选择的商品 */
      refreshFunc(val) {
        this.gruopBuyForm.goods_name = val.goods_name
      },

      /** 图片上传成功时的钩子*/
      handleSuccess(response, file, fileList) {
        this.gruopBuyForm.goods_image = response.url
      },

      /** 查看用户注册协议*/
      lookAgreement() {
        this.showAgreement = true
      },

      /** 用户注册协议关闭触发*/
      handleAgreementClose() {
        this.showAgreement = false
      },

      /** 新增团购商品*/
      handleSaveGroupBuyGoods() {
        API_groupBuy.addGroupBuyGoods(this.gruopBuyForm).then(response => {
          this.$message.success('添加成功')
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .el-form-item  {
    padding-left: 12%;
    border-bottom: 1px dotted #E6E6E6;
  }
  .bg-group-buy {
    background-color: #fff;
    border: 1px solid #9a9a9a;
    margin: 10px;
    padding: 25px;
  }
  /*商品图片*/
  .goods-image {
    width: 200px;
    height: 200px;
  }
  /*提示信息*/
  span.activity-tip {
    display: block;
    color: #bbb;
    font-size: 12px;
    line-height: 22px;
  }
</style>

