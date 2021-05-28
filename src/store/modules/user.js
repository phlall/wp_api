import MenuService from '@/services/apiService.js'
// import axios from "axios";

export const namespaced = true

export const state = {
  user: ''
}
export const mutations = {
  SET_USER_DATA (state, userData) {
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
    // axios.defaults.headers.common["Authorization"] = "Bearer ${userData.token}";
  },
  LOGOUT () {
    // state.user = null;
    localStorage.removeItem('user')
    state.user = ''
    // location.reload();
  }
}

export const actions = {
  register ({ commit, dispatch }, credentials) {
    return MenuService.register(credentials).then(({ data }) => {
      commit('SET_USER_DATA', data)
      const notification = {
        type: 'success',
        message: 'YRegistration successful'
      }
      dispatch('notification/add', notification, { root: true })
    })
  },
  resetPassword ({ dispatch }, credentials) {
    return MenuService.resetPassword(credentials).then(({ data }) => {
      // commit('SET_RESET_DATA', data)
      const notification = {
        type: 'success',
        message: data.message
      }
      dispatch('notification/add', notification, { root: true })
    })
  },
  setPassword ({ commit, dispatch }, credentials) {
    return MenuService.setPassword(credentials).then(() => {
      commit('LOGOUT')
      const notification = {
        type: 'success',
        message: 'Your password is reset'
      }
      dispatch('notification/add', notification, { root: true })
    })
  },

  login ({ commit, dispatch }, credentials) {
    return MenuService.login(credentials)
      .then(({ data }) => {
        commit('SET_USER_DATA', data)
        const notification = {
          type: 'success',
          message: 'login successful'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Username or Password not found ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        return error
      })
  },
  logout ({ commit }) {
    commit('LOGOUT')
  }
}
