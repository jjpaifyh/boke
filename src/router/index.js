import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
    import ("../views/Home.vue")
const Music = () =>
    import ("../views/Music.vue")

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/music',
    name: 'Music',
    component: Music
  }
]

const router = new VueRouter({
  routes
})

export default router
