import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import Login from '../views/Login/LoginView.vue'
import ForgetPassword from '../views/Login/ForgotPasswordView.vue'
import Signup from '../views/Login/SignupView.vue'
import History from '../views/History/HistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
      
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: ForgetPassword
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/history',
      name: 'history',
      component: History
    }
  ]
})

export default router
