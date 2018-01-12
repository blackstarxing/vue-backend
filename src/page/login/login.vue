<template>
	<div class="g-bg">
		<div id="g-login">
			<h3>登录</h3>
			<div class="m-st" v-if="step">
				<div class="m-input-suffix" style="margin-bottom:19px;">
				  	<el-input placeholder="请输入手机号码"></el-input>
				</div>
				<div class="m-input-suffix">
				  	<el-input placeholder="请输入图片验证码" class="code-text"></el-input>
				  	<img src="" alt="" class="code-pic">
				</div>
				<el-button type="primary" @click="step = false">确定</el-button>
			</div>
			<div class="m-nd" v-else>
				<div class="m-input-suffix" style="margin-bottom:19px;">
				  	<el-input placeholder="请输入短信验证码" class="code-text"></el-input>
				  	<span>{{60}}s 重新获取</span>
				</div>
				<el-button type="primary">确定</el-button>
				<el-button @click="step = true">返回</el-button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				step: true
			}
		},
		mounted: function () {
			// console.log(11)
		},
		methods: {
		}
	}
</script>
<style scoped lang="less">
	.g-bg{
		background: #ccc;
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
			vertical-align: middle;
		}
		.m-nd{
			span{
				font-size: 16px;
				color: rgba(21,182,150,0.60);
			}
		}
	}
</style>