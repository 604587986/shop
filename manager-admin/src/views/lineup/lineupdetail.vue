<template>
	<div>
		<div class="my-table-wrap">
			<div class="title">
				<i class="el-icon-star-on"></i>
				<span>{{$route.query.name?$route.query.name:"未知"}}的帮π成员（{{pageData.data_total}}人）</span>
			</div>
			<div class="table">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="uname" label="姓名"></el-table-column>
					<el-table-column prop="mobile" label="手机号码"></el-table-column>
					<el-table-column label="邀请注册日期">
						<template slot-scope="scope">{{ scope.row.create_time | unixToDate }}</template>
					</el-table-column>
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
	name:"lineupDetail",
	data() {
		return {
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
	margin-top: 20px;
	.title {
		color: #495060;
	}
	.table {
		margin-top: 20px;
	}
}
</style>

