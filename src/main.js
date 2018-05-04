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
    libraries: "places"
  }
});

import { store } from './store';
import { router } from './routes.js';

import VueResource from 'vue-resource';

import ru from './i18n/ru.json'
import en from './i18n/en.json'
import lt from './i18n/lt.json'

const messages = {
  en,
  ru,
  lt
};

import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'en',
  messages
});

import '../node_modules/vue-awesome/icons'


import Icon from '../node_modules/vue-awesome/components/Icon'

Vue.component('icon', Icon)


Vue.use(VueResource);
Vue.http.options.root = 'https://wood.visata.org/api/';

Vue.http.interceptors.push((request, next) => {
  NProgress.start();
  next((response) => {
    NProgress.done();
  });
});
import { commonFunctions } from "./commonFuncitons";

new Vue({
  el: '#app',
  store,
  router,
  i18n,
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
      if (this.$store.username && localStorage.getItem('login')) {
        this.$router.push('');
      }
    }
  }

})
