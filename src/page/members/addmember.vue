<template>
	<div class="g-bd">
		<h3 class="m-title-tag">新增人员</h3>
		<div class="g-form-box">
			<div class="m-input-suffix">
			  	<label for="" class="u-label">人员名称</label>
			  	<el-input placeholder="请输入人员名称" v-model="form.userName"></el-input>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">手机号码</label>
			  	<el-input placeholder="请输入手机号码" v-model.number="form.loginName" :maxlength="11"></el-input>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">配置角色</label>
			  	<el-select v-model.number="form.sysRoleId" placeholder="请选择">
				    <el-option
				      	v-for="item in options"
				      	:key="item.id"
				      	:label="item.name"
				      	:value="item.id">
				    </el-option>
				  </el-select>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">人员状态</label>
			  	<el-radio v-model="form.status" label="1" border>正常</el-radio>
    			<el-radio v-model="form.status" label="0" border>禁用</el-radio>
			</div>
			<el-button type="primary" class="u-save" @click="addMember">保存</el-button><el-button class="u-empty">清空</el-button>
		</div>	
	</div>
</template>
<script>
	export default {
		data () {
			return {
				form: {
					loginName: '',
					userName: '',
					status: '1',
					sysRoleId: ''
				},
				options: []
			}
		},
		mounted: function () {
			var _this = this
			_this.$http.post(this.API + '/sysRole/selectAllRole').then(function (response) {
				if (response.data.success) {
					_this.options = response.data.data
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
			addMember: function () {
				var _this = this
				this.$http.post(this.API + '/loginUser/add/save', _this.form).then(function (response) {
					if (response.data.success) {
						_this.$message({
							message: '保存成功',
							center: true,
							type: 'success'
						})
						_this.$router.push({path: '/member/managemember'})
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
	
</style>