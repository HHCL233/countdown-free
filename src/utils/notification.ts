import { sendNotification } from '@tauri-apps/plugin-notification'

export function sendNormalNotification(notificationTitle: string, notificationBody: string) {
    sendNotification({
        title: notificationTitle,
        body: notificationBody,
    })
}
