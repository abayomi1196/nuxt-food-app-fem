<template>
  <main class="container cart">
    <h2>Your Cart</h2>

    <section v-if="cart.length">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Add Ons</th>
            <th>Amount</th>
            <th>Total Price</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <!-- options -->
            <td>
              {{ item.item }}
              <span v-if="item.options">- {{ item.options }}</span>
            </td>

            <!-- addons -->
            <td>
              <span v-for="addon in item.addOns" :key="addon" class="comma">
                {{ addon }}
              </span>
            </td>

            <!-- count -->
            <td>{{ item.count }}</td>

            <td>{{ item.combinedPrice }}</td>
          </tr>

          <tr>
            <td colspan="3"></td>
            <td class="total">Total: ${{ totalPrice.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section v-else class="emptycart">
      <AppEmptyCart />
      <h3>Your cart is empty!</h3>
      <nuxt-link to="/restaurants">
        <button>Fill it up!</button>
      </nuxt-link>
    </section>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['totalPrice']),
  },
}
</script>
