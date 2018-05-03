import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import menu from './modules/menu';
import orders from './modules/orders';
import login from './modules/login';
import generic from './modules/generic'

export const store = new Vuex.Store({
	modules: {
		menu,
		orders,
    login,
    generic
	},
	strict: process.env.NODE_ENV !== 'production'
});
