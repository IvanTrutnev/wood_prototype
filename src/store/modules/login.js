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
    }
  },
  actions: {
    updateUserName(store, name) {
      store.commit('setUserName', name)
    }
  }
};
