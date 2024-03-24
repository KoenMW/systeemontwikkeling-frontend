import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import YummyView from '../views/Yummy/Home/YummyHomeView.vue'
import Login from '../views/Login/LoginView.vue'
import ForgetPassword from '../views/Login/ForgotPasswordView.vue'
import Signup from '../views/Login/SignupView.vue'
import AboutViewVue from '@/views/AboutView.vue'
import EmployeeView from '@/views/Employee/EmployeeView.vue'
import History from '@/views/History/HistoryView.vue'
import Dance from '@/views/Dance/DanceView.vue'
import YummyDetailView from '@/views/Yummy/DetailPage/YummyDetailView.vue'
import Jazz from '@/views/Jazz/JazzView.vue'
import DetailPage from '@/views/detail/detailView.vue'
import Users from '@/views/Admin/UsersView.vue'
import errorPage from '@/views/error/404View.vue'
import AccountView from '@/views/Account/AccountView.vue'
import Admin from '@/views/Admin/AdminDashboard.vue'
import Events from '@/views/Admin/EventsView.vue'
import Orders from '@/views/Admin/OrdersView.vue'
import Wysiwyg from '@/views/Admin/WysiwygView.vue'
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
        const role = localStorage.getItem('role')
        //als de role 'employee' is rederect naar /employee
        if (role === 'employee') next('/employee')
        //en als de role 'admin' is rederect naar /admin
        else if (role === 'admin')
          next('/admin') // ik twijfel nog of dit handig is. we kunnen het ook een gecontroleerde header item maken
        //als de role niet employee of admin is ga naar /login
        else next()
      },
      component: HomeView
    },
    {
      path: '/yummy',
      name: 'yummy',
      component: YummyView,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('yummy')
        next()
      }
    },
    {
      path: '/yummydetail',
      name: 'yummydetail',
      component: YummyDetailView,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('yummy')
        next()
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutViewVue,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('default')
        next()
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('default')
        next()
      }
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: ForgetPassword,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('default')
        next()
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('default')
        next()
      }
    },
    {
      path: '/history',
      name: 'history',
      component: History,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('history')
        next()
      }
    },
    {
      path: '/dance',
      name: 'dance',
      component: Dance,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('default')
        next()
      }
    },
    {
      path: '/employee',
      name: 'employee',
      component: EmployeeView,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('default')
        next()
        //const role = localStorage.getItem('role');

        //if (role != 'employee' | role != 'admin') next('/login');
        //else next();
      }
    },
    {
      path: '/jazz',
      name: 'jazz',
      component: Jazz,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('jazz')
        next()
      }
    },
    {
      path: '/:parentName/:id',
      name: 'detail',
      component: DetailPage,
      beforeEnter: (_to, _from, next) => {
        const parentName = _to.params.parentName
        changeBackgroundColour(parentName)
        next()
      }
    },
    {
      path: '/admin',
      name: 'adminDashboard',
      component: Admin,
      children: [
        {
          path: 'users',
          name: 'adminUsers',
          component: Users
        },
        {
          path: 'events',
          name: 'adminEvents',
          component: Events
        },
        {
          path: 'orders',
          name: 'adminOrders',
          component: Orders
        },
        {
          path: 'wysiwyg',
          name: 'adminWysiwyg',
          component: Wysiwyg
        }
      ],
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('default')
        if (_to.path.startsWith('/admin')) {
          document.body.classList.add('admin-page')
        } else {
          document.body.classList.remove('admin-page')
        }
        next()
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: errorPage,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('default')
        next()
      }
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      beforeEnter: (_to, _from, next) => {
        changeBackgroundColour('default')
        next();
      }
    }
  ]
})

export default router
