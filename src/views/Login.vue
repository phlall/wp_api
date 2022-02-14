<template>
  <div  class="mx-auto mt-5 w-full">
    <!-- <div>
      <h1 class="text-xl">Login</h1>
    </div>
    <div class="w-2/3 bg-gray-300">
      <form ref="loginForm"  @submit.prevent="login">
        <div>
            <label>EMail </label>
        <input
        class="px-2 py-2 mb-2 rounded-lg w-64 h-8 bg-gray-100"
          label="Email"
          prepend-icon="mdi-account-circle"
          type="email"
          :model="email"
          :rules="emailRules"
        />
        </div>
        <div>
           <label>Password </label>
        <input
        class="px-2 py-2 rounded-lg w-64 h-8 focus:bg-gray-400"
          type="password"
          @model="password"
          :rules="passwordRules"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          required
        />
        </div>
        <div>
          <button color="info" :disabled="!formValidity" type="submit"
            >Login</button>
        </div>
      </form>
    </div>
    <hr />
    <router-link to="/signUp">
      Don't have an account? Register.
    </router-link> -->

      <div class="bg-gray-100 h-screen pt-20" >

        <!-- Main 1 -->
          <div class="w-64 mx-auto bg-white border border-gray-400 border-solid pt-10 px-6 rounded">

            <img  class="w-64 mb-10 " v-bind:src="'/static/images/domains/primary-passport-logo.png'" />

            <form class="form" v-on:submit.prevent="login">
              <!-- <div>
                <BaseInput
                    v-model="email"
                    type="email"
                    placeholder="Enter your email"
                    class="h-10 w-full rounded bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  />
                  <div class="pt-1 h-8">
                    <p v-if="v$.email.email.$invalid">Please enter a valid email address.</p>
                    <p v-if="v$.email.required.$invalid">Email is required.</p>
                  </div>
              </div> -->
              <div>
                <BaseInput
                    v-model="email"
                    type="text"
                    placeholder="Enter your email"
                    class="h-10 w-full rounded bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  />
              </div>
                <div class="mt-4">
                <BaseInput
                    v-model="password"
                    type="password"
                    class="h-10 w-full rounded bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                   <div class="pt-1 h-8">
                    <p v-if="v$.password.$invalid">Please enter a valid password.</p>
                  </div>
                </div>
                <div class="mx-12 mb-12 mt-4">
        <BaseButton
          type="submit"
          :class="v$.$invalid ? 'bg-red-200' : 'bg-red-500'"
          :disabled="v$.$invalid"
          class="w-full rounded text-white h-10 "
          something="else"
        >
          Submit
        </BaseButton>

                </div>
               <!-- <div class="mx-8">
                   <input
                      type="password"
                      class="input"
                      placeholder="Enter your password"
                      v-model="password" required>
                </div> -->
                <!-- <div class="validation_error on_passcode" id="errorPasscode">MUST ENTER A VALID PASSCODE</div>

               <div class="alert alert-danger" v-if="errorVisible"></div> -->
            </form>
            <p v-html="error"></p>
          </div>
      </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {
  name: 'LoginPage',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    // formValidity: false,
    password: '',
    // passwordRules: [
    //   v => !!v || 'Password is required',
    //   v => (v && v.length >= 7) || 'Password must be more than 6 characters'
    // ],
    email: '',
    // emailRules: [
    //   value => value.indexOf('@') !== 0 || 'Email should have a username.',
    //   value => value.includes('@') || 'Email should include an @ symbol.',
    //   //   value =>
    //   //     value.indexOf('.') - value.indexOf('@') > 1 ||
    //   //     'Email should contain a valid domain.',
    //   value => value.includes('.') || 'Email should include a period symbol.',
    //   value =>
    //     value.indexOf('.') <= value.length - 3 ||
    //     'Email should contain a valid domain extension.'
    // ],
    showPassword: false,
    error: ''
  }),
  validations () {
    return {
      // email: {},
      // email: { required, email },
      password: {
    	  required,
        containsUppercase: function (value) {
          return /[A-Z]/.test(value)
        },
        containsLowercase: function (value) {
          return /[a-z]/.test(value)
        },
        containsNumber: function (value) {
          return /[0-9]/.test(value)
        }
        // containsSpecial: function (value) {
        //   return /[#?!@$%^&*-]/.test(value)
        // }
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    login () {
      this.$store
        .dispatch('user/login', {
          username: this.email,
          password: this.password
        })
        .then(error => {
          if (!error) {
            this.$router.push({ name: 'Home' })
          } else {
            this.$router.push({ name: 'Login' })
          }
        })
    }
  }
}
</script>

<style></style>
