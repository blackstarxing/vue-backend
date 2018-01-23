<template>
	<div class="g-bd">
		<h3 class="m-title-tag">新增账号</h3>
		<div class="g-form-box">
			<el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
				<el-form-item label="下单账号" prop="accountNumber">
					<el-input placeholder="请输入下单账号" v-model="form.accountNumber"></el-input>
				</el-form-item>
				<el-form-item label="选择下单平台" prop="terraceInfoId">
				  	<el-select v-model.number="form.terraceInfoId" placeholder="请选择">
					    <el-option
					      	v-for="item in options"
					      	:key="item.id"
					      	:label="item.name"
					      	:value="item.id">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="输赢计算方式" prop="winLossCalculation">
				  	<el-select v-model="form.winLossCalculation" placeholder="请选择">
					    <el-option
					      	v-for="item in modeoptions"
					      	:key="item.value"
					      	:label="item.label"
					      	:value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="比例系数" v-if="form.winLossCalculation>2">
				  	<el-input-number v-model="divideradio" :step="0.1" :min="0.1" :max="1" v-if="form.winLossCalculation==3"></el-input-number>
				  	<el-input-number v-model="multiplyradio" :step="0.1" :min="0.1" :max="1" v-else></el-input-number>
				</el-form-item>
				<el-form-item label="充值优惠" prop="rechargeDiscountAmount">
				  	<el-input-number v-model.number="form.rechargeDiscountAmount" :min="0"></el-input-number> %
				</el-form-item>
				<el-form-item label="有效流水反水" prop="effectiveWaterBackwater">
				  	<el-input placeholder="请输入数值" v-model.number="form.effectiveWaterBackwater"></el-input>
				</el-form-item>
				<el-form-item label="流水计算">
				  	<el-radio v-model.number="form.waterCalculation" label="1" border>1</el-radio>
	    			<el-radio v-model.number="form.waterCalculation" label="2" border>2</el-radio>
				</el-form-item>
				<el-form-item label="负责人" prop="loginUserId">
				  	<el-select v-model.number="form.loginUserId" placeholder="请选择">
					    <el-option
					      	v-for="item in roles"
					      	:key="item.id"
					      	:label="item.userName"
					      	:value="item.id">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="初始余额" prop="afterBalence">
				  	<el-input placeholder="请输入账户余额" v-model.number="form.afterBalence"></el-input>
				</el-form-item>
				<el-form-item label="投注状态">
				  	<el-radio v-model.number="form.bettingStatus" label="1" border>正常</el-radio>
	    			<el-radio v-model.number="form.bettingStatus" label="2" border>禁用</el-radio>
				</el-form-item>
				<el-form-item label="使用状态">
				  	<el-radio v-model.number="form.usingStatus" label="1" border>正常</el-radio>
	    			<el-radio v-model.number="form.usingStatus" label="2" border>禁用</el-radio>
				</el-form-item>
				<el-button type="primary" class="u-save" @click="addAccount('form')">保存</el-button><el-button class="u-empty">清空</el-button>
			</el-form>
		</div>	
	</div>
</template>
<script>
	export default {
		data () {
			return {
				divideradio: 0.9,
				multiplyradio: 0.5,
				form: {
					accountNumber: '',
					terraceInfoId: '',
					winLossCalculation: '',
					rechargeDiscountAmount: 2,
					effectiveWaterBackwater: 0,
					waterCalculation: '1',
					loginUserId: '',
					afterBalence: 0,
					bettingStatus: '1',
					usingStatus: '1'
				},
				options: [],
				roles: [],
				modeoptions: [{
					value: '1',
					label: 'A'
				}, {
					value: '2',
					label: 'B'
				}, {
					value: '3',
					label: ''
				}, {
					value: '4',
					label: ''
				}],
				rules: {
					accountNumber: [
						{ required: true, message: '请输入下单账号', trigger: 'blur' }
					],
					terraceInfoId: [
						{ required: true, message: '请选择下单平台', trigger: 'change' }
					],
					winLossCalculation: [
						{ required: true, message: '请选择输赢计算方式', trigger: 'change' }
					],
					rechargeDiscountAmount: [
						{ required: true, message: '请输入充值优惠', trigger: 'blur' }
					],
					effectiveWaterBackwater: [
						{ required: true, message: '请输入数值', trigger: 'blur' },
						{ type: 'number', message: '请输入数字', trigger: 'blur' }
					],
					loginUserId: [
						{ required: true, message: '请选择负责人', trigger: 'blur' }
					],
					afterBalence: [
						{ required: true, message: '请输入账户余额', trigger: 'blur' },
						{ type: 'number', message: '请输入数字', trigger: 'blur' }
					]
				}
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				this.modeoptions[2].label = 'A/' + this.divideradio
				this.modeoptions[3].label = 'A*' + this.multiplyradio
				var _this = this
				this.$http.post(this.API + '/terraceInfo/listJson').then(function (response) {
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
				this.$http.post(this.API + '/loginUser/listJson').then(function (response) {
					if (response.data.success) {
						_this.roles = response.data.data
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
			})
		},
		methods: {
			handleChangeradio: function () {
				console.log(this.modeoptions)
			},
			// 提交
			addAccount: function (formName) {
				var _this = this
				_this.$refs[formName].validate((valid) => {
					if (valid) {
						_this.$http.post(_this.API + '/accountNumber/add/save', _this.form).then(function (response) {
							if (response.data.success) {
								_this.$message({
									message: '保存成功',
									center: true,
									type: 'success'
								})
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
					} else {
						console.log('error submit!!')
						return false
					}
				})
			}
		},
		watch: {
			divideradio: function (val) {
				this.modeoptions[2].label = 'A/' + val
			},
			multiplyradio: function (val) {
				this.modeoptions[3].label = 'A*' + val
			}
		}
	}
</script>
<style scoped lang="less">
	.el-input-number{
		width: 240px;
	}
</style>