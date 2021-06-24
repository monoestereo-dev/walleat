import axios from 'axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchPerros(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/perros', {
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
    fetchPerro(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/perros/${id}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addPerro(ctx, { id, perro }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/v1/perros/${id}`, {
            perro,
          })
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    editPerro(ctx, { id, perro }) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/perros/${id}`, {
            perro,
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
