<template>
	<div class="g-bd">
		<h3 class="m-title-tag">新增账号</h3>
		<div class="g-form-box">
			<div class="m-input-suffix">
			  	<label for="" class="u-label">下单账号</label>
			  	<el-input placeholder="请输入下单账号"></el-input>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">选择下单平台</label>
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
			  	<label for="" class="u-label">输赢计算方式</label>
			  	<el-select v-model="form.mode" placeholder="请选择">
				    <el-option
				      	v-for="item in modeoptions"
				      	:key="item.value"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
				</el-select>
			</div>
			<div class="m-input-suffix" v-if="form.mode>2">
			  	<label for="" class="u-label">比例系数</label>
			  	<el-input-number v-model="divideradio" :step="0.1" :min="0.1" :max="1" v-if="form.mode==3"></el-input-number>
			  	<el-input-number v-model="multiplyradio" :step="0.1" :min="0.1" :max="1" v-else></el-input-number>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">充值优惠</label>
			  	<el-input-number></el-input-number> %
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">有效流水反水</label>
			  	<el-input placeholder="请输入数值"></el-input>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">流水计算</label>
			  	<el-radio v-model="form.state" label="1" border>1</el-radio>
    			<el-radio v-model="form.state" label="2" border>2</el-radio>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">负责人</label>
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
			  	<label for="" class="u-label">初始余额</label>
			  	<el-input placeholder="请输入账户余额"></el-input>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">投注状态</label>
			  	<el-radio v-model="form.state" label="1" border>正常</el-radio>
    			<el-radio v-model="form.state" label="2" border>禁用</el-radio>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">使用状态</label>
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
				divideradio: 0.9,
				multiplyradio: 0.5,
				form: {
					account: '',
					platform: '',
					state: '1',
					mode: ''
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
				}],
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
				}]
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				this.modeoptions[2].label = 'A/' + this.divideradio
				this.modeoptions[3].label = 'A*' + this.multiplyradio
			})
		},
		methods: {
			handleChangeradio: function () {
				console.log(this.modeoptions)
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