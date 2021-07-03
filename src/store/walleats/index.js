import axios from '@axios'

export default {
  namespaced: true,
  state: {
    walleat: {},
  },
  getters: {
    walleat(state) {
      return state.walleat
    },
  },
  mutations: {
    SET_WALLEAT(state, payload) {
      state.walleat = payload
    },
  },
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
            ctx.commit('SET_WALLEAT', { ...response.data })
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
    addWalleat(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/bracelets/', {
            bracelet: payload,
          })
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    editWalleat(ctx, walleat) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/bracelets/${walleat.id}`, {
            bracelet: walleat,
          })
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addCredit(ctx, payment) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/payments', {
            payment,
          })
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    banItem(ctx, banneableItem) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/banneable_items', {
            banneable_item: banneableItem,
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
