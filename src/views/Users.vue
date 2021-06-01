
<template>
<div class="mt-10">
  <div v-for="user in users.data" :key="user.id" class=" w-4/5 flex border rounded pl-4 py-1">
<div>id:{{user.id}} -  username:{{ user.username}} -  Name:{{ user.first_name}} {{ user.last_name}} - Role(s) <span v-for="(role, index) in user.roles" :key="index"> {{ role }}</span></div>

  <!-- <button @click="getUsers()" class="h-16 w-32 bg-blue-500"> Get Users </button> -->
</div>
</div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      users: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.$store
      .dispatch('user/getUsers')
      .then(data => {
        this.users = data
      })
  }
}

</script>
