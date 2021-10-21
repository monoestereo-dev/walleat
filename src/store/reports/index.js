import axios from '@axios'

export default {
  namespaced: true,
  state: {
    storeSalesPerHour: [
      {
        total: 0,
      },
    ],
    marginStoresCategoryDate: [
      {
        total: 0,
      },
    ],
    marginStoresCategory: [
      {
        total: 0,
      },
    ],
    salesStoresCategoryDate: [
      {
        total: 0,
      },
    ],
    salesStoresDate: [
      {
        total: 0,
      },
    ],
    salesStoresDay: [
      {
        total: 1000,
      },
    ],
    inventoryTurnover: [
      {
        total: 1000,
      },
    ],
  },
  getters: {
    salesCurrentDate(state) {
      return state.salesStoresDate[state.salesStoresDate.length - 1].total
    },
    marginCurrentDate(state) {
      const array = state.marginStoresCategoryDate
      const result = []
      array.reduce((res, value) => {
        if (!res[value.date]) {
          // eslint-disable-next-line
          res[value.date] = { date: value.date, total: 0 }
          result.push(res[value.date])
        }
        // eslint-disable-next-line
        res[value.date].total =  Number(res[value.date].total) + Number(value.total)
        return res
      }, {})
      const data = []
      const dates = []
      result.forEach(x => {
        data.push(x.total)
        dates.push(x.date)
      })
      return {
        result,
        data,
        dates,
      }
    },
  },
  mutations: {
    setStoreSalesPerHour(state, payload) {
      state.storeSalesPerHour = payload
    },
    setMarginStoresCategoryDate(state, payload) {
      state.marginStoresCategoryDate = payload
    },
    setMarginStoresCategory(state, payload) {
      state.marginStoresCategory = payload
    },
    setSalesStoresCategoryDate(state, payload) {
      state.salesStoresCategoryDate = payload
    },
    setSalesStoresDate(state, payload) {
      state.salesStoresDate = payload
    },
    setSalesStoresDay(state, payload) {
      state.salesStoresDay = payload
    },
    setInventoryTurnover(state, payload) {
      state.inventoryTurnover = payload
    },
  },
  actions: {
    fetchStoreSalesPerHour(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/store_sales_per_hour', {
            params,
          })
          .then(response => {
            ctx.commit('setStoreSalesPerHour', response.data)
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
            ctx.commit('setMarginStoresCategoryDate', response.data)
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
            ctx.commit('setMarginStoresCategory', response.data)
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
            ctx.commit('setSalesStoresCategoryDate', response.data)
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
            ctx.commit('setSalesStoresDate', response.data)
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
            ctx.commit('setSalesStoresDay', response.data)
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    fetchInventoryTurnover(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/inventory_turnover', {
            params,
          })
          .then(response => {
            debugger
            ctx.commit('setInventoryTurnover', response.data)
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
}
