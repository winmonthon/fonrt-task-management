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
    lineUid: "",
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    lineLoggedIn(state) {
      return state.lineUid !== ""
    },
  },
  mutations: {
    LOGIN_TOKEN(state, token) {
      state.token = token
    },
    DESTORY_TOKEN(state) {
      state.token = null
    },
    LINE_U_ID(state, lineUid) {
      state.lineUid = lineUid
    },
  },
  actions: {
    destroyToken(context) {
      if (context.getters.loggedIn) {
        try {
          localStorage.removeItem("token")
          context.commit("DESTORY_TOKEN")
          console.log("done")
        } catch (error) {
          localStorage.removeItem("token")
          context.commit("DESTORY_TOKEN")
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
    async lineLogIn({ commit }, payload) {
      const lineUid = payload
      localStorage.setItem("lineUid", lineUid)
      commit("LINE_U_ID", lineUid)
    },
  },
  modules: {},
})
