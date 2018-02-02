<template>
	<div class="g-bd">
		<h3 class="m-title-tag">账号设置</h3>
		<div class="g-form-box">
			<div class="m-input-suffix avatar-set">
				<img :src="avatar">
				<el-upload
					class="upload-demo"
					:action="url"
					:on-preview="handlePreview"
					:on-remove="handleRemove"
					multiple
  					:limit="1"
					:on-success="handleSuccess"
					:before-remove="beforeRemove"
					:before-upload="beforeAvatarUpload"
					:on-exceed="handleExceed">
					<el-button type="text">上传头像</el-button>
				</el-upload>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">用户名</label>
			  	{{info.userName}}
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">手机号码</label>
			  	{{info.loginName}}
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">新手机号码</label>
			  	<el-input placeholder="请输入新手机号码" v-model="form.newLoginName" :maxlength="11"></el-input>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">验证码</label>
			  	<el-input placeholder="请输入短信验证码" class="u-code-btn" v-model="form.code"></el-input>
			  	<el-button type="text" v-if="second>0">{{second}}s</el-button>
			  	<el-button type="text" @click="getVerificationCode" v-else>获取验证码</el-button>
			</div>
			<el-button type="primary" class="u-save" @click="handleSave">保存</el-button>
		</div>	
	</div>
</template>
<script>
	export default {
		data () {
			return {
				fileList: [],
				info: {},
				avatar: '',
				form: {
					newLoginName: '',
					code: '',
					photo: ''
				},
				changeAvatar: false,
				// 图片上传地址
				url: '',
				second: 0
			}
		},
		mounted: function () {
			var _this = this
			this.avatar = this.getCookie('avatar')
			_this.url = _this.API + '/attach/upload'
			this.getInfo()
		},
		methods: {
			getInfo: function () {
				var _this = this
				this.$http.post(this.API + '/loginUser/accountSetting').then(function (response) {
					_this.info = response.data.data
				}).catch(function (response) {
					_this.$message({
						message: '服务器请求错误',
						center: true,
						type: 'warning'
					})
				})
			},
			getCookie: function (name) {
				var arr
				var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
				arr = document.cookie.match(reg)
				if (arr) {
					return unescape(arr[2])
				} else {
					return null
				}
			},
			handleRemove (file, fileList) {
				console.log('删除')
				console.log(file, fileList)
			},
			handleSuccess (file) {
				this.avatar = file.data.url
				this.changeAvatar = true
			},
			handlePreview (file) {
				console.log(file)
			},
			handleExceed (files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，请先移除上张图片`)
			},
			beforeRemove (file, fileList) {
				return this.$confirm(`确定 移除${file.name}？`)
			},
			beforeAvatarUpload (file) {
				const isJPG = file.type === 'image/jpeg'
				const isPNG = file.type === 'image/png'
				if (!isJPG && !isPNG) {
					this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
				}
				return isJPG || isPNG
			},
			countDown: function () {
				if (this.second > 0) {
					setTimeout(function () {
						this.second --
						this.countDown()
					}.bind(this), 1000)
				}
			},
			// 获取验证码
			getVerificationCode: function () {
				var _this = this
				this.$http.post(this.API + '/loginUser/accountSetting/getUpdateVerificationCode', {newLoginName: _this.form.newLoginName}).then(function (response) {
					if (response.data.success) {
						_this.second = 60
						_this.$message({
							message: '短信验证码已发送',
							center: true,
							type: 'success'
						})
						_this.countDown()
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
			// 保存修改
			handleSave: function () {
				var _this = this
				if (_this.changeAvatar) {
					_this.form.photo = _this.avatar
				}
				this.$http.post(this.API + '/loginUser/accountSetting/save', _this.form).then(function (response) {
					if (response.data.success) {
						_this.$message({
							message: '已保存',
							center: true,
							type: 'success'
						})
						window.document.cookie = 'avatar=' + _this.avatar
						location.reload()
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
	.u-code-btn{
		width: 145px;
		margin-right: 10px;
	}
	.avatar-set{
		width: 100px;
		height: 180px;
		margin:0 auto;
		text-align: center;
		img{
			width: 100px;
			height: 100px;
			border-radius: 50%;
		}
	}
</style>