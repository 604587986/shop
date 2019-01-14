<template>
	<div class="all">
		<div style="padding:10px">
			<el-input placeholder="请填写商品名称" v-model="params.key_word" @keyup.native.enter="search" style="width:300px">
				<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
			</el-input>
		</div>
		<el-table :data="tableData" v-loading="loading">
			<el-table-column prop="goods_id" label="商品编号" width></el-table-column>
			<el-table-column label="商品名称">
				<template slot-scope="scope">
					<a href="javascript:;" target="_blank" style="color: #00a2d4;">{{ scope.row.goods_name }}</a>
				</template>
			</el-table-column>
			<el-table-column prop="shop_name" label="店铺名称" width></el-table-column>
			<el-table-column prop="num" label="当前排队人数" width></el-table-column>
			<el-table-column label="创建时间" width>
				<template slot-scope="scope">
					<router-link :to="{name:'lineupList',query:{goods_id:scope.row.goods_id}}">
						<el-button type="primary">排队列表</el-button>
					</router-link>
				</template>
			</el-table-column>
		</el-table>
		<div style="text-align:right">
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
</template>
<script>
/* eslint-disable */
import * as API_lineup from "@/api/lineup";

export default {
	name: "lineup_goods",
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
				//关键字
				key_word: ""
			}
		};
	},
	mounted() {
		this.GET_GoodsList();
	},
	methods: {
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
		/** 获取商品列表*/
		GET_GoodsList() {
			this.loading = true;
			API_lineup.getGoodsList(this.params).then(response => {
				this.loading = false;
				this.pageData = {
					page_no: response.page_no,
					page_size: response.page_size,
					data_total: response.data_total
				};
				this.tableData = response.data;
			});
		},
		search() {
			this.params.page_no = 1;
			this.GET_GoodsList();
		}
	}
};
</script>

<style lang="scss" scoped>
.all {
	min-height: 100%;
	background: #fff;
}
</style>
