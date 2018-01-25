<template>
	<div class="g-bd">
		<h3 class="m-title-tag">编辑角色</h3>
		<div class="g-form-box">
			<div class="m-input-suffix">
			  	<label for="" class="u-label">角色名</label>
			  	<el-input placeholder="请输入人员名称" v-model="form.name"></el-input>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">角色状态</label>
			  	<el-radio v-model="form.status" label="1" border>正常</el-radio>
    			<el-radio v-model="form.status" label="0" border>禁用</el-radio>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">权限设置</label>
			  	<el-checkbox-group v-model="form.resourceIds">
					<el-checkbox v-for="item in checkboxList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
				</el-checkbox-group>
			</div>
			<el-button type="primary" class="u-save" @click="addRole">保存</el-button><el-button class="u-empty">清空</el-button>
		</div>	
	</div>
</template>
<script>
	export default {
		data () {
			return {
				form: {
					id: '',
					name: '',
					status: '1',
					resourceIds: []
				},
				// checkboxList: [{
				// 	value: '1',
				// 	label: '制定方案'
				// }, {
				// 	value: '2',
				// 	label: '亚盘赔率'
				// }, {
				// 	value: '3',
				// 	label: '赛事预测'
				// }, {
				// 	value: '4',
				// 	label: '我的订单'
				// }, {
				// 	value: '5',
				// 	label: '我的账号'
				// }, {
				// 	value: '6',
				// 	label: '补单记录（未完成）'
				// }, {
				// 	value: '7',
				// 	label: '补单记录（已完成）'
				// }, {
				// 	value: '8',
				// 	label: '人员管理'
				// }, {
				// 	value: '9',
				// 	label: '新增人员'
				// }, {
				// 	value: '10',
				// 	label: '角色管理'
				// }, {
				// 	value: '11',
				// 	label: '新增角色'
				// }, {
				// 	value: '12',
				// 	label: '资金管理（充值申请）'
				// }, {
				// 	value: '13',
				// 	label: '资金管理'
				// }, {
				// 	value: '14',
				// 	label: '账号管理'
				// }, {
				// 	value: '15',
				// 	label: '账号添加'
				// }],
				checkboxList: []
			}
		},
		mounted: function () {
			if (this.$store.state.roleform.id) {
				this.form = this.$store.state.roleform
				this.getRole()
			} else {
				this.form = JSON.parse(localStorage.getItem('role'))
				this.getRole()
			}
		},
		methods: {
			getRole: function () {
				var _this = this
				_this.$http.post(_this.API + '/sysRole/update', {id: parseInt(_this.form.id)}).then(function (response) {
					if (response.data.success) {
						var string = response.data.data.resourceIds
						_this.form.resourceIds = string.split(',')
						_this.$http.post(_this.API + '/sysResource/selectAllResource').then(function (response) {
							if (response.data.success) {
								_this.checkboxList = response.data.data
								var arr = []
								for (var i = 0; i < _this.checkboxList.length; i++) {
									if (_this.form.resourceIds.indexOf(_this.checkboxList[i].id.toString()) > -1) {
										arr.push(_this.checkboxList[i].id)
									}
								}
								_this.form.resourceIds = arr
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
			addRole: function () {
				var _this = this
				this.$http.post(this.API + '/sysRole/update/save', _this.form).then(function (response) {
					if (response.data.success) {
						_this.$message({
							message: '保存成功',
							center: true,
							type: 'success'
						})
						_this.$router.push({path: '/member/managerole'})
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
		}
	}
</script>
<style scoped lang="less">
	.g-form-box{
		width: 820px;
		margin: 150px auto 120px;
		.el-checkbox-group{
			width: 700px;
			float: right;
			.el-checkbox{
				width: 180px;
				margin-bottom: 40px;
				+.el-checkbox{
					margin-left: 0;
				}
			}
		}
	}
</style>