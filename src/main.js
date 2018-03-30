import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue';

Vue.use(Vuex);

Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import "../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../node_modules/ag-grid/dist/styles/theme-fresh.css";

import "../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
import "./assets/styles.css"

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import VueSweetAlert from 'vue-sweetalert'

Vue.use(VueSweetAlert)


import {store} from './store';
import {router} from './routes.js';


import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.http.options.root = 'https://wood.visata.org/api/';
//Vue.http.headers.common['Authorization'] = 'token 875ce3c994df550e37f4476bc8f1ac2570e2d9d3';

Vue.http.interceptors.push((request, next) => {
  console.log(NProgress);
  NProgress.start();
  next((response) => {
    NProgress.done();
  });
});
import {commonFunctions} from "./store/index";

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created: function () {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      if (!localStorage.getItem('login')) {
        this.$router.push('/login');
        return;
      }
      if (!this.$store.username && localStorage.getItem('login')) {
        //Vue.http.headers.common['Authorization'] = 'token ' + localStorage.getItem('token');
        commonFunctions.setToken(localStorage.getItem('token'));
        this.$store.dispatch('login/updateUserName', 123);
        this.$router.push('orders');
        return
      }
      if(this.$store.username && localStorage.getItem('login')) {
        this.$router.push('orders');
      }
    }
  }

})
