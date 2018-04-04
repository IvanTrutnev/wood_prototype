<template>
  <div>
    <div>
      <h2>Invoice list</h2>
    </div>
    <hr />
    <div>
      <!--<div>-->
        <!--<label class="type__label">Descriptor</label>-->
        <!--<input class="form-control" placeholder="Enter part of descriptor name">-->
      <!--</div>-->
    </div>
    <div>
        <google-map />
      	<router-link :to="{name: 'orders'}">Start from main page</router-link>
    </div>
  </div>
</template>

<script>
  import GoogleMap from "./GoogleMap";
  export default {
    components: {
      GoogleMap
    }
  };

</script>

<style scoped>

</style>
