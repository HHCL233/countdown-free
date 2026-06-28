import { PluginManager } from './plugin'
import { useRoute, useRouter } from 'vue-router'
import { useCardDataStore } from '../stores/cardData'
import { useAppStore } from '../stores/app'
import { denySave } from '@tauri-store/pinia'
import { platform, version, arch } from '@tauri-apps/plugin-os'
import { sendNormalNotification } from './notification'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { useNewWidgetStore } from '../stores/newWidget'

export async function runInit() {
    const webviewWindow = getCurrentWebviewWindow()

    if (webviewWindow.label != 'main') {
        await runInitWindow()
    } else {
        await runInitAll()
    }
}

export async function runInitAll() {
    const cardData = useCardDataStore()
    const router = useRouter()
    const appStore = useAppStore()
    const newWidgetStore = useNewWidgetStore()

    await runInitWindow()

    let pluginManager: PluginManager | null = new PluginManager(cardData, router, newWidgetStore)
    await pluginManager.loadPlugins()
    pluginManager = null

    const platformName = platform() // 系统标识符
    const cpuArch = arch() // 处理器架构
    if (!appStore.supportPlatform.includes(platformName)) {
        sendNormalNotification(
            '此软件未对此系统进行优化',
            `此软件未对您使用的操作系统 （${platformName.charAt(0).toUpperCase() + platformName.slice(1)} ${cpuArch}） 进行优化，可能存在潜在的漏洞。`,
        )
    }
}

export async function runInitWindow() {
    const router = useRouter()
    const cardData = useCardDataStore()
    const appStore = useAppStore()
    const newWidgetStore = useNewWidgetStore()

    let pluginManager: PluginManager | null = new PluginManager(cardData, router, newWidgetStore)
    pluginManager.initAPI()
    pluginManager = null

    await cardData.$tauri.start()
    await denySave('cardData')

    await appStore.$tauri.start()

    cardData.customCardDatas = []
}
