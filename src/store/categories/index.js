import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchCategories(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/categories', {
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
    fetchCategory(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/categories/${id}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addCategory(ctx, category) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/categories', {
            category,
          })
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    editCategory(ctx, { id, category }) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/categories/${id}`, {
            category,
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
