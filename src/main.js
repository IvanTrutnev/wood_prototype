import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import "../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../node_modules/ag-grid/dist/styles/theme-fresh.css";

import "../node_modules/vue-multiselect/dist/vue-multiselect.min.css";

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


import {store} from './store';
import {router} from './routes.js';

import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'https://wood.visata.org/api/';
Vue.http.headers.common['Authorization'] = 'token 875ce3c994df550e37f4476bc8f1ac2570e2d9d3';
Vue.http.interceptors.push((request, next) => {
  NProgress.start();
  next((response)=>{
    NProgress.done();
  });
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})