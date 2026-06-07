import { Window } from '@tauri-apps/api/window';

export const useWindow = async (label = 'main') => {
    const appMainWindow = new Window(label);

    const unlisten = await appMainWindow.onCloseRequested(async (event) => {
        event.preventDefault()
        await appMainWindow.hide()
        return
    })

    const closeWindow = async (real = false) => {
        if (real) {
            await appMainWindow.close()
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