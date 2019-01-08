export default {
  SET_USERNAME (state, username) {
    state.user_name = username
  },
  SET_TOKEN (state, token) {
    state.user_token = token
  },
  SET_LOGGED_IN (state, loggedIn) {
    state.logged_in = loggedIn
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_ADMIN_MODE (state, adminMode) {
    state.is_admin = adminMode
  }
}
