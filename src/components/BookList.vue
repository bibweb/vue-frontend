<template>
  <div id="container" class="mdl-cell--middle mdl-cell--5-col">
    <h3>Available Books</h3>

    <div>
      <button class="mdl-button" @click="showAvailable = !showAvailable">
        <boolean-tick class="fg-lightgray" :data="showAvailable"></boolean-tick>
        Show Available Books
      </button>
      <button class="mdl-button" @click="showCheckedOut = !showCheckedOut">
        <boolean-tick class="fg-blue" :data="showCheckedOut"></boolean-tick>
        Show Your Checkout Out Books
      </button>
      <button class="mdl-button" @click="showUnavailable = !showUnavailable">
        <boolean-tick class="fg-orange" :data="showUnavailable"></boolean-tick>
        Show Unavailable Books
      </button>
      <button class="mdl-button" @click="toggleAll()">
        Toggle All
      </button>
    </div>

    <br />

    <input class="mdl-textfield__input" type="text" placeholder="Search..." v-model="searchString">

    <br/>

    <table class="full-width mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <thead>
        <th>ID</th>
        <th class="mdl-data-table__cell--non-numeric">Title</th>
        <th>Release Year</th>
        <th>Number of Pages</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr v-for="book in displayedBooks" @click="goToDetailsOfBook(book)">
          <td :class="styleBasedOnCheckoutState(book)">{{ book.id }}</td>
          <td class="mdl-data-table__cell--non-numeric">{{ book.title }}</td>
          <td>{{book.releaseYear}}</td>
          <td>{{book.numberOfPages}}</td>
          <td>
            <book-actions :book="book"></book-actions>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
  import {mapGetters, mapActions} from 'vuex'
  import BookActions from './BookActions'
  import BooleanTick from './BooleanTick'

  export default {
    name: 'book-list',
    data () {
      return {
        searchString: '',
        showAvailable: true,
        showCheckedOut: true,
        showUnavailable: true
      }
    },
    components: {BookActions, BooleanTick},

    computed: {
      ...mapGetters('books', ['bookList']),

      listOfFiltersForAvailability () {
        const retVal = []
        if (this.showAvailable) retVal.push(0)
        if (this.showCheckedOut) retVal.push(2)
        if (this.showUnavailable) retVal.push(1)
        return retVal
      },

      displayedBooks () {
        return this.bookList.filter(book => {
          return this.objectContains(book, this.searchString.toLowerCase())
        }).filter(book => this.listOfFiltersForAvailability.includes(book.availability))
      }
    },
    methods: {
      ...mapActions('books', ['getBooks']),
      objectContains (obj, term) {
        for (const key in obj) {
          if (String(obj[key]).toLowerCase().includes(term)) {
            return true
          }
        }
        return false
      },
      styleBasedOnCheckoutState (book) {
        return {
          'bg-blue': book.availability === 2,
          'bg-orange': book.availability === 1
        }
      },
      goToDetailsOfBook (book) {
        this.$router.push('/books/' + book.id)
      },
      toggleAll () {
        if (this.showAvailable && this.showCheckedOut && this.showUnavailable) {
          this.showAvailable = this.showCheckedOut = this.showUnavailable = false
        } else {
          this.showAvailable = this.showCheckedOut = this.showUnavailable = true
        }
      }
    },
    mounted: function () {
      this.getBooks()
    }
  }
</script>

<style scoped>

  .full-width {
    width: 100%;
  }

  .fg-lightgray {
    color: gray;
  }

  .fg-blue {
    color: lightskyblue;
  }

  .fg-orange {
    color: orange;
  }

  .bg-blue {
    background-color: lightskyblue;
  }

  .bg-orange {
    background-color: orange;
  }

</style>
