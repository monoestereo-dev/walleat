import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchStores(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/stores', {
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
    fetchStore(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/stores/${id}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addStore(ctx, { id, store }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/v1/stores/${id}`, {
            store,
          })
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    editStore(ctx, { id, store }) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/stores/${id}`, {
            store,
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
