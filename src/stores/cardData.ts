import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CardData, customCardData } from '../type/cardData'

export const useCardDataStore = defineStore('cardData', () => {
    const allCardData = ref<CardData>({})
    const havaTray = ref(false)

    const customCardDatas = ref<customCardData[]>([])
    return {
        havaTray,
        allCardData,
        customCardDatas,
    }
})

export type CardDataStore = ReturnType<typeof useCardDataStore>
