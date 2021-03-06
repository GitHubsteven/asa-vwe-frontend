import Vue from 'vue'
import Router from 'vue-router'
import BlogList from '../components/blog-list.vue'
import BlogView from '../components/blog-view.vue'
import BlogAdd from '../components/blog-add.vue'
import UserLogin from "../components/user/user-login.vue"
import UserRegister from "../components/user/user-register.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/blog-list',
      name: 'BlogList',
      component: BlogList
    },
    {
      path: '/blog-view',
      name: 'BlogView',
      component: BlogView
    },
    {
      path: '/blog-add',
      name: 'BlogAdd',
      component: BlogAdd
    },
    {
      path: '/user-login',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/user-register',
      name: 'UserRegister',
      component: UserRegister
    },
  ]
})