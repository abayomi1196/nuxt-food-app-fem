<template>
  <main class="container restaurant">
    <div class="restaurant-heading">
      <h1>Restaurants</h1>

      <AppSelect @change="selectedRestaurant = $event" />
    </div>

    <AppRestaurantInfo />
  </main>
</template>

<script>
export default {
  data() {
    return {
      selectedRestaurant: '',
    }
  },
}
</script>
