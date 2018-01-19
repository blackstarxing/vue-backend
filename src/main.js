// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import '../theme/index.css'
import ElementUI from 'element-ui'
// import popper from 'popper.js'

Vue.use(ElementUI)
// Vue.use(popper)
Vue.prototype.$http = axios
Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
	Vue.prototype.API = 'http://192.168.1.153:8000/admin'
} else {
	Vue.prototype.API = ''
}

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
  template: '<App/>',
  components: { App }
})
