import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  user_token: '',
  user_name: 'Not logged in',
  logged_in: false,
  user: null
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
