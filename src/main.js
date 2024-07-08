import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia} from 'pinia'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

const pinia = createPinia()
const app = createApp(App)
app.use(mdiVue,{icons: mdijs})
app.use(router)
app.use(pinia)
app.mount('#app')
