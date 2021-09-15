import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchStoreSalesPerHour(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/store_sales_per_hour', {
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
    fetchMarginStoresCategoryDate(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/margin_stores_category_date', {
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
    fetchMarginStoresCategory(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/margin_stores_category', {
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
    fetchSalesStoresCategoryDate(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/sales_stores_category_date', {
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
    fetchSalesStoresDate(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/sales_stores_date', {
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
    fetchSalesStoresDay(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/sales_stores_day', {
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
  },
}
