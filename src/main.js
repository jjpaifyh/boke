import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/iconfont/iconfont.css";
import "@/assets/css/csh.css";
// import 'video.js/dist/video-js.css'; // video.js样式
import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload)
// 配置项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/img/loning.gif'),
  loading: require('./assets/img/loning.gif'),
  attempt: 1
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// 事件总线
Vue.prototype.$bus = new Vue()
