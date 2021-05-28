import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/tailwind.css'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
//import Vuelidate from 'vuelidate'

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)
const app = createApp(App)
//app.use(Vuelidate)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  app.component(componentName, componentConfig.default || componentConfig)
})
app.use(router).use(store).mount('#app')
