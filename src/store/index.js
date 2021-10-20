import axios from "axios"
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || null,
    users: "",
    allPages: "",
    currentPage: "",
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
  },
  mutations: {
    LOGIN_TOKEN(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
  },
  actions: {
    destroyToken(context) {
      if (context.getters.loggedIn) {
        try {
          localStorage.removeItem("token")
          context.commit("destroyToken")
          console.log("done")
        } catch (error) {
          localStorage.removeItem("token")
          context.commit("destroyToken")
          console.error("error", error)
        }
      }
    },
    async loginToken({ commit }, credentials) {
      try {
        const data = await axios({
          method: "post",
          url: `https://task-mangement-api.herokuapp.com/login`,
          data: {
            tel: credentials.tel,
            password: credentials.password,
          },
        })
        const token = data.data.data.token
        localStorage.setItem("token", token)
        commit("LOGIN_TOKEN", token)
      } catch (error) {
        console.log("error", error)
      }
    },
  },
  modules: {},
})
