import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchOrders(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/orders', {
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
    fetchOrder(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/orders/${id}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    fetchBraceletReport(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/orders/${id}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addOrder(ctx, { id, order }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/v1/orders/${id}`, {
            order,
          })
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    editOrder(ctx, { id, order }) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/orders/${id}`, {
            order,
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
