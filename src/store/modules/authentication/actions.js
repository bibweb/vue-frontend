import axios from 'axios'

const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
    'charset': 'utf-8'
  }
}

export default {
  async login ({dispatch, commit}, user) {
    axios
      .post(`${process.env.BIBWEB_API_URL}/token/generate-token`, user, {httpOptions})
      .then(r => r.data)
      .then(loggedInUser => {
        commit('SET_USERNAME', user.username)
        commit('SET_TOKEN', loggedInUser.token)
        commit('SET_LOGGED_IN', true)
        dispatch('loadUser', loggedInUser.token)
      })
      .catch(error => {
        console.log('ERROR')
        console.log(error)
      })
  },

  logout ({commit}) {
    commit('SET_USERNAME', 'Not logged in')
    commit('SET_TOKEN', '')
    commit('SET_LOGGED_IN', false)
    commit('SET_ADMIN_MODE', false)
  },

  async loadUser ({commit}, token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    axios
      .get(`${process.env.BIBWEB_API_URL}/users/me`, {httpOptions})
      .then(user => commit('SET_USER', user.data))
  }

}
