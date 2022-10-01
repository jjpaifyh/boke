import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
    import ("../views/Home.vue")
const Music = () =>
    import ("../views/Music.vue")
const Game=()=>
    import("../views/Game.vue")
const Gluttonous=()=>
    import("../components/Gluttonous/index.vue")
Vue.use(VueRouter)
const Cartoon=()=>
    import("../views/Cartoon.vue")

const routes = [
  {
    path: "/",
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
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
  },
  {
    path:'/Game/Gluttonous',
    name:"Gluttonous",
    component:Gluttonous

  },
  {
    path:'/Cartoon',
    name:"Cartoon",
    component:Cartoon

  },

]

const router = new VueRouter({
  routes
})

export default router
