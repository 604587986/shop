<template>
	<el-dialog title="新增优惠券" :visible.sync="couponShow" width="30%" @close="closeModal">
		<el-form :model="couponForm" ref="couponForm" label-position="right" :rules="rules" label-width="120px">
			<el-form-item label="优惠券名称：" prop="title">
				<el-input
					auto-complete="off"
					v-model="couponForm.title"
					@change="couponForm.title = couponForm.title.trim()"
					placeholder="请输入10个以内的汉字"
					maxlength="10"
					label-width="100"
				></el-input>
			</el-form-item>
			<el-form-item label="优惠券面额：" prop="coupon_price">
				<el-input placeholder="请输入优惠券面额,长度最多10个字符" maxlength="10" v-model="couponForm.coupon_price">
					<template slot="prepend">¥</template>
				</el-input>
			</el-form-item>
			<el-form-item label="买家需消费：" prop="coupon_threshold_price">
				<el-input placeholder="请输入内容,长度最多10个字符" maxlength="10" v-model="couponForm.coupon_threshold_price">
					<template slot="prepend">¥</template>
				</el-input>
			</el-form-item>
			<el-form-item label="使用期限：" style="text-align: left" prop="coupon_time_limit">
				<el-date-picker
					v-model="couponForm.coupon_time_limit"
					type="daterange"
					range-separator="-"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					clearable
					:default-time="[MixinDefaultTime]"
					:picker-options="{disabledDate(time) { return time.getTime() < Date.now() - 8.64E7 }}"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="发行量：" prop="create_num">
				<el-input v-model="couponForm.create_num" maxlength="10" label-width="100"></el-input>
			</el-form-item>
			<el-form-item label="每人限领：" prop="limit_num">
				<el-input v-model="couponForm.limit_num" maxlength="10" label-width="100"></el-input>
			</el-form-item>
			<el-form-item label="商品：" prop>
				<el-button type="primary" @click="innerVisible = true">选择商品</el-button>
			</el-form-item>
			<el-form-item label="已选商品：" prop>
				<div v-for="item in currentSelectedGoods" :key="item.goods_id" class="selected-goods-list">
					{{item.goods_name}}
					<i class="el-icon-close selected-goods-item" @click="delGoods(item.goods_id)"></i>
				</div>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="handleCancelCoupon">取 消</el-button>
			<el-button type="primary" @click="handleReserveCoupon">确 定</el-button>
		</div>
		<el-dialog width="60%" title="选择商品" :visible.sync="innerVisible" append-to-body>
			<div>
				<el-input placeholder="请填写商品名称" v-model="params.keyword" @keyup.native.enter="search">
					<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
				</el-input>
			</div>
			<el-table :data="tableData" @row-click="selectGoods" class="my-goods-table" :row-class-name="tableRowClassName" v-loading="loading">
				<el-table-column label="选择" width="100">
					<template slot-scope="scope">
						<i class="el-icon-check" v-if="isSelected(scope.row.goods_id)"></i>
					</template>
				</el-table-column>
				<el-table-column label="图片" width="120">
					<template slot-scope="scope">
						<img :src="scope.row.thumbnail" class="goods-image">
					</template>
				</el-table-column>
				<el-table-column label="商品名称">
					<template slot-scope="scope">
						<a href="javascript:;" target="_blank" style="color: #00a2d4;">{{ scope.row.goods_name }}</a>
					</template>
				</el-table-column>
				<el-table-column label="价格" width="100">
					<template slot-scope="scope">{{ scope.row.price | unitPrice('￥') }}</template>
				</el-table-column>
				<el-table-column label="库存" width="80">
					<template slot-scope="scope">{{ scope.row.quantity }}件</template>
				</el-table-column>
				<el-table-column label="可用库存" width="80">
					<template slot-scope="scope">{{ scope.row.enable_quantity }}件</template>
				</el-table-column>
				<el-table-column label="创建时间" width="120">
					<template slot-scope="scope">{{ scope.row.create_time | unixToDate('yyyy-MM-dd hh:mm') }}</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="handlePageSizeChange"
				@current-change="handlePageCurrentChange"
				:current-page="pageData.page_no"
				:page-sizes="[10, 20, 50, 100]"
				:page-size="pageData.page_size"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageData.data_total"
			></el-pagination>
			<div style="text-align:right;margin-top:20px">
				<el-button type="primary" @click="innerVisible = false">确定</el-button>
			</div>
		</el-dialog>
	</el-dialog>
</template>

<script>
/* eslint-disable */
import * as API_coupon from "@/api/coupon";
import * as API_goods from "@/api/goods";

