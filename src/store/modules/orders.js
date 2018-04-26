import Vue from 'vue';
import { renderFunctions } from '../../renderFunctions'
export default {
	namespaced: true,
	state: {
    items: [],
    gridOptions:{
      enableFilter: true,
      enableColResize: true,
      animateRows: true,
      enableSorting: true,
      rowSelection: 'multiple',
      defaultColDef: {
        valueFormatter: function (params) {
          return renderFunctions.formatNumber(params.value);
        },
        cellStyle: function (params) {
          return renderFunctions.alignForNumber(params.value);
        }
      },
      onGridReady() {
        this.api.sizeColumnsToFit();
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
      if(state.gridOptions.api) {
        state.gridOptions.api.setColumnDefs(data.used_columns);
        state.gridOptions.api.setRowData(data.data.results);
      }
		}
  },
  actions: {
		loadOrders(store ,payload){
			Vue.http.get('sales/search_for_sales_order/', {params: payload})
        .then(response => response.json())
        .then(data => {
          store.commit('setData', data);
        });
		}
  }
};
