import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import MenuVue from '../components/MenuVue.vue'
import LoginVue from "@/components/LoginVue.vue";
import CateView from "@/views/CateView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path:'/Login',
    name:'Login',
    component: LoginVue
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuVue,
    children :[
      {
        path: 'userList',
        name: 'userList',
        component: UserView,

      },
      {
        path: "cateList",
        name: "cateList",
        component: CateView,
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//定义白名单，不需要拦截的页面
var whiteList = ["/login"]
router.beforeEach((to, from, next) => {

  // let ss = []
  // for(let i of routes ){
  //   console.log(to.path)
  //   ss.push(i.path)
  // }
  // if(ss.includes(to.path)||to.path.includes("/back")){
  //   next()
  // }
  // else  next({path:"/login"})
  //为什么会栈溢出呢？

  if(whiteList.includes(to.path)){
    next() //向后放行
  }else{
    let username = window.localStorage.getItem("username");
    if(username==null||username==""||username==undefined){
      next({path:"/login"})
    }
    else next()
  }


  // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // else next()
  console.log(to);
  console.log(from);

})


export default router
