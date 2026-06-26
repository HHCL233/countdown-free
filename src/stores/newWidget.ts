import { defineStore } from 'pinia'
import { ref } from 'vue'
import { WidgetConfig } from '../type/cardData'

export const useNewWidgetStore = defineStore('newWidget', () => {
    const vanillaWidget = ref<WidgetConfig>({
        0: {
            items: [
                {
                    name: 'hour',
                    type: 'number',
                    showName: '小时',
                    isRequired: true,
                },
                {
                    name: 'minute',
                    type: 'number',
                    showName: '分钟',
                    isRequired: true,
                },
                {
                    name: 'second',
                    type: 'number',
                    showName: '秒',
                    isRequired: true,
                },
                {
                    name: 'timetip',
                    type: 'string',
                    showName: '事件',
                    isRequired: true,
                },
                {
                    name: 'brieftime',
                    type: 'boolean',
                    showName: '简略时间显示',
                    isRequired: true,
                },
            ],
        },
        1: {
            items: [
                {
                    name: 'hour',
                    type: 'number',
                    showName: '小时',
                    isRequired: true,
                },
                {
                    name: 'minute',
                    type: 'number',
                    showName: '分钟',
                    isRequired: true,
                },
                {
                    name: 'second',
                    type: 'number',
                    showName: '秒',
                    isRequired: true,
                },
                {
                    name: 'timetip',
                    type: 'string',
                    showName: '事件',
                    isRequired: true,
                },

                {
                    name: 'brieftime',
                    type: 'boolean',
                    showName: '简略时间显示',
                    isRequired: true,
                },
            ],
        },
        2: {
            items: [
                {
                    name: 'hour',
                    type: 'number',
                    showName: '小时',
                    isRequired: true,
                },
                {
                    name: 'minute',
                    type: 'number',
                    showName: '分钟',
                    isRequired: true,
                },
                {
                    name: 'second',
                    type: 'number',
                    showName: '秒',
                    isRequired: true,
                },
                {
                    name: 'timetip',
                    type: 'string',
                    showName: '事件',
                    isRequired: true,
                },
                {
                    name: 'brieftime',
                    type: 'boolean',
                    showName: '简略时间显示',
                    isRequired: true,
                },
            ],
        },
    })

    return { vanillaWidget }
})
