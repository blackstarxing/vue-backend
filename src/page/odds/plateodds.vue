<template>
	<div>
		<div class="g-hd">
			<h3 class="m-title-tag">筛选查询</h3>
			<div class="m-search-box">
			  	<el-input placeholder="请输球队或联赛名搜索" prefix-icon="el-icon-search" class="m-search-input" v-model="form.teamNameOrMatchName"></el-input>
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
			  	<el-select v-model="form.openMatchRemind" placeholder="全部" class="m-select">
				    <el-option
				      	v-for="item in play"
				      	:key="item.value"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
				</el-select>
				<el-select v-model="select" placeholder="全部" class="m-select">
				    <el-option
				      	v-for="item in remind"
				      	:key="item.value"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
				</el-select>
			    <el-button type="primary" class="u-search" @click="handleSearch">查询</el-button>
			</div>
		</div>
		<div class="g-bd f-cb">
			<h3 class="m-title-tag">人员列表</h3>
			<el-table :data="tableData" border stripe fit style="width: 100%;" class="m-table m-low-table" :cell-style="handleBackground">
				<el-table-column
			      	type="index"
					label="编号"
					width="100">
			    </el-table-column>
			    <el-table-column
					prop="leagueName"
					label="赛事">
			    </el-table-column>
			    <el-table-column
					prop="mstartTime"
					label="开赛时间">
			    </el-table-column>
			    <el-table-column
					prop="homeTeam"
					label="主队">
			    </el-table-column>
			    <el-table-column
					prop="visitingTeam"
					label="客队">
			    </el-table-column>
				<el-table-column :label="item.terraceName" v-for="(item,index) in tableData[0].list" :key="index">
					<el-table-column
						label="贴水">
						<template slot-scope="scope">
							<span v-if="scope.row.list[index]" :class="[scope.row.list[index].isUpperOddsRise == 1 ? 's-fc-on' : 's-fc-off']" class="u-openDialog" @click="handleOrder(0, index, scope.row)">{{scope.row.list[index]?scope.row.list[index].upperOdds:''}}</span>
	      				</template>
					</el-table-column>
					<el-table-column
						label="盘口">
						<template slot-scope="scope">
							<span>{{scope.row.list[index]?scope.row.list[index].plateOdds:''}}</span>
	      				</template>
					</el-table-column>
					<el-table-column
						label="贴水">
						<template slot-scope="scope">
							<span v-if="scope.row.list[index]" :class="[scope.row.list[index].isLowerOddsRise == 1 ? 's-fc-on' : 's-fc-off']" class="u-openDialog" @click="handleOrder(1, index, scope.row)">{{scope.row.list[index]?scope.row.list[index].lowerOdds:''}}</span>
	      				</template>
					</el-table-column>
				</el-table-column>
			    <el-table-column label="开赔提醒">
      				<template slot-scope="scope">
						<el-switch
							v-model="scope.row.openOdds"
							active-color="#15B696"
							inactive-color="#DBDFE7"
							active-value="1"
							inactive-value="2" @change="handleChangePay(scope.row.openOdds, scope.row)">
						</el-switch>
      				</template>
				</el-table-column>
				<el-table-column label="开赛提醒">
      				<template slot-scope="scope">
						<el-switch
							v-model="scope.row.openMatch"
							active-color="#15B696"
							inactive-color="#DBDFE7"
							active-value="1"
							inactive-value="2" @change="handleChangePlay(scope.row.openMatch, scope.row)">
						</el-switch>
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
				title="提交订单"
				:visible.sync="dialogVisible" 
				width="1110px" @close="reset">
				<div v-if="stepOne">
					<div class="m-input-suffix">
					  	<label for="" class="u-label">投注内容</label>
					  	{{orderContent.content}}
					</div>
					<div class="m-input-suffix">
					  	<label for="" class="u-label">订单类型</label>
					  	<el-radio v-model="orderContent.radio" label="1" border>直接对冲</el-radio>
	    				<el-radio v-model="orderContent.radio" label="2" border>补单操作</el-radio>
					</div>
					<div class="m-input-suffix">
					  	<label for="" class="u-label">投注金额</label>
					  	<el-input placeholder="请输入投注金额" v-model.number="orderForm.bettingMoney"></el-input>
					</div>
					<div class="m-input-suffix" v-if="orderContent.radio=='1'">
					  	<label for="" class="u-label">选择平台</label>
					  	<el-select v-model="terraceIds" multiple placeholder="全部">
						    <el-option
						      	v-for="item in orderContent.list"
						      	:key="item.id"
						      	:label="item.name"
						      	:value="item.id">
						    </el-option>
						</el-select>
					</div>
					<el-button type="primary" class="u-submit" v-if="orderContent.radio=='1'" @click="handleFoward">下一步</el-button>
					<el-button type="primary" @click="handleAddorder" class="u-submit" v-else>确定</el-button>
					<el-button @click="dialogVisible = false">取 消</el-button>
				</div>
				<div class="f-cb" v-else>
					<div class="m-transferL f-fl">
						<h3>未选择</h3>
						<el-table
						    ref="multipleTable"
						    border stripe fit
						    class="m-table"
						    :data="tableNotSelect"
						    tooltip-effect="dark"
						    style="width: 500px"
						    height="480"
						    @selection-change="handleSelectionChange">
						    <el-table-column
						      type="selection"
						      width="55">
						    </el-table-column>
						    <el-table-column
						      label="负责人">
						      <template slot-scope="scope">{{ scope.row.userName }}</template>
						    </el-table-column>
						    <el-table-column
						      prop="accountNumber"
						      label="账号">
						    </el-table-column>
						    <el-table-column
						      label="余额（W)">
						      	<template slot-scope="scope">
						      		<input type="text" v-model="scope.row.balance" class="u-balance" disabled v-if="!scope.row.canEdit">
						      		<input type="text" v-model="scope.row.balance" class="u-balance" autofocus v-else>
									<i class="iconfont" @click="scope.row.canEdit = true">&#xe674;</i>
			      				</template>
						    </el-table-column>
						  </el-table>
					</div>
					<div class="m-transferBtn f-fl">
  						<el-button @click="selectOrder">选择<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  						<el-button icon="el-icon-arrow-left" @click="deleteOrder">删除</el-button>
					</div>
					<div class="m-transferR f-fl">
						<h3>已选择</h3>
						<el-table
						    ref="multipleSelectTable"
						    border stripe fit
						    class="m-table"
						    :data="tableSelect"
						    tooltip-effect="dark"
						    style="width: 300px;margin-bottom:30px"
						    height="480"
						    @selection-change="handleDeleteSelectionChange">
						    <el-table-column
						      type="selection"
						      width="55">
						    </el-table-column>
						    <el-table-column
						      label="负责人">
						      <template slot-scope="scope">{{ scope.row.userName }}</template>
						    </el-table-column>
						    <el-table-column
						      prop="balance"
						      label="余额（W）">
						    </el-table-column>
						</el-table>
						<el-button type="primary" @click="handleFowardorder" class="u-submit">提交</el-button>
						<el-button @click="dialogVisible = false">取 消</el-button>
					</div>
				</div>
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
					teamNameOrMatchName: '',
					startTime: '',
					endTime: '',
					openMatchRemind: '',
					openOddsRemind: ''
				},
				orderContent: {
					content: '',
					radio: '1',
					list: ''
				},
				orderForm: {
					matchId: '',
					terraceNo: '',
					upperOdds: '',
					lowerOdds: '',
					bettingMoney: ''
				},
				terraceIds: '',
				tableNotSelect: [],
				tableSelect: [],
				multipleSelection: '',
				multipleDeleteSelection: '',
				stepOne: true,
				total: 0,
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
				play: [{
					value: '1',
					label: '竞彩场次'
				}, {
					value: '2',
					label: '非竞彩场次'
				}],
				remind: [{
					value: '1',
					label: '开赔提醒'
				}, {
					value: '2',
					label: '开赛提醒'
				}],
				tableData: [],
				dialogVisible: false,
				dialogVisible2: false
			}
		},
		mounted: function () {
			var _this = this
			_this.getList()
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
			// 获取数据
			getList: function () {
				var _this = this
				this.$http.post(this.API + '/matchData/pageJsonForPlateOddsDetails', _this.form).then(function (response) {
					if (response.data.success) {
						_this.tableData = response.data.data.rows
						_this.form.pageSize = response.data.data.pageSize
						_this.total = response.data.data.total
					} else {
						_this.$message({
							message: '错误',
							type: 'warning'
						})
					}
				}).catch(function (response) {
					_this.$message({
						message: '服务器请求错误',
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
			// 更改开赔提醒
			handleChangePay: function (value, row) {
				var _this = this
				this.$http.post(this.API + '/matchData/revamp/save', { id: row.id, openOddsRemind: value }).then(function (response) {
					if (response.data.success) {
						_this.$message({
							message: '修改成功',
							center: true,
							type: 'success'
						})
					} else {
						_this.$message({
							message: response.data.msg,
							type: 'warning'
						})
					}
				}).catch(function (response) {
					_this.$message({
						message: '服务器请求错误',
						type: 'warning'
					})
				})
			},
			// 更改开赛提醒
			handleChangePlay: function (value, row) {
				var _this = this
				this.$http.post(this.API + '/matchData/revamp/save', { id: row.id, openMatchRemind: value }).then(function (response) {
					if (response.data.success) {
						_this.$message({
							message: '修改成功',
							center: true,
							type: 'success'
						})
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
			// 提交订单
			handleOrder (type, index, row) {
				this.dialogVisible = true
				var _this = this
				_this.orderForm.matchId = row.matchId
				_this.orderForm.terraceNo = row.list[index].terraceInfoId
				if (type === 0) {
					_this.orderForm.upperOdds = row.list[index].upperOdds
				} else {
					_this.orderForm.lowerOdds = row.list[index].lowerOdds
				}
				this.$http.post(this.API + '/matchData/getBettingContent', { matchId: row.matchId, terraceInfoId: row.list[index].terraceInfoId, upperOdds: _this.orderForm.upperOdds, lowerOdds: _this.orderForm.lowerOdds }).then(function (response) {
					if (response.data.success) {
						_this.orderContent.content = response.data.data.bettingContent
						_this.orderContent.list = response.data.data.terraceInfos
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
			// 对冲
			handleFoward () {
				var _this = this
				if (!_this.orderForm.bettingMoney || isNaN(_this.orderForm.bettingMoney) || parseFloat(_this.orderForm.bettingMoney) <= 0) {
					_this.$message({
						message: '投注金额不能小于0或非数字',
						center: true,
						type: 'warning'
					})
				} else if (!_this.terraceIds) {
					_this.$message({
						message: '请选择投注平台',
						center: true,
						type: 'warning'
					})
				} else {
					this.stepOne = false
					this.$http.post(this.API + '/orderInfo/directHedgingNextStep', { bettingMoney: _this.orderForm.bettingMoney, terraceIds: _this.terraceIds.toString() }).then(function (response) {
						if (response.data.success) {
							_this.tableNotSelect = response.data.data
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
				}
			},
			selectOrder () {
				var _this = this
				_this.tableNotSelect.concat(_this.multipleSelection).sort(function (a, b) {
					if (a.id === b.id) {
						_this.tableNotSelect.splice(_this.tableNotSelect.indexOf(a), 1)
						_this.tableSelect.push(a)
					}
					return a.id - b.id
				})
			},
			deleteOrder () {
				var _this = this
				_this.tableSelect.concat(_this.multipleDeleteSelection).sort(function (a, b) {
					if (a.id === b.id) {
						_this.tableSelect.splice(_this.tableSelect.indexOf(a), 1)
						_this.tableNotSelect.push(a)
					}
					return a.id - b.id
				})
			},
			// 补单提交
			handleAddorder () {
				var _this = this
				if (!_this.orderForm.bettingMoney || isNaN(_this.orderForm.bettingMoney) || parseFloat(_this.orderForm.bettingMoney) <= 0) {
					_this.$message({
						message: '投注金额不能小于0或非数字',
						center: true,
						type: 'warning'
					})
				} else {
					this.$http.post(this.API + '/orderInfo/saveUnfinishPlateSupplementOrder', _this.orderForm).then(function (response) {
						if (response.data.success) {
							_this.$message({
								message: '提交成功',
								center: true,
								type: 'success'
							})
							_this.dialogVisible = false
							_this.orderForm.upperOdds = ''
							_this.orderForm.lowerOdds = ''
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
				}
			},
			// 对冲提交
			handleFowardorder () {
				var _this = this
				if (this.tableSelect) {
					var form = {
						matchId: _this.orderForm.matchId,
						terraceNo: _this.orderForm.terraceNo,
						upperOdds: _this.orderForm.upperOdds,
						lowerOdds: _this.orderForm.lowerOdds,
						bettingMoney: _this.orderForm.bettingMoney,
						terraceIds: _this.terraceIds.toString(),
						accountNumbers: JSON.stringify(_this.tableSelect)
					}
					this.$http.post(this.API + '/orderInfo/saveDirectHedgingOrder', form).then(function (response) {
						if (response.data.success) {
							_this.$message({
								message: '提交成功',
								center: true,
								type: 'success'
							})
							_this.dialogVisible = false
							_this.orderForm.upperOdds = ''
							_this.orderForm.lowerOdds = ''
							_this.terraceIds = ''
							_this.orderForm.bettingMoney = ''
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
				}
			},
			toggleSelection (rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row)
					})
				} else {
					this.$refs.multipleTable.clearSelection()
				}
			},
			handleSelectionChange (val) {
				this.multipleSelection = val
			},
			handleDeleteSelectionChange (val) {
				this.multipleDeleteSelection = val
			},
			handleSubmit () {

			},
			handleSubmit2 () {

			},
			reset () {
				this.orderForm.upperOdds = ''
				this.orderForm.lowerOdds = ''
				this.stepOne = true
				this.terraceIds = []
				this.orderForm.bettingMoney = ''
			}
		}
	}
</script>
<style scoped lang="less">
	.u-submit{
		width: 120px;
		margin-left: 224px;
		margin-bottom: 30px;
	}
	#app .g-bd .u-submit{
		margin-left: 464px;
	}
	#app .m-transferR .u-submit{
		margin-left: 40px;
	}
	.el-dialog .m-input-suffix{
		width: 400px;
		margin:0 auto 30px;
	}
	.u-openDialog{
		cursor: pointer;
	}
	.m-transferL{
		margin-left: 66px;
		.iconfont{
			color: #39ba9d;
			font-size: 16px;
			cursor: pointer;
		}
	}
	.m-transferBtn{
		width: 100px;
		margin:150px 20px 0;
		.el-button{
			width: 100%;
			display: block;
			margin-left: 0;
			margin-bottom: 20px;
		}
	}
	.u-balance{
		display: inline-block;
		background: none;
		width: 42px;
	}
</style>