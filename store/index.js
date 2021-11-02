import { v4 as uuid } from 'uuid'

export const state = () => ({
  foodData: [],
  cart: [],
})

export const getters = {
  totalPrice: (state) => {
    if (!state.cart.length) return 0
    return state.cart.reduce((acc, next) => acc + +next.combinedPrice, 0)
  },
  totalCartCount: (state) => {
    if (!state.cart.length) return 0
    return state.cart.reduce((acc, next) => acc + +next.count, 0)
  },
}

export const mutations = {
  updateFoodData: (state, payload) => {
    state.foodData = payload
  },
  addToCart: (state, payload) => {
    state.cart.push({ id: uuid(), ...payload })
  },
}

/* 
using an action to make asynchronous tasks and call a sync mutation    which then updates the state.
*/
export const actions = {
  async getFoodData({ state, commit }) {
    if (state.foodData.length) return

    try {
      await fetch(
        'https://dva9vm8f1h.execute-api.us-east-2.amazonaws.com/production/restaurants',
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.AWS_API_KEY,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          commit('updateFoodData', data)
        })
    } catch (err) {}
  },
}
