import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import OrderList from './components/OrderList';
import InvoiceList from './components/InvoiceList';
import OrderProductList from './components/OrderProductList';
import E404 from './components/E404';

import {store} from './store';

const routes = [
  {
  	path: '',
  	redirect: {name: 'orders'}
  },
  {
    name: 'orders',
		path: '/orders',
		component: OrderList,
    beforeEnter(from, to, next){
      //store.dispatch('orders/loadItems');
    next();
  }
	},
  {
    name: 'invoices',
		path: '/invoices',
		component: InvoiceList
	},
  {
    name: 'orderProducts',
		path: '/orderProducts',
		component: OrderProductList
	},
  {
		path: '*',
		component: E404
	}
];
export const router = new VueRouter({
	routes,
	mode: 'history'
});
