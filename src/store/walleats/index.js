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
    fetchWalleatByEnc(ctx, enc) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/find_by_bracelet_number', {
            params: {
              enc,
            },
          })
          .then(response => {
            // context.commit('setCurrentBracelet', response.data)
            resolve(response)
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
    fetchTransactions(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/balance_transactions', {
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
  },
}
