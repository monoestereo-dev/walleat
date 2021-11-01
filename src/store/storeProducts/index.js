/* eslint-disable */
import axios from '@axios'

const state = () => ({
  storeProducts: {
    data: [],
    meta: {
      pagination: {
        page: 1,
        total_items: 0,
      },
    },
  },
  loading: false,
  searchProduct: '',
})

const getters = {
  storeProducts(state) {
    return state.storeProducts.data
  },
  storeProductsInCategory: (state) => (category) => {
    if (category) {
      return state.storeProducts.data.filter((x) =>
        x.product_attributes.categories_ids.includes(category)
      )
    } else {
      return state.storeProducts.data
    }
  },
  pagination(state) {
    return state.storeProducts.meta.pagination
  },
  loading(state) {
    return state.loading
  },
}

const mutations = {
  setStoreProducts(state, payload) {
    payload.data.forEach(product => {product.units = 1})
    state.storeProducts = payload
  },
  loading: (state, payload) => {
    state.loading = payload
  },
  setSearchProduct(state, payload) {
    state.searchProduct = payload
  },
}

const actions = {
  getStoreProducts(context) {
    context.commit('loading', true)
    axios
      .get('/v1/stores')
      .then(response => {
        context.commit('setStoreProducts', response.data)
      })
      .catch(error => { console.error(error) })
      .finally(() => {
        context.commit('loading', false)
      })
  },
  getStoreProductsStore( context, params = { by_sku: true } ) {
    return new Promise((resolve, reject) => {
      context.commit('loading', true)
      axios
        .get(`/v1/store_products`, {
          params
        })
        .then((response) => {
          if (!params.by_sku) {
            context.commit('setStoreProducts', response.data)
          }
          if (response.data.data[0]) {
            resolve(response.data)
          }
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {
          context.commit('loading', false)
        })
    })
  },
  addStoreProductToStore(context, store_product) {
    return new Promise((resolve, reject) => {
      context.commit('loading', true)
      axios
        .post(`/v1/store_products`, {
          store_product
        })
        .then((response) => {
          resolve(response)
          // context.dispatch('getStoreProductsStore', { by_store: store_id })
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {
          context.commit('loading', false)
        })
    })
  },
  editStoreProduct(context, store_product) {
    return new Promise((resolve, reject) => {
      context.commit('loading', true)
      axios
        .put(`/v1/store_products/${store_product.id}`, {
          store_product,
        })
        .then((response) => {
          // context.commit('setStoreProducts', response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {
          context.commit('loading', false)
        })
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
