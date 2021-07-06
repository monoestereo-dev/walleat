import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {
    updateUserData(state, payload) {
      let userData = JSON.parse(localStorage.getItem('userData'))
      userData = {
        ...payload,
        token: userData.token,
      }
      localStorage.setItem('userData', JSON.stringify(userData))
    },
  },
  actions: {
    editUser(ctx, { id, user }) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/users/${id}`, {
            user,
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
