export default {
	namespaced: true,
	state: {
		items: [
			{
				url: '/orders',
				text: 'Order List'
			},
			{
				url: '/invoices',
				text: 'Invoices'
			},
			{
				url: '/orderProducts',
				text: 'Order products'
			}
		]
	},
	getters: {
		items(state){
			return state.items;
		}
	}
};
