// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../theme/index.css'
import ElementUI from 'element-ui'
// import popper from 'popper.js'

Vue.use(ElementUI)
// Vue.use(popper)

Vue.config.productionTip = false

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
