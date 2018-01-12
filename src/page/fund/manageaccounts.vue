<template>
	<div>
		<div class="g-hd">
			<h3 class="m-title-tag">筛选查询</h3>
			<div class="m-search-box">
			  	<el-input placeholder="请输入负责人名称" prefix-icon="el-icon-search" class="m-search-input"></el-input>
			  	<el-date-picker
			  		v-model="date"
			      	type="daterange"
			      	align="right"
			      	unlink-panels
			      	range-separator="至"
			      	start-placeholder="添加时间（起）"
			      	end-placeholder="添加时间（止）"
			      	:picker-options="pickerOptions"
			      	class="m-search-date">
			    </el-date-picker>
			    <el-select v-model="select" placeholder="平台" class="m-select">
				    <el-option
				      	v-for="item in accounts"
				      	:key="item.value"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
				</el-select>
				<el-select v-model="select" placeholder="全部" class="m-select">
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
			<h3 class="m-title-tag f-cb">账号管理列表<el-button type="primary" class="u-search f-fr" icon="el-icon-plus" @click="$router.push({path: '/fund/addaccount'})">添加</el-button></h3>
			<el-table :data="tableData" border stripe style="width: 100%;" class="m-table" :cell-style="handleBackground">
				<el-table-column
			      	type="index"
					label="序号"
					width="100px">
			    </el-table-column>
			    <el-table-column
					prop="date"
					label="账号">
			    </el-table-column>
			    <el-table-column
					prop="name"
					label="平台">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="负责人">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="输赢计算">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="充值优惠">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="有效流水反水"
					width="110">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="流水计算">
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
					label="待提金额">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="添加时间">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="投注状态">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="账户状态">
			    </el-table-column>
			    <el-table-column label="操作" width="280">
      				<template slot-scope="scope">
      					<el-button size="mini" type="primary" @click="$router.push({path: '/fund/accountdetail', query: {plan: 'private'}})">明细</el-button>
        				<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        				<el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">提醒</el-button>
      				</template>
				</el-table-column>
			</el-table>
			<el-pagination
				background
				layout="prev, pager, next"
				:total="1000" class="m-page">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick (picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
							picker.$emit('pick', [start, end])
						}
					}, {
						text: '最近一个月',
						onClick (picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
							picker.$emit('pick', [start, end])
						}
					}, {
						text: '最近三个月',
						onClick (picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
							picker.$emit('pick', [start, end])
						}
					}]
				},
				date: '',
				select: '',
				accounts: [{
					value: '1',
					label: 'ss'
				}],
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					odds: 2.51,
					color: '#333',
					state: 1
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
					odds: 2.51,
					color: '#666',
					state: 2
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
					odds: 2.51,
					color: '#233',
					state: 2
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					odds: 2.51,
					color: '#878',
					state: 1
				}]
			}
		},
		methods: {
			handleBackground: function ({row, column, rowIndex, columnIndex}) {
				if (columnIndex === 13) {
					return {'color': this.tableData[rowIndex].state === 1 ? '#67C23A' : '#E6A23C'}
				}
				if (columnIndex === 14) {
					return {'color': this.tableData[rowIndex].state === 1 ? '#67C23A' : '#E6A23C'}
				}
			},
			// 完成订单
			handleComplete (index, row) {
				this.dialogVisible = true
				this.min_odds = row.odds
			},
			// 退单
			handleCancel (index, row) {
				this.dialogVisible2 = true
				this.textarea = ''
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

</style>