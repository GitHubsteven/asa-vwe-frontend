import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import './css/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    username: null,
    email: null
  },
  mutations: {
    setUser(state, user) {
      state['username'] = user.username;
      state['email'] = user.email;
    },
    getUserName(state) {
      return state.username;
    }
  },
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