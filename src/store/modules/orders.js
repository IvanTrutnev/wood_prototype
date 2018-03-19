import Vue from 'vue';
export default {
	namespaced: true,
	state: {
    items: [],
    gridOptions:{
      enableFilter: true,
      enableColResize: true,
      animateRows: true,
      enableSorting: true,
      defaultColDef: {
        valueFormatter: function (params) {
          function formatNumber(value, accuracy) {
            if(typeof value === 'number') {
              //return value.toFixed(2);
              let maximumAccuracy = accuracy || 3;
              return value.toLocaleString('ru-RU',{ maximumFractionDigits: maximumAccuracy });
            }
          }
          return formatNumber(params.value);
        }
      }
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
		setData(state, data) {
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
		loadOrders(store){
			Vue.http.get('sales/search_for_sales_order/', {params: {
        status_name: '',
        limit: 100,
        offset: 0,
        partner: '',
        user: ''
      }})
        .then(response => response.json())
        .then(data => {
          store.commit('setData', data);
        });
		}
  }
};
