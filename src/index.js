import Vue from 'vue'
import App from './App.vue'
import './css/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import BlogComment from "../src/components/blog-comment.vue"

Vue.component({"blog-comment": BlogComment});

Vue.use(ElementUI);
new Vue({
  el: '#app',
  render: h => h(App)
});