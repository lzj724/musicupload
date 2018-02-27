import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import Home from '../components/home'
import Index from '../components/index'
import Register from '../components/register'
import Login from '../components/login'
import Finish from '../components/finish'
import Usercenter from '../components/usercenter'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      redirect:'/home'
    },
    {
      path: '/home',
      component: Home,
      redirect:'/index',
      children:[
        {
          path: '/index',
          component: Index,
        },
        {
          path: '/login',
          component: Login,
        },
        {
          path: '/register',
          component: Register,
        },
        {
          path: '/finish',
          component: Finish,
        },
        {
          path: '/usercenter',
          component: Usercenter,
        }
      ]
    },

  ]
})
