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
const Particulars=()=>
  import('../views/Particulars.vue')
const Play_m=()=>
  import('../views/Play_m.vue')

const Cartoon=()=>
    import("../views/Cartoon.vue")
Vue.use(VueRouter)


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
  {
    path:'/Particulars',
    name:"Particulars",
    component:Particulars

  },
  {
    path:'/Play_m',
    name:"Play_m",
    component:Play_m

  },

]

const router = new VueRouter({
  routes
})

export default router
