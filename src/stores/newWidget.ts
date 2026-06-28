import { defineStore } from 'pinia'
import { ref } from 'vue'
import { WidgetConfig } from '../type/cardData'

export const useNewWidgetStore = defineStore('newWidget', () => {
    // 存放自带组件参数信息
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
            items: [],
        },
    })

    // 存放自定义组件参数信息
    const pluginWidget = ref<WidgetConfig>({})

    return { vanillaWidget, pluginWidget }
})
export type NewWidgetStore = ReturnType<typeof useNewWidgetStore>
