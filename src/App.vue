<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span @click="goToBooks()" class="cursor-pointer mdl-layout-title">BibWeb</span>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <nav class="mdl-navigation">
        <router-link class="mdl-navigation__link bold-font" to="/books" @click.native="hideMenu">BibWeb</router-link>
        <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu">Home</router-link>
        <router-link class="mdl-navigation__link" to="/books" v-if="logged_in" @click.native="hideMenu">Books</router-link>

        <a class="cursor-pointer mdl-navigation__link" v-if="logged_in" @click="triggerLogout()">Logout</a>
        <router-link class="mdl-navigation__link" to="/login" v-else @click.native="hideMenu">Login</router-link>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content mdl-grid portfolio-max-width">
        <div class="mdl-layout-spacer"></div>
        <router-view></router-view>
        <div class="mdl-layout-spacer"></div>
      </div>
    </main>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  require('material-design-lite')
  export default {
    name: 'app',
    computed: {
      ...mapGetters('authentication', ['logged_in'])
    },
    methods: {
      ...mapActions('authentication', ['logout']),
      hideMenu () {
        document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer()
      },
      triggerLogout () {
        this.logout()
        this.hideMenu()
        this.$router.push('/')
      },
      goToBooks () {
        this.$router.push('/books')
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');

  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main {
    text-align: center;
    margin-top: 40px;
  }

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #35495E;
    color: #ffffff;
  }

  header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .bold-font {
    font-weight: bold;
  }

  .mdl-layout-title {
    padding: 0;
  }
</style>
