// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import '../theme/index.css'
import ElementUI from 'element-ui'
// import popper from 'popper.js'

Vue.use(ElementUI)
Vue.use(Vuex)
// Vue.use(popper)
Vue.prototype.$http = axios
Vue.config.productionTip = false

// 解决post方式后端无法获取参数
axios.defaults.transformRequest = [function (data) {
	// Do whatever you want to transform the data
	let newData = ''
	for (let k in data) {
		newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
	}
	return newData
}]

if (process.env.NODE_ENV === 'development') {
	Vue.prototype.API = 'http://192.168.0.109:8000/admin'
} else {
	Vue.prototype.API = ''
}

const store = new Vuex.Store({
  state: {
    memberform: {},
    roleform: {}
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

// 登录拦截
// router.beforeEach((to, from, next) => {
// 	let userName = localStorage.getItem('userName')
// 	if (userName) { // 如果有就直接到首页咯
// 		next()
// 	} else {
// 		if (to.path === '/login/login') { // 如果是登录页面路径，就直接next()
// 			next()
// 		} else { // 不然就跳转到登录；
// 			next('/login/login')
// 		}
// 	}
// })

// 修改标签标题
router.afterEach((to, from, next) => {
  document.title = to.name
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
