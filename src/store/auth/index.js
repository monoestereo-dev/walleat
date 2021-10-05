import axios from '@axios'
import router from '@/router'

const state = () => ({
  currentUser: {},
  loading: false,
})

const getters = {
  currentUser: () => state.currentUser,
  loading: () => state.loading,
}

const mutations = {
  setCurrentUser: payload => {
    state.currentUser = payload
  },
  clearCurrentUser: () => {
    state.currentUser = {}
  },
  loading: payload => {
    state.loading = payload
  },
}

const actions = {
  signIn(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('loading', true)
      axios
        .post('/v1/login', {
          auth: {
            email: payload.email.toLowerCase(),
            password: payload.password,
          },
        })
        .then(response => {
          context.commit('setCurrentUser', response.data)
          resolve(response.data)
        })
        .catch(error => reject(error))
        .finally(() => {
          context.commit('loading', false)
        })
    })
  },
  signOut: context => {
    context.commit('clearCurrentUser')
    router.push('/')
  },
  requestPassword(context, { email, redirect = true }) {
    return new Promise((resolve, reject) => {
      axios
        .post('/v1/request_password', {
          email,
        })
        .then(response => {
          resolve(response)
          if (redirect) {
            router.push('/login')
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  resetPassword(context, { token, user }) {
    return new Promise((resolve, reject) => {
      axios
        .post('/v1/reset_password', {
          token,
          password: user.password,
          password_confirmation: user.password_confirmation,
        })
        .then(() => {
          resolve()
          router.push('/')
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  isLoggedIn(context) {
    if (localStorage.currentUser) {
      context.commit('setCurrentUser', JSON.parse(localStorage.currentUser))
      router.push('/dashboard')
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
