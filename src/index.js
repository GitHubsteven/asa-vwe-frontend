import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import './css/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: null,
    email: null
  },
  mutations: {},
  actions: {},
  getters: {
    getUserName: username => {
      return username;
    }
  }
});
new Vue({
  el: '#app',
  store,
  render: h => h(App)
});