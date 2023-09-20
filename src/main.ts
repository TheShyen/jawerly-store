import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'

const myApp = createApp(App)
const pinia = createPinia()
myApp.use(Quasar, {
    plugins: {},
    config: {
        extras: [
            'poppins-font'
        ]
    }
})

myApp.use(pinia).mount('#app')
