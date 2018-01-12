<template>
	<div class="g-bd">
		<h3 class="m-title-tag">账号设置</h3>
		<div class="g-form-box">
			<div class="m-input-suffix avatar-set">
				<img src="/build/logo.png">
				<el-upload
					class="upload-demo"
					action="https://jsonplaceholder.typicode.com/posts/"
					:on-preview="handlePreview"
					:on-remove="handleRemove"
					:on-success="handleSuccess"
					:before-remove="beforeRemove"
					multiple
					:limit="3"
					:on-exceed="handleExceed">
					<el-button type="text">上传头像</el-button>
				</el-upload>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">用户名</label>
			  	admin
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">手机号码</label>
			  	1768****283
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">新手机号码</label>
			  	<el-input placeholder="请输入新手机号码"></el-input>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">验证码</label>
			  	<el-input placeholder="请输入短信验证码" class="u-code-btn"></el-input>
			  	<el-button type="text">获取验证码</el-button>
			</div>
			<el-button type="primary" class="u-save">保存</el-button>
		</div>	
	</div>
</template>
<script>
	export default {
		data () {
			return {
				fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
			}
		},
		methods: {
			handleRemove (file, fileList) {
				console.log('删除')
				console.log(file, fileList)
			},
			handleSuccess (file) {
				console.log(file)
			},
			handlePreview (file) {
				console.log(file)
			},
			handleExceed (files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
			},
			beforeRemove (file, fileList) {
				return this.$confirm(`确定 移除${file.name}？`)
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