import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CardData } from '../type/cardData'

export const useCardDataStore = defineStore(
    'cardData',
    () => {
        // 存放所有在场组件数据
        const allCardData = ref<CardData>({})

        return {
            allCardData,
        }
    },
    {
        tauri: {
            sync: true,
            save: false,
        },
    },
)

export type CardDataStore = ReturnType<typeof useCardDataStore>
