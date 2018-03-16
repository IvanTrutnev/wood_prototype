<template>
  <div>
    <div>
      <h2>Order list component</h2>
    </div>
    <div class="seearch-form">
      <div class="search-form__filters">
        <div>
          <label class="typo__label">Countries</label>
          <multiselect v-model="searchData.countries.value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="searchData.countries.options" :multiple="true" :taggable="true"></multiselect>
        </div>
        <div>
          <label class="typo__label">Names</label>
          <multiselect v-model="searchData.names.value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="name" :options="searchData.names.options" :multiple="true" :taggable="true"></multiselect>
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
        <order-list-grid :modelUpdated="onModelUpdated"></order-list-grid>
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
          countries: {
            value: [
              { name: 'Jamaica', code: 'ja'}
            ],
            options: [
              { name: 'Jamaica', code: 'ja'},
              { name: 'Soutch Africa', code: 'sa'},
              { name: 'Canada', code: 'ca'},
              { name: 'BE', code: 'be'},
              { name: 'AAAAAAA', code: 'aa'},
              { name: 'QQQQQQQ', code: 'qq'},
              { name: 'WWWWWWW', code: 'ww'},
              { name: 'EEEEEEEE', code: 'ee'},
              { name: 'TTTTTTT', code: 'tt'}
            ]
          },
          names: {
            value: [{name: 'order1'}],
            options: [
              { name: 'order1'},
              { name: 'order2'},
              { name: 'order3'}
            ]
          },
          date: new Date(),
          partner: {
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
      onModelUpdated() {
        console.log('onModelUpdated');
      },
      search(){
        let countries = this.searchData.countries.value.map((item) => item.name),
            names = this.searchData.names.value.map((item) => item.name),
            buyer = this.searchData.partner.value.map(item => item.id),
            date = this.searchData.date;
        console.log(buyer);
        this.$http.get('sales/search_for_sales_order/', {params: {
          status_name: '',
          limit: 100,
          offset: 0,
          partner: buyer.toString(),
          user: ''
        }})
          .then(response => response.json())
          .then(data => {
            this.$store.commit('orders/loadOItems', data);
          });
      },
      addItem() {
        console.log('add Item');
        //console.log(this.orders);
        //this.gridOptions.api.setRowData(this.orders);
      },
      createRowData() {
        this.$store.dispatch('orders/loadItems');
      },
      createColumnDefs() {
        return [
          {
            headerName: "Id",
            field: "id",
            width: 450,
            pinnedRowCellRendererParams: {
              style: {'font-weight': 'bold'}
            }
          },
          {
            headerName: "Status",
            field: "status",
            width: 430,
            pinnedRowCellRendererParams: {
              style: {'font-style': 'italic'}
            }
          },
        ];
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
      });
    }

  }
</script>

<style scoped>
  .search-form__filters, .seearch-form {
    margin-bottom: 20px;
  }
</style>
