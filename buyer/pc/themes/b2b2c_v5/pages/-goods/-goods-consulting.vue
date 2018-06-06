<template>
  <div id="goods-consulting" class="goods-consulting">
    <div class="inner">
      <span class="consu-tip">因厂家更改商品包装、场地、附配件等不做提前通知，且每位咨询者购买、提问时间等不同。为此，客服回复的咨询只针对当前当天咨询问题，给您带来的不便还请谅解，谢谢！</span>
      <a href="javascript:;" class="want-consu-btn" @click="handleShowPrompt">我要咨询</a>
    </div>
  </div>
</template>

<script>
  /**
   * 商品咨询模块
   * 这里可以对商品进行咨询
   */
  import * as API_Comments from '@/api/comments'
  export default {
    name: "goods-consulting",
    props: ['goodsId'],
    data() {
      return {
        params: {
          page_no: 1,
          page_size: 10
        },
        consulting: []
      }
    },
    mounted() {
      this.GET_Consulting()
    },
    methods: {
      /** 显示咨询窗 */
      handleShowPrompt() {
        this.$layer.prompt({
          formType: 2,
          title: '向商家咨询',
          maxlength: 150,
          area: ['300px', '60px']
        }, (value, index, elem) => {
          if (!value.trim()) return false
          layer.close(index)
          API_Comments.consultating(this.goodsId, value).then(() => {
            this.$message.success('提交成功，请等待审核')
          })
        })
      },
      /** 获取咨询列表 */
      GET_Consulting() {
        API_Comments.getConsultations(this.params).then(response => {
          console.log(response)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .goods-consulting {
    background-color: #fff;
    padding: 40px 30px 30px;
    .inner {
      position: relative;
      border: 1px solid #d7d7d7;
      height: 67px;
      padding: 10px 10px 20px 10px;
      background: url(~/assets/images/icon-goods-consulting-tip.png) no-repeat 10px 10px;
    }
    .consu-tip {
      color: #9b827d;
      height: 36px;
      left: 70px;
      line-height: 18px;
      position: absolute;
      top: 40px;
      width: 600px;
    }
    .want-consu-btn {
      padding: 5px 20px;
      background-color: #da4f49;
      border-color: #c44742;
      color: #fff;
      position: absolute;
      top: 30px;
      right: 30px;
      &:hover { background-color: #ba4943 }
    }
  }
</style>
