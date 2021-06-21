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
        .catch(error => {
          reject(error)
        })
        .finally(() => {
          context.commit('loading', false)
        })
    })
  },

  signOut: context => {
    context.commit('clearCurrentUser')
    router.push('/')
  },

  requestPassword(context, { email }) {
    return new Promise((resolve, reject) => {
      axios
        .post('/v1/request_password', {
          email,
        })
        .then(response => {
          router.push('/login')
          resolve(response)
          // TODO: show toast with message 'You have recieved an email to change your password'
        })
        .catch(error => {
          reject(error)
          // TODO: show toast with error messages
          // *HERE IS AN EXAMPLE*
          // let errors = Object.entries(error.response.data.messages)
          // errors.forEach(x => {
          //   this._vm.$notify({type: 'danger', verticalAlign: 'top', horizontalAlign: 'center', message: x[1]})
          // })
        })
    })
  },
  resetPassword(context, { token, user }) {
    axios
      .post('/v1/reset_password', {
        token,
        password: user.password,
        password_confirmation: user.password_confirmation,
      })
      .then(() => {
        router.push('/')
      })
      .catch(() => {
        // TODO: show toast with error messages
        // *HERE IS AN EXAMPLE*
        // let errors = Object.entries(error.response.data.messages)
        // errors.forEach(x => {
        //   this._vm.$notify({type: 'danger', verticalAlign: 'top', horizontalAlign: 'center', message: x[1]})
        // })
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
