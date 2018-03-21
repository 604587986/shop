<template>
  <div class="bg-out">
    <el-button type="success">查看店铺</el-button>
    <hr/>
    <!--当前模板-->
    <p style="padding: 0 50px;">当前模板:</p>
    <div class="tpl-current-theme">
      <img :src="tpl_current.theme_image" alt="" class="shop-theme-image">
      <span class="tpl-name">模板名称:{{tpl_current.theme_name}}</span>
    </div>
    <!--模板列表-->
    <hr/>
    <div>
      <p style="padding: 0 50px;">模板列表:</p>
      <ul>
        <li v-for="item in tpl_list">
          <div class="tpl-theme">
            <img :src="item.theme_image" alt="" class="shop-theme-image" @click="chooseTheme(item)" :class='{"choosed-image":item.theme_id === tpl_choosed_id}'>
            <span class="tpl-name">模板名称:{{item.theme_name}}</span>
            <span class="tpl-preview">预览</span>
          </div>
        </li>
      </ul>
      <hr/>
      <div style="width: 100%;text-align: center;">
        <el-button type="success" @click="saveCurrrentTpl">保存修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API_ShopTheme from '@/api/shopTheme'
  export default {
    name: 'shopThemesPc',
    data() {
      return {
        /** 当前模板*/
        tpl_current: null,

        /** 当前选中的模板的id*/
        tpl_choosed_id: '',

        /** 模板列表*/
        tpl_list: null
      }
    },
    mounted() {
      this.GET_ShopThemesPc()
    },
    methods: {
      /** 获取PC店铺主题列表*/
      GET_ShopThemesPc() {
        API_ShopTheme.getShopThemeList({}).then(response => {
          this.tpl_list = response.data
          this.tpl_list.forEach(elem => {
            if (elem.selected === 1) {
              this.tpl_current = elem
            }
          })
        }).catch(error => { console.log(error) })
      },

      chooseTheme(item) {
        this.tpl_choosed_id = item.theme_id
      },
      /** 保存PC店铺主题*/
      saveCurrrentTpl() {
        this.$confirm(`确定要切换模板么?`, '确认信息')
          .then(() => {
            const params = {}
            API_ShopTheme.saveShopTheme(this.tpl_choosed_id, params).then(() => {
              this.$message.success('切换成功')
              this.GET_ShopThemesPc()
            }).catch((error) => {
              console.log(error)
              this.$message.error('切换失败，请稍后重试！')
            })
          })
          .catch(() => {})
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /*被选中的模板图片*/
  .choosed-image{
    border: 1px solid #5cb85c;
  }
  /*最外层*/
  .bg-out{
    background: #ffffff;
    padding: 15px;
  }
  /*图片*/
  .shop-theme-image{
    width: 100%;
    max-height:250px;
    max-width: 200px;
    cursor: pointer;
  }

  /*预览*/
  .tpl-preview{
    cursor: pointer;
    border: 1px solid #5cb85c !important;
  }

  /*模板主题*/
  ul{
    width: 80%;
    margin: 0 auto;
    padding: 10px 25px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    li{
      list-style: none;
    }
  }

  .tpl-current-theme{
    width: 80%;
    margin: 0 auto;
    padding: 10px 25px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    span{
      text-align: center;
      display: inline-block;
      margin-top:15px;
      width: 100%;
      max-width: 200px;
      background-color: #fcf8e3;
      border: 1px solid #f9dbcc;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
    }
  }

  .tpl-theme{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: stretch;
    span{
      text-align: center;
      display: inline-block;
      margin-top:15px;
      width: 100%;
      max-width: 200px;
      background-color: #fcf8e3;
      border: 1px solid #f9dbcc;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
    }
  }
</style>
