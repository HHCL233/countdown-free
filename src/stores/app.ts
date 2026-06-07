import { defineStore } from 'pinia'
import { ref } from "vue"

export const useAppStore = defineStore('app', () => {
    const havaTray = ref(false)

    return {
        havaTray
    }
})