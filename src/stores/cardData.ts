import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CardData, CustomCardData } from '../type/cardData'

export const useCardDataStore = defineStore('cardData', () => {
    // 存放所有在场组件数据
    const allCardData = ref<CardData>({})

    // 存放自定义组件数据
    const customCardDatas = ref<CustomCardData[]>([])

    return {
        allCardData,
        customCardDatas,
    }
})

export type CardDataStore = ReturnType<typeof useCardDataStore>
