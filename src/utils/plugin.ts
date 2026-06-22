import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { CardData } from '../type/cardData'
import { Router } from 'vue-router'
import { BaseDirectory, exists, mkdir, readDir, readFile } from '@tauri-apps/plugin-fs'
import { CardDataStore } from '../stores/cardData'

export class PluginManager {
    cardData: CardData
    cardDataStore: CardDataStore
    router: Router
    constructor(cardDataStore: CardDataStore, router: Router) {
        this.cardDataStore = cardDataStore
        this.cardData = cardDataStore.allCardData
        this.router = router
    }

    initAPI() {
        this.cardDataStore.customCardDatas = []
        window.countdownFreeAPI = {
            plugin: [],
            tools: {
                getWidgetData: () => {
                    const currentWidget = getCurrentWebviewWindow()
                    const widgetData = this.cardData[currentWidget.label]
                    if (!widgetData) {
                        throw new ReferenceError('当前窗口/组件未注册在widgetData内')
                    }
                    return widgetData
                },
                registerWidget: (widgetComponent: string, widgetShowName: string) => {
                    console.log(this.cardDataStore.customCardDatas)
                    this.cardDataStore.customCardDatas.push({
                        name: widgetShowName,
                        tooltip: `使用${widgetShowName}提醒自己`,
                        component: widgetComponent,
                    })
                    return { success: true, msg: `创建路由成功` }
                },
                import: async (file: string, isJS = false) => {
                    const contents = await readFile(`plugins/${file}`, {
                        baseDir: BaseDirectory.AppData,
                    })
                    const textDecoder = new TextDecoder()
                    const pluginJS = textDecoder.decode(contents)
                    const blob = new Blob([pluginJS], { type: 'text/javascript' })
                    const blobUrl = URL.createObjectURL(blob)
                    const importContent = await this.loadPlugin(blobUrl, isJS)
                    URL.revokeObjectURL(blobUrl)
                    return importContent
                },
                importVue: async (file: string) => {
                    const contents = await readFile(`plugins/${file}`, {
                        baseDir: BaseDirectory.AppData,
                    })
                    const textDecoder = new TextDecoder()
                    const pluginJS = textDecoder.decode(contents)
                    return pluginJS
                },
            },
        }
    }

    async initPlugin() {
        this.initAPI()
        await this.loadPlugins()
    }

    async loadPlugin(pluginURL: string, isJS = false) {
        console.log(pluginURL)
        const plugin = await import(pluginURL)
        if (isJS) {
            const pluginInstance = new plugin.default()
            await pluginInstance.init()
        }
    }

    async loadPlugins() {
        console.log('开始加载插件...')
        const havaPluginsDir = await exists('plugins', { baseDir: BaseDirectory.AppData })
        if (!havaPluginsDir) {
            await mkdir('plugins', { baseDir: BaseDirectory.AppData, recursive: true })
        }
        const pluginsArray = await readDir('plugins', { baseDir: BaseDirectory.AppData })
        for (const plugin of pluginsArray) {
            if (!plugin.isDirectory) continue
            const pluginName = plugin.name
            console.log('已查找到插件:', plugin)

            const havaPluginsJSON = await exists(`plugins/${pluginName}/plugin.json`, {
                baseDir: BaseDirectory.AppData,
            })
            if (!havaPluginsJSON) continue
            const pluginsJSONContents = await readFile(`plugins/${pluginName}/plugin.json`, {
                baseDir: BaseDirectory.AppData,
            })
            const jsonTextDecoder = new TextDecoder()
            const pluginJSON = jsonTextDecoder.decode(pluginsJSONContents)
            window.countdownFreeAPI.plugin.push(JSON.parse(pluginJSON))

            const havaPluginsJS = await exists(`plugins/${pluginName}/index.js`, {
                baseDir: BaseDirectory.AppData,
            })
            if (!havaPluginsJS) continue
            const contents = await readFile(`plugins/${pluginName}/index.js`, {
                baseDir: BaseDirectory.AppData,
            })
            const textDecoder = new TextDecoder()
            const pluginJS = textDecoder.decode(contents)

            const blob = new Blob([pluginJS], { type: 'text/javascript' })
            const blobUrl = URL.createObjectURL(blob)
            await this.loadPlugin(blobUrl, true)
            URL.revokeObjectURL(blobUrl)
        }
    }
}
