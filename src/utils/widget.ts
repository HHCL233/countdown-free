import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { useCardDataStore } from '../stores/cardData';
import { useWindow } from "./window";

export async function createNewWidget(widgetId = 0, time = 30, timetip = "未提供参数") {
    const cardData = useCardDataStore()

    let label;
    do {
        label = `${crypto.randomUUID()}`;
    } while (cardData.hasOwnProperty(label));

    cardData.allCardData[label] = {
        width: 240,
        height: 240,
        x: 0,
        y: 0,
        widgetTypeId: widgetId,
        param: {
            deadline: Date.now() + time * 1000,
            timetip: timetip
        }
    }
    console.log(cardData.allCardData)

    const win = new WebviewWindow(label, {
        url: `/#/widget/${widgetId}`,
        title: 'Widget',
        width: 240,
        height: 240,
        x: 0,
        y: 0,
        decorations: false,
        transparent: true,
        skipTaskbar: true,
        resizable: false,
        alwaysOnTop: true,
        visible: false
    })

    win.once('tauri://created', async () => {
        console.log('窗口创建成功')
        win.show()
    })

    win.once('tauri://error', (e) => {
        console.error('窗口创建失败：', e)
    })

    return label
}

export async function closeWidget(widgetLabel = '') {
    const cardData = useCardDataStore();
    const { closeWindow } = await useWindow(widgetLabel, true);
    closeWindow();
    delete cardData.allCardData[widgetLabel]
    return true
}