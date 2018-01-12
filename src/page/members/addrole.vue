<template>
	<div class="g-bd">
		<h3 class="m-title-tag">新增角色</h3>
		<div class="g-form-box">
			<div class="m-input-suffix">
			  	<label for="" class="u-label">角色名</label>
			  	<el-input placeholder="请输入人员名称"></el-input>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">角色状态</label>
			  	<el-radio v-model="form.state" label="1" border>正常</el-radio>
    			<el-radio v-model="form.state" label="2" border>禁用</el-radio>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">人员状态</label>
			  	<el-checkbox-group v-model="checkList">
					<el-checkbox v-for="item in checkboxList" :label="item.label" :key="item.value"></el-checkbox>
				</el-checkbox-group>
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
					state: '2'
				},
				checkboxList: [{
					value: '1',
					label: '制定方案'
				}, {
					value: '2',
					label: '亚盘赔率'
				}, {
					value: '3',
					label: '赛事预测'
				}, {
					value: '4',
					label: '我的订单'
				}, {
					value: '5',
					label: '我的账号'
				}, {
					value: '6',
					label: '补单记录（未完成）'
				}, {
					value: '7',
					label: '补单记录（已完成）'
				}, {
					value: '8',
					label: '人员管理'
				}, {
					value: '9',
					label: '新增人员'
				}, {
					value: '10',
					label: '角色管理'
				}, {
					value: '11',
					label: '新增角色'
				}, {
					value: '12',
					label: '资金管理（充值申请）'
				}, {
					value: '13',
					label: '资金管理'
				}, {
					value: '14',
					label: '账号管理'
				}, {
					value: '15',
					label: '账号添加'
				}],
				checkList: []
			}
		}
	}
</script>
<style scoped lang="less">
	.g-form-box{
		width: 820px;
		margin: 150px auto 120px;
		.el-checkbox-group{
			width: 720px;
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