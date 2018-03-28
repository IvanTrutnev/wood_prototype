
<template>
  <div>
    <form v-if="!loading" @submit.prevent>
      <div>
        <label class="type__label">User Name</label>
        <input class="form-control" v-model="user.username" placeholder="Enter user name">
      </div>
      <div>
        <label class="type__label">Password</label>
        <input class="form-control" type="password" v-model="user.password" placeholder="Enter password">
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
  import Vue from 'vue'
  export default {
    components: {Loading},
    data() {
      return {
        loading: false,
        user: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      login() {
        if(this.user.username !== '' && this.user.password !== '') {
          this.loading = true;
          setTimeout(()=> {
            this.loading = false;
            this.$http.post('authtoken/', this.user)
              .then(response => response.json())
              .then(data => {
                Vue.http.headers.common['Authorization'] = 'token ' + data.token;
                this.$store.dispatch('login/updateUserName',this.user);
                localStorage.setItem('login', true);
                this.$router.push('/orders')
              }).catch(error => {
              console.log(error);
              this.$swal('Oops...', 'Something went wrong!', 'error')
            });
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
