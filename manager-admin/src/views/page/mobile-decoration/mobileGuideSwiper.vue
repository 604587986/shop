<template>
	<div class="container">
		<div class="swiper-box">
			<swiper :options="swiperOption">
				<swiper-slide v-for="(focus, index) in focusList" :key="index">
					<div class="focus-item">
						<img v-if="isImg(focus.pic_url)" :src="focus.pic_url" class="focus-image">
						<video v-else :src="focus.pic_url" controls class="focus-image"></video>
						<div class="opt-box">
							<i class="opt-btn el-icon-edit-outline" title="编辑" @click="handleEditFocus(focus, index)"></i>
							<i class="opt-btn el-icon-delete" title="删除" @click="handleDeleteFocus(focus, index)"></i>
						</div>
					</div>
				</swiper-slide>
				<div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
				<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
				<div class="swiper-button-next swiper-button-white" slot="button-next"></div>
			</swiper>
			<el-button type="primary" class="add-focus-btn" @click="hanldeAddFocus">新增引导图</el-button>
		</div>
		<file-picker :show="dialogImageShow" :default-data="defaultImageData" @close="dialogImageShow = false" @confirm="handleImagePickerConfirm" :limit="1"/>
	</div>
</template>

<script>
/* eslint-disable */
  import * as API_Floor from '@/api/floor'
  import FilePicker from '@/components/filePicker'

  export default {
    name: 'mobileGuideSwiper',
    components:{
      FilePicker
    },
    data() {
      return {
        client_type: 'GUIDE',
        focusList: [],
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        /** 图片编辑器 显示 */
        dialogImageShow: false,
        defaultImageData: null,
        /** 正在编辑的 */
        curEditIndex: null
      }
    },
    created() {
      this.GET_FocusList()
    },
    methods: {
      /** 新增焦点图片 */
      hanldeAddFocus() {
        this.curEditIndex = null
        this.dialogImageShow = true
      },
      /** 编辑焦点图 */
      handleEditFocus(focus, index) {
        this.curEditIndex = index
        
        this.defaultImageData = [{
          id: focus.id,
          url: focus.pic_url,
          name:focus.pic_url,

          opt: {
            opt_type: focus.operation_type,
            opt_value: focus.operation_param
          }
        }]
        this.dialogImageShow = true
      },
      /** 删除焦点图 */
      handleDeleteFocus(focus, index) {
        this.$confirm('确定要删除这个引导图吗？', '提示', { type: 'warning' }).then(() => {
          API_Floor.deleteFocus(focus.id).then(() => {
            this.$message.success('删除成功！')
            this.focusList.splice(index, 1)
          })
        }).catch(() => {})
      },
      /** 图片上传组件确认 */
      handleImagePickerConfirm(fileList) {
        this.dialogImageShow = false
        const { curEditIndex } = this
        const file = fileList[0]
        
        const params = {
          client_type: this.client_type,
          pic_url: file.response.url,
          operation_type: file.operation.opt_type,
          operation_param: file.operation.opt_value,
          type_name:file.response.ext

        }
        if (curEditIndex) {
          API_Floor.editFocus(this.focusList[curEditIndex].id, params).then(response => {
            this.GET_FocusList()
            this.$message.success('修改成功！')
          })
        } else {
          API_Floor.addFocus(params).then(response => {
            this.focusList.push(response)
            this.$message.success('添加成功！')
          })
        }
      },
      GET_FocusList() {
        this.loading = true
        API_Floor.getFocus(this.client_type).then(response => {
          this.loading = false
          this.focusList = response
        }).catch(() => { this.loading = false })
      },
      //判断文件后缀是否是图片
      isImg(upFileName){
        upFileName?upFileName.toLowerCase():"";

        var index1=upFileName.lastIndexOf(".");
        var index2=upFileName.length;
        var suffix=upFileName.substring(index1+1,index2);//后缀名
        if(suffix === '' || suffix === 'jpg' || suffix === 'jpeg' || suffix === 'png' || suffix === 'gif' || suffix === 'bmp'){
          return true;
        }else{
          return false;
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
.container {
	background-color: #fff;
	padding: 10px;

	.swiper-box {
		position: relative;
		margin: 100px auto;
		text-align: center;
		width: 375px;
		height: 667px;
		background-color: #fff;
		box-shadow: 0 0 15px 1px #ccc;
    .swiper-button-prev{
      top: 10%;
    }
    .swiper-button-next{
      top: 10%;      
    }
	}
	.swiper-container {
		width: 100%;
		height: 100%;
	}
	.focus-item {
		position: relative;
	}
	.focus-item,
	.focus-image {
		width: 100%;
		height: 100%;
	}
	.opt-box {
		position: absolute;
		top: 0;
    bottom: 80%;
		left: 0;
		z-index: 2;
		width: 100%;
		background-color: rgba(0, 0, 0, 0);
	}
	.opt-box,
	.opt-btn {
		transition: all 0.3s ease;
	}
	.opt-btn {
		float: left;
		display: block;
		position: relative;
		width: 50%;
		height: 100%;
		opacity: 0;
		color: #fff;
		font-size: 25px;
		line-height: 80px * 1.5;
	}
	.focus-item:hover {
		.opt-box {
			background-color: rgba(0, 0, 0, 0.3);
		}
		.opt-btn {
			opacity: 1;
		}
	}
	.opt-btn:hover {
		background-color: rgba(0, 0, 0, 0.5);
		&.el-icon-delete {
			background-color: rgba(255, 0, 0, 0.8);
		}
		cursor: pointer;
	}
	.add-focus-btn {
		position: absolute;
		left: 50%;
		bottom: -50px;
		margin-left: -(92px / 2);
	}
}
</style>
