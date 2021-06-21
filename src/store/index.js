import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    auth,
  },
  state: {
    apiURL: 'https://api.mywalleat.com',
  },
  getters: {
    apiUrl: state => state.apiURL,
  },
  strict: process.env.DEV,
})
