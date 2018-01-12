<template>
	<div>
		<el-tabs v-model="activeName">
			<el-tab-pane label="未完成" name="unfinished">
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
					    <el-button type="primary" class="u-search">查询</el-button>
					</div>
				</div>
				<div class="g-bd f-cb">
					<h3 class="m-title-tag f-cb">记录列表<el-button type="primary" class="u-search f-fr" icon="el-icon-plus">添加</el-button></h3>
					<el-table :data="tableData" border stripe fit style="width: 100%;" class="m-table" :cell-style="handleBackground">
						<el-table-column
							label="序号"
							prop="name"
							width="100">
					    </el-table-column>
					    <el-table-column
							prop="date"
							label="日期">
					    </el-table-column>
					    <el-table-column
							prop="name"
							label="盘口类型">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="联赛">
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
							label="投注球队">
					    </el-table-column>
					    <el-table-column
							prop="odds"
							label="投注盘口">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="赔率">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="金额">
					    </el-table-column>
					    <el-table-column
							prop="name"
							label="补单">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="平衡点">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="实时赔率">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="实时盈亏">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="比分">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="预期奖金">
						</el-table-column>
					    <el-table-column label="操作">
		      				<template slot-scope="scope">
		        				<el-button size="mini" type="primary" @click="handleComplete(scope.$index, scope.row)">完成</el-button>
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
					  	<label for="" class="u-label">实际赔率</label>
					  	<el-input-number v-model="order_odds" controls-position="right" :min="min_odds" :step="0.01"></el-input-number>
					</div>
					<div class="m-input-suffix">
					  	<label for="" class="u-label">实际投注</label>
					  	<el-input placeholder="请输入投注金额" v-model="bet_amount"></el-input>
					</div>
					<el-button type="primary" @click="handleSubmit" class="u-submit">提 交</el-button>
					<el-button @click="dialogVisible = false">取 消</el-button>
				</el-dialog>
			</el-tab-pane>
			<el-tab-pane label="已完成" name="finished">
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
					    <el-button type="primary" class="u-search">查询</el-button>
					</div>
				</div>
				<div class="g-bd f-cb">
					<h3 class="m-title-tag">记录列表</h3>
					<el-table :data="tableData" show-summary border stripe fit style="width: 100%;" class="m-table" :cell-style="handleBackground">
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
							label="盘口类型">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="联赛">
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
							label="投注球队">
					    </el-table-column>
					    <el-table-column
							prop="odds"
							label="投注盘口">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="赔率">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="金额">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="比分">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="补单输赢">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="中奖金额">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="盈亏">
					    </el-table-column>
					</el-table>
					<el-pagination
						background
						layout="prev, pager, next"
						:total="1000" class="m-page">
					</el-pagination>
				</div>
			</el-tab-pane>
		</el-tabs>
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
				activeName: 'unfinished',
				date: '',
				select: '',
				accounts: [{
					value: '1',
					label: 'ss'
				}],
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市',
					odds: 2.51,
					color: '#333',
					state: 1,
					parlay: 2,
					records_index: 0
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市',
					odds: 2.51,
					color: '#666',
					parlay: 2,
					records_index: 1
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市',
					odds: 2.51,
					color: '#233',
					parlay: 1,
					records_index: 0
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市',
					odds: 2.51,
					color: '#233',
					parlay: 3,
					records_index: 0
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市',
					odds: 2.51,
					color: '#878',
					parlay: 3,
					records_index: 1
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市',
					odds: 2.51,
					color: '#878',
					parlay: 3,
					records_index: 2
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
				if (columnIndex === 4) {
					return {'background-color': this.tableData[rowIndex].color, 'color': '#fff'}
				}
				if (columnIndex === 10) {
					return {'color': this.tableData[rowIndex].state === 1 ? '#67C23A' : '#E6A23C'}
				}
			},
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
	.m-input-suffix{
		width: 465px;
		margin: 20px auto;
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