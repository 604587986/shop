<template>
	<div>
		<div class="my-table-wrap">
			<div class="title">
				<i class="el-icon-star-on"></i>
				<span>帮派助力（6人）</span>
			</div>
			<div class="table">
				<el-table :data="tableData2" style="width: 100%">
					<el-table-column prop="name" label="姓名"></el-table-column>
					<el-table-column prop="phone" label="手机号码"></el-table-column>
					<el-table-column prop="date" label="邀请注册日期"></el-table-column>
					<el-table-column prop="num" label="订单数"></el-table-column>
					<el-table-column prop="price" label="消费金额"></el-table-column>
				</el-table>
				<div style="text-align:right;background:#fff">
					<el-pagination
						@size-change="handlePageSizeChange"
						@current-change="handlePageCurrentChange"
						:current-page="pageData.page_no"
						:page-sizes="[10, 20, 50, 100]"
						:page-size="pageData.page_size"
						layout="total, sizes, prev, pager, next, jumper"
						:total="pageData.data_total"
					></el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
/* eslint-disable */
import * as API_lineup from "@/api/lineup";

export default {
	data() {
		return {
			tableData1: [
				{
					price_1: 1000,
					price_2: 2000,
					price_3: 3000,
					price_4: 2300,
					price_5: 6000,
					price_6: 10000,
					progress: "40%"
				}
			],
			tableData2: [
				{
					name: "汪勇",
					phone: 18110372223,
					date: "2018-10-26",
					num: 1,
					price: 6000
				},
				{
					name: "汪勇",
					phone: 18110372223,
					date: "2018-10-26",
					num: 1,
					price: 6000
				},
				{
					name: "汪勇",
					phone: 18110372223,
					date: "2018-10-26",
					num: 1,
					price: 6000
				},
				{
					name: "汪勇",
					phone: 18110372223,
					date: "2018-10-26",
					num: 1,
					price: 6000
				},
				{
					name: "汪勇",
					phone: 18110372223,
					date: "2018-10-26",
					num: 1,
					price: 6000
				},
				{
					name: "汪勇",
					phone: 18110372223,
					date: "2018-10-26",
					num: 1,
					price: 6000
				}
			],
			loading: false,

			/** 表格数据 */
			tableData: [],

			/** 列表分页数据 */
			pageData: [],

			/** 列表参数 */
			params: {
				page_no: 1,
				page_size: 10,
				member_id: this.$route.query.member_id
			}
		};
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			this.loading = true;
			API_lineup.getMemberList(this.params).then(response => {
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
		}
	}
};
</script>
<style lang="scss" scoped>
.my-table-wrap {
	margin-top: 40px;
	.title {
		color: #495060;
	}
	.table {
		margin-top: 20px;
	}
}
</style>

