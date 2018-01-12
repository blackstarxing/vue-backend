<template>
	<div>
		<div class="g-hd">
			<h3 class="m-title-tag">筛选查询</h3>
			<div class="m-search-box">
			  	<el-select v-model="select" placeholder="请选择平台" class="m-select">
				    <el-option
				      	v-for="item in accounts"
				      	:key="item.value"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
				</el-select>
			    <el-button type="primary" class="u-search">查询</el-button>
			</div>
		</div>
		<div class="g-bd f-cb">
			<h3 class="m-title-tag">账号列表</h3>
			<el-table :data="tableData" border stripe fit style="width: 100%;" class="m-table" :cell-style="handleBackground">
				<el-table-column
			      	type="index"
					label="序号"
					width="100">
			    </el-table-column>
			    <el-table-column
					prop="date"
					label="下单账号">
			    </el-table-column>
			    <el-table-column
					prop="name"
					label="平台">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="累计下单">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="账户余额">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="累计金额">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="充值次数">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="是否可提款">
			    </el-table-column>
			    <el-table-column label="操作" width="232">
      				<template slot-scope="scope">
        				<el-button size="mini" type="primary" @click="handleHistory(scope.$index, scope.row)">明细</el-button>
        				<el-button size="mini" type="primary" @click="handleRecharge(scope.$index, scope.row)">充值</el-button>
      				</template>
				</el-table-column>
			</el-table>
			<el-pagination
				background
				layout="prev, pager, next"
				:total="1000" class="m-page">
			</el-pagination>
		</div>
		<!-- 完成订单提示框 -->
		<el-dialog
			title="完成"
			:visible.sync="dialogVisible"
			width="640px" @close="reset">
			<div class="m-input-suffix">
			  	<label for="" class="u-label">下单账号</label>
			  	{{'XX@XX.com'}}
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">当前余额</label>
			  	<span>￥100</span>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">实际投注</label>
			  	<el-input placeholder="请输入投注金额" v-model="bet_amount"></el-input>
			</div>
			<el-button type="primary" @click="handleSubmit" class="u-submit">提 交</el-button>
			<el-button @click="dialogVisible = false">取 消</el-button>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				select: '',
				accounts: [{
					value: '1',
					label: 'ss'
				}],
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区',
					odds: 2.51,
					color: '#333',
					state: 1
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区',
					odds: 2.51,
					color: '#666',
					state: 2
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区',
					odds: 2.51,
					color: '#233',
					state: 2
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区',
					odds: 2.51,
					color: '#878',
					state: 1
				}],
				dialogVisible: false,
				dialogVisible2: false,
				order_odds: '',
				min_odds: '',
				bet_amount: '',
				textarea: ''
			}
		},
		methods: {
			handleBackground: function ({row, column, rowIndex, columnIndex}) {
				if (columnIndex === 7) {
					return {'color': this.tableData[rowIndex].state === 1 ? '#67C23A' : '#E6A23C'}
				}
			},
			// 充值
			handleRecharge (index, row) {
				this.dialogVisible = true
			},
			// 历史明细
			handleHistory (index, row) {
				this.$router.push({path: '/orders/historyorders', query: {id: '1'}})
			},
			handleSubmit () {

			},
			handleSubmit2 () {

			},
			reset () {
				this.min_odds = 0
				this.bet_amount = ''
			}
		}
	}
</script>
<style scoped lang="less">
	.m-select{
		width: 230px;
		margin-right: 40px;
	}
	.m-input-suffix{
		width: 356px;
		margin: 20px auto;
	}
	.m-textarea-suffix{
		width: 475px;
		.el-textarea{
			width: 360px;
			vertical-align: top;
		}
	}
	.el-input-number{
		width: 240px;
	}
	.u-submit{
		width: 120px;
		margin-left: 224px;
		margin-bottom: 30px;
	}
</style>