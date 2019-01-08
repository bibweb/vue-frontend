<template>
  <div id="login">

    <h3>Login</h3>

    <form @submit.prevent="submit">

      <div class="mdl-textfield mdl-js-textfield">
        <label for="username" class="mdl-textfield__label">Username</label>
        <input type="text" v-model="username" id="username" name="username" class="mdl-textfield__input mdl-js-textfield" />
      </div>

      <br />

      <div class="mdl-textfield mdl-js-textfield">
        <label for="password" class="mdl-textfield__label">Password</label>
        <input type="password" v-model="password" id="password" name="password" class="mdl-textfield__input mdl-js-textfield" />
      </div>

      <br />

      <input class="mdl-button mdl-js-button mdl-button--raised" type="submit" value="Login"/>
    </form>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      ...mapGetters('authentication', ['logged_in'])
    },
    watch: {
      logged_in: function (val) {
        if (val) this.redirectIfLoggedIn()
      }
    },
    methods: {
      ...mapActions('authentication', ['login']),

      redirectIfLoggedIn () {
        if (this.logged_in) {
          this.$router.push('/books')
        }
      },

      submit: function (event) {
        this.login({username: this.username, password: this.password})
      }
    },
    mounted () {
      this.redirectIfLoggedIn()
    }
  }
</script>
