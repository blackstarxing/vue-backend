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
					<h3 class="m-title-tag f-cb">记录列表<el-button type="primary" class="u-search f-fr" icon="el-icon-plus" @click="dialogVisible = true">添加</el-button></h3>
					<el-table :data="tableData" border fit style="width: 100%;" class="m-table" :cell-style="handleBackground" :span-method="objectSpanMethod">
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
							label="投注盘口">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="投注赔率">
					    </el-table-column>
					    <el-table-column
							prop="odds"
							label="比赛日期">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="比赛时间">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="过关方式">
					    </el-table-column>
					    <el-table-column
							prop="name"
							label="投注金额">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="返点">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="本金">
					    </el-table-column>
					    <el-table-column
							prop="address"
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
							prop="odds"
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
				<!-- 补单弹框 -->
				<el-dialog
					title="添加"
					:visible.sync="dialogVisible" @close="reset">
					<div v-if="firstStep">
						<div>
						  	<label for="" class="u-label">选择比赛</label>
						  	<el-select v-model="add_selected" placeholder="请选择" multiple :multiple-limit="3" class="m-select" @visible-change="handleChooseMatch">
							    <el-option
							      	v-for="item in add_select"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-select>
						</div>
						<div>
							<el-table :data="addMatch_table" border fit style="width: 100%;" class="m-table">
								<el-table-column
									label="序号"
									prop="name"
									width="100">
							    </el-table-column>
							    <el-table-column
									prop="date"
									label="联赛">
							    </el-table-column>
							    <el-table-column
									prop="name"
									label="日期时间">
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
									label="让球">
							    </el-table-column>
							    <el-table-column
									prop="address"
									label="胜">
							    </el-table-column>
							    <el-table-column
									prop="address"
									label="平">
							    </el-table-column>
							    <el-table-column
									prop="odds"
									label="负">
							    </el-table-column>
							    <el-table-column
									prop="address"
									label="盘口">
							    </el-table-column>
							    <el-table-column
									prop="address"
									label="上下盘">
							    </el-table-column>
							</el-table>
							<h3 class="f-cb">过关方式：{{}}<el-button @click="dialogVisible = false" class="f-fr">取消</el-button><el-button type="primary" @click="handleNextStep" class="u-submit f-fr">下一步</el-button></h3>
						</div>					
					</div>
					<div id="stepTwo" v-else>
						<div class="m-input-suffix">
						  	<label for="" class="u-label">返点比例</label>
						  	<el-input placeholder="请输入数值"></el-input> %
						</div>
						<div class="m-input-suffix">
						  	<label for="" class="u-label">嘉奖比例</label>
						  	<el-input placeholder="请输入数值"></el-input> %
						</div>
						<div class="m-input-suffix">
						  	<label for="" class="u-label">投注金额</label>
						  	<el-input placeholder="请输入投注金额"></el-input>
						  	<el-select v-model="add_selected" placeholder="请选择" multiple :multiple-limit="3" class="m-sm-select" @visible-change="handleChooseMatch">
							    <el-option
							      	v-for="item in add_select"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-select>
						</div>
						<el-button type="primary" @click="handleSubmit2" class="u-submit">提交方案</el-button>
						<el-button @click="dialogVisible2 = false">取消</el-button>
					</div>
				</el-dialog>
				<!-- 退单订单提示框 -->
				<el-dialog
					title="退单"
					:visible.sync="dialogVisible2"
					width="720px">
					<div class="m-input-suffix m-textarea-suffix">
					  	<label for="" class="u-label">退单原因</label>
					</div>
					<el-button type="primary" @click="handleSubmit2" class="u-submit">保 存</el-button>
					<el-button @click="dialogVisible2 = false">取 消</el-button>
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
					<h3 class="m-title-tag">记录列表</h3>
					<el-table :data="tableData" show-summary border fit style="width: 100%;" class="m-table" :cell-style="handleBackground">
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
							label="投注盘口">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="投注赔率">
					    </el-table-column>
					    <el-table-column
							prop="odds"
							label="比赛日期">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="比赛时间">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="比分">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="过关方式">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="投注金额">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="返点">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="嘉奖金额">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="北单输赢">
					    </el-table-column>
					    <el-table-column
							prop="odds"
							label="竞彩输赢">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="竞彩奖金">
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
				// 选择补单比赛
				firstStep: true,
				add_selected: '',
				add_select: [{
					value: '1',
					label: '3001'
				}, {
					value: '2',
					label: '3002'
				}, {
					value: '3',
					label: '3003'
				}, {
					value: '4',
					label: '3004'
				}, {
					value: '5',
					label: '3005'
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
				addMatch_table: []
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
			objectSpanMethod: function ({row, column, rowIndex, columnIndex}) {
				var arr = [0, 1, 10, 11, 12, 16, 17, 18, 19]
				if (arr.indexOf(columnIndex) !== -1) {
					if (row.records_index === 0) {
						return {
							rowspan: row.parlay,
							colspan: 1
						}
					} else {
						return {
							rowspan: 0,
							colspan: 0
						}
					}
				}
			},
			// 选择比赛
			handleChooseMatch (boolean) {
				if (!boolean) {
					console.log('查询比赛信息')
				}
			},
			handleNextStep () {
				this.firstStep = false
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
				this.firstStep = true
			}
		}
	}
</script>
<style scoped lang="less">
	.m-input-suffix{
		width: 510px;
		margin: 20px auto;
	}
	.el-input-number{
		width: 240px;
	}
	.u-submit{
		width: 120px;
		margin-bottom: 30px;
		margin-left: 185px;
	}
</style>