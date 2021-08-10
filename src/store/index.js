import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import auth from './auth'
import establishments from './establishments'
import stores from './stores'
import categories from './categories'
import products from './products'
import walleats from './walleats'
import orders from './orders'
import users from './users'
import storeProducts from './storeProducts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    auth,
    establishments,
    stores,
    categories,
    products,
    walleats,
    orders,
    users,
    storeProducts,
  },
  state: {
    apiURL: 'https://api.mywalleat.com',
  },
  getters: {
    apiUrl: state => state.apiURL,
  },
  strict: process.env.DEV,
})
