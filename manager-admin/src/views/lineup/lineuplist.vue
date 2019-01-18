<template>
	<en-table-layout :tableData="tableData.data" :loading="loading">
		<!-- <div slot="toolbar" class="inner-toolbar">
      <div class="toolbar-btns"></div>
      <div class="toolbar-search">
        <en-table-search
          @search="searchEvent"
          @advancedSearch="advancedSearchEvent"
          advanced
        >
          <template slot="advanced-content">
            <el-form ref="advancedForm" :model="advancedForm" label-width="80px">
              <el-form-item label="商品名称">
                <el-input size="medium" v-model="advancedForm.goods_name" clearable></el-input>
              </el-form-item>
              <el-form-item label="商品编号">
                <el-input size="medium" v-model="advancedForm.goods_sn" clearable></el-input>
              </el-form-item>
              <el-form-item label="店铺名称">
                <el-input size="medium" v-model="advancedForm.seller_name" clearable></el-input>
              </el-form-item>
              <el-form-item label="商品类别">
                <en-category-picker @changed="categoryChanged"/>
              </el-form-item>
            </el-form>
          </template>
        </en-table-search>
      </div>
		</div>-->
		<template slot="table-columns">
			<el-table-column prop="sort_num" label="排名" width/>
			<el-table-column prop="member_code" label="用户账号" width/>
			<el-table-column label="商品名称" width>
				<template slot-scope="scope">
					<a :href="MixinBuyerDomain + '/goods/' + scope.row.goods_id" class="goods_name" target="_blank">{{ scope.row.goods_name }}</a>
				</template>
			</el-table-column>
			<el-table-column prop="order_sn" label="订单号" width>
				<template slot-scope="scope">
					<router-link style="color:#4183c4" :to="{name:'serviceOrderDetail',params:{sn:scope.row.order_sn}}">{{scope.row.order_sn}}</router-link>
				</template>
			</el-table-column>
			<el-table-column prop="order_price" label="订单金额" width/>
			<el-table-column prop="assistance_money" label="当前助力金额" width/>
			<el-table-column label="进度" width>
				<template slot-scope="scope">{{scope.row.bili}}%</template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<router-link :to="{name:'lineupDetail',query:{member_id:scope.row.member_id,name:scope.row.member_name}}">
						<el-button type="primary">帮π成员</el-button>
					</router-link>
					<router-link :to="{name:'helpList',query:{member_id:scope.row.member_id,goods_id:scope.row.goods_id,name:scope.row.member_name,id:scope.row.id}}">
						<el-button type="primary">助力列表</el-button>
					</router-link>
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
</template>

<script>
/* eslint-disable */
import * as API_lineup from "@/api/lineup";

export default {
	name: "lineupList",
	data() {
		return {
			/** 列表loading状态 */
			loading: false,

			/** 列表参数 */
			params: {
				page_no: 1,
				page_size: 10,
				goods_id: this.$route.query.goods_id
			},

			/** 商品列表数据 */
			tableData: "",

			/** 高级搜索数据 */
			advancedForm: {
				goods_name: "",
				goods_sn: "",
				seller_name: "",
				category_path: ""
			}
		};
	},
	mounted() {
		this.GET_LineupList();
	},
	activated() {
		this.GET_LineupList();
	},
	methods: {
		/** 分页大小发生改变 */
		handlePageSizeChange(size) {
			this.params.page_size = size;
			this.GET_LineupList();
		},

		/** 分页页数发生改变 */
		handlePageCurrentChange(page) {
			this.params.page_no = page;
			this.GET_LineupList();
		},

		/** 搜索事件触发 */
		searchEvent(data) {
			this.params = {
				...this.params,
				keyword: data
			};
			this.params.page_no = 1;
			Object.keys(this.advancedForm).forEach(
				key => delete this.params[key]
			);
			this.GET_LineupList();
		},

		/** 高级搜索事件触发 */
		advancedSearchEvent() {
			this.params = {
				...this.params,
				...this.advancedForm
			};
			delete this.params.keyword;
			this.params.page_no = 1;
			this.GET_LineupList();
		},

		/** 高级搜索中 分类选择组件值发生改变 */
		categoryChanged(data) {
			this.advancedForm.category_path = data.category_path || "";
		},

		GET_LineupList() {
			this.loading = true;
			API_lineup.getLineupList(this.params)
				.then(response => {
					this.loading = false;
					this.tableData = response;
				})
				.catch(() => (this.loading = false));
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
</style>
