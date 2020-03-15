import Vue from 'vue'
import Router from 'vue-router'
import BlogList from '../components/blog-list.vue'
import BlogView from '../components/blog-view.vue'
import BlogAdd from '../components/blog-add.vue'
import UserLogin from "../components/user/user-login.vue"
import UserRegister from "../components/user/user-register.vue"
import HomePage from "../components/home/home-page.vue"

Vue.use(Router);

let router = new Router({
    // mode: 'history',
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
        {
            path: '/home-page',
            name: 'HomePage',
            component: HomePage
        },
    ]
});
router.beforeEach((to, from, next) => {
    let publicPages = ['/', '/blog-list', '/user-login', '/user-register', '/blog-view'];
    let authRequired = !publicPages.includes(to.path);
    // eslint-disable-next-line no-undef
    let loggedIn = localStorage.getItem('user');
    if (authRequired && !loggedIn) {  //authRequired && !loggedIn
        return next('/user-login');
    }
    next();
});

export default router;