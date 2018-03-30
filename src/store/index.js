import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import menu from './modules/menu';
import orders from './modules/orders';
import login from './modules/login'

export const store = new Vuex.Store({
	modules: {
		menu,
		orders,
    login
	},
	strict: process.env.NODE_ENV !== 'production'
});

export const renderFunctions = {
  formatNumber: (value, accuracy) => {
    if(typeof value === 'number') {
      let maximumAccuracy = accuracy || 3;
      return value.toLocaleString('ru-RU',{ maximumFractionDigits: maximumAccuracy });
    }
  },

};

export const commonFunctions = {
  setToken: (token) => {
    Vue.http.headers.common['Authorization'] = 'token ' + token;
  }
};
