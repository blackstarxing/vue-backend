<template>
	<div>
		<div class="g-bd g-pl">
			<h3 class="m-title-tag f-cb">制定方案
				<span class="f-fr">排序方式:
					<el-button type="primary" plain>期望值<i class="el-icon-sort-up el-icon--right"></i></el-button>
					<el-button type="primary" plain>差异值<i class="el-icon-sort-down el-icon--right"></i></el-button>
					<el-button type="primary" @click="dialogVisible = true">差异值定制</el-button>
					<el-button type="primary" @click="dialogVisible2 = true">修改平衡点</el-button>
				</span>
			</h3>
			<!-- 折叠面板 -->
			<el-collapse v-model="collapseValue">
			  	<el-collapse-item title="周一 2017-12-04[共7场比赛]" name="1">
			    	<el-table :data="tableData" border stripe fit style="width: 100%;" class="m-table m-low-table" :cell-style="handleBackground">
						<el-table-column
					      	prop="number"
							label="编号">
					    </el-table-column>
					    <el-table-column
							prop="game"
							label="赛事">
					    </el-table-column>
					    <el-table-column
							prop="time"
							width="120px"
							label="开赛时间">
					    </el-table-column>
					    <el-table-column
							prop="host"
							label="主队">
					    </el-table-column>
					    <el-table-column
							prop="guest"
							label="客队">
					    </el-table-column>
					    <el-table-column
							prop="concede"
							label="让球">
					    </el-table-column>
					    <el-table-column
							prop="win"
							label="胜">
							<template slot-scope="scope">
					        	<el-popover trigger="click" placement="bottom">
					          		<el-table :data="gridData" border fit class="m-table m-low-table" style="width: 400px">
					          		 	<el-table-column label="赔率波动" align="center">
										    <el-table-column property="host" label="主队"></el-table-column>
										    <el-table-column property="concede" label="让球"></el-table-column>
										    <el-table-column property="guest" label="客队"></el-table-column>
										    <el-table-column width="140px" property="date" label="更新时间"></el-table-column>
										</el-table-column>
									</el-table>
					          		<div slot="reference" class="name-wrapper">
					            		<el-checkbox v-model="scope.row.winchecked" slot="reference">{{scope.row.win}}</el-checkbox>
					         	 	</div>
					        	</el-popover>
					      	</template>
					    </el-table-column>
					    <el-table-column
							prop="tie"
							label="平">
							<template slot-scope="scope">
								<el-checkbox v-model="scope.row.tiechecked">{{scope.row.win}}</el-checkbox>
		        			</template>
					    </el-table-column>
					    <el-table-column
							prop="defeat"
							label="负">
							<template slot-scope="scope">
								<el-checkbox v-model="scope.row.defeatchecked">{{scope.row.win}}</el-checkbox>
		        			</template>
					    </el-table-column>
					    <el-table-column label="差异值【定制】">
				        	<el-table-column
								prop="JB"
								label="JB">
						    </el-table-column>
						    <el-table-column
								prop="LB"
								label="LB">
						    </el-table-column>
						    <el-table-column
								prop="PB"
								label="PB">
						    </el-table-column>
				      	</el-table-column>
					    <el-table-column
							prop="balance"
							label="平衡点">
					    </el-table-column>
					    <el-table-column label="欧亚转换指数">
						    <el-table-column
								prop="hostIndex"
								label="主队">
						    </el-table-column>
						    <el-table-column
								prop="concedeIndex"
								label="让球">
						    </el-table-column>
						    <el-table-column
								prop="guestIndex"
								label="客队">
						    </el-table-column>
						</el-table-column>
					    <el-table-column
							prop="balance"
							label="平衡点">
					    </el-table-column>
					     <el-table-column label="差异值">
				        	<el-table-column
								prop="JB"
								label="JB">
						    </el-table-column>
						    <el-table-column
								prop="LB"
								label="LB">
						    </el-table-column>
						    <el-table-column
								prop="PB"
								label="PB">
						    </el-table-column>
				      	</el-table-column>
					    <el-table-column
							prop="expect"
							label="期望值">
					    </el-table-column>
					</el-table>
			  	</el-collapse-item>
			  	<el-collapse-item title="周二 2017-12-05[共7场比赛]" name="2">
			    	<div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
			    	<div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
			  	</el-collapse-item>
			  	<el-collapse-item title="周三 2017-12-06[共7场比赛]" name="3">
			   		<div>简化流程：设计简洁直观的操作流程；</div>
			    	<div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
			    	<div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
			  	</el-collapse-item>
			</el-collapse>
		</div>
		<div class="select-plans">
			<div class="m-input-suffix f-cb">
				<label for="" class="f-fl u-label">已选场次：<span class="s-fc">{{3}}场</span></label>
				<el-popover trigger="click" placement="bottom" class="f-fl">
	          		<el-table :data="gridData" class="m-table m-low-table" style="width: 400px">
	          		 	<el-table-column label="赔率波动" align="center">
						    <el-table-column property="host" label="主队"></el-table-column>
						    <el-table-column property="concede" label="让球"></el-table-column>
						    <el-table-column property="guest" label="客队"></el-table-column>
						    <el-table-column width="140px" property="date" label="更新时间"></el-table-column>
						</el-table-column>
					</el-table>
	          		<div slot="reference" class="name-wrapper">
	            		<el-button class="edit-plan">编辑<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
	         	 	</div>
	        	</el-popover>
	        </div>
	        <div class="m-input-suffix">
				<label for="" class="u-label">过关方式：</label>
				<el-select v-model="pass_selected" placeholder="请选择过关方式">
					<el-option
					    v-for="item in pass_way"
					    :key="item.value"
					    :label="item.label"
					    :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="m-input-suffix">
			  	<label for="" class="u-label">投注倍数：</label>
			  	<el-input-number v-model="chip_times" controls-position="right"></el-input-number>
			</div>
			<div class="m-input-suffix">
			  	<div class="f-fl">
			  		<h4>投注金额：<span class="s-fc-org">￥645964</span></h4>
			  		<p>理论最高奖金：<span class="s-fc-gry">￥645964</span></p>
			  	</div>
			  	<el-button type="primary" class="u-op-btn f-fl">优化方案</el-button>
			</div>
		</div>
		<!-- 定制差异值弹框 -->
		<el-dialog
			title="定制差异值"
			:visible.sync="dialogVisible"
			width="760px" @close="reset">
			<div class="m-pop">
				<div class="f-cb">
					<label for="" class="u-label f-fl">选择平台</label>
				  	<el-checkbox-group v-model="checkList" class="f-fl" :max="3">
					    <el-checkbox label="皇冠"></el-checkbox>
					    <el-checkbox label="金宝博"></el-checkbox>
					    <el-checkbox label="明生"></el-checkbox>
					    <el-checkbox label="利记"></el-checkbox>
					    <el-checkbox label="12bet"></el-checkbox>
					    <el-checkbox label="10bet"></el-checkbox>
					    <el-checkbox label="PB"></el-checkbox>
					</el-checkbox-group>
				</div>	  	
				<p>（请选择3个选项）</p>
			</div>
			<el-button type="primary" @click="handleSubmit" class="u-submit">确定</el-button>
			<el-button @click="dialogVisible = false">取 消</el-button>
		</el-dialog>
		<!-- 修改平衡点弹框 -->
		<el-dialog
			title="修改平衡点"
			:visible.sync="dialogVisible2"
			width="640px" @close="reset">
			<div class="m-input-suffix">
			  	<label for="" class="u-label">返点</label>
			  	<el-input placeholder="请输入数值" v-model="rebate"></el-input>
			</div>
			<el-button type="primary" @click="handleSubmit" class="u-submit">确定</el-button>
			<el-button @click="dialogVisible = false">取 消</el-button>
		</el-dialog>
	</div>
