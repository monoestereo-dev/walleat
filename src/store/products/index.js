import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchProducts(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/products', {
            params,
          })
          .then(response => {
            resolve(response.data)
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
