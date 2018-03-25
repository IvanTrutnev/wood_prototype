<template>
  <div>
    <form v-if="!loading" @submit.prevent>
      <div>
        <label class="type__label">User Name</label>
        <input class="form-control" v-model="username" placeholder="Enter user name">
      </div>
      <div>
        <label class="type__label">Password</label>
        <input class="form-control" type="password" v-model="password" placeholder="Enter password">
      </div>
      <div class="login-btn">
        <button class="btn btn-primary" @click="login">Login</button>
      </div>
    </form>
    <Loading v-if="loading"></Loading>
  </div>
</template>

<script>
  import Loading from './Loading.vue'
  import {mapGetters} from 'vuex'
  export default {
    components: {Loading},
    data() {
      return {
        loading: false,
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        if(this.username !== '' && this.password !== '') {
          this.loading = true;
          setTimeout(()=> {
            this.loading = false;
            this.$store.dispatch('login/updateUserName',this.username);
            localStorage.setItem('login', true);
            this.$router.push('/orders')
          }, 1000);
        }
      }
    }
  }
</script>

<style scoped>
  .login-btn {
    margin-top: 10px;
  }
</style>
