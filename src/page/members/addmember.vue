<template>
	<div class="g-bd">
		<h3 class="m-title-tag">新增人员</h3>
		<div class="g-form-box">
			<div class="m-input-suffix">
			  	<label for="" class="u-label">人员名称</label>
			  	<el-input placeholder="请输入人员名称"></el-input>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">手机号码</label>
			  	<el-input placeholder="请输入手机号码"></el-input>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">配置角色</label>
			  	<el-select v-model="form.role" placeholder="请选择">
				    <el-option
				      	v-for="item in options"
				      	:key="item.value"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
				  </el-select>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">人员状态</label>
			  	<el-radio v-model="form.state" label="1" border>正常</el-radio>
    			<el-radio v-model="form.state" label="2" border>禁用</el-radio>
			</div>
			<el-button type="primary" class="u-save">保存</el-button><el-button class="u-empty">清空</el-button>
		</div>	
	</div>
</template>
<script>
	export default {
		data () {
			return {
				form: {
					role: '',
					state: '1'
				},
				options: [{
					value: '1',
					label: '不匹配'
				}, {
					value: '2',
					label: '管理员'
				}, {
					value: '3',
					label: '业务员'
				}, {
					value: '4',
					label: '财务'
				}]
			}
		}
	}
</script>
<style scoped lang="less">
	
</style>