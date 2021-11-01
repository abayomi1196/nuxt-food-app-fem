<template>
  <main class="container">
    <AppHeader />
    <AppRestaurantInfo :restaurantsinfo="foodData" />
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['foodData']),
  },
}
</script>
