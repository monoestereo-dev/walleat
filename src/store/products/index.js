import axios from '@axios'

export default {
  namespaced: true,
  state: {
    products: {
      data: [],
      meta: {
        pagination: {

        },
      },
    },
  },
  getters: {
    products(state) {
      return state.products.data
    },
    pagination(state) {
      return state.products.meta.pagination
    },
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
  },
  actions: {
    fetchProducts(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/products', {
            params,
          })
          .then(response => {
            ctx.commit('setProducts', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    fetchProduct(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/products/${id}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addProduct(ctx, product) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/products/', {
            product,
          })
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    editProduct(ctx, { id, product }) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/products/${id}`, {
            product,
          })
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
}
