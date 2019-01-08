<template>
  <span v-if="book.availability != 2">
    <button class="mdl-button bookmark-inactive" v-if="book.reservationState === 0" @click.stop="reserveBook(book)"><i class="material-icons">bookmark_border</i></button>
    <button class="mdl-button bookmark-active" v-else><i class="material-icons" @click.stop="removeReservation(book)">bookmark</i></button>
  </span>
</template>


<script>
  import {mapActions} from 'vuex'

  export default {
    props: ['book'],
    methods: {
      ...mapActions('books', ['reserveBook', 'removeReservation'])
    }
  }
</script>

<style scoped>

  .bookmark-inactive {
    color: darkgrey;
  }

  .bookmark-active {
    color: limegreen;
  }

</style>
