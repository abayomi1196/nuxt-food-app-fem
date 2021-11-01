<template>
  <main class="container restaurant">
    <div class="restaurant-heading">
      <h1>Restaurants</h1>

      <AppSelect @change="selectedRestaurant = $event" />
    </div>

    <AppRestaurantInfo :restaurantsinfo="filteredRestaurants" />
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      selectedRestaurant: '',
    }
  },
  computed: {
    ...mapState(['foodData']),

    filteredRestaurants() {
      if (this.selectedRestaurant) {
        return this.foodData.filter((el) => {
          const name = el.name.toLowerCase()

          return name.includes(this.selectedRestaurant)
        })
      } else {
        return this.foodData
      }
    },
  },
}
</script>
