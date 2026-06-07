import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'
import { createPlugin } from '@tauri-store/pinia';

import { router } from './router/router.ts'

import 'mdui/mdui.css';
import 'mdui';


const pinia = createPinia()
const app = createApp(App)

pinia.use(createPlugin({
    autoStart: true
}));

app.use(pinia)
createApp(App).use(router).mount('#app')