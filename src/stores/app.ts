import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
    const appName = ref('CountdownFree')
    const supportPlatform = ['windows', 'linux']
    const state = ref({
        isDev: false,
    })

    return {
        state,
        appName,
        supportPlatform,
    }
})
