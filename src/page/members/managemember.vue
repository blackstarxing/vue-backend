<template>
	<div>
		<div class="g-hd">
			<h3 class="m-title-tag">筛选查询</h3>
			<div class="m-search-box">
			  	<el-input placeholder="请输入姓名搜索" prefix-icon="el-icon-search" class="m-search-input" v-model="form.userName"></el-input>
			  	<el-date-picker
			  		v-model="date"
			      	type="daterange"
			      	align="right"
			      	unlink-panels
			      	range-separator="至"
			      	start-placeholder="创建日期（起）"
			      	end-placeholder="创建日期（止）"
			      	:picker-options="pickerOptions"
			      	value-format="yyyy-MM-dd"
			      	class="m-search-date">
			    </el-date-picker>
			    <el-button type="primary" class="u-search" @click="handleSearch">查询</el-button>
			</div>
		</div>
		<div class="g-bd f-cb">
			<h3 class="m-title-tag f-cb">人员列表<el-button type="primary" class="u-search f-fr" icon="el-icon-plus" @click="$router.push({path: '/member/addmember'})">添加</el-button></h3>
			<el-table :data="tableData" border stripe style="width: 100%;" class="m-table">
				<el-table-column
			      	type="index"
					label="序号"
					width="100px">
			    </el-table-column>
			    <el-table-column
					prop="userName"
					label="姓名">
			    </el-table-column>
			    <el-table-column
					prop="loginName"
					label="手机号">
			    </el-table-column>
			    <el-table-column
					prop="sysRoleName"
					label="角色">
			    </el-table-column>
			    <el-table-column
					prop="createTime"
					label="创建时间">
			    </el-table-column>
			    <el-table-column label="状态">
					<template slot-scope="scope">
						{{scope.row.status?'正常':'禁用'}}
					</template>
			    </el-table-column>
			    <el-table-column label="操作">
      				<template slot-scope="scope">
        				<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        				<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
					endTime: ''
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
				tableData: []
			}
		},
		mounted: function () {
			var _this = this
			_this.getList()
		},
		methods: {
			// 编辑
			handleEdit: function (index, row) {
				this.$store.state.memberform = {
					id: row.id,
					loginName: row.loginName,
					userName: row.userName,
					status: row.status.toString(),
					sysRoleId: row.sysRoleName.toString()
				}
				localStorage.setItem('member', JSON.stringify(this.$store.state.memberform))
				// this.$root.Bus.$emit('editmember', [loginName, userName, status])
				this.$router.push({path: '/member/editmember'})
			},
			// 删除成员
			handleDelete: function (index, row) {
				var _this = this
				this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.$http.post(_this.API + '/loginUser/deletes', {ids: row.id}).then(function (response) {
						if (response.data.success) {
							_this.getList()
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
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			// 获取数据
			getList: function () {
				var _this = this
				this.$http.post(this.API + '/loginUser/list/json', _this.form).then(function (response) {
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
			}
		}
	}
</script>
<style scoped lang="less">

</style>