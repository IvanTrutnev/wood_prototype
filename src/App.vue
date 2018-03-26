<template>
  <div class="container-fluid">
    <header class="d-flex justify-content-end" v-if="this.$route.path !== '/login'">
      <button class="btn btn-success" @click="logout">Logout</button>
    </header>
    <div class="row">
      <div class="col-sm-3 menu" v-if="this.$route.path !== '/login'">
        <ul class="list-group">
          <router-link v-for="(item, index) in menuList"
                       :key="index"
                       :to="item.url"
                       tag="li"
                       class="list-group-item"
                       active-class="active"
          >
            <a>{{ item.text }}</a>
          </router-link>
        </ul>
      </div>
      <div class="col-sm-9">
        <transition name="slide" mode="out-in">
          <router-view v-if="$route.path !== '/login'"></router-view>
        </transition>
      </div>
    </div>
    <div class="container" v-if="$route.path === '/login'">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    methods: {
      logout() {
        //this.$store.dispatch('login/logout');
          localStorage.removeItem('login');
          location.reload();
      }
    },
    computed: {
      ...mapGetters('menu', {
        menuList: 'items'
      }),
      ...mapGetters('orders', {
        orders: 'orderList'
      }),
      ...mapGetters('login', {
        isLogged: 'isLogged'
      })
    }
  }

</script>

<style scoped>
  .container-fluid {
    padding-top: 15px;
  }

  .menu {
    border-right: 1px solid #ddd;
  }

  .list-group-item {
    transition: background 0.3s, color 0.3s;
  }

  .list-group-item a {
    text-decoration: none;
  }

  .list-group-item.active a {
    color: inherit;
  }

  .slide-enter {

  }

  .slide-enter-active {
    animation: slideIn 0.5s;
  }

  .slide-enter-to {

  }

  .slide-leave {

  }

  .slide-leave-active {
    animation: slideOut 0.5s;
  }

  .slide-leave-to {

  }

  @keyframes slideIn {
    from {
      transform: rotateY(90deg);
    }
    to {
      transform: rotateY(0deg);
    }
  }

  @keyframes slideOut {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(90deg);
    }
  }
</style>
