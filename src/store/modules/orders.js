import Vue from 'vue';
export default {
	namespaced: true,
	state: {
    items: [],
    gridOptions:{
      enableFilter: true,
      enableColResize: true,
      enableSorting: true
    }
	},
	getters: {
    items(state) {
			return state.items;
		},
    gridOptions(state) {
      return state.gridOptions;
    }
	},
  mutations: {
		loadOItems(state, data) {
			//state.items = data;
      state.gridOptions.columnDefs = data.used_columns;
      state.gridOptions.api.setColumnDefs(data.used_columns);
      state.gridOptions.api.setRowData(data.data.results);
      state.gridOptions.onGridReady = () => {
        state.gridOptions.api.sizeColumnsToFit();
      };
		}
  },
  actions: {
		loadItems(store){
			Vue.http.get('sales/search_for_sales_order/?status_name=&limit=100&offset=0&partner=&user=&')
					  .then(response => response.json())
					  .then(data => {
					  	 //console.log(data);
							 store.commit('loadOItems', data.data.results);
					  });
		}
  }
};
