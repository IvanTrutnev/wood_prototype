<template>
  <div>
    <div>
      <h2>Order list component</h2>
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
            <label class="typo__label">Order Date</label>
            <datepicker v-model="searchData.created_date_between_0"></datepicker>
            <!--:format="customFormatter"-->
        </div>
      </div>
      <div class="search-form__button d-flex justify-content-between">
        <button class="btn btn-success" @click="search">Search</button>
      </div>
      <div>

      </div>
    </div>
    <!-- <order-list-grid></order-list-grid> -->
    <!--<div>-->
      <!--<table class="table table-bordered">-->
          <!--<tr v-for="item in orders" :key="item.id">-->
              <!--<td>{{item.id}}</td>-->
              <!--<td>{{item.status}}</td>-->
              <!--<td>{{item.order_date}}</td>-->
          <!--</tr>-->
      <!--</table>-->
    <!--</div>-->

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
          created_date_between_0: new Date(),
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
          partner = this.searchData.partner.value.map(item => item.id),
          created_date_between_0 = moment(this.searchData.created_date_between_0).format('YYYY-MM-DD');

        console.log(created_date_between_0);
        this.$http.get('sales/search_for_sales_order/', {params: {
          status_name: '',
          limit: 100,
          offset: 0,
          created_date_between_0: created_date_between_0,
          partner: partner.toString(),
          user: user.toString()
        }})
          .then(response => response.json())
          .then(data => {
            this.$store.commit('orders/setData', data);
          });
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
            this.$store.dispatch('orders/loadOrders');
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
