<template>
	<div>
		<el-tabs v-model="activeName">
			<el-tab-pane label="充值申请" name="unfinished">
				<div class="g-hd">
					<h3 class="m-title-tag">筛选查询</h3>
					<div class="m-search-box">
						<el-input placeholder="请输入申请人姓名或者手机号搜索" prefix-icon="el-icon-search" class="m-long-input" v-model="form_recharge.userNameOrTel"></el-input>
					  	<el-date-picker
					  		v-model="recharge_date"
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
					    <el-select v-model="form_recharge.status" placeholder="全部" class="m-select">
						    <el-option
						      	v-for="item in recharge_status"
						      	:key="item.id"
						      	:label="item.name"
						      	:value="item.id">
						    </el-option>
						</el-select>
					    <el-button type="primary" class="u-search" @click="getRechargeList">查询</el-button>
					</div>
				</div>
				<div class="g-bd f-cb">
					<h3 class="m-title-tag f-cb">充值申请列表<el-button type="primary" class="u-search f-fr" icon="el-icon-plus" @click="dialogVisible = true">添加快捷回复</el-button></h3>
					<el-table :data="recharge_tableData" border stripe style="width: 100%;" class="m-table">
						<el-table-column
					      	prop="userName"
							label="申请人">
					    </el-table-column>
					    <el-table-column
							prop="tel"
							label="手机号">
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
							prop="money"
							label="金额">
					    </el-table-column>
					    <el-table-column
							prop="totalRechargeMoney"
							label="累计金额">
					    </el-table-column>
					    <el-table-column
							prop="rechargeNum"
							label="申请次数">
					    </el-table-column>
					    <el-table-column
							prop="afterBalance"
							label="余额">
					    </el-table-column>
					    <el-table-column
							prop="applyTime"
							label="创建时间">
					    </el-table-column>
					    <el-table-column label="状态">
							<template slot-scope="scope">
								<span :class="[scope.row.status == 1 ? 's-fc-mid' : 's-fc-on']">{{scope.row.status == 1 ?'待审核':'审核通过'}}</span>
							</template>
					    </el-table-column>
					    <el-table-column label="操作" width="232">
		      				<template slot-scope="scope">
		        				<el-button size="mini" type="primary" @click="handleCheck(scope.$index, scope.row)">审核</el-button>
		        				<el-button size="mini" type="primary" @click="handleFinish(scope.$index, scope.row)">完成打款</el-button>
		      				</template>
						</el-table-column>
					</el-table>
					<el-pagination
						background
						layout="prev, pager, next"
						:page-size="form_recharge.pageSize"
						:total="recharge_total" class="m-page" @current-change="refreshRechargeData">
					</el-pagination>
				</div>
				<!-- 添加快捷回复弹框 -->
				<el-dialog
					title="添加快捷回复"
					:visible.sync="dialogVisible"
					width="720px" @close="reset">
					<div class="m-input-suffix m-textarea-suffix">
					  	<label for="" class="u-label">快捷回复原因</label>
					  	<el-input
							type="textarea"
							:rows="3"
							placeholder="请输入回复内容"
							v-model="content">
						</el-input>
					</div>
					<el-button type="primary" @click="handleReply" class="u-submit">保 存</el-button>
					<el-button @click="dialogVisible = false">取 消</el-button>
				</el-dialog>
				<!-- 审核弹框 -->
				<el-dialog
					title="审核"
					:visible.sync="dialogVisible2"
					width="720px" @close="reset">
					<div class="m-input-suffix">
					  	<label for="" class="u-label">是否通过</label>
					  	<el-radio v-model="ispass" label="2" border>通过申请</el-radio>
		    			<el-radio v-model="ispass" label="3" border>拒绝申请</el-radio>
					</div>
					<div class="m-input-suffix m-textarea-suffix" v-if="ispass==3">
					  	<label for="" class="u-label">拒绝原因</label>
						<el-autocomplete
							class="inline-input"
							v-model="reason"
							:fetch-suggestions="querySearch"
							placeholder="请输入拒绝原因"
							@select="handleSelect"
					    ></el-autocomplete>
					</div>
					<el-button type="primary" @click="handleSubmit" class="u-submit">保 存</el-button>
					<el-button @click="dialogVisible2 = false">取 消</el-button>
				</el-dialog>
			</el-tab-pane>
			<el-tab-pane label="申请记录" name="finished">
				<div class="g-hd">
					<h3 class="m-title-tag">筛选查询</h3>
					<div class="m-search-box">
						<el-input placeholder="请输入姓名搜索" prefix-icon="el-icon-search" class="m-search-input" v-model="form_apply.userName"></el-input>
					  	<el-date-picker
					  		v-model="apply_date"
					      	type="daterange"
					      	align="right"
					      	unlink-panels
					      	range-separator="至"
					      	start-placeholder="申请时间（起）"
					      	end-placeholder="申请时间（止）"
					      	:picker-options="pickerOptions"
					      	value-format="yyyy-MM-dd"
					      	class="m-search-date">
					    </el-date-picker>
					    <el-select v-model="form_apply.status" placeholder="全部" class="m-select">
						    <el-option
						      	v-for="item in apply_status"
						      	:key="item.id"
						      	:label="item.name"
						      	:value="item.id">
						    </el-option>
						</el-select>
					    <el-button type="primary" class="u-search" @click="getApplyList">查询</el-button>
					</div>
				</div>
				<div class="g-bd f-cb">
					<h3 class="m-title-tag">申请记录列表</h3>
					<el-table :data="apply_tableData" border stripe style="width: 100%;" class="m-table">
						<el-table-column
					      	prop="userName"
							label="申请人">
					    </el-table-column>
					    <el-table-column
							prop="tel"
							label="手机号">
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
							prop="money"
							label="金额">
					    </el-table-column>
					    <el-table-column
							prop="totalRechargeMoney"
							label="累计金额">
					    </el-table-column>
					    <el-table-column
							prop="rechargeNum"
							label="申请次数">
					    </el-table-column>
					    <el-table-column
							prop="afterBalance"
							label="余额">
					    </el-table-column>
					    <el-table-column
							prop="applyTime"
							label="申请时间">
					    </el-table-column>
					    <el-table-column label="状态">
							<template slot-scope="scope">
								<span :class="[scope.row.status == 4 ? 's-fc-on' : 's-fc-off']">{{scope.row.status == 4 ?'完成打款':'已拒绝'}}</span>
							</template>
					    </el-table-column>
					</el-table>
					<el-pagination
						background
						layout="prev, pager, next"
						:page-size="form_apply.pageSize"
						:total="apply_total" class="m-page" @current-change="refreshApplyData">
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
				recharge_date: '',
				apply_date: '',
				recharge_status: [{
					id: 1,
					name: '待审核'
				}, {
					id: 2,
					name: '审核通过'
				}],
				apply_status: [{
					id: 3,
					name: '已拒绝'
				}, {
					id: 4,
					name: '打款完成'
				}],
				activeName: 'unfinished',
				dialogVisible: false,
				dialogVisible2: false,
				ispass: '2',
				content: '',
				reasonList: [],
				reason: '',
				auditId: '',
				recharge_tableData: [],
				apply_tableData: [],
				form_recharge: {
					pageNum: 1,
					pageSize: 20,
					userNameOrTel: '',
					startTime: '',
					endTime: '',
					status: ''
				},
				form_apply: {
					pageNum: 1,
					pageSize: 20,
					userName: '',
					startTime: '',
					endTime: '',
					status: ''
				},
				recharge_total: 0,
				apply_total: 0
			}
		},
		mounted: function () {
			this.getRechargeList()
			this.getApplyList()
		},
		methods: {
			// 获取数据
			getRechargeList: function () {
				var _this = this
				this.form_recharge.startTime = this.recharge_date[0] ? this.recharge_date[0] : ''
				this.form_recharge.endTime = this.recharge_date[1] ? this.recharge_date[1] : ''
				this.$http.post(this.API + '/balanceRecord/listJsonForApplyRecharge', _this.form_recharge).then(function (response) {
					if (response.data.success) {
						_this.recharge_tableData = response.data.data.rows
						_this.recharge_tableData.pageSize = response.data.data.pageSize
						_this.recharge_total = response.data.data.total
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
			getApplyList: function () {
				var _this = this
				this.form_apply.startTime = this.apply_date[0] ? this.apply_date[0] : ''
				this.form_apply.endTime = this.apply_date[1] ? this.apply_date[1] : ''
				this.$http.post(this.API + '/balanceRecord/listJsonForRechargeRecord', _this.form_apply).then(function (response) {
					if (response.data.success) {
						_this.apply_tableData = response.data.data.rows
						_this.apply_tableData.pageSize = response.data.data.pageSize
						_this.apply_total = response.data.data.total
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
			// 翻页
			refreshRechargeData: function (pageNum) {
				this.form_recharge.pageNum = pageNum
				this.getRechargeList()
			},
			refreshApplyData: function (pageNum) {
				this.form_apply.pageNum = pageNum
				this.getApplyList()
			},
			// 添加快捷回复
			handleReply: function () {
				var _this = this
				this.$http.post(this.API + '/quickReplay/addSaveForRechargeAudit', {content: _this.content}).then(function (response) {
					if (response.data.success) {
						_this.$message({
							message: '保存成功',
							center: true,
							type: 'success'
						})
						_this.dialogVisible = false
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
			getReasonList: function () {
				var _this = this
				this.$http.post(this.API + '/quickReplay/listJsonForRechargeAudit').then(function (response) {
					if (response.data.success) {
						for (var i = 0; i < response.data.data.length; i++) {
							_this.reasonList.push({value: response.data.data[i].content})
						}
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
			querySearch (queryString, cb) {
				var reasonList = this.reasonList
				var results = queryString ? reasonList.filter(this.createFilter(queryString)) : reasonList
				// 调用 callback 返回建议列表的数据
				cb(results)
			},
			createFilter (queryString) {
				return (reasonList) => {
					return (reasonList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
				}
			},
			handleSelect (item) {
				console.log(item)
			},
			// 审核
			handleCheck (index, row) {
				this.dialogVisible2 = true
				this.auditId = row.id
				this.getReasonList()
			},
			// 打款
			handleFinish (index, row) {
				var _this = this
				this.$http.post(this.API + '/balanceRecord/playMoneyFinish', {id: row.id}).then(function (response) {
					if (response.data.success) {
						_this.$message({
							message: '打款完成',
							center: true,
							type: 'success'
						})
						_this.getRechargeList()
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
			// 审核
			handleSubmit () {
				var _this = this
				var data = {
					id: _this.auditId,
					status: _this.ispass,
					reason: _this.reason
				}
				if (_this.ispass === '3' && !_this.reason) {
					_this.$message({
						message: '拒绝原因不能为空',
						type: 'warning'
					})
				} else {
					_this.$http.post(this.API + '/balanceRecord/rechargeAduitSave', data).then(function (response) {
						if (response.data.success) {
							_this.$message({
								message: '审核成功',
								center: true,
								type: 'success'
							})
							_this.dialogVisible2 = false
							_this.getRechargeList()
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
				}
			},
			reset () {
				this.ispass = '2'
				this.content = ''
				this.reason = ''
			}
		}
	}
</script>
<style scoped lang="less">
	.m-input-suffix{
		width: 485px;
		margin: 20px auto;
	}
	.u-submit{
		width: 120px;
		margin-left: 224px;
		margin-bottom: 30px;
	}
	.el-autocomplete{
		width: 300px;
	}
</style>