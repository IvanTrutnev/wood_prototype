<template>
  <div>
    <div>
      <h2>
        Order Product list
      </h2>
    </div>
    <hr />
     <div>
         {{ $t('content')}}
     </div>
    <div>
        <router-link :to="{name: 'orders'}">Start from main page</router-link>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>

</style>
