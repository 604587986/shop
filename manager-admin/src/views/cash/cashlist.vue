<template>
	<div>
		<en-table-layout :tableData="tableData.data" :loading="loading">
			<template slot="table-columns">
				<el-table-column prop="member_id" label="会员id" width/>
				<el-table-column prop="member" label="会员名称" width>
					<template slot-scope="scope">{{scope.row.member?scope.row.member.uname:''}}</template>
				</el-table-column>
				<el-table-column prop="real_name" label="真实姓名" width/>
				<el-table-column prop="money" label="提现金额" width/>
				<el-table-column prop="account_number" label="提现账户" width/>
				<el-table-column prop="receivables_model" label="账户类型" width/>
				<el-table-column label="申请时间" width>
					<template slot-scope="scope">{{ scope.row.add_time | unixToDate }}</template>
				</el-table-column>
				<el-table-column label="状态" width>
					<template slot-scope="scope">
						<el-tag type="info" v-if="scope.row.state === 0">未确认</el-tag>
						<el-tag type="info" v-else>已提现</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" v-if="scope.row.state === 0" @click="current_id = scope.row.id; dialogVisible = true">确认提现</el-button>
						<el-button size="mini" type="primary" v-else @click="currentDetail = scope.row.img_arry; detailVisible = true">查看</el-button>
					</template>
				</el-table-column>
			</template>

			<el-pagination
				v-if="tableData"
				slot="pagination"
				@size-change="handlePageSizeChange"
				@current-change="handlePageCurrentChange"
				:current-page="tableData.page_no"
				:page-sizes="[10, 20, 50, 100]"
				:page-size="tableData.page_size"
				layout="total, sizes, prev, pager, next, jumper"
				:total="tableData.data_total"
			></el-pagination>
		</en-table-layout>
		<el-dialog title="提现" :visible.sync="dialogVisible" @close="current_id = '';baseInfoForm.imgList=[]">
			<el-form :model="baseInfoForm">
				<el-form-item label="图片：" prop style="width: 90%;text-align: left;">
					<el-upload
						class="avatar-uploader goods-images"
						:action="MixinUploadApi"
						list-type="picture-card"
						multiple
						:file-list="goodsGalleryList"
						:on-preview="handlePictureCardPreview"
						:before-upload="beforeAvatarUpload"
						:on-remove="handleRemove"
						:on-success="handleSuccess"
					>
						<i class="el-icon-plus avatar-uploader-icon"></i>
						<div slot="tip" class="el-upload__tip">建议上传jpg/png文件，且不超过1MB</div>
					</el-upload>
					<el-dialog :visible.sync="dialogImage" append-to-body>
						<img width="100%" :src="dialogImageUrl" alt>
					</el-dialog>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submit">确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="详情" :visible.sync="detailVisible" @close="currentDetail=[]">
			<el-card :body-style="{ padding: '0px',textAlign:'center' }" v-for="(item,index) in currentDetail" :key="index">
				<img :src="item" class="image">
			</el-card>
		</el-dialog>
	</div>
</template>

<script>
/* eslint-disable */
import * as API_cash from "@/api/cash";

export default {
	name: "cashList",
	data() {
		return {
			/** 列表loading状态 */
			loading: false,

			/** 列表参数 */
			params: {
				page_no: 1,
				page_size: 10
			},

			/** 商品列表数据 */
			tableData: "",

			dialogVisible: false,
			detailVisible: false,

			current_id: "",
			baseInfoForm: {
				imgList: []
			},

			goodsGalleryList: [],
			dialogImage: false,
			dialogImageUrl: "",
			currentDetail:[]
		};
	},
	mounted() {
		this.GET_CashList();
	},
	activated() {
		this.GET_CashList();
	},
	methods: {
		/** 分页大小发生改变 */
		handlePageSizeChange(size) {
			this.params.page_size = size;
			this.GET_CashList();
		},

		/** 分页页数发生改变 */
		handlePageCurrentChange(page) {
			this.params.page_no = page;
			this.GET_CashList();
		},
		/** 点击已上传的文件链接时的钩子 放大 */
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogImage = true;
		},
		/** 图片上传之前的校验  */
		beforeAvatarUpload(file) {
			const isType =
				file.type === "image/jpeg" ||
				file.type === "image/jpg" ||
				file.type === "image/png";
			const isLt1M = file.size / 1024 / 1024 < 1;

			if (!isType) {
				this.$message.error("上传头像图片只能是 JPG/JPEG/PNG 格式!");
			}
			if (!isLt1M) {
				this.$message.error("上传商品相册图片大小不能超过 1MB!");
			}

			/** 重复校验*/
			const isExit = this.baseInfoForm.imgList.some(key => {
				return file.name === key.name;
			});
			if (isExit) {
				this.$message.error("图片已存在");
			}

			return isType && isLt1M && !isExit;
		},
		/** 文件列表移除文件时的钩子  图片删除校验*/
		handleRemove(file, fileList) {
			this.baseInfoForm.imgList.forEach((key, index) => {
				if (key.img_id !== -1) {
					if (key.img_id === file.img_id) {
						this.baseInfoForm.imgList.splice(index, 1);
					}
				} else {
					if (key.name === file.name) {
						this.baseInfoForm.imgList.splice(index, 1);
					}
				}
			});
			if (fileList.length <= 0) {
				this.baseInfoForm.imgList = [];
			}
		},

		/** 文件列表上传成功时的钩子  上传成功校验 */
		handleSuccess(response, file, fileList) {
			this.baseInfoForm.imgList.push({
				img_id: -1,

				original: response.url,

				url: response.url,

				sort: 0,

				name: response.name
			});
		},

		GET_CashList() {
			this.loading = true;
			API_cash.cashList(this.params)
				.then(response => {
					this.loading = false;
					this.tableData = response;
				})
				.catch(() => (this.loading = false));
		},
		submit() {
			let data = {};
			if (this.baseInfoForm.imgList.length) {
				data = {
					img_str: this.baseInfoForm.imgList
						.map(i => {
							return i.url;
						})
						.join()
				};
			} else {
				data = {
					img_str: ""
				};
			}

			API_cash.confirm(this.current_id, data);
		}
	}
};
</script>

<style type="text/scss" lang="scss" scoped>
/deep/ .el-table td:not(.is-left) {
	text-align: center;
}

.inner-toolbar {
	display: flex;
	width: 100%;
	justify-content: space-between;
}

.toolbar-search {
	margin-right: 10px;
}

.goods-image {
	width: 50px;
	height: 50px;
}
.goods_name {
	color: #4183c4;
	&:hover {
		color: #f42424;
	}
}
.image{
	max-width: 100%;
}
</style>
