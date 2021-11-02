<template>
  <nav>
    <ul>
      <li>
        <nuxt-link exact to="/">
          <AppLogo />
        </nuxt-link>
      </li>

      <li><nuxt-link to="/restaurants">Restaurants</nuxt-link></li>
    </ul>

    <div v-if="totalCartCount" class="smallnum">{{ totalCartCount }}</div>

    <nuxt-link to="/cart">Cart</nuxt-link>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['totalCartCount']),
  },
}
</script>
