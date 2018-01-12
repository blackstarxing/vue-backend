<template>
	<div>
		<div class="g-hd">
			<h3 class="m-title-tag">筛选查询</h3>
			<div class="m-search-box">
			  	<el-input placeholder="请输球队或联赛名搜索" prefix-icon="el-icon-search" class="m-search-input"></el-input>
			  	<el-date-picker
			  		v-model="date"
			      	type="daterange"
			      	align="right"
			      	unlink-panels
			      	range-separator="至"
			      	start-placeholder="开赛日期（起）"
			      	end-placeholder="开赛日期（止）"
			      	:picker-options="pickerOptions"
			      	class="m-search-date">
			    </el-date-picker>
			  	<el-select v-model="select" placeholder="盘口" class="m-select">
				    <el-option
				      	v-for="item in accounts"
				      	:key="item.value"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
				</el-select>
				<el-select v-model="select" placeholder="过关方式" class="m-select">
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
			<h3 class="m-title-tag">历史方案</h3>
			<el-table :data="tableData" border stripe fit style="width: 100%;" class="m-table" :cell-style="handleBackground">
				<el-table-column
			      	type="index"
					label="序号"
					width="100">
			    </el-table-column>
			    <el-table-column
					prop="date"
					label="日期">
			    </el-table-column>
			    <el-table-column
					prop="name"
					label="比赛序号">
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
					label="投注内容">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="盘口类型">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="上下盘">
			    </el-table-column>
			    <el-table-column
					prop="odds"
					label="比赛日期">
			    </el-table-column>
			    <el-table-column
					prop="odds"
					label="比赛时间">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="过关方式">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="投注金额">
			    </el-table-column>
			    <el-table-column label="操作" width="232">
      				<template slot-scope="scope">
        				<el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">明细</el-button>
        				<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      				</template>
				</el-table-column>
			</el-table>
			<el-pagination
				background
				layout="prev, pager, next"
				:total="1000" class="m-page">
			</el-pagination>
		</div>
		<!-- 方案明细弹框 -->
		<el-dialog
			title="方案明细"
			:visible.sync="dialogVisible"
			width="934px" @close="reset">
			<el-table :data="gridData" border fit class="m-table m-low-table" style="width: 100%;">
				    <el-table-column property="host" label="单注" width="480"></el-table-column>
				    <el-table-column property="concede" label="单倍奖金"></el-table-column>
				    <el-table-column property="guest" label="投注金额"></el-table-column>
				    <el-table-column width="140px" property="date" label="预计奖金"></el-table-column>
			</el-table>
			<el-button type="primary" @click="reset" class="u-submit">确定</el-button>
		</el-dialog>
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
				gridData: [{
					host: 0.8,
					concede: -0.5,
					guest: 0.4,
					date: '2017/11/30 22:00'
				}, {
					host: 0.8,
					concede: -0.5,
					guest: 0.4,
					date: '2017/11/30 22:00'
				}, {
					host: 0.8,
					concede: -0.5,
					guest: 0.4,
					date: '2017/11/30 22:00'
				}, {
					host: 0.8,
					concede: -0.5,
					guest: 0.4,
					date: '2017/11/30 22:00'
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
				}],
				dialogVisible: false
			}
		},
		methods: {
			handleBackground: function ({row, column, rowIndex, columnIndex}) {
				if (columnIndex === 4) {
					return {'background-color': this.tableData[rowIndex].color, 'color': '#fff'}
				}
				if (columnIndex === 10) {
					return {'color': this.tableData[rowIndex].state === 1 ? '#67C23A' : '#E6A23C'}
				}
			},
			handleDetail (index, row) {
				this.dialogVisible = true
			},
			// 退单
			handleDelete (index, row) {
				console.log('删除')
			},
			reset () {
				this.dialogVisible = false
			}
		}
	}
</script>
<style scoped lang="less">
	.m-input-suffix{
		width: 465px;
		margin: 20px auto;
	}
	.el-input-number{
		width: 240px;
	}
	#app .el-dialog .u-submit{
		margin-top: 22px;
		margin-left: 774px;
	}
</style>