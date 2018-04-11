import Vue from 'vue';
export const commonFunctions =  {
  setToken: (token) => {
    Vue.http.headers.common['Authorization'] = 'token ' + token;
  }
};