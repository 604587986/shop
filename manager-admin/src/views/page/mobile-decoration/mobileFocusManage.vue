<template>
  <div class="container">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in focusList" :key="item.focus_id">
        <img :src="item.focus_image" @mouseover="showEditBtn" @mouseout="showEditBtn">
        <div></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import * as API_Decoration from '@/api/decoration'
  export default {
    name: 'mobileFocusManage',
    data() {
      return {
        focusList: []
      }
    },
    created() {
      this.GET_FocusList()
    },
    methods: {
      showEditBtn(event) {
        if (event.type === 'mouseover') {
          console.log('mouseover')
        } else {
          console.log('mouseout')
        }
      },
      GET_FocusList() {
        API_Decoration.getFocusList('PC').then(response => {
          this.focusList = response
        }).catch(error => console.log(error))
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .container {
    background-color: #fff;
    padding: 10px;

    /deep/ .el-carousel__container {
      height: 500px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
