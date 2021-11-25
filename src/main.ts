import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'

createApp(App)
  .use(store)
  .use(PrimeVue)
  .component('Card', Card)
  .component('Input', InputText)
  .component('Button', Button)
  .component('ToggleButton', ToggleButton)
  .mount('#app')
