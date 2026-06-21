/// <reference types="vite/client" />
import type { CardDataStore } from '@/stores/cardData'
import { Plugin } from './type/plugin'
import { Tools } from './type/tools'

declare global {
    interface Window {
        countdownFreeAPI: {
            plugin: Plugin[]
            tools: Tools
        }
    }
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
