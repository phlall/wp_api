
<template>
<div class="mt-10">

<div>{{ content }}</div>

  <!-- <button @click="getUsers()" class="h-16 w-32 bg-blue-500"> Get Users </button> -->

</div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      content: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.$store
      .dispatch('user/getContent')
      .then(data => {
        this.content = data
      })
  }
}

</script>
