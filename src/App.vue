<template>
    <div id="app">
        <el-container>
            <el-header>
                LOGO
                <div class="m-avatar" @click="$router.push({path: '/set/setting'})" v-show="$route.path!='/login/login'">
                    <img :src="head_avatar">{{userName}}<i class="el-icon-caret-bottom"></i>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px" v-show="$route.path!='/login/login'">
                    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#3D3F48" text-color="#ffffff" active-text-color="#15B696" router>
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="iconfont">&#xe672;</i>
                                <span slot="title">制定方案</span>
                            </template>
                            <el-menu-item index="/plans/formulateplan">制定方案</el-menu-item>
                            <el-menu-item index="/plans/historyplans">历史方案</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="/odds/plateodds">
                            <i class="iconfont">&#xe66e;</i>
                            <span slot="title">亚盘赔率</span>
                        </el-menu-item>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="iconfont">&#xe66f;</i>
                                <span>补单记录</span>
                            </template>
                            <el-menu-item index="/records/betrecords">竞彩记录</el-menu-item>
                            <el-menu-item index="/records/platerecords">亚盘记录</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="iconfont">&#xe670;</i>
                                <span>我的订单</span>
                            </template>
                            <el-menu-item index="/orders/orders">我的订单</el-menu-item>
                            <el-menu-item index="/orders/accounts">我的账号</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="iconfont">&#xe66d;</i>
                                <span>人员管理</span>
                            </template>
                            <el-menu-item index="/member/managemember">人员管理</el-menu-item>
                            <el-menu-item index="/member/addmember">新增人员</el-menu-item>
                            <el-menu-item index="/member/managerole">角色管理</el-menu-item>
                            <el-menu-item index="/member/addrole">新增角色</el-menu-item>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title">
                                <i class="iconfont">&#xe673;</i>
                                <span>资金管理</span>
                            </template>
                            <el-menu-item index="/fund/managefund">资金管理</el-menu-item>
                            <el-menu-item index="/fund/manageaccounts">账号管理</el-menu-item>
                            <el-menu-item index="/fund/addaccount">新增账号</el-menu-item>
                        </el-submenu>
                        <!-- <el-menu-item index="7">
                            <i class="iconfont">&#xe66c;</i>
                            <span slot="title">赛事预测</span>
                        </el-menu-item> -->
                    </el-menu>
                </el-aside>
                <el-main class="no-padding" v-if="$route.path.indexOf('login')>-1">
                    <router-view v-on:avatar="freshAvatar"/>
                </el-main>
                <el-main v-else>
                    <router-view v-on:avatar="freshAvatar"/>
                </el-main>
            </el-container>                
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            head_avatar: '',
            userName: ''
        }
    },
    mounted: function () {
        this.userName = this.getCookie('userName')
        this.head_avatar = this.getCookie('avatar')
    },
    methods: {
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
        freshAvatar: function (text) {
            this.head_avatar = text[0]
            this.userName = text[1]
        }
    }
}
</script>
