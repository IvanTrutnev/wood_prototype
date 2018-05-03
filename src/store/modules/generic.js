import Vue from 'vue';
export default {
  namespaced: true,
  state: {
    currencies: []
  },
  getters: {
    currencies(state){
      return state.currencies;
    }
  },
  mutations: {
    getCurrencies(state, payLoad) {
      state.currencies = payLoad;
    }
  },
  actions: {
    getCurrencies(store) {
      Vue.http.get('generic/currencies')
        .then(response => response.json())
        .then(data => {
          store.commit('getCurrencies', data);
        });
    }
  }
};
