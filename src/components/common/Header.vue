<template>
    <div>
        <header class="d-flex justify-content-between">
            <button class="btn btn-info" @click="toggleMenu">
                <transition name="fade" mode="out-in">
                    <icon v-if="showMenuFlag" name="angle-double-left" key="left"></icon>
                   <!-- <icon v-else name="angle-double-right" key="right"></icon>-->
                    <icon name="angle-double-left" key="right" class="rotate-icon" v-else></icon>
                </transition>
            </button>
            <div class="d-flex">
                <div>
                    <b-dropdown right :text="this.username">
                        <b-dropdown-item @click="changeLang('lt')"><img class="lang-icon" src="../../assets/lt.svg"></b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item @click="changeLang('ru')"><img class="lang-icon" src="../../assets/ru.svg"></b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item @click="changeLang('en')"><img class="lang-icon" src="../../assets/en.svg"></b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
    export default {
      props: ['username'],
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
        },
        toggleMenu() {
          this.showMenuFlag = !this.showMenuFlag;
          this.$emit('toggleMenu', this.showMenuFlag);
        }
      }
    }
</script>


<style scoped>
    .logout__btn {
        margin-left: 20px;
    }

    .dropdown-item {
        text-align: center;
        padding: 4px;
    }
    .dropdown-divider {
        margin: 0;
    }
    .dropdown-item:hover {
        /*transform: scale(1.3);*/
    }
    .lang-icon {
        height: 13px;
        width: 20px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: transform .2s;
    }
    .fade-enter, .fade-leave-to {
        /*opacity: 0;*/
        transform: rotate(180deg);
    }
    .rotate-icon {
        transform: rotate(180deg);
    }
</style>