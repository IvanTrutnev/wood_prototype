import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import OrderList from './components/OrderList';
import Order from './components/Order'
import InvoiceList from './components/InvoiceList';
import OrderProductList from './components/OrderProductList';
import E404 from './components/E404';
import Login from './components/Login'

import {store} from './store';

const routes = [
  {
  	path: '',
  	redirect: {name: 'orders'}
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    name: 'orders',
		path: '/orders',
		component: OrderList,
	},
  {
    path: '/orders/:id',
    component: Order,
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
