import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/iconfont/iconfont.css";
import "@/assets/css/csh.css";
// import 'video.js/dist/video-js.css'; // video.js样式



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// 事件总线
Vue.prototype .$bus = new Vue()