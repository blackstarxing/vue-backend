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
			      	value-format="yyyy-MM-dd"
			      	class="m-search-date">
			    </el-date-picker>
			    <el-button type="primary" class="u-search" @click="handleSearch">查询</el-button>
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
					prop="userName"
					label="负责人">
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
					prop="cCreateTime"
					label="下单日期">
			    </el-table-column>
			    <el-table-column
					prop="mStartTime"
					label="比赛日期">
			    </el-table-column>
			    <el-table-column
					prop="leagueMatchName"
					label="联赛"
					width="110">
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
					prop="handcap"
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
					prop="fullScore"
					label="比分">
			    </el-table-column>
			    <el-table-column
					prop="corderWinorloss"
					label="输赢">
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
				total: 0,
				form: {
					pageNum: 1,
					pageSize: 20,
					id: '',
					startTime: '',
					endTime: ''
				},
				date: '',
				tableData: []
			}
		},
		mounted: function () {
			var _this = this
			_this.form.id = localStorage.getItem('accountId')
			_this.getList()
		},
		methods: {
			// 获取数据
			getList: function () {
				var _this = this
				this.$http.post(this.API + '/accountNumber/pageJsonForAccountNumaberDetails', _this.form).then(function (response) {
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
			}
		}
	}
</script>
<style scoped lang="less">

</style>