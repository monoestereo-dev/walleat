/* eslint-disable */
import axios from '@axios'
import { deburr } from 'lodash'

const state = () => ({
  storeProducts: {
    data: [],
    meta: {
      pagination: {
        total_items: null,
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
  setStoreProducts(payload) {
    debugger
    payload.storeProducts.data.forEach(product => {product.units = 0})
    state.storeProducts = payload
  },
  loading: payload => {
    state.loading = payload
  },
  setSearchProduct(payload) {
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
  getStoreProductsStore(
    context,
    { by_store, by_category, per_page = 18, page = 1, by_name = null, by_sku= null}
  ) {
    return new Promise((resolve, reject) => {
      context.commit('loading', true)
      axios
        .get(`/v1/store_products`, {
          params: {
            by_name: by_name,
            by_store: by_store,
            by_sku: by_sku,
            by_category: by_category,
            meta: {
              per_page: per_page,
              pagination: {
                page: page,
                per_page: per_page,
              },
            },
          },
        })
        .then((response) => {
          if (!by_sku) {
            context.commit('setStoreProducts', response.data)
          }
          if (response.data.data[0]) {
            resolve(response.data.data[0])
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
  addStoreProductToStore(
    context,
    { store_id, product_id, unit_cost, unit_price, has_inventory, inventory }
  ) {
    context.commit('loading', true)
    axios
      .post(`/v1/store_products`, {
        store_product: {
          store_id: store_id,
          product_id: product_id,
          unit_cost: unit_cost,
          unit_price: unit_price,
          has_inventory: has_inventory,
          inventory: inventory,
        },
      })
      .then((response) => {
        context.dispatch('getStoreProductsStore', { by_store: store_id })
      })
      .catch((error) => {})
      .finally(() => {
        context.commit('loading', false)
      })
  },
  editStoreProduct(context, payload) {
    context.commit('loading', true)
    axios
      .put(`/v1/store_products/${payload.id}`, {
        store_product: payload,
      })
      .then((response) => {
        context.commit('setStoreProducts', response.data)
      })
      .catch((error) => {})
      .finally(() => {
        context.dispatch('getStoreProductsStore', {
          by_store: payload.store_attributes.id,
        })
        context.commit('loading', false)
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
