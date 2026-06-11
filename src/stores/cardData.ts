import { defineStore } from 'pinia'
import { ref } from 'vue';

export interface OneCardData {
    width: number,
    height: number,
    x: number,
    y: number,
    widgetTypeId: number,
    param: {
        deadline: number,
        timetip: string,
        briefTime: boolean
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