<template>
	<div class="g-bd">
		<div class="m-step">
			<h3><span>1</span>计划投注</h3>
			<div class="step-box">
				<div class="m-input-suffix">
				  	<label for="" class="u-label">计划投注金额</label>
				  	<el-input placeholder="请输入金额"></el-input>
				  	<p>注：优化金额必须大于4元</p>
				</div>
			</div>
		</div>
		<div class="m-step">
			<h3><span>2</span>选择盘口</h3>
			<div class="step-box">
				<el-table :data="tableData" border stripe fit style="width: 100%;" class="m-table" :cell-style="handleBackground">
					<el-table-column
				      	type="index"
						label="编号"
						width="100">
				    </el-table-column>
				    <el-table-column
						prop="date"
						label="比赛日期">
				    </el-table-column>
				    <el-table-column
						prop="name"
						label="主队vs客队">
				    </el-table-column>
				    <el-table-column
						prop="address"
						label="投注内容">
				    </el-table-column>
				    <el-table-column
						prop="address"
						label="投注内容">
				    </el-table-column>
				    <el-table-column label="投注内容" width="180">
	      				<template slot-scope="scope">
	        				<el-select v-model="select" placeholder="选择类型">
							    <el-option
							      	v-for="item in accounts"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-select>
	      				</template>
					</el-table-column>
				    <el-table-column label="上下盘" width="180">
	      				<template slot-scope="scope">
	        				<el-select v-model="select" placeholder="选择类型">
							    <el-option
							      	v-for="item in accounts"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-select>
	      				</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="m-step">
			<h3><span>3</span>方案明细</h3>
			<div class="step-box">
				<el-table :data="tableData" border stripe fit style="width: 100%;" class="m-table" :cell-style="handleBackground">
					<el-table-column
				      	type="index"
						label="单注"
						width="100">
				    </el-table-column>
				    <el-table-column
						prop="date"
						label="单倍奖金（元）">
				    </el-table-column>
				    <el-table-column
						prop="name"
						label="投注金额（元）">
				    </el-table-column>
				    <el-table-column
						prop="address"
						label="预计奖金（元）">
				    </el-table-column>
				    <el-table-column label="操作" width="420">
	      				<template slot-scope="scope">
	        				<el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">指派</el-button>
        					<el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">大厅</el-button>
        					<el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">撤单</el-button>
        					<el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">明细</el-button>
	      				</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="m-step">
			<h3><span>4</span>确认方案</h3>
			<div class="step-box">
				<div class="stepFour">投注金额：<span>￥645964</span>中奖金额范围：<span>￥511774.69~￥511837.95</span></div>
				<el-button type="primary" @click="handleSubmit" class="u-submit-plan">提交</el-button>
				<el-button @click="dialogVisible = false">返回</el-button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				select: '',
				accounts: [{
					value: '1',
					label: 'ss'
				}],
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					odds: 2.51,
					color: '#333',
					state: 1
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
					odds: 2.51,
					color: '#666',
					state: 2
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
					odds: 2.51,
					color: '#233',
					state: 2
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					odds: 2.51,
					color: '#878',
					state: 1
				}]
			}
		}
	}
</script>
<style scoped lang="less">
	.m-step{
		h3{
			color: #15B696;
			span{
				display: inline-block;
				width: 22px;
				height: 22px;
				text-align: center;
				line-height: 22px;
				border: 2px solid #15B696;
				border-radius: 50%;
				margin-right: 15px;
			}
		}
		.step-box{
			margin:10px 0 10px 11px;
			padding: 11px 0 42px 27px;
			border-left: 3px solid #D5D5D5;
			.u-label{
				width: 150px;
			}
			p{
				font-size: 14px;
				color: #C0C4CC;
				margin-top: 7px;
				text-indent: 160px;
			}
			.stepFour{
				color: #606266;
				margin-bottom: 30px;
				span{
					color: #F0671F;
					display: inline-block;
					margin-right: 70px;
				}
			}
			.u-submit-plan{
				display: inline-block;
				width: 96px;
			}
		}
	}
</style>