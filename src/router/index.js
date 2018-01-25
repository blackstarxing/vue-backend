import Vue from 'vue'
import Router from 'vue-router'
// 登录
import login from '@/page/login/login'
import landing from '@/page/login/landing'
// 制定方案
import formulateplan from '@/page/plans/formulateplan'
import historyplans from '@/page/plans/historyplans'
import optimizeplan from '@/page/plans/optimizeplan'
// 亚盘赔率
import plateodds from '@/page/odds/plateodds'
// 补单记录
import betrecords from '@/page/records/betrecords'
import platerecords from '@/page/records/platerecords'
// 我的订单
import orders from '@/page/orders/orders'
import accounts from '@/page/orders/accounts'
import historyorders from '@/page/orders/historyorders'
// 人员管理
import managemember from '@/page/members/managemember'
import addmember from '@/page/members/addmember'
import editmember from '@/page/members/editmember'
import managerole from '@/page/members/managerole'
import addrole from '@/page/members/addrole'
import editrole from '@/page/members/editrole'
// 资金管理
import managefund from '@/page/fund/managefund'
import manageaccounts from '@/page/fund/manageaccounts'
import accountdetail from '@/page/fund/accountdetail'
import addaccount from '@/page/fund/addaccount'
// 设置
import setting from '@/page/set/setting'

import '../assets/css/style.less'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login/login',
      name: '登录',
      component: login
    },
    {
      path: '/login/landing',
      name: '欢迎',
      component: landing
    },
    {
      path: '/plans/formulateplan',
      name: '制定方案',
      component: formulateplan
    },
    {
      path: '/plans/optimizeplan',
      name: '优化方案',
      component: optimizeplan
    },
    {
      path: '/plans/historyplans',
      name: '历史方案',
      component: historyplans
    },
    {
      path: '/odds/plateodds',
      name: '亚盘赔率',
      component: plateodds
    },
    {
      path: '/records/betrecords',
      name: '竞彩记录',
      component: betrecords
    },
    {
      path: '/records/platerecords',
      name: '补单记录',
      component: platerecords
    },
    {
      path: '/orders/orders',
      name: '我的订单',
      component: orders
    },
    {
      path: '/orders/accounts',
      name: '我的账号',
      component: accounts
    },
    {
      path: '/orders/historyorders',
      name: '历史账单',
      component: historyorders
    },
    {
      path: '/member/managemember',
      name: '人员管理',
      component: managemember
    },
    {
      path: '/member/addmember',
      name: '新增人员',
      component: addmember
    },
    {
      path: '/member/editmember',
      name: '编辑人员',
      component: editmember
    },
    {
      path: '/member/managerole',
      name: '角色管理',
      component: managerole
    },
    {
      path: '/member/addrole',
      name: '新增角色',
      component: addrole
    },
    {
      path: '/member/editrole',
      name: '编辑角色',
      component: editrole
    },
    {
      path: '/fund/manageaccounts',
      name: '账号管理',
      component: manageaccounts
    },
    {
      path: '/fund/accountdetail',
      name: '账号明细',
      component: accountdetail
    },
    {
      path: '/fund/addaccount',
      name: '新增账号',
      component: addaccount
    },
    {
      path: '/fund/managefund',
      name: '资金管理',
      component: managefund
    },
    {
      path: '/set/setting',
      name: '设置',
      component: setting
    },
    {path: '*', redirect: '/member/addmember'}
  ]
})
