import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchEstablishments(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/establishments', {
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
    fetchEstablishment(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/establishments/${id}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addEstablishments(ctx, establishment) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/establishments', {
            establishment,
          })
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    editEstablishment(ctx, { id, establishment }) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/establishments/${id}`, {
            establishment,
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
