import Vue from 'vue'
import Router from 'vue-router'
import BlogList from '../components/blog-list.vue'
import BlogView from '../components/blog-view.vue'

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
        }
    ]
})