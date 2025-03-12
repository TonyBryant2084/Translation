import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  //  主页（需要登录权限）
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // meta: { requiresAuth: true } // 需要登录才能访问
  },
  //  关于页面（需要登录权限）
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    // meta: { requiresAuth: true } // 需要登录才能访问
  },
  //  登录页面（懒加载）
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/LoginView.vue')
  },
  //  注册页面（懒加载）
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/login/RegisterView.vue')
  }
]

const router = new VueRouter({
  mode: 'history', // 使用 HTML5 History 模式，去掉 URL 中的 #
  routes
})

/**
 *  全局路由守卫
 * 用于控制登录状态及页面访问权限
 */
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') // 获取 token

  //  如果目标路由需要登录权限
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      //  未登录，重定向到登录页
      next('/login')
    } else {
      //  已登录，允许访问
      next()
    }
  }
  // else if ((to.path === '/login' || to.path === '/register') && token) {
  //   //  已登录用户访问登录页或注册页，重定向到首页
  //   next('/login')
  // }
  else {
    //  不需要权限的页面，直接访问
    next()
  }
})

export default router
