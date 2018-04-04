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
import "../node_modules/ag-grid/dist/styles/theme-dark.css";
import "../node_modules/ag-grid/dist/styles/theme-material.css";
import "../node_modules/ag-grid/dist/styles/ag-theme-balham.css";

import "../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
import "./assets/styles.css"

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import VueSweetAlert from 'vue-sweetalert'

Vue.use(VueSweetAlert);

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBuFImM6wvxOdEwEd2QYBtYv9A4Vcmhctk",
    libraries: "places" // necessary for places input
  }
});


import {store} from './store';
import {router} from './routes.js';

import VueResource from 'vue-resource';

import vuexI18n from 'vuex-i18n';

Vue.use(vuexI18n.plugin, store);

// const translationsEn = {
//   "content": "This is some {type} content"
// };
//
// const translationsRu = {
//   "content": "Содержание"
// };

import translationsRu from './i18n/ru.json'
import translationsEn from './i18n/en.json'
import translationsLt from './i18n/lt.json'

Vue.i18n.add('en', translationsEn);
Vue.i18n.add('ru', translationsRu);
Vue.i18n.add('lt', translationsLt);

Vue.i18n.set('en');

Vue.use(VueResource);
Vue.http.options.root = 'https://wood.visata.org/api/';
//Vue.http.headers.common['Authorization'] = 'token 875ce3c994df550e37f4476bc8f1ac2570e2d9d3';

Vue.http.interceptors.push((request, next) => {
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
        this.$store.dispatch('login/updateUserName', {username: localStorage.getItem('username')});
        this.$router.push('');
        return
      }
      if(this.$store.username && localStorage.getItem('login')) {
        this.$router.push('');
      }
    }
  }

})
