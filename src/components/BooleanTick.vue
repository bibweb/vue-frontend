<template>
  <span>
    <i class="material-icons" v-if="data">
      check_circle
    </i>
    <i class="material-icons" v-else>
      check_circle_outline
    </i>
  </span>
</template>

<script>
  export default {
    props: ['data']
  }
</script>