</template>
<script>
	// import Popper from 'vue-popper'
	export default {
		data () {
			return {
				disabled: true,
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick (picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
							picker.$emit('pick', [start, end])
						}
					}, {
						text: '最近一个月',
						onClick (picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
							picker.$emit('pick', [start, end])
						}
					}, {
						text: '最近三个月',
						onClick (picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
							picker.$emit('pick', [start, end])
						}
					}]
				},
				date: '',
				select: '',
				accounts: [{
					value: '1',
					label: 'ss'
				}],
				dialogVisible: false,
				dialogVisible2: false,
				rebate: '',
				checkList: [],
				collapseValue: [ '1', '2', '3' ],
				checked: '',
				gridData: [{
					host: 0.8,
					concede: -0.5,
					guest: 0.4,
					date: '2017/11/30 22:00'
				}, {
					host: 0.8,
					concede: -0.5,
					guest: 0.4,
					date: '2017/11/30 22:00'
				}, {
					host: 0.8,
					concede: -0.5,
					guest: 0.4,
					date: '2017/11/30 22:00'
				}, {
					host: 0.8,
					concede: -0.5,
					guest: 0.4,
					date: '2017/11/30 22:00'
				}],
				tableData: [{
					number: '周一001',
					game: '王小虎',
					time: '12-05 02：00',
					host: 2.51,
					guest: '#333',
					concede: 1,
					win: 1,
					tie: 1,
					defeat: 1,
					JB: -4,
					LB: -8,
					PB: 1,
					balance: 1.05,
					hostIndex: 0.8,
					concedeIndex: 1,
					guestIndex: -0.5,
					expect: -10,
					winchecked: '',
					tiechecked: '',
					defeatchecked: ''
				}, {
					number: '周一001',
					game: '王小虎',
					time: '12-05 02：00',
					host: 2.51,
					guest: '#333',
					concede: 1,
					win: 1,
					tie: 1,
					defeat: 1,
					JB: -4,
					LB: -8,
					PB: 1,
					balance: 1.05,
					hostIndex: 0.8,
					concedeIndex: 1,
					guestIndex: -0.5,
					expect: -10,
					winchecked: '',
					tiechecked: '',
					defeatchecked: ''
				}, {
					number: '周一001',
					game: '王小虎',
					time: '12-05 02：00',
					host: 2.51,
					guest: '#333',
					concede: 1,
					win: 1,
					tie: 1,
					defeat: 1,
					JB: -4,
					LB: -8,
					PB: 1,
					balance: 1.05,
					hostIndex: 0.8,
					concedeIndex: 1,
					guestIndex: -0.5,
					expect: -10,
					winchecked: '',
					tiechecked: '',
					defeatchecked: ''
				}, {
					number: '周一001',
					game: '王小虎',
					time: '12-05 02：00',
					host: 2.51,
					guest: '#333',
					concede: 1,
					win: 1,
					tie: 1,
					defeat: 1,
					JB: -4,
					LB: -8,
					PB: 1,
					balance: 1.05,
					hostIndex: 0.8,
					concedeIndex: 1,
					guestIndex: -0.5,
					expect: -10,
					winchecked: '',
					tiechecked: '',
					defeatchecked: ''
				}, {
					number: '周一001',
					game: '王小虎',
					time: '12-05 02：00',
					host: 2.51,
					guest: '#333',
					concede: 1,
					win: 1,
					tie: 1,
					defeat: 1,
					JB: -4,
					LB: -8,
					PB: 1,
					balance: 1.05,
					hostIndex: 0.8,
					concedeIndex: 1,
					guestIndex: -0.5,
					expect: -10,
					winchecked: '',
					tiechecked: '',
					defeatchecked: ''
				}, {
					number: '周一001',
					game: '王小虎',
					time: '12-05 02：00',
					host: 2.51,
					guest: '#333',
					concede: 1,
					win: 1,
					tie: 1,
					defeat: 1,
					JB: -4,
					LB: -8,
					PB: 1,
					balance: 1.05,
					hostIndex: 0.8,
					concedeIndex: 1,
					guestIndex: -0.5,
					expect: -10,
					winchecked: '',
					tiechecked: '',
					defeatchecked: ''
				}],
				// 过关方式
				pass_selected: '',
				pass_way: [{
					value: '1',
					label: '单关'
				}, {
					value: '2',
					label: '双关'
				}],
				// 投注倍数
				chip_times: ''
			}
		},
		methods: {
			handleBackground: function ({row, column, rowIndex, columnIndex}) {
				if (columnIndex === 4) {
					return {'background-color': this.tableData[rowIndex].color, 'color': '#fff'}
				}
				if (columnIndex === 10) {
					return {'color': this.tableData[rowIndex].state === 1 ? '#67C23A' : '#E6A23C'}
				}
			},
			handleComplete (index, row) {
				this.dialogVisible = true
				this.min_odds = row.odds
			},
			// 退单
			handleCancel (index, row) {
				this.dialogVisible2 = true
				this.textarea = ''
			},
			handleSubmit () {

			},
			handleSubmit2 () {

			},
			reset () {
				this.min_odds = 0
				this.bet_amount = ''
			}
		}
	}
