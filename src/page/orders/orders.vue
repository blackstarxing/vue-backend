<template>
	<div>
		<div class="g-hd">
			<h3 class="m-title-tag">筛选查询</h3>
			<div class="m-search-box">
			  	<el-input placeholder="请输球队或联赛名搜索" prefix-icon="el-icon-search" class="m-search-input" v-model="form.teamOrMatch"></el-input>
			  	<el-date-picker
			  		v-model="date"
			      	type="daterange"
			      	align="right"
			      	unlink-panels
			      	range-separator="至"
			      	start-placeholder="开赛日期（起）"
			      	end-placeholder="开赛日期（止）"
			      	:picker-options="pickerOptions"
			      	value-format="yyyy-MM-dd"
			      	class="m-search-date">
			    </el-date-picker>
			  	<el-select v-model="form.accountNumber" placeholder="全部账号" class="m-select">
				    <el-option
				      	v-for="item in accounts"
				      	:key="item.accountNumber"
				      	:label="item.accountNumber"
				      	:value="item.accountNumber">
				    </el-option>
				</el-select>
			    <el-button type="primary" class="u-search" @click="handleSearch">查询</el-button>
			</div>
		</div>
		<div class="g-bd f-cb">
			<h3 class="m-title-tag">订单列表</h3>
			<el-table :data="tableData" border stripe fit style="width: 100%;" class="m-table" :cell-style="handleBackground">
				<el-table-column
			      	type="index"
					label="序号"
					width="100">
			    </el-table-column>
			    <el-table-column
					prop="accountNumber"
					label="下单账号">
			    </el-table-column>
			    <el-table-column
					prop="createOrderTime"
					label="下单日期">
			    </el-table-column>
			    <el-table-column
					prop="matchStartTime"
					label="开赛时间">
			    </el-table-column>
			    <el-table-column
					prop="leagueMatchName"
					label="赛事">
			    </el-table-column>
			    <el-table-column
					prop="homeTeam"
					label="主队">
			    </el-table-column>
			    <el-table-column
					prop="customerTeam"
					label="客队">
			    </el-table-column>
			    <el-table-column
					prop="handicap"
					label="盘口">
			    </el-table-column>
			    <el-table-column
					prop="odds"
					label="赔率">
			    </el-table-column>
			    <el-table-column
					prop="corderBettingMoney"
					label="投注金额">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="状态">
					<template slot-scope="scope">
						<span :class="[scope.row.corderStatus == 1 ? 's-fc-mid' : 's-fc-on']">{{scope.row.corderStatus == 1 ?'待接单':'已接单'}}</span>
					</template>
			    </el-table-column>
			    <el-table-column label="操作" width="200">
      				<template slot-scope="scope">
        				<el-button size="mini" type="primary" @click="handleTake(scope.$index, scope.row)" v-if="scope.row.corderStatus == 1">接单</el-button>
        				<el-button size="mini" type="primary" @click="handleCancel(scope.$index, scope.row)">退单</el-button>
        				<el-button size="mini" type="primary" @click="handleComplete(scope.$index, scope.row)" v-if="scope.row.corderStatus == 2">完成</el-button>
      				</template>
				</el-table-column>
			</el-table>
			<el-pagination
				background
				layout="prev, pager, next"
				:page-size="form.pageSize"
				:total="total" class="m-page" @current-change="refreshData">
			</el-pagination>
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
			<!-- 退单订单提示框 -->
			<el-dialog
				title="退单"
				:visible.sync="dialogVisible2"
				width="720px">
				<div class="m-input-suffix m-textarea-suffix">
				  	<label for="" class="u-label">退单原因</label>
				  	<el-input
						type="textarea"
						:rows="3"
						placeholder="请输入退单原因"
						v-model="textarea">
					</el-input>
				</div>
				<el-button type="primary" @click="handleSubmit2" class="u-submit">保 存</el-button>
				<el-button @click="dialogVisible2 = false">取 消</el-button>
			</el-dialog>
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
				total: 0,
				form: {
					pageNum: 1,
					pageSize: 20,
					teamOrMatch: '',
					startTime: '',
					endTime: '',
					accountNumber: ''
				},
				childId: '',
				accounts: [],
				tableData: [],
				dialogVisible: false,
				dialogVisible2: false,
				order_odds: '',
				min_odds: '',
				bet_amount: '',
				textarea: ''
			}
		},
		mounted: function () {
			var _this = this
			_this.getList()
			this.$http.post(this.API + '/childOrderInfo/selectAccountNumber').then(function (response) {
				if (response.data.success) {
					_this.accounts = response.data.data
				} else {
					_this.$message({
						message: '错误',
						center: true,
						type: 'warning'
					})
				}
			}).catch(function (response) {
				_this.$message({
					message: '服务器请求错误',
					center: true,
					type: 'warning'
				})
			})
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
			// 获取数据
			getList: function () {
				var _this = this
				this.$http.post(this.API + '/childOrderInfo/listJson', _this.form).then(function (response) {
					if (response.data.success) {
						_this.tableData = response.data.data.rows
						_this.form.pageSize = response.data.data.pageSize
						_this.total = response.data.data.total
					} else {
						_this.$message({
							message: '错误',
							center: true,
							type: 'warning'
						})
					}
				}).catch(function (response) {
					_this.$message({
						message: '服务器请求错误',
						center: true,
						type: 'warning'
					})
				})
			},
			// 查询
			handleSearch: function () {
				this.form.startTime = this.date[0] ? this.date[0] : ''
				this.form.endTime = this.date[1] ? this.date[1] : ''
				this.getList()
			},
			// 翻页
			refreshData: function (pageNum) {
				this.form.pageNum = pageNum
				this.getList()
			},
			// 接单
			handleTake (index, row) {
				var _this = this
				this.$http.post(this.API + '/childOrderInfo/receiveOrder', {id: row.id}).then(function (response) {
					if (response.data.success) {
						_this.$message({
							message: '已接单',
							center: true,
							type: 'success'
						})
						_this.getList()
					} else {
						_this.$message({
							message: '错误',
							center: true,
							type: 'warning'
						})
					}
				}).catch(function (response) {
					_this.$message({
						message: '服务器请求错误',
						center: true,
						type: 'warning'
					})
				})
			},
			// 弹出完成订单弹窗
			handleComplete (index, row) {
				this.dialogVisible = true
				this.childId = row.id
				this.min_odds = row.odds
			},
			// 退单
			handleCancel (index, row) {
				this.dialogVisible2 = true
				this.childId = row.id
				this.textarea = ''
			},
			// 完成订单
			handleSubmit () {
				var _this = this
				var data = {
					id: _this.childId,
					physicalOdds: _this.order_odds,
					physicalBettingMoney: _this.bet_amount
				}
				if (this.bet_amount) {
					this.$http.post(this.API + '/childOrderInfo/finishOrderSave', data).then(function (response) {
						if (response.data.success) {
							_this.$message({
								message: '已完成订单',
								center: true,
								type: 'success'
							})
							_this.dialogVisible = false
							_this.getList()
						} else {
							_this.$message({
								message: '错误',
								center: true,
								type: 'warning'
							})
						}
					}).catch(function (response) {
						_this.$message({
							message: '服务器请求错误',
							center: true,
							type: 'warning'
						})
					})
				} else {
					_this.$message({
						message: '投注金额不能为空',
						center: true,
						type: 'warning'
					})
				}
			},
			// 退单
			handleSubmit2 () {
				var _this = this
				if (this.textarea) {
					this.$http.post(this.API + '/childOrderInfo/backOrderReason', {id: _this.childId, reason: _this.textarea}).then(function (response) {
						if (response.data.success) {
							_this.$message({
								message: '退单成功',
								center: true,
								type: 'success'
							})
							_this.dialogVisible2 = false
							_this.getList()
						} else {
							_this.$message({
								message: '错误',
								center: true,
								type: 'warning'
							})
						}
					}).catch(function (response) {
						_this.$message({
							message: '服务器请求错误',
							center: true,
							type: 'warning'
						})
					})
				} else {
					_this.$message({
						message: '退单原因不能为空',
						center: true,
						type: 'warning'
					})
				}
			},
			reset () {
				this.min_odds = 0
				this.bet_amount = ''
				this.order_odds = ''
			}
		}
	}
</script>
<style scoped lang="less">
	.m-input-suffix{
		width: 385px;
		margin: 20px auto;
	}
	.m-textarea-suffix{
		width: 485px;
	}
	.el-input-number{
		width: 240px;
	}
</style>