import { RegExp } from "~/ui-utils";
export default {
	name: "newCoupon",
	props: {
		/** 是否显示优惠券弹框 */
		couponModelShow: {
			type: Boolean,
			default: false
		},

		/** 当前优惠券Id */
		currentcouponId: {
			type: [Number, String],
			default: () => {
				return "";
			}
		}
	},
	watch: {
		couponModelShow: {
			handler: function(val) {
				this.couponShow = val;
			}
		},
		couponShow() {
			!this.couponShow && this.$emit("saveCoupon", false);
		},
		currentcouponId: {
			handler: function() {
				if (this.currentcouponId) {
					this.GET_couponDetails();
				} else {
					this.couponForm = {
						/** 优惠券名称*/
						title: "",

						/** 优惠券面额（元）*/
						coupon_price: "",

						/** 使用限制（元）*/
						coupon_threshold_price: "",

						/** 使用时限 */
						coupon_time_limit: [],

						/** 发行量（个） */
						create_num: "",

						/** 每人限领 */
						limit_num: ""
					};
				}
			},
			immediate: true
		}
	},
	mounted() {
		if (this.currentcouponId) {
			this.GET_couponDetails;
		} else {
			this.couponForm = {
				/** 优惠券名称*/
				title: "",

				/** 优惠券面额（元）*/
				coupon_price: "",

				/** 使用限制（元）*/
				coupon_threshold_price: "",

				/** 使用时限 */
				coupon_time_limit: [],

				/** 发行量（个） */
				create_num: "",

				/** 每人限领 */
				limit_num: ""
			};
		}

		this.GET_GoodsList();
	},
	data() {
		const checkCouponPrice = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("请输入优惠券面额"));
			}
			setTimeout(() => {
				if (!RegExp.money.test(value)) {
					callback(new Error("请输入正确的面额"));
				} else {
					callback();
				}
			}, 500);
		};
		const checkCouponThresholdPrice = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("请输入消费门槛金额"));
			}
			setTimeout(() => {
				if (!RegExp.money.test(value)) {
					callback(new Error("请输入正确的金额"));
				} else {
					callback();
				}
			}, 500);
		};
		const checkCreateNum = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("请输入发行量"));
			}
			setTimeout(() => {
				if (!RegExp.integer.test(value)) {
					callback(new Error("请输入正整数"));
				} else {
					callback();
				}
			}, 500);
		};
		const checkLimitNum = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("请输入没人限领数量"));
			}
			setTimeout(() => {
				if (!RegExp.integer.test(value)) {
					callback(new Error("请输入正整数"));
				} else {
					callback();
				}
			}, 500);
		};

		return {
			// 已选择的商品
			currentSelectedGoods: [],
			/** 表格数据 */
			tableData: [],
			/** 表格loading */

			loading: false,
			/** 列表分页数据 */

			pageData: [],
			/** 列表参数 */
			params: {
				page_no: 1,
				page_size: 10,
				is_services: 1,
				//关键字
				keywrod: ""
			},

			/** 是否显示选择商品弹框 */
			innerVisible: false,

			/** 是否显示优惠券弹框 */
			couponShow: false,

			/** 日期选择器选项 */
			pickoptions: {
				disabledDate: time => {
					return time.getTime() < Date.now();
				}
			},

			/** 优惠券表单*/
			couponForm: {
				/** 优惠券名称*/
				title: "",

				/** 优惠券面额（元）*/
				coupon_price: "",

				/** 使用限制（元）*/
				coupon_threshold_price: "",

				/** 使用时限 */
				coupon_time_limit: [],

				/** 发行量（个） */
				create_num: "",

				/** 每人限领 */
				limit_num: ""
			},

			/** 表单校验规则 */
			rules: {
				/** 优惠券名称 */
				title: [
					{
						required: true,
						message: "请输入优惠券名称",
						trigger: "blur"
					}
				],

				/** 优惠券面额 */
				coupon_price: [
					{
						required: true,
						message: "请输入优惠券面额",
						trigger: "blur"
					},
					{ validator: checkCouponPrice, trigger: "blur" }
				],

				/** 消费门槛 */
				coupon_threshold_price: [
					{
						required: true,
						message: "请输入消费门槛",
						trigger: "blur"
					},
					{ validator: checkCouponThresholdPrice, trigger: "blur" }
				],

				/** 使用期限 */
				coupon_time_limit: [
					{
						required: true,
						message: "请输入使用期限",
						trigger: "blur"
					},
					{ type: "array", trigger: "blur" }
				],

				/** 发行量 */
				create_num: [
					{
						required: true,
						message: "请输入优惠券发行量",
						trigger: "blur"
					},
					{ validator: checkCreateNum, trigger: "blur" }
				],

				/** 每人限领 */
				limit_num: [
					{
						required: true,
						message: "请输入限领数量",
						trigger: "blur"
					},
					{ validator: checkLimitNum, trigger: "blur" }
				]
			}
		};
	},
	methods: {
		/** 查询一个优惠券详情 */
		GET_couponDetails() {
			API_coupon.getCouponDetails(this.currentcouponId, {}).then(
				response => {
					this.couponForm = {
						...response,
						coupon_time_limit: [
							parseInt(response.start_time) * 1000,
							parseInt(response.end_time) * 1000
						]
					};
					this.couponForm.goods
						? (this.currentSelectedGoods = this.couponForm.goods)
						: [];
				}
			);
		},

		/** 取消 */
		handleCancelCoupon() {
			this.$emit("saveCoupon", false);
		},

		/** 保存优惠券*/
		handleReserveCoupon() {
			this.$refs["couponForm"].validate(valid => {
				if (valid) {
					const _params = {
						...this.couponForm,
						type_code: 1,
						start_time: this.couponForm.coupon_time_limit[0] / 1000,
						end_time: this.couponForm.coupon_time_limit[1] / 1000,
						goods_ids: this.currentSelectedGoods
							.map(i => {
								return i.goods_id;
							})
							.join()
					};
					delete _params.coupon_time_limit;
					this.$confirm(
						"优惠券参加的活动开始后优惠券不可编辑，是否确认？",
						"提示",
						{ type: "warning" }
					)
						.then(() => {
							if (this.currentcouponId) {
								API_coupon.modifyCoupons(
									this.currentcouponId,
									_params
								).then(() => {
									this.couponShow = false;
									this.$message.success("保存成功！");
									this.$emit("saveCoupon", true);
								});
							} else {
								API_coupon.addCoupons(_params).then(() => {
									this.couponShow = false;
									this.$message.success("保存成功！");
									this.$emit("saveCoupon", true);
								});
							}
						})
						.catch(() => {});
				} else {
					return false;
				}
			});
		},
		/** 获取商品列表*/
		GET_GoodsList() {
			this.loading = true;
			API_goods.getGoodsList(this.params).then(response => {
				this.loading = false;
				this.pageData = {
					page_no: response.page_no,
					page_size: response.page_size,
					data_total: response.data_total
				};
				this.tableData = response.data;
			});
		},
		/** 分页大小发生改变 */
		handlePageSizeChange(size) {
			this.params.page_size = size;
			this.GET_GoodsList();
		},
		/** 分页页数发生改变 */
		handlePageCurrentChange(page) {
			this.params.page_no = page;
			this.GET_GoodsList();
		},
		/** 选择商品 */
		selectGoods(row, event, column) {
			if (!this.isSelected(row.goods_id)) {
				this.currentSelectedGoods.push(row);
			} else {
				this.delGoods(row.goods_id);
			}
		},
		/**判断是否选择 */
		isSelected(id) {
			if (this.currentSelectedGoods.length) {
				for (let i in this.currentSelectedGoods) {
					if (this.currentSelectedGoods[i].goods_id === id) {
						return true;
					}
				}

				return false;
			}
		},
		/**删除列表中的商品 */
		delGoods(id) {
			for (let i in this.currentSelectedGoods) {
				if (this.currentSelectedGoods[i].goods_id === id) {
					this.currentSelectedGoods.splice(i, 1);
					return;
				}
			}
		},
		tableRowClassName({ row, rowIndex }) {
			if (this.isSelected(row.goods_id)) {
				return "selected-row";
			}
			return "";
		},
		closeModal() {
			this.$refs["couponForm"].resetFields();
			this.currentSelectedGoods = [];
		},
		search() {
			this.params.page_no = 1;
			this.GET_GoodsList();
		}
	}
};
</script>

<style lang="scss" type="scss" scoped>
.el-date-editor {
	width: 100%;
}
.selected-goods-list {
	position: relative;
	padding-right: 25px;
	.selected-goods-item {
		position: absolute;
		right: 10px;
		top: 10px;
		cursor: pointer;
		&:hover {
			color: #f56c6c;
		}
	}
}
</style>
<style lang="scss">
.my-goods-table {
	.selected-row {
		background: #67c23a;
		color: #fff;
		.el-icon-check {
			font-size: 24px;
			// color: #67c23a;
			font-weight: bold;
		}
		&:hover {
			color: inherit;
		}
	}

	.goods-image {
		width: 100%;
	}
}
</style>
