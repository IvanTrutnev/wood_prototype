<template>
    <div>
        <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-success" @click="saveOrder">Save</button>
        </div>
        <div>
            <h2>
                Order {{id}}
            </h2>
        </div>
        <hr />
        <div>
            <div>
                <label class="typo__label">Currency</label>
                <multiselect v-model="currency.value" :max-height="200" :searchable="false" :close-on-select="false" :show-labels="false"  placeholder="Search a tag" label="code" track-by="code" :options="currencies"></multiselect>
            </div>
        </div>
        <div>
            <router-link :to="{name: 'orders'}">Start from main page</router-link>
        </div>
    </div>

</template>

<script>
  import Multiselect from 'vue-multiselect';
  import {mapGetters} from "vuex";
  import {mapMutations} from "vuex";
  import {mapActions} from "vuex";

  export default {
    data() {
      return {
        orderData: null,
        currency: {
          //options: [{name:'DKK'}, {name:'EUR'}, {name:'GBP'}, {name:'USD'}],
          value: []
        }
      }
    },
    methods: {
      saveOrder() {
        console.log('save order')
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      ...mapGetters('generic', {
        currencies: 'currencies',
      })
    },
    beforeMount() {
      this.$store.dispatch('generic/getCurrencies');
      this.$http.get(`sales/salesorders/${this.id}/`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.currency.value = {code: data[0].currency_name};
        });
    },
    components: {
      Multiselect
    }
  }
</script>

<style scoped>

</style>

