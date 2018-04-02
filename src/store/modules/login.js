export default {
  namespaced: true,
  state: {
    username: ''
  },
  getters: {
    username(state){
      return state.username;
    }
  },
  mutations: {
    setUserName(state, name) {
      state.username = name;
      localStorage.setItem('username', name);
    }
  },
  actions: {
    updateUserName(store, payLoad) {
      store.commit('setUserName', payLoad.username);
    }
  }
};
