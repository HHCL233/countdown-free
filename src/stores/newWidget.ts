import { defineStore } from 'pinia'
import { ref } from 'vue'
import { WidgetConfig, PluginWidgetConfig } from '../type/cardData'

export const useNewWidgetStore = defineStore(
    'newWidget',
    () => {
        // 存放自带组件参数信息
        const vanillaWidget = ref<WidgetConfig>({
            0: {
                name: '基础倒计时',
                tooltip: '使用环形倒计时提醒自己',
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
                name: '环形倒计时',
                tooltip: '使用环形倒计时提醒自己',
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
                name: '自定义组件',
                tooltip: '(*´･д･)? 你不应该在这里的',
                isHind: true,
                items: [],
            },
        })

        // 存放自定义组件参数信息
        const pluginWidget = ref<PluginWidgetConfig>({})

        return { vanillaWidget, pluginWidget }
    },
    {
        tauri: {
            sync: true,
            save: false,
        },
    },
)
export type NewWidgetStore = ReturnType<typeof useNewWidgetStore>
