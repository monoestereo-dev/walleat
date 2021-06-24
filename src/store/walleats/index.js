import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchWalleats(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/bracelets', {
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
    fetchWalleat(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/bracelets/${id}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    fetchWalleatGraph(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/bracelet_report', {
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
    addWalleat(ctx, { id, bracelet }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/v1/bracelets/${id}`, {
            bracelet,
          })
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    editWalleat(ctx, { id, bracelet }) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/bracelets/${id}`, {
            bracelet,
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
