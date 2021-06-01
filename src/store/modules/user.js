import ApiService from '@/services/apiService.js'
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
    return ApiService.register(credentials).then(({ data }) => {
      commit('SET_USER_DATA', data)
      const notification = {
        type: 'success',
        message: 'YRegistration successful'
      }
      dispatch('notification/add', notification, { root: true })
    })
  },
  resetPassword ({ dispatch }, credentials) {
    return ApiService.resetPassword(credentials).then(({ data }) => {
      // commit('SET_RESET_DATA', data)
      const notification = {
        type: 'success',
        message: data.message
      }
      dispatch('notification/add', notification, { root: true })
    })
  },
  getUsers ({ dispatch }) {
    return ApiService.getUsers().then((data) => {
      const notification = {
        type: 'success',
        message: 'Users returned'
      }
      dispatch('notification/add', notification, { root: true })
      return data
    })
  },
  setPassword ({ commit, dispatch }, credentials) {
    return ApiService.setPassword(credentials).then(() => {
      commit('LOGOUT')
      const notification = {
        type: 'success',
        message: 'Your password is reset'
      }
      dispatch('notification/add', notification, { root: true })
    })
  },

  login ({ commit, dispatch }, credentials) {
    return ApiService.login(credentials)
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
    alert();
    commit('LOGOUT')
  }
}
