export const state = () => ({
  foodData: [],
})

// export const getters = {
//   getterValue: state => {
//     return state.value
//   }
// }

export const mutations = {
  updateFoodData: (state, payload) => {
    state.foodData = payload
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
          console.log(data)
          commit('updateFoodData', data)
        })
    } catch (err) {
      console.log(err)
    }
  },
}
