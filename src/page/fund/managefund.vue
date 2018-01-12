<template>
	<div>
		<el-tabs v-model="activeName">
			<el-tab-pane label="充值申请" name="unfinished">
				<div class="g-hd">
					<h3 class="m-title-tag">筛选查询</h3>
					<div class="m-search-box">
						<el-input placeholder="请输入申请人姓名或者手机号搜索" prefix-icon="el-icon-search" class="m-long-input"></el-input>
					  	<el-date-picker
					  		v-model="date"
					      	type="daterange"
					      	align="right"
					      	unlink-panels
					      	range-separator="至"
					      	start-placeholder="下单时间（起）"
					      	end-placeholder="下单时间（止）"
					      	:picker-options="pickerOptions"
					      	class="m-search-date">
					    </el-date-picker>
					    <el-select v-model="select" placeholder="全部" class="m-select">
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
					<h3 class="m-title-tag f-cb">充值申请列表<el-button type="primary" class="u-search f-fr" icon="el-icon-plus" @click="dialogVisible = true">添加快捷回复</el-button></h3>
					<el-table :data="tableData" border stripe style="width: 100%;" class="m-table">
						<el-table-column
					      	prop="date"
							label="申请人">
					    </el-table-column>
					    <el-table-column
							prop="date"
							label="手机号">
					    </el-table-column>
					    <el-table-column
							prop="name"
							label="账号">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="平台">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="金额">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="累计金额">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="申请次数">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="余额">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="创建时间">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="状态">
					    </el-table-column>
					    <el-table-column label="操作" width="232">
		      				<template slot-scope="scope">
		        				<el-button size="mini" type="primary" @click="handleCheck(scope.$index, scope.row)">审核</el-button>
		        				<el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">完成打款</el-button>
		      				</template>
						</el-table-column>
					</el-table>
					<el-pagination
						background
						layout="prev, pager, next"
						:total="1000" class="m-page">
					</el-pagination>
				</div>
				<!-- 添加快捷回复弹框 -->
				<el-dialog
					title="添加快捷回复"
					:visible.sync="dialogVisible"
					width="720px">
					<div class="m-input-suffix m-textarea-suffix">
					  	<label for="" class="u-label">快捷回复原因</label>
					  	<el-input
							type="textarea"
							:rows="3"
							placeholder="请输入回复内容"
							v-model="textarea">
						</el-input>
					</div>
					<el-button type="primary" @click="handleSubmit" class="u-submit">保 存</el-button>
					<el-button @click="dialogVisible = false">取 消</el-button>
				</el-dialog>
				<!-- 审核弹框 -->
				<el-dialog
					title="审核"
					:visible.sync="dialogVisible2"
					width="720px">
					<div class="m-input-suffix">
					  	<label for="" class="u-label">是否通过</label>
					  	<el-radio v-model="ispass" label="1" border>通过申请</el-radio>
		    			<el-radio v-model="ispass" label="2" border>拒绝申请</el-radio>
					</div>
					<div class="m-input-suffix m-textarea-suffix">
					  	<label for="" class="u-label">拒绝原因</label>
					  	<el-input
							type="textarea"
							:rows="3"
							placeholder="请输入拒绝原因"
							v-model="textarea">
						</el-input>
					</div>
					<el-button type="primary" @click="handleSubmit" class="u-submit">保 存</el-button>
					<el-button @click="dialogVisible = false">取 消</el-button>
				</el-dialog>
			</el-tab-pane>
			<el-tab-pane label="申请记录" name="finished">
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
					      	start-placeholder="申请时间（起）"
					      	end-placeholder="申请时间（止）"
					      	:picker-options="pickerOptions"
					      	class="m-search-date">
					    </el-date-picker>
					    <el-select v-model="select" placeholder="全部" class="m-select">
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
					<h3 class="m-title-tag">申请记录列表</h3>
					<el-table :data="tableData" border stripe style="width: 100%;" class="m-table">
						<el-table-column
					      	type="index"
							label="申请人"
							width="100px">
					    </el-table-column>
					    <el-table-column
							prop="date"
							label="手机号">
					    </el-table-column>
					    <el-table-column
							prop="name"
							label="账号">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="平台">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="金额">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="累计金额">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="申请次数"
							width="110">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="余额">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="申请时间">
					    </el-table-column>
					    <el-table-column
							prop="address"
							label="状态">
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
				date: '',
				select: '',
				accounts: [{
					value: '1',
					label: 'ss'
				}],
				activeName: 'unfinished',
				dialogVisible: false,
				dialogVisible2: false,
				ispass: '1',
				textarea: '',
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
				}]
			}
		},
		methods: {
			// 审核
			handleCheck (index, row) {
				this.dialogVisible2 = true
			},
			// 历史明细
			handleHistory (index, row) {
				this.$router.push({path: '/orders/orders', query: {plan: 'private'}})
			},
			handleSubmit () {

			},
			handleSubmit2 () {

			},
			reset () {
				this.textarea = ''
			}
		}
	}
</script>
<style scoped lang="less">
	.m-input-suffix{
		width: 465px;
		margin: 20px auto;
	}
	.u-submit{
		width: 120px;
		margin-left: 224px;
		margin-bottom: 30px;
	}
</style>