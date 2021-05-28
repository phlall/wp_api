<template>
  <div  class="mx-auto mt-5 w-full">
      <div class="bg-gray-100 h-screen pt-20" >

        <!-- Main 1 -->
          <div class="w-2/5 mx-auto bg-white border border-gray-400 border-solid pt-10 px-6 rounded">

            <img  class="w-1/3 mx-auto  mb-10 " v-bind:src="'/static/images/domains/primary-passport-logo.png'" />

            <form class="form" v-on:submit.prevent="login">
              <div>
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
              </div>
              <div class="mt-4">
                  <BaseInput
                      v-model="password"
                      type="password"
                      class="h-10 w-full rounded bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      placeholder="Enter your new password"
                    />
                   <div class="pt-1 h-8">
                    <p v-if="v$.password.$invalid">Please enter a valid password.</p>
                  </div>
              </div>
              <div class="mt-4">
                  <BaseInput
                      v-model="code"
                      type="text"
                      class="h-10 w-full rounded bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      placeholder="Enter your reset code"
                    />
                    <div class="pt-1 h-8">
                      <p v-if="v$.code.$invalid">Please enter a valid code.</p>
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
            </form>
          </div>
      </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
export default {
  name: 'LoginPage',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    password: '',
    email: '',
    code: '',
    showPassword: false,
    error: ''
  }),
  validations () {
    return {
      email: { required, email },
      code: {
        required,
        containsNumber: function (value) {
          return /[0-9]/.test(value)
        },
        validLength: function (value) {
          return value.length === 4
        }
      },
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
        .dispatch('user/setPassword', {
          email: this.email,
          password: this.password,
          code: this.code
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
