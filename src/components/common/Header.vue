<template>
    <div>
        <header class="d-flex justify-content-between">
            <button class="btn btn-info" @click="showMenuFlag = !showMenuFlag">
                <!--<span v-if="showMenuFlag">Hide</span>-->
                <!--<span v-else>Show</span>-->
                <icon v-if="showMenuFlag" name="angle-double-left"></icon>
                <icon v-else name="angle-double-right"></icon>
            </button>
            <app-header></app-header>
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
                <!--<button class="btn btn-secondary logout__btn" @click="logout">Logout</button>-->
            </div>
        </header>
    </div>
</template>

<script>
    export default {
      data() {
        return {

        }
      }
    }
</script>


<style>

</style>