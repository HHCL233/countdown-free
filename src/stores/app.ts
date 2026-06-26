import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
    const havaTray = ref(false)
    const state = ref({
        isDev: false,
    })

    return {
        havaTray,
        state,
    }
})
