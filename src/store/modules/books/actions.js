import axios from 'axios'

const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
    'charset': 'utf-8'
  }
}

export default {
  async getBooks ({commit, rootState}) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${rootState.authentication.user_token}`
    axios
      .get(`${process.env.BIBWEB_API_URL}/books`, {httpOptions})
      .then(r => r.data)
      .then(books => {
        commit('SET_BOOKS', books)
      })
  },

  async reserveBook ({dispatch, commit, rootState}, book) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${rootState.authentication.user_token}`
    axios
      .put(`${process.env.BIBWEB_API_URL}/users/` + rootState.authentication.user.id + '/reservations/books/' + book.id, {httpOptions})
      .then(() => dispatch('getBooks'))
  },

  async removeReservation ({dispatch, commit, rootState}, book) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${rootState.authentication.user_token}`
    axios
      .delete(`${process.env.BIBWEB_API_URL}/users/` + rootState.authentication.user.id + '/reservations/books/' + book.id, {httpOptions})
      .then(() => dispatch('getBooks'))
  }
}
