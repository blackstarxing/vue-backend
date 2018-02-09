<template>
	<div>
		<div class="g-hd">
			<h3 class="m-title-tag">筛选查询</h3>
			<div class="m-search-box">
			  	<el-select v-model="form.terraceName" placeholder="请选择平台" class="m-select">
				    <el-option
				      	v-for="item in accounts"
				      	:key="item.terraceName"
				      	:label="item.terraceName"
				      	:value="item.terraceName">
				    </el-option>
				</el-select>
			    <el-button type="primary" class="u-search" @click="getList">查询</el-button>
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
					prop="accountNumber"
					label="下单账号">
			    </el-table-column>
			    <el-table-column
					prop="terraceName"
					label="平台">
			    </el-table-column>
			    <el-table-column
					prop="totalOrderFinishNum"
					label="累计下单">
			    </el-table-column>
			    <el-table-column
					prop="balance"
					label="账户余额">
			    </el-table-column>
			    <el-table-column
					prop="totalOrderFinishMoney"
					label="累计金额">
			    </el-table-column>
			    <el-table-column
					prop="rechargeNum"
					label="充值次数">
			    </el-table-column>
			    <el-table-column label="是否可提款">
					<template slot-scope="scope">
						<span :class="[scope.row.isDrawMoney == 1 ? 's-fc-on' : 's-fc-off']">{{scope.row.isDrawMoney == 1 ?'是':'否'}}</span>
					</template>
			    </el-table-column>
			    <el-table-column label="操作" width="232">
      				<template slot-scope="scope">
        				<el-button size="mini" type="primary" @click="handleHistory(scope.$index, scope.row)">明细</el-button>
        				<el-button size="mini" type="primary" @click="handleRecharge(scope.$index, scope.row)">充值</el-button>
        				<el-button size="mini" type="primary" @click="handleWithdraw(scope.$index, scope.row)">提款</el-button>
      				</template>
				</el-table-column>
			</el-table>
			<el-pagination
				background
				layout="prev, pager, next"
				:page-size="form.pageSize"
				:total="total" class="m-page" @current-change="refreshData">
			</el-pagination>
			<!-- 充值弹框 -->
			<el-dialog
				title="充值"
				:visible.sync="dialogVisible"
				width="640px" @close="reset">
				<div class="m-input-suffix">
				  	<label for="" class="u-label">下单账号</label>
				  	{{recharge.accountNumber}}
				</div>
				<div class="m-input-suffix">
				  	<label for="" class="u-label">当前余额</label>
				  	<span>￥{{recharge.balance}}</span>
				</div>
				<div class="m-input-suffix">
				  	<label for="" class="u-label">实际投注</label>
				  	<el-input placeholder="请输入投注金额" v-model="rechargeOrDrawMoney"></el-input>
				</div>
				<el-button type="primary" @click="handleRechargeSubmit" class="u-submit">提 交</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</el-dialog>
			<!-- 提款弹框 -->
			<el-dialog
				title="提款"
				:visible.sync="dialogVisible2"
				width="640px" @close="reset">
				<div class="m-input-suffix">
				  	<label for="" class="u-label">下单账号</label>
				  	{{withdraw.accountNumber}}
				</div>
				<div class="m-input-suffix">
				  	<label for="" class="u-label">待提金额</label>
				  	<span>￥{{withdraw.winningBalance?withdraw.winningBalance:0}}</span>
				</div>
				<div class="m-input-suffix">
				  	<label for="" class="u-label">提款金额</label>
				  	<el-input placeholder="请输入提款金额" v-model="withdrawOrDrawMoney"></el-input>
				</div>
				<el-button type="primary" @click="handleWithdrawSubmit" class="u-submit">提 交</el-button>
				<el-button @click="dialogVisible2 = false">取 消</el-button>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				form: {
					pageNum: 1,
					pageSize: 20,
					terraceName: ''
				},
				total: 0,
				accounts: [],
				tableData: [],
				dialogVisible: false,
				dialogVisible2: false,
				recharge: {},
				rechargeOrDrawMoney: '',
				withdraw: {},
				withdrawOrDrawMoney: ''
			}
		},
		mounted: function () {
			var _this = this
			_this.getList()
			this.$http.post(this.API + '/accountNumber/listTerraceNameJsonForMyAccountNumber').then(function (response) {
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
				if (columnIndex === 7) {
					return {'color': this.tableData[rowIndex].state === 1 ? '#67C23A' : '#E6A23C'}
				}
			},
			// 获取数据
			getList: function () {
				var _this = this
				this.$http.post(this.API + '/accountNumber/pageJsonForMyAccountNumber', _this.form).then(function (response) {
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
			// 历史明细
			handleHistory (index, row) {
				localStorage.setItem('accountId', row.id)
				this.$router.push({path: '/orders/historyorders'})
			},
			// 充值
			handleRecharge (index, row) {
				var _this = this
				if (row.canRecharge) {
					this.dialogVisible = true
					this.$http.post(this.API + '/accountNumber/objectJsonForApplyRecharge', {id: row.id}).then(function (response) {
						if (response.data.success) {
							_this.recharge = response.data.data
						} else {
							_this.$message({
								message: response.data.msg,
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
						message: '当前账号已有充值申请正在办理',
						center: true,
						type: 'warning'
					})
				}
			},
			// 提交充值
			handleRechargeSubmit () {
				var _this = this
				var data = {
					id: this.recharge.id,
					balance: this.recharge.balance,
					rechargeOrDrawMoney: this.rechargeOrDrawMoney
				}
				this.$http.post(this.API + '/accountNumber/applyRechargeSave', data).then(function (response) {
					if (response.data.success) {
						_this.dialogVisible = false
						_this.$message({
							message: '充值申请已提交',
							center: true,
							type: 'success'
						})
						_this.rechargeOrDrawMoney = ''
						_this.getList()
					} else {
						_this.$message({
							message: response.data.msg,
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
			// 提现
			handleWithdraw (index, row) {
				var _this = this
				if (row.isDrawMoney) {
					this.dialogVisible2 = true
					this.$http.post(this.API + '/accountNumber/objectJsonForDrawMoney', {id: row.id}).then(function (response) {
						if (response.data.success) {
							_this.withdraw = response.data.data
						} else {
							_this.$message({
								message: response.data.msg,
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
						message: '当前不可进行提款',
						center: true,
						type: 'warning'
					})
				}
			},
			// 提交提款
			handleWithdrawSubmit () {
				var _this = this
				var data = {
					id: this.withdraw.id,
					balance: this.withdraw.balance,
					rechargeOrDrawMoney: this.withdrawOrDrawMoney
				}
				this.$http.post(this.API + '/accountNumber/drawMoneySave', data).then(function (response) {
					if (response.data.success) {
						_this.dialogVisible2 = false
						_this.$message({
							message: '提现申请已提交',
							center: true,
							type: 'success'
						})
						_this.withdrawOrDrawMoney = ''
						_this.getList()
					} else {
						_this.$message({
							message: response.data.msg,
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
			reset () {
				this.rechargeOrDrawMoney = ''
				this.withdrawOrDrawMoney = ''
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
		width: 376px;
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