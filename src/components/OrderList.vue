<template>
  <div>
    <div>
      <h2>Order list component</h2>
    </div>
    <div class="seearch-form">
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
            <label class="typo__label">Date</label>
            <datepicker v-model="searchData.date"></datepicker>
        </div>
      </div>
      <div class="search-form__button d-flex justify-content-between">
        <button class="btn btn-success" @click="search">Search</button>
        <button class="btn btn-warning" @click="addItem">Add Item</button>
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

  export default {
    data() {
      return {
        //gridOptions: null,
        searchData: {
          date: new Date(),
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
      search(){
        let user = this.searchData.user.value.map(item => item.id),
            buyer = this.searchData.partner.value.map(item => item.id),
            date = this.searchData.date;
        console.log(buyer);
        this.$http.get('sales/search_for_sales_order/', {params: {
          status_name: '',
          limit: 100,
          offset: 0,
          partner: buyer.toString(),
          user: user.toString()
        }})
          .then(response => response.json())
          .then(data => {
            this.$store.commit('orders/loadOItems', data);
          });
      },
      addItem() {
        console.log('add Item');
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
        console.log(data);
        this.searchData.partner.options = data;

        this.$http.get('woodware/list/users/')
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.searchData.user.options = data;
            this.$http.get('sales/search_for_sales_order/', {params: {
              status_name: '',
              limit: 100,
              offset: 0,
              partner: '',
              user: ''
            }})
              .then(response => response.json())
              .then(data => {
                console.log(data);
                this.$store.commit('orders/loadOItems', data);
              });
          });
      });

    }
  }
</script>

<style scoped>
  .search-form__filters, .seearch-form {
    margin-bottom: 20px;
  }
</style>
