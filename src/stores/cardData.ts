import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CardData, CustomCardData } from '../type/cardData'

export const useCardDataStore = defineStore('cardData', () => {
    const allCardData = ref<CardData>({})
    const havaTray = ref(false)

    const customCardDatas = ref<CustomCardData[]>([])
    return {
        havaTray,
        allCardData,
        customCardDatas,
    }
})

export type CardDataStore = ReturnType<typeof useCardDataStore>
