<template>
	<div>
		<div class="g-hd">
			<h3 class="m-title-tag">筛选查询</h3>
			<div class="m-search-box">
			  	<el-input placeholder="请输入姓名搜索" prefix-icon="el-icon-search" class="m-search-input"></el-input>
			  	<el-date-picker
			  		v-model="date"
			      	type="daterange"
			      	align="right"
			      	unlink-panels
			      	range-separator="至"
			      	start-placeholder="创建日期（起）"
			      	end-placeholder="创建日期（止）"
			      	:picker-options="pickerOptions"
			      	class="m-search-date">
			    </el-date-picker>
			    <el-button type="primary" class="u-search">查询</el-button>
			</div>
		</div>
		<div class="g-bd f-cb">
			<h3 class="m-title-tag">人员列表</h3>
			<el-table :data="tableData" border stripe style="width: 100%;" class="m-table">
				<el-table-column
			      	type="index"
					label="序号"
					width="100px">
			    </el-table-column>
			    <el-table-column
					prop="date"
					label="姓名">
			    </el-table-column>
			    <el-table-column
					prop="name"
					label="手机号">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="角色">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="创建时间">
			    </el-table-column>
			    <el-table-column
					prop="address"
					label="状态">
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
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
		}
	}
</script>
<style scoped lang="less">

</style>