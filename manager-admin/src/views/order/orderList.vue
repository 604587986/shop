<template>
	<div>
		<en-table-layout :tableData="tableData.data" :loading="loading">
			<div slot="toolbar" class="inner-toolbar">
				<div class="toolbar-btns">
					<el-select v-model="params.order_type" placeholder="请选择订单类型" @change="orderSearch" disabled>
						<el-option label="普通订单" :value="0"></el-option>
						<el-option label="服务订单" :value="1"></el-option>
					</el-select>

					<el-select v-if="params.order_type===1" v-model="params.first_money_state" clearable placeholder="预付款是否完成" @change="orderSearch">
						<el-option label="未完成" value="no"></el-option>
						<el-option label="已完成" value="yes"></el-option>
					</el-select>

					<el-select v-if="params.order_type===1" v-model="params.end_money_state" clearable placeholder="尾款是否完成" @change="orderSearch">
						<el-option label="未完成" value="no"></el-option>
						<el-option label="已完成" value="yes"></el-option>
					</el-select>
				</div>
				<div class="toolbar-search">
					<en-table-search @search="searchEvent" @advancedSearch="advancedSearchEvent" advanced advancedWidth="465" placeholder="请输入订单编号">
						<template slot="advanced-content">
							<el-form ref="advancedForm" :model="advancedForm" label-width="80px">
								<el-form-item label="收货人">
									<el-input size="medium" v-model="advancedForm.ship_name" clearable></el-input>
								</el-form-item>
								<el-form-item label="商品名称">
									<el-input size="medium" v-model="advancedForm.goods_name" clearable></el-input>
								</el-form-item>
								<el-form-item label="买家名字">
									<el-input size="medium" v-model="advancedForm.buyer_name" clearable></el-input>
								</el-form-item>
								<el-form-item label="选择店铺">
									<en-shop-picker @changed="(shop) => { advancedForm.seller_id = shop.shop_id }"/>
								</el-form-item>
								<el-form-item label="下单日期">
									<el-date-picker
										v-model="advancedForm.order_time_range"
										type="daterange"
										align="center"
										:editable="false"
										unlink-panels
										range-separator="-"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
										value-format="timestamp"
										:picker-options="{ disabledDate(time) { return time.getTime() > Date.now() }, shortcuts: MixinPickerShortcuts }"
									></el-date-picker>
								</el-form-item>
								<el-form-item label="订单状态" v-if="params.order_type!==1">
									<el-select v-model="advancedForm.order_status" placeholder="请选择" clearable>
										<el-option label="新订单" value="NEW"/>
										<el-option label="已确认" value="CONFIRM"/>
										<el-option label="已付款" value="PAID_OFF"/>
										<el-option label="已发货" value="SHIPPED"/>
										<el-option label="已收货" value="ROG"/>
										<el-option label="已完成" value="COMPLETE"/>
										<el-option label="已取消" value="CANCELLED"/>
										<el-option label="售后中" value="AFTE_SERVICE"/>
									</el-select>
								</el-form-item>
							</el-form>
						</template>
					</en-table-search>
				</div>
			</div>
			<template slot="table-columns">
				<!--订单编号-->
				<el-table-column prop="sn" label="订单编号"/>
				<!--下单时间-->
				<el-table-column prop="create_time" :formatter="MixinUnixToDate" label="下单时间"/>
				<!--订单总额-->
				<el-table-column label="订单总额">
					<template slot-scope="scope">{{ scope.row.order_amount | unitPrice('￥') }}</template>
				</el-table-column>
				<!--收货人-->
				<el-table-column prop="ship_name" label="收货人" v-if="params.order_type === 0"/>
				<el-table-column prop="ship_name" label="预约人" v-if="params.order_type === 1"/>
				<!--订单状态-->
				<el-table-column prop="order_status_text" label="订单状态" v-if="params.order_type === 0"/>
				<!--付款状态-->
				<el-table-column prop="pay_status_text" label="付款状态" v-if="params.order_type === 0"/>
				<!-- 预付款 -->
				<el-table-column prop="first_money" label="预付款(元)" v-if="params.order_type === 1"/>>
				<!-- 尾款 -->
				<el-table-column prop="end_money" label="尾款(元)" v-if="params.order_type === 1"/>
				<!--发货状态-->
				<el-table-column prop="ship_status_text" label="发货状态" v-if="params.order_type === 0"/>
				<!--支付方式-->
				<el-table-column label="支付方式">
					<template slot-scope="scope">{{ scope.row.payment_type | paymentTypeFilter }}</template>
				</el-table-column>
				<!--订单来源-->
				<el-table-column prop="client_type" label="订单来源"/>
				<!--操作-->
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button v-if="scope.row.order_status !== 'COMPLETE'" size="mini" type="primary" @click="handleOperateOrder(scope.$index, scope.row)">操作</el-button>
						<el-button v-else size="mini" @click="handleOperateOrder(scope.$index, scope.row)">查看</el-button>
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
	</div>
