<template>
	<div>
		<div class="g-hd">
			<h3 class="m-title-tag">筛选查询</h3>
			<div class="m-search-box">
			  	<el-date-picker
			  		v-model="date"
			      	type="daterange"
			      	align="right"
			      	unlink-panels
			      	range-separator="至"
			      	start-placeholder="下单时间（起）"
			      	end-placeholder="下单时间（止）"
			      	:picker-options="pickerOptions"
			      	class="m-search-date">
			    </el-date-picker>
			    <el-button type="primary" class="u-search">查询</el-button>
			</div>
		</div>
		<div class="g-bd f-cb">
			<h3 class="m-title-tag">账号明细</h3>
			<el-table :data="tableData" border stripe style="width: 100%;" class="m-table">
				<el-table-column
			      	type="index"
					label="序号"
					width="100px">
			    </el-table-column>
			    <el-table-column
					prop="date"
					label="负责人">
			    </el-table-column>
			    <el-table-column
					prop="name"
					label="账号">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="平台">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="下单日期">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="比赛日期">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="联赛"
					width="110">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="主队">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="客队">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="盘口">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="赔率">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="投注金额">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="比分">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="输赢">
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

		}
	}
</script>
<style scoped lang="less">

</style>