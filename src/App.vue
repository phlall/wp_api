<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> | 
     <router-link to="/about">About</router-link> | 
    <router-link to="/reset-password"> reset password </router-link> | 
     <router-link to="/all-users"> Users </router-link> | 
  </div> -->
   <NavBar />
   <NotificationContainer/>
  <router-view/>
</template>
<script>
import NotificationContainer from '@/components/NotificationContainer.vue'
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NotificationContainer,
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
