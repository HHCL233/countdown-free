import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getVersion } from '@tauri-apps/api/app'
import { computedAsync } from '@vueuse/core'

export const useAppStore = defineStore('app', () => {
    const appName = ref('CountdownFree')
    const appVersion = computedAsync(async () => await getVersion())
    const supportPlatform = ['windows', 'linux']
    const state = ref({
        isDev: false,
    })

    return {
        state,
        appName,
        supportPlatform,
        appVersion,
    }
})
