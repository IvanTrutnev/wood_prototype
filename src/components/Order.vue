<template>
    <div>
        <div>
            <h2>
                Order {{id}}
            </h2>
        </div>
        <hr />
        <div>
            <router-link :to="{name: 'orders'}">Start from main page</router-link>
        </div>
    </div>

</template>

<script>
    export default {
      data() {
        return {

        }
      },
      computed: {
        id() {
          return this.$route.params.id
        }
      }
    }
</script>

<style scoped>

</style>

