<template>
	<div>
		<div class="my-table-wrap">
			<div class="title">
				<i class="el-icon-star-on"></i>
				<span>{{$route.query.name?$route.query.name:"未知"}}的助力列表（{{pageData.data_total}}人）</span>
			</div>
			<div class="table">
				<div class="filter"> 
					<el-select v-model="params.type_name" @change="search" clearable>
						<el-option value="gangs" label="帮π助力"></el-option>
						<el-option value="ordinary" label="自然助力"></el-option>
					</el-select>
				</div>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="member_name" label="账号"></el-table-column>
					<el-table-column prop="nick_name" label="昵称"></el-table-column>
					<el-table-column prop="assistance_money" label="助力金额"></el-table-column>
					<el-table-column prop="goods_name" label="助力商品"></el-table-column>
					<el-table-column label="助力时间">
						<template slot-scope="scope">{{ scope.row.add_time | unixToDate }}</template>
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
    name:"helpList",
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
				type_name:null,
				superior_id: this.$route.query.member_id,
				goods_id: this.$route.query.goods_id,
				line_id:this.$route.query.id,
			}
		};
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			this.loading = true;
			API_lineup.getHelpList(this.params).then(response => {
				console.log(this.params);
				
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
		search(val){
			this.params.page_no = 1;
			this.getData()
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
		background: #fff;
		.filter{
			padding: 10px;
		}
	}
}
</style>

