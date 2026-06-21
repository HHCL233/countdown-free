import { exit as exitProcess } from '@tauri-apps/plugin-process'

export const exit = async () => {
    await exitProcess(0)
}
