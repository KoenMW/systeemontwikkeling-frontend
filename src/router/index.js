import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import YummyView from '../views/Yummy/Home/YummyHomeView.vue'
import Login from '../views/Login/LoginView.vue'
import ForgetPassword from '../views/Login/ForgotPasswordView.vue'
import Signup from '../views/Login/SignupView.vue'
import AboutViewVue from '@/views/AboutView.vue'
import EmployeeView from '@/views/Employee/EmployeeView.vue'
import History from '@/views/History/HistoryView.vue'
import YummyDetailView from '@/views/Yummy/DetailPage/YummyDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: (to, from, next) => {
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
      path: '/yummy',
      name: 'yummy',
      component: YummyView
    },
    {
      path: '/yummydetail',
      name: 'yummydetail',
      component: YummyDetailView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutViewVue
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
      component: History,
    },
    {
      path: '/employee',
      name: 'employee',
      component: EmployeeView,
      beforeEnter: (to, from, next) => {
        const role = localStorage.getItem('role');
       // if (role != 'employee' | role != 'admin') next('/login');
       // else next();
      }
    }
  ]
})

export default router