</script>
<style scoped lang="less">
	.g-pl{
		padding-bottom: 100px;
	}
	.m-title-tag{
		line-height: 40px;
	}
	.el-collapse{
		margin-top: 12px;
	}
	.el-table td, .el-table th{
		padding:5px!important;
	}
	.el-dialog .m-input-suffix{
		width: 356px;
		margin: 20px auto;
		.el-input{
			width: 240px;
		}
	}
	// 弹框
	.m-pop{
		margin-left: 142px;
		.el-checkbox-group{
			width: 400px;
		}
		.el-checkbox{
			width: 124px;
			margin-bottom: 41px;
		}
		.el-checkbox+.el-checkbox {
		    margin-left: 0;
		}
		p{
			margin-bottom: 30px;
			padding-left: 100px;
		}
	}
	// 已选择比赛
	.select-plans{
		padding-left: 38px;
		height: 60px;
		padding-top: 20px;
		background: #3D3F48;
		position: fixed;
		bottom: 0;
		width: 100%;
		color:#fff;
		.m-input-suffix{
			display: inline-block;
			float: left;
			margin-right: 50px;
			.u-label{
				color: #ADB3BD!important;
				line-height: 40px;
			}
			.el-input-number{
				width: 153px;
				.el-input{
					width: 153px;
				}
			}
			.u-op-btn{
				margin-left: 60px;
			}
			p{
				font-size: 14px;
			}
		}
		.edit-plan{
			width: 64px;
			height: 34px;
			line-height: 34px;
			padding:0;
			margin: 3px 0 0 17px;
			background: rgba(57,69,68,0.00);
			border: 1px solid #15B696;
			border-radius: 4px;
			color: #15B696;
		}
	}
</style>