<template>
    <div>
        <ag-grid-vue style="width: 100%; height: 350px;" class="ag-fresh" :gridOptions="gridOptions">

        </ag-grid-vue>
    </div>
</template>

<script>
  import {AgGridVue} from "ag-grid-vue";
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters('orders',{
        gridOptions: 'gridOptions'
        })
    },
    components: {
      'ag-grid-vue': AgGridVue
    },
    beforeMount() {
//      this.gridOptions = {
//        enableFilter: true,
//        enableColResize: true,
//        enableSorting: true
//      };
//      this.$http.get('sales/search_for_sales_order/', {params: {
//        status_name: '',
//        limit: 100,
//        offset: 0,
//        partner: '',
//        user: ''
//      }})
//        .then(response => response.json())
//        .then(data => {
//          console.log(data);
//          this.$store.commit('orders/loadOItems', data);
//        });
    },
    created() {
    }
  }
</script>

<style scoped>

</style>