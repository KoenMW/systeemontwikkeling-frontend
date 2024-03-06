import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import Login from '../views/Login/LoginView.vue'
import ForgetPassword from '../views/Login/ForgotPasswordView.vue'
import Signup from '../views/Login/SignupView.vue'
import AboutViewVue from '@/views/AboutView.vue'
import EmployeeView from '@/views/Employee/EmployeeView.vue'
import History from '@/views/History/HistoryView.vue'
import Jazz from '@/views/Jazz/JazzView.vue'
import { changeBackgroundColour } from '@/helpers/colour'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('transparent')
        //pak de role uit de local storage 
        const role = localStorage.getItem('role');
        //als de role 'employee' is rederect naar /employee
        if(role === 'employee') next('/employee');
        //en als de role 'admin' is rederect naar /admin
        else if (role === 'admin') next('/admin');  // ik twijfel nog of dit handig is. we kunnen het ook een gecontroleerde header item maken
        //als de role niet employee of admin is ga naar /login
        else next();
      },
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutViewVue,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('default')
        next();
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login, 
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('default')
        next();
      }
      
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: ForgetPassword,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('default')
        next();
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('default')
        next();
      }
    },
    {

      path: '/history',
      name: 'history',
      component: History,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('history')
        next();
      }
    },
    {
      path: '/employee',
      name: 'employee',
      component: EmployeeView,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('default')
        const role = localStorage.getItem('role');
        if (role != 'employee' | role != 'admin') next('/login');
        else next();
      }
    },
    {
      path: '/jazz',
      name: 'jazz',
      component: Jazz,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('jazz')
        next();
      }
    }
  ]
})

export default router