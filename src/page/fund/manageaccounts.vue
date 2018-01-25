<template>
	<div>
		<div class="g-hd">
			<h3 class="m-title-tag">筛选查询</h3>
			<div class="m-search-box">
			  	<el-input placeholder="请输入负责人名称" prefix-icon="el-icon-search" class="m-search-input" v-model="form.userName"></el-input>
			  	<el-date-picker
			  		v-model="date"
			      	type="daterange"
			      	align="right"
			      	unlink-panels
			      	range-separator="至"
			      	start-placeholder="添加时间（起）"
			      	end-placeholder="添加时间（止）"
			      	:picker-options="pickerOptions"
			      	value-format="yyyy-MM-dd"
			      	class="m-search-date">
			    </el-date-picker>
			    <el-select v-model="form.terraceInfoId" placeholder="平台" class="m-select">
				    <el-option
				      	v-for="item in accounts"
				      	:key="item.id"
				      	:label="item.name"
				      	:value="item.id">
				    </el-option>
				</el-select>
				<el-select v-model="form.usingStatus" placeholder="全部" class="m-select">
				    <el-option
				      	v-for="item in status"
				      	:key="item.id"
				      	:label="item.name"
				      	:value="item.id">
				    </el-option>
				</el-select>
			    <el-button type="primary" class="u-search" @click="handleSearch">查询</el-button>
			</div>
		</div>
		<div class="g-bd f-cb">
			<h3 class="m-title-tag f-cb">账号管理列表<el-button type="primary" class="u-search f-fr" icon="el-icon-plus" @click="$router.push({path: '/fund/addaccount'})">添加</el-button></h3>
			<el-table :data="tableData" border stripe style="width: 100%;" class="m-table m-mid-table" :cell-style="handleBackground">
				<el-table-column
			      	type="index"
					label="序号"
					width="100px">
			    </el-table-column>
			    <el-table-column
					prop="accountNumber"
					label="账号">
			    </el-table-column>
			    <el-table-column
					prop="terraceName"
					label="平台">
			    </el-table-column>
			    <el-table-column
					prop="userName"
					label="负责人">
			    </el-table-column>
			    <el-table-column
					prop="winLossCalculation"
					label="输赢计算">
			    </el-table-column>
			    <el-table-column
					prop="rechargeDiscountAmount"
					label="充值优惠">
			    </el-table-column>
			    <el-table-column
					prop="effectiveWaterBackwater"
					label="有效流水反水"
					width="110">
			    </el-table-column>
			    <el-table-column
					prop="waterCalculation"
					label="流水计算">
			    </el-table-column>
			    <el-table-column
					prop="afterBalance"
					label="账户余额">
			    </el-table-column>
			    <el-table-column
					prop="totalRechargeMoney"
					label="累计金额">
			    </el-table-column>
			    <el-table-column
					prop="rechargeNum"
					label="充值次数">
			    </el-table-column>
			    <el-table-column
					prop="winningBalance"
					label="待提金额">
			    </el-table-column>
			    <el-table-column
					prop="createTime"
					label="添加时间">
			    </el-table-column>
			    <el-table-column label="投注状态">
					<template slot-scope="scope">
						<span :class="[scope.row.bettingStatus == 1 ? 's-fc-on' : 's-fc-off']">{{scope.row.bettingStatus == 1 ?'正常':'禁用'}}</span>
					</template>
			    </el-table-column>
			     <el-table-column label="账户状态">
					<template slot-scope="scope">
						<span :class="[scope.row.usingStatus == 1 ? 's-fc-on' : 's-fc-off']">{{scope.row.bettingStatus == 1 ?'正常':'禁用'}}</span>
					</template>
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
				:page-size="form.pageSize"
				:total="total" class="m-page" @current-change="refreshData">
			</el-pagination>
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
					userName: '',
					startTime: '',
					endTime: '',
					terraceInfoId: '',
					usingStatus: ''
				},
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
				accounts: [],
				status: [{
					id: 1,
					name: '正常'
				}, {
					id: 2,
					name: '禁用'
				}],
				tableData: []
			}
		},
		mounted: function () {
			var _this = this
			_this.getList()
			this.$http.post(this.API + '/terraceInfo/listJson').then(function (response) {
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
				if (columnIndex === 13) {
					return {'color': this.tableData[rowIndex].state === 1 ? '#67C23A' : '#E6A23C'}
				}
				if (columnIndex === 14) {
					return {'color': this.tableData[rowIndex].state === 1 ? '#67C23A' : '#E6A23C'}
				}
			},
			// 获取数据
			getList: function () {
				var _this = this
				this.$http.post(this.API + '/accountNumber/list_Json', _this.form).then(function (response) {
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