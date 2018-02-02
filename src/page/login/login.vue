<template>
	<div class="g-bg g-bd no-padding">
		<div id="g-login">
			<h3>登录</h3>
			<div class="m-st" v-if="step">
				<div class="m-input-suffix" style="margin-bottom:19px;">
				  	<el-input placeholder="请输入手机号码" v-model="phone"></el-input>
				</div>
				<div class="m-input-suffix">
				  	<el-input placeholder="请输入图片验证码" class="code-text" v-model="imgCode"></el-input>
				  	<img v-bind:src="imgUrl" alt="" class="code-pic" @click="getImgCode">
				</div>
				<el-button type="primary" @click="getCode">确定</el-button>
			</div>
			<div class="m-nd" v-else>
				<div class="m-input-suffix" style="margin-bottom:19px;">
				  	<el-input placeholder="请输入短信验证码" class="code-text" v-model="code"></el-input>
				  	<span v-if="second>0">{{second}}s</span>
					<span class="reget" v-else @click="getVerificationCode">重新获取</span>
				</div>
				<el-button type="primary" @click="handleLogin">确定</el-button>
				<el-button @click="step = true">返回</el-button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				step: true,
				phone: '',
				imgUrl: '',
				uuid: '',
				imgCode: '',
				avatar: '',
				userName: '',
				code: '',
				second: 60
			}
		},
		mounted: function () {
			this.getImgCode()
		},
		methods: {
			// 获取图片验证码
			getImgCode: function () {
				var _this = this
				this.$http.post(this.API + '/login/generateImgCode').then(function (response) {
					_this.imgUrl = response.data.data.url
					_this.uuid = response.data.data.imgCodeUUID
				}).catch(function (response) {
					_this.$message({
						message: '服务器请求错误',
						center: true,
						type: 'warning'
					})
				})
			},
			// 图片验证码校验
			getCode: function () {
				var _this = this
				var data = {
					imgCodeUUID: _this.uuid,
					code: this.imgCode
				}
				this.$http.get(this.API + '/login/isEffectiveCode', {params: data}).then(function (response) {
					if (response.data.success) {
						_this.step = false
						_this.getVerificationCode()
					} else {
						_this.$message({
							message: '图片验证码错误',
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
				_this.second = 60
				this.$http.post(this.API + '/getLogin/verificationCode', {loginName: _this.phone}).then(function (response) {
					_this.$message({
						message: '短信验证码已发送',
						center: true,
						type: 'success'
					})
					_this.countDown()
				}).catch(function (response) {
					_this.$message({
						message: '服务器请求错误',
						center: true,
						type: 'warning'
					})
				})
			},
			// 登录
			handleLogin: function () {
				this.$http.post(this.API + '/login/submit', {loginName: this.phone, code: this.code}).then(function (response) {
					if (response.data.success) {
						this.avatar = response.data.data.photo ? response.data.data.photo : '/build/logo.png'
						this.userName = response.data.data.userName
						window.document.cookie = 'userName=' + this.userName
						window.document.cookie = 'loginName=' + response.data.data.loginName
						window.document.cookie = 'avatar=' + this.avatar
						this.$emit('avatar', [this.avatar, this.userName])
						this.$router.push({path: '/login/landing'})
					} else {
						this.$message({
							message: response.data.msg,
							center: true,
							type: 'warning'
						})
					}
				}.bind(this)).catch(function (response) {
					console.log(response)
				})
			}
		}
	}
</script>
<style scoped lang="less">
	.g-bg{
		background: url('../../assets/images/login_bg.png') no-repeat;
		background-size: cover;
		height: 100%;
	}
	#g-login{
		width: 480px;
		height: 321px;
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		background: #fff;
		border-radius: 4px;
		h3{
			margin-top: 35px;
			margin-bottom: 31px;
			text-align: center;
			font-size: 20px;
			color: #303133;
		}
		.m-input-suffix{
			margin-left: 120px;
		}
		.el-button{
			width: 240px;
			margin-left: 120px;
			margin-bottom: 10px;
		}
		.code-text{
			width: 143px;
			margin-right: 17px;
		}
		.code-pic{
			display: inline-block;
			width: 75px;
			height: 30px;
			border: 1px solid #DCDFE6;
			box-sizing: border-box;
			margin-bottom: 5px;
			cursor: pointer;
		}
		.m-nd{
			span{
				display: inline-block;
				width: 70px;
				font-size: 16px;
				text-align: right;
				color: rgba(21,182,150,0.60);
				&.reget{
					cursor: pointer;
				}
			}
		}
	}
</style>