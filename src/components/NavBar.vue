<template>
  <div id="nav" class="nav w-full bg-gray-300 shadow">
   <div class="flex flex-row text-right">
      <div v-if="!loggedIn"><router-link to="/login" > Login </router-link><span v-if="loggedIn"> | </span></div>
      <div v-if="loggedIn"><button  @click="logout"> Logout </button> | </div>
      <div v-if="loggedIn"><router-link to="/reset-password"> Reset Password </router-link> | </div>
      <div v-if="loggedIn"> <router-link to="/all-users" > Users </router-link></div>
      <div v-if="loggedIn"> <router-link to="/all-users" > Content </router-link></div>
     <!-- <button @click="toUsers()"> Users </button> | -->
  </div>
  </div>
</template>

<script>
import { authComputed } from '../store/helpers.js'
export default {
  computed: {
    ...authComputed
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
      this.$router.push({ name: 'Home' })
      this.loggedin = false
    },
    toUsers () {
      this.$router.push({ name: 'AllUsers' })
    }
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: right;
  height: 60px;
}
.nav > .brand {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
}
.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: #39b982;
  border-bottom: solid 2px #39b982;
}
</style>
