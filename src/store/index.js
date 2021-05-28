import { createStore } from 'vuex'
import * as user from '@/store/modules/user.js'
import * as notification from '@/store/modules/notification.js'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    notification
  },
  getters: {
    loggedIn (state) {
      return !!state.user.user
    },
    userToken: state => {
      return state.user.user
    }
  }
})
