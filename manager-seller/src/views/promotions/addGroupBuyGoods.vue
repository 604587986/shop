<template>
  <div class="bg-group-buy">
    <el-form ref="gruopBuyForm" :model="gruopBuyForm" label-width="120px" >
      <el-form-item label="团购活动">
        <el-select v-model="gruopBuyForm.group_activity" placeholder="选择要参加的团购活动及时间段">
          <el-option v-for="item in gruopBuyActivitys" :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="activity-tip">选择要参加的团购活动及时间段</span>
      </el-form-item>
      <el-form-item label="团购名称">
        <el-input
          v-model="gruopBuyForm.activity_name"
          :style="{ width:inputLength +'px' }"
          placeholder="团购标题名称长度最多可输入30个字符"></el-input>
        <span class="activity-tip">团购标题名称长度最多可输入30个字符</span>
      </el-form-item>
      <el-form-item label="团购副标题">
         <el-input
           v-model="gruopBuyForm.activity_subname"
           :style="{ width:inputLength +'px' }"
           placeholder="团购副标题针对团购特殊说明"></el-input>
        <span class="activity-tip">团购副标题针对团购特殊说明</span>
      </el-form-item>
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
      <el-form-item label="店铺价格" v-if="gruopBuyForm.goods_name">
        <span>{{ gruopBuyForm.shop_price | unitPrice('￥')}}</span>
      </el-form-item>
      <el-form-item label="团购价格">
        <el-input
          type="text"
          :style="{ width:inputLength +'px' }"
          v-model.number="gruopBuyForm.group_buy_price"></el-input>
        <span class="activity-tip">团购价格为该商品参加活动时的促销价格必须是0.01~1000000之间的数字(单位：元)团购价格应包含邮费，
          团购商品系统默认不收取邮费</span>
      </el-form-item>
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
        <img :src="gruopBuyForm.goods_image" alt="" class="goods-image">
      </el-form-item>
      <el-form-item label="商品库存数" v-if="gruopBuyForm.goods_name">
        <span>{{ gruopBuyForm.goods_stock_num}}</span>
      </el-form-item>
      <el-form-item label="商品总数">
        <el-input :style="{ width:inputLength +'px' }"  v-model.number="gruopBuyForm.goods_summary"></el-input>
        <span class="activity-tip">团购商品总数应等于或小于该商品库存数量，请提前确认要参与活动的商品库存数量足够充足</span>
      </el-form-item>
      <el-form-item label="团购类别">
        <el-select v-model="gruopBuyForm.group_buy_type" placeholder="请选择">
          <el-option
            v-for="item in groupBuyTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="activity-tip">请选择团购商品的所属类别</span>
      </el-form-item>
      <!--<el-form-item label="所属区域">-->
        <!--<el-select v-model="gruopBuyForm.group_buy_type" placeholder="请选择">-->
          <!--<el-option-->
            <!--v-for="item in groupBuyTypes"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item label="虚拟数量">
        <el-input
          type="text"
          v-model="gruopBuyForm.virtual_quantity"
          :style="{ width:inputLength +'px' }"
          placeholder="虚拟购买数量，只用于前台显示，不影响成交记录"></el-input>
        <span class="activity-tip">虚拟购买数量，只用于前台显示，不影响成交记录</span>
      </el-form-item>
      <el-form-item label="限购数量">
        <el-input
          type="text"
          v-model="gruopBuyForm.limit_buy_quantity"
          :style="{ width:inputLength +'px' }"
          placeholder="每个买家ID可团购的最大数量，不限数量请填 '0'"></el-input>
        <span class="activity-tip">每个买家ID可团购的最大数量，不限数量请填 '0'</span>
      </el-form-item>
      <el-form-item label="团购介绍">
        <UE></UE>
      </el-form-item>
      <!--查看用户注册协议-->
      <el-form-item>
        <el-checkbox :checked="allowAgreement">
          我已阅读
          <el-button type="text" @click="lookAgreement">团购服务协议</el-button>
          并同意</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveGroupBuyGoods">提交</el-button>
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
      width="30%"
      center
      :before-close="handleAgreementClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="danger" @click="showAgreement = false, allowAgreement = true ">同意并继续</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_activityGoods from '@/api/activityGoods'
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
        // goods_api: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/list',

        /** 显示/隐藏商品选择器 */
        showDialog: false,

        /** 团购类别*/
        groupBuyTypes: [
          { value: 0, label: '不限' },
          { value: 1, label: '商家活动' },
          { value: 2, label: '年货采购' }
        ],

        /** 团购活动*/
        gruopBuyActivitys: [
          { value: 0, label: '随便啊啊吃饭恒都是' }
        ],

        /** 上传的图片*/
        fileList: [],

        /** 团购活动表单*/
        gruopBuyForm: {
          /** 团购活动*/
          group_activity: '',

          /** 活动名称 */
          activity_name: '',

          /** 活动副标题 */
          activity_subname: '',

          /** 团购类别*/
          group_buy_type: 0,

          /** 审核状态 */
          examine_status: '',

          /** 活动时间（开始时间） */
          start_time: '',

          /** 结束时间 */
          end_time: '',

          /** 活动别名 */
          alias: '',

          /** 活动状态 */
          activity_status: '',

          /** 商品ID */
          goods_id: '',

          /** 商品名称 */
          goods_name: '',

          /** 商品图片 */
          goods_image: '',

          /** 店铺价格*/
          shop_price: '',

          /** 团购价格 */
          group_buy_price: '',

          /** 商品库存数*/
          goods_stock_num: 0,

          /** 商品总数*/
          goods_summary: '',

          /** 虚拟数量*/
          virtual_quantity: 0,

          /** 限购数量*/
          limit_buy_quantity: 0,

          /** 是否已报名（团购）  1已报名 0未报名*/
          is_signed: ''
        }
      }
    },
    mounted() {
      const _id = this.$route.params.goods_id
      if (_id && _id !== -1) {
        // this.GET_GroupBuyGoodsDetails(_id)
      }
      this.GET_AllGroupBuyActivitys()
    },
    methods: {
      /** 获取状态不是已审核的团购活动列表*/
      GET_AllGroupBuyActivitys() {

      },

      /** 获取团购商品详情*/
      GET_GroupBuyGoodsDetails(id) {
        API_activityGoods.getGroupBuyGoodsDetails(id).then(response => {
          this.gruopBuyForm = { ...response.data }
        }).catch(error => {
          console.log(error)
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

      /** 保存团购商品*/
      saveGroupBuyGoods(ids) {
        const _ids = ids || ''
        API_activityGoods.saveGroupBuyGoods(_ids, this.gruopBuyForm).then(response => {
          this.$message.success('提交成功')
        }).catch(error => {
          console.log(error)
          this.$message.error('提交失败，请稍后再试！')
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

