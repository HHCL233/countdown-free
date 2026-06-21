import { onOpenUrl } from '@tauri-apps/plugin-deep-link'

export const initDeepLinkCallback = async () => {
    await onOpenUrl((urls) => {
        console.log('deep link:', urls)
    })
}
