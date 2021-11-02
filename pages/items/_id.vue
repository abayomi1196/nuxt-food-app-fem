<template>
  <main class="container">
    <section
      class="image"
      :style="`background:url(/${currentItem.img}) no-repeat center`"
    ></section>

    <section class="details">
      <h1>{{ currentItem.item }}</h1>

      <h3>Price: ${{ currentItem.price.toFixed(2) }}</h3>

      <div class="quantity">
        <input v-model="count" type="number" min="1" />
        <button class="primary" @click="addToCart">
          Add to Cart - ${{ combinedPrice }}
        </button>
      </div>

      <fieldset v-if="currentItem.options">
        <legend>
          <h3>Options</h3>
        </legend>
        <div v-for="option in currentItem.options" :key="option">
          <input
            :id="option"
            v-model="itemOptions"
            type="radio"
            name="option"
            :value="option"
          />
          <label :for="option">{{ option }}</label>
        </div>
      </fieldset>

      <fieldset v-if="currentItem.addOns">
        <legend>
          <h3>Add Ons</h3>
        </legend>
        <div v-for="addon in currentItem.addOns" :key="addon">
          <input
            :id="addon"
            v-model="itemAddons"
            type="checkbox"
            name="addon"
            :value="addon"
          />
          <label :for="addon">{{ addon }}</label>
        </div>
      </fieldset>

      <!-- toast component -->
      <AppToast v-if="cartSubmitted">
        <p>
          Order submitted <br />
          Check out more
          <nuxt-link to="/restaurants">restaurants</nuxt-link>
        </p>
      </AppToast>
    </section>

    <section class="options">
      <h3>Descriptions</h3>
      <p>{{ currentItem.description }}</p>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      id: this.$route.params.id,
      count: 1,
      itemOptions: '',
      itemAddons: [],
      itemSizeAndCost: [],
      cartSubmitted: false,
    }
  },
  computed: {
    ...mapState(['foodData']),

    currentItem() {
      let result

      for (let i = 0; i < this.foodData.length; i++) {
        for (let j = 0; j < this.foodData[i].menu.length; j++) {
          if (this.foodData[i].menu[j].id === this.id) {
            result = this.foodData[i].menu[j]
            break
          }
        }
      }

      return result
    },

    combinedPrice() {
      const total = this.count * this.currentItem.price
      return total.toFixed(2)
    },
  },
  methods: {
    addToCart() {
      const formData = {
        item: this.currentItem.item,
        count: this.count,
        options: this.itemOptions,
        addOns: this.itemAddons,
        combinedPrice: this.combinedPrice,
      }

      this.cartSubmitted = true
      this.$store.commit('addToCart', formData)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1000px;
  margin: 100px auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-template-rows: 400px 1fr;
  grid-column-gap: 60px;
  grid-row-gap: 60px;
  line-height: 2;
}

.image {
  grid-area: 1 / 1 / 2 / 2;
  background-size: cover;
}

.details {
  grid-area: 1 / 2 / 2 / 3;
  position: relative;
}

.options {
  grid-area: 2 / 1 / 3 / 2;
}

@media (max-width: 768px) {
  .image {
    grid-area: 1 / 1 / 2 / 3;
  }

  .details {
    grid-area: 2 / 1 / 3 / 2;
  }

  .options {
    grid-area: 2 / 2 / 3 /3;
  }
}
</style>
