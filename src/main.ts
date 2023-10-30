import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'
import router from "./router/router.js";
const myApp = createApp(App)
const pinia = createPinia()
myApp.use(Quasar, {
    plugins: {Notify},
    config: {
        extras: [
            'poppins-font'
        ]
    }
})

myApp
    .use(router)
    .use(pinia)
    .mount('#app')



