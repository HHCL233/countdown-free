import { Window } from '@tauri-apps/api/window'

export const useWindow = async (label = 'main', real = false) => {
    const appMainWindow = new Window(label)

    const closeWindow = async () => {
        if (real) {
            await appMainWindow.destroy()
        } else {
            await appMainWindow.hide()
        }
    }

    const minimizeWindow = async () => {
        await appMainWindow.minimize()
    }

    const hideWindow = async () => {
        await appMainWindow.hide()
    }

    const showWindow = async () => {
        await appMainWindow.show()
    }

    return { closeWindow, minimizeWindow, hideWindow, showWindow }
}
