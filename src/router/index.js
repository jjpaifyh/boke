import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return RouterPush.call(this, to).catch(err => err)
}
const RouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return RouterReplace.call(this, to).catch(err => err)
}

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

const PrettyPictures=()=>
    import("../views/PrettyPictures.vue")

const Subject=()=>
    import("../components/subject/index.vue")
const Article=()=>
    import("../components/Article/index.vue")
Vue.use(VueRouter)


const routes = [
  {
    path: "/",
    redirect: '/init'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/init',
        name:'init',
        component:Subject
      },
      {
        path:'/Article/:id',
        name:'Article',
        component:Article
      }
    ]
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
  {
    path:'/PrettyPictures',
    name:"PrettyPictures",
    component:PrettyPictures

  },

]

const router = new VueRouter({
  routes
})

export default router