</template>

<script>
/* eslint-disable */
import * as API_order from "@/api/order";

export default {
	name: "orderList",
	data() {
		return {
			// 列表loading状态
			loading: false,
			// 列表参数
			params: {
				page_no: 1,
				page_size: 10,
				order_type: 1,
				first_money_state: null,
				end_money_state: null
			},
			// 列表数据
			tableData: "",
			// 高级搜索数据
			advancedForm: {}
		};
	},
	filters: {
		paymentTypeFilter(val) {
			return val === "ONLINE" ? "在线支付" : "货到付款";
		}
	},
	mounted() {
		this.GET_OrderList();
	},
	activated() {
		this.GET_OrderList();
	},
	methods: {
		/** 分页大小发生改变 */
		handlePageSizeChange(size) {
			this.params.page_size = size;
			this.GET_OrderList();
		},

		/** 分页页数发生改变 */
		handlePageCurrentChange(page) {
			this.params.page_no = page;
			this.GET_OrderList();
		},

		/** 搜索事件触发 */
		searchEvent(data) {
			this.params = {
				...this.params,
				order_sn: data
			};
			Object.keys(this.advancedForm).forEach(
				key => delete this.params[key]
			);
			this.params.page_no = 1;
			this.GET_OrderList();
		},

		/** 高级搜索事件触发 */
		advancedSearchEvent() {
			this.params = {
				...this.params,
				...this.advancedForm
			};
			delete this.params.start_time;
			delete this.params.end_time;
			if (this.advancedForm.order_time_range) {
				this.params.start_time = this.advancedForm.order_time_range[0];
				this.params.end_time = this.advancedForm.order_time_range[1];
			}
			delete this.params.order_sn;
			delete this.params.order_time_range;
			this.params.page_no = 1;
			this.GET_OrderList();
		},

		/** 查看、操作订单 */
		handleOperateOrder(index, row) {
			if (row.order_type !== 1) {
				this.$router.push({
					name: "orderDetail",
					params: {
						sn: row.sn,
						callback: this.GET_OrderList
					}
				});
			}else{
				this.$router.push({
					name: "serviceOrderDetail",
					params: {
						sn: row.sn,
						callback: this.GET_OrderList
					}
				});
			}
		},

		/** 获取订单列表 */
		GET_OrderList() {
			this.loading = true;
			const params = this.MixinClone(this.params);
			if (params.start_time && params.end_time) {
				params.start_time = parseInt(params.start_time / 1000);
				params.end_time = parseInt(params.end_time / 1000);
			}
			if (params.seller_id === 0) delete params.seller_id;
			API_order.getOrderList(params)
				.then(response => {
					this.loading = false;
					this.tableData = response;
				})
				.catch(() => {
					this.loading = false;
				});
		},

		/** 订单筛选 */
		orderSearch(val) {
			if (val === 0) {
				this.params.first_money_state = null;
				this.params.end_money_state = null;
			} else if (val === 1) {
				delete this.advancedForm.order_status
				delete this.params.order_status
			}

			this.params.page_no = 1;
			this.GET_OrderList();
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
	padding: 0 20px;
}

.goods-image {
	width: 50px;
	height: 50px;
}
</style>

