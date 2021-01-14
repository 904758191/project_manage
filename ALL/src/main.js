import Vue from 'vue'
import './pollyfills'
import VueRouter from 'vue-router'
import VueNotify from 'vue-notifyjs'
import VeeValidate from 'vee-validate'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import App from './App.vue'
import $ from 'jquery'
import axios from 'axios'
import Vueaxios from 'vue-axios'
Vue.prototype.$ajax=axios
axios.defaults.baseURL = "http://192.168.31.183:8082";
axios.defaults.timeout = 3000;

Vue.use(Vueaxios,axios)
// Plugins
import GlobalComponents from './gloablComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'

// router setup
import routes from './routes/routes'
// 新增配置
import router from './router'
// import store from './store'

// library imports

import './assets/sass/paper-dashboard.scss'
import './assets/sass/element_variables.scss'
import './assets/sass/demo.scss'

// 加载侧边栏
import sidebarLinks from './sidebarLinks'

import './utils/util'

// 添加后
import Antd from 'ant-design-vue'
import store from './store'
// import router from './router'

// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(SideBar, {sidebarLinks: sidebarLinks})
Vue.use(VeeValidate)
locale.use(lang)
Vue.use(Antd)

// configure router
// const router = new VueRouter({
//   routes, // short for routes: routes
//   linkActiveClass: 'active'
// })

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
  
})
