import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import createPersistedState from 'vuex-persistedstate'
import authentication from './modules/authentication/'
import books from './modules/books/'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  modules: {
    authentication,
    books
  },
  plugins: [createPersistedState()]
})
