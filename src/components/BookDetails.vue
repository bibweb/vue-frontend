<template>
  <div id="container" class="mdl-cell--middle mdl-cell--5-col">
    <h3>Details of {{book.title}} <book-actions :book="book"></book-actions></h3>

    <table class="full-width text-align-left mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <tr>
        <th>Id</th>
        <td>{{book.id}}</td>
      </tr>
      <tr>
        <th>Title</th>
        <td>{{book.title}}</td>
      </tr>
      <tr>
        <th >ISBN</th>
        <td>{{book.isbn}}</td>
      </tr>
      <tr>
        <th>Number Of Pages</th>
        <td>{{book.numberOfPages}}</td>
      </tr>
      <tr>
        <th>Release Year</th>
        <td>{{book.releaseYear}}</td>
      </tr>
    </table>

    <br />

    <span class="right-align">
      <button class="mdl-button mdl-button--raised mdl-button--colored" v-if="is_admin" @click="edit()">Edit</button>
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
      ...mapGetters('authentication', ['is_admin']),
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
      edit () {
        this.$router.push('/books/' + this.bookId + '/update')
      },
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .full-width {
    width: 100%;
  }

  td {
    text-align: left;
  }

  .right-align {
    float: right;
  }

</style>
