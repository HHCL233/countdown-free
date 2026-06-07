import { defineStore } from 'pinia'
import { ref } from 'vue';

interface OneCardData {
    width: number,
    height: number,
    x: number,
    y: number,
    widgetTypeId: number,
    param: {
        deadline: number,
        timetip: string
    }
}

interface AllCardData {
    [key: string]: OneCardData;
}

export const useCardDataStore = defineStore('cardData', () => {
    const allCardData = ref<AllCardData>({})
    const havaTray = ref(false)

    return {
        havaTray,
        allCardData
    }
})