<template>
    <div class="container-fluid">
        <div v-if="$route.path !== '/login'">
            <header class="d-flex justify-content-between">
                <button class="btn btn-info" @click="showMenuFlag = !showMenuFlag">
                    <!--<span v-if="showMenuFlag">Hide</span>-->
                    <!--<span v-else>Show</span>-->
                    <icon v-if="showMenuFlag" name="angle-double-left"></icon>
                    <icon v-else name="angle-double-right"></icon>
                </button>
                <div class="d-flex">
                    <div>
                        <b-dropdown right :text="this.username">
                            <b-dropdown-item @click="changeLang('lt')"><img class="lang-icon" src="./assets/lt.svg"></b-dropdown-item>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item @click="changeLang('ru')"><img class="lang-icon" src="./assets/ru.svg"></b-dropdown-item>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item @click="changeLang('en')"><img class="lang-icon" src="./assets/en.svg"></b-dropdown-item>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                        </b-dropdown>
                    </div>
                    <!--<button class="btn btn-secondary logout__btn" @click="logout">Logout</button>-->
                </div>
            </header>
            <div class="row">
                <div class="menu col-sm-4" v-if="this.$route.path !== '/login' && showMenuFlag">
                    <ul class="list-group" v-if="showMenuFlag">
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
                <div v-bind:class="{ 'col-sm-8': showMenuFlag, 'col-sm-12': !showMenuFlag}">
                    <transition name="slide" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>
        <div class="container" v-else>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Vue from 'vue';

  export default {
    data() {
      return {
        showMenuFlag: true
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('login');
        localStorage.removeItem('token');
        location.reload();
      },
      changeLang(lang) {
        this.$i18n.locale = lang;
        localStorage.setItem('lang', lang);
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
        username: 'username'
      })
    }
  }

</script>

<style scoped>
    .container-fluid {
        padding-top: 15px;
    }

    .menu {
        /*border-right: 1px solid #ddd;*/
    }

    .menu__btn, .list-group {
        margin-top: 10px;
    }


    .list-group-item {
        transition: background 0.3s, color 0.3s;
    }

    .logout__btn {
        margin-left: 20px;
    }

    .list-group-item a {
        text-decoration: none;
    }

    .list-group-item.active a {
        color: inherit;
    }
    .dropdown-item {
        text-align: center;
        padding: 4px;
    }
    .dropdown-divider {
        margin: 0;
    }
    .dropdown-item:hover {
        //transform: scale(1.3);
    }
    .lang-icon {
        height: 13px;
        width: 20px;
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
