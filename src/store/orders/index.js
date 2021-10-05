import axios from '@axios'

export default {
  namespaced: true,
  state: {
    orders: {
      meta: {
        pagination: {
          page: 1,
          per_page: 10,
          total_objects: 0,
        },
      },
      data: [],
    },
  },
  getters: {
    orders(state) {
      return state.orders.data
    },
    pagination(state) {
      return state.orders.meta.pagination
    },
  },
  mutations: {
    setOrders(state, payload) {
      state.orders = payload
    },
  },
  actions: {
    fetchOrders(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/orders', {
            params,
          })
          .then(response => {
            ctx.commit('setOrders', response.data)
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
    addOrder(ctx, { order, orderType }) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/orders/', {
            order: {
              ...order,
              order_type: orderType,
            },
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
    completeAndroidOrder() {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/android_app_callback', {
            android_app_room: '',
            bracelet_url: '',
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
