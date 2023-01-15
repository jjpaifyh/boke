import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

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
const Creation=()=>
    import("../views/Creation.vue")
const PrettyPictures=()=>
    import("../views/PrettyPictures.vue")
const Subject=()=>
    import("../components/subject/index.vue")
const Article=()=>
    import("../components/Article/index.vue")
const UN_data=()=>
    import('../views/404.vue')
const CreationCompile=()=>
    import('../views/CreationCompile.vue')
const Message=()=>
    import('../views/message.vue')
const MyH5=()=>
    import('../views/MyH5.vue')
Vue.use(VueRouter)


const routes = [
  { path: '*',redirect: {name: '404'}},
  {
    path: "/",
    redirect: '/init'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true
    },
    children:[
      {
        path:'/init',
        name:'init',
        component:Subject,
        meta: {
          keepAlive: true
        }
      },
      {
        path:'/Article/:id',
        name:'Article',
        component:Article,
        meta: {
          keepAlive: true
        }
      }
    ]
  },
  
  {
    path: '/music',
    name: 'Music',
    component: Music,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/MyH5',
    name: 'MyH5',
    component: MyH5,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
    meta: {
      keepAlive: true
    }
  },
  {
    path:'/Game/Gluttonous',
    name:"Gluttonous",
    component:Gluttonous,
    meta: {
      keepAlive: true
    }

  },
  {
    path:'/Cartoon',
    name:"Cartoon",
    component:Cartoon,
    meta: {
      keepAlive: true
    }

  },
  {
    path:'/Particulars',
    name:"Particulars",
    component:Particulars,
    meta: {
      keepAlive: true
    }

  },
  {
    path:'/Play_m',
    name:"Play_m",
    component:Play_m,
    meta: {
      keepAlive: true
    }

  },
  {
    path:'/PrettyPictures',
    name:"PrettyPictures",
    component:PrettyPictures,
    meta: {
      keepAlive: true
    }

  },
  {
    path:'/404',
    name:"404",
    component:UN_data

  },
  {
    path:'/message',
    name:"message",
    component:Message,
    meta: {
      keepAlive: true
    }

  },
  {
    path:'/Creation',
    name:"Creation",
    component:Creation,
    meta: {
      keepAlive: true
    }

  },
  {
    path:'/CreationCompile',
    name:"CreationCompile",
    component:CreationCompile,
    meta: {
      keepAlive: true
    }

  }

]


const router = new VueRouter({
  routes
})


export default router
router.beforeEach((to,from,next)=>{



  if(to.fullPath==null || to.fullPath=="/init" || to.fullPath=='/Cartoon' || to.fullPath=='/Game' || to.fullPath=='/music'|| to.fullPath=='/Cartoon'){
    next()
  }else {
    if(store.state.user.id==0){
      alert('请登录之后再操作！')
      router.push('/')
    }
    next()
  }
  console.log(to.fullPath);
  
})

// if(to.meta.isLogin){ //判断页面是否需要登录才可操作
//   if(store.state.user.userName){//判断用户是否登录，值为true，代表登录了
//       if(to.meta.roles.indexOf(String(store.state.user.power)) >= 0){//判断登录用户的权限是否满足meta对象中的roles的要求
//           next()
//       }else {
//           alert('您没有权限进入页面！')
//           router.push('/login')
//       }
//   }else {
//     alert('请登录之后再操作！')
//     router.push('/login')
//   }
// }else {
//   next()
// }