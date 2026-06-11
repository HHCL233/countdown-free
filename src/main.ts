import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'
import { createPlugin } from '@tauri-store/pinia';

import { router } from './router/router.ts'

import 'mdui/mdui.css';
import 'mdui';

import "@m3e/web/all";

const pinia = createPinia()
const app = createApp(App)

pinia.use(createPlugin({
    autoStart: true
}));

app.use(pinia)
createApp(App).use(router).mount('#app')