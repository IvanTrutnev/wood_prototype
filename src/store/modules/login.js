let isLogged;
if(localStorage.getItem('login')) {
  isLogged = true
} else {
  isLogged = false
}

export default {
  namespaced: true,
  state: {
    username: '',
    isLogged: isLogged
  },
  getters: {
    username(state){
      return state.username;
    },
    isLogged(state) {
      return state.isLogged;
    }
  },
  mutations: {
    setUserName(state, name) {
      state.username = name;
    },
    login(state) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
    }
  },
  actions: {
    updateUserName(store, name) {
      store.commit('setUserName', name);
      store.commit('login');
    },
    logout(store) {
      store.commit('logout');
    }
  }
};
