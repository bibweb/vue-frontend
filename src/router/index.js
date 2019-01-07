import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import BookList from '../components/BookList'
import BookDetails from '../components/BookDetails'
import store from '../store'

Vue.use(Router)

function requireAuth (to, from, next) {
  if (store.getters['authentication/logged_in']) {
    next()
  } else {
    next('/login')
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
    }
  ]
})
