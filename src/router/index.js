import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import BookList from '../components/BookList'
import BookDetails from '../components/BookDetails'
import store from '../store'
import BookUpdate from '../components/BookUpdate'

Vue.use(Router)

function requireAuth (to, from, next) {
  if (isLoggedIn()) {
    next()
  } else {
    next('/login')
  }
}

function isLoggedIn () {
  if (store.getters['authentication/logged_in']) {
    return true
  } else {
    return false
  }
}

function requireAdmin (to, from, next) {
  if (!isLoggedIn()) next('/login')
  if (store.getters['authentication/is_admin']) {
    next()
  } else {
    next('/books')
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/books',
      name: 'Books',
      component: BookList,
      beforeEnter: requireAuth
    },
    {
      path: '/books/:id',
      name: 'BookDetails',
      component: BookDetails,
      beforeEnter: requireAuth
    },
    {
      path: '/books/:id/update',
      name: 'BookUpdate',
      component: BookUpdate,
      beforeEnter: requireAdmin
    }
  ]
})
