<template>
  <div>
    <div>
      <h2>Order list</h2>
    </div>
    <div class="search-form">
      <div class="search-form__filters">
        <div>
          <label class="typo__label">Creator</label>
          <multiselect v-model="searchData.user.value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="username" track-by="username" :options="searchData.user.options" :multiple="true" :taggable="true"></multiselect>
        </div>
        <div>
            <label class="typo__label">Buyer</label>
            <multiselect v-model="searchData.partner.value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="text" track-by="text" :options="searchData.partner.options" :multiple="true" :taggable="true"></multiselect>
        </div>
        <div>
            <label class="type__label">Descriptor</label>
            <input class="form-control" v-model="searchData.descriptor" placeholder="Enter part of descriptor name">
        </div>
        <div>
            <label class="typo__label">Order Date</label>
            <datepicker v-model="searchData.created_date_between_0" :clear-button="true" input-class="datepicker"
            ></datepicker>
            <!--:format="customFormatter"-->
        </div>
      </div>
      <div class="search-form__button d-flex justify-content-between">
        <button class="btn btn-success" @click="search">Search</button>
      </div>
    </div>
    <div>
        <order-list-grid></order-list-grid>
    </div>
  </div>
</template>

<script>
  import {AgGridVue} from "ag-grid-vue";
  import {mapGetters} from "vuex";
  import {mapMutations} from "vuex";
  import {mapActions} from "vuex";
  import Multiselect from 'vue-multiselect';
  import Datepicker from 'vuejs-datepicker';
  import orderListGrid from './orderListGrid'
  import moment from 'moment';

  export default {
    data() {
      return {
        //gridOptions: null,
        searchData: {
          created_date_between_0: null,
          descriptor: '',
          partner: {
            value: [],
            options: []
          },
          user: {
            value: [],
            options: []
          }
        }
      }
    },
    computed: {
      ...mapGetters('orders', {
          orders: 'items',
        gridOptions: 'gridOptions'
      })
    },
    methods: {
//      customFormatter(date) {
//        return moment(date).format('YYYY-MM-DD');
//      },
      search(){
        let user = this.searchData.user.value.map(item => item.id),
          partner = this.searchData.partner.value.map(item => item.id);
        let searchObject = {
          status_name: '',
          limit: 100,
          offset: 0,
          partner: partner.toString(),
          user: user.toString()
        };
        if(this.searchData.created_date_between_0) {
          searchObject.created_date_between_0 = moment(this.searchData.created_date_between_0).format('YYYY-MM-DD');
        }
        this.$store.dispatch('orders/loadOrders', searchObject);
      }
    },
    components: {
      Multiselect,
      Datepicker,
      'ag-grid-vue': AgGridVue,
      'order-list-grid': orderListGrid
    },
    beforeMount() {
      this.$http.get('woodware/list/search_for_partner_select2_view/', {params: {
        role: 'customer',
      }})
      .then(response => response.json())
      .then(data => {
        this.searchData.partner.options = data;
        this.$http.get('woodware/list/users/')
          .then(response => response.json())
          .then(data => {
            this.searchData.user.options = data;
            let searchObject = {
              status_name: '',
              limit: 100,
              offset: 0,
              partner: '',
              user: ''
            };
            this.$store.dispatch('orders/loadOrders', searchObject);
          });
      });

    }
  }
</script>

<style scoped>
  .search-form__filters, .search-form {
    margin-bottom: 20px;
  }
</style>
