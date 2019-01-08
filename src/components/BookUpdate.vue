<template>
  <div id="container" class="mdl-cell--middle mdl-cell--5-col">
    <h3>Edit Details of <!--{{book.title}}--> <book-actions :book="book"></book-actions></h3>

    <form class="tbl">
      <p>
        <label for="id">Id</label>
        <input type="plaintext" id="id" :value="book.id" />
      </p>

      <p class="tbl-tr">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="book.title" />
      </p>

      <p class="tbl-tr">
        <label for="isbn">ISBN</label>
        <input type="text" id="isbn" v-model="book.isbn" />
      </p>

      <p class="tbl-tr">
        <label for="numberOfPages">Number Of Pages</label>
        <input type="text" id="numberOfPages" v-model="book.numberOfPages" />
      </p>

      <p class="tbl-tr">
        <label for="releaseYear">Release Year</label>
        <input type="text" id="releaseYear" v-model="book.releaseYear" />
      </p>

    </form>

    <br />

    <span class="right-align">
      <button class="mdl-button mdl-button--raised mdl-button--colored" @click="save">Save</button>
      <button class="mdl-button mdl-button--raised mdl-button--colored" @click="goBack()">Go Back</button>
    </span>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import BookActions from './BookActions'

  export default {
    components: {BookActions},
    data () {
      return {
        bookId: +this.$route.params.id
      }
    },
    computed: {
      ...mapGetters('books', ['bookList']),
      book () {
        var retVal = {
          id: this.bookId,
          title: '',
          numberOfPages: -1,
          releaseYear: -1,
          isbn: ''
        }
        var bookList = this.bookList.filter(book => book.id === this.bookId)
        if (bookList.length === 1) {
          retVal = bookList[0]
        }

        return retVal
      }
    },
    methods: {
      save () {
        console.error('not implemented yet')
      },
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .tbl {
    display: table;
    width: 100%;
  }

  .tbl > p {
    display: table-row;
    text-align: left;
  }

  .tbl > p > label {
    display: table-cell;
    width: 40%
  }

  .tbl > p > input {
    width: 100%;
    display: table-cell;
  }
</style>
