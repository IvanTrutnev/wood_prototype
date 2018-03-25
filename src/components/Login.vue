<template>
  <div>
    <form v-if="!loading">
      <div>
        <label class="type__label">User Name</label>
        <input class="form-control" v-model="username" placeholder="Enter user name">
      </div>
      <div>
        <label class="type__label">Password</label>
        <input class="form-control" v-model="password" placeholder="Enter password">
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
        console.log(this.name);
        console.log(this.password);
        if(this.username !== '' && this.password !== '') {
          this.loading = true;

          setTimeout(()=> {
            //this.$store.dispatch('update_user_name',this.username);
            localStorage.setItem('login', true);
            this.$router.push('/orders')
          });
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
