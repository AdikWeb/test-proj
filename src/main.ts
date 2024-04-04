import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import "./scss/common.scss"
import {createPinia} from "pinia";
import piniaPluginPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')