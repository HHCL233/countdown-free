<script setup lang="ts">
// @ts-expect-error
import { loadModule } from 'vue3-sfc-loader'
import { watch, ref, defineAsyncComponent, computed, toRaw } from 'vue'
import { useCardDataStore } from '../../../stores/cardData'
import { useWindow } from '../../../utils/window'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import * as Vue from 'vue'
import { closeWidget } from '../../../utils/widget'
import { useNewWidgetStore } from '../../../stores/newWidget'

const cardDataStore = useCardDataStore()
const currentWindow = WebviewWindow.getCurrent()
const currentCardData = computed(() => cardDataStore?.allCardData[currentWindow.label])
const customCardData = computed(() => currentCardData?.value?.param?._customWidget)
const customCardComponent = computed(() => customCardData?.value?.component)
const showMainWindow = ref<() => Promise<void>>()
const isDragMode = ref(false)

const remote = ref()

const initWindow = async () => {
    const res = await useWindow()
    showMainWindow.value = res.showWindow
}

initWindow()

const stopWatch = watch(
    customCardComponent,
    async () => {
        await load(customCardComponent.value)
        stopWatch()
    },
    { deep: true },
)

const load = async (content: string) => {
    const options = {
        moduleCache: {
            vue: Vue,
        },
        async getFile() {
            return content
        },
        addStyle(textContent: string) {
            const style = Object.assign(document.createElement('style'), { textContent })
            const ref = document.head.getElementsByTagName('style')[0] || null
            document.head.insertBefore(style, ref)
        },
    }

    // 加载远程组件
    remote.value = defineAsyncComponent(() =>
        loadModule('custom-widget.vue', options).catch((err: any) => {
            console.error('vue3-sfc-loader 加载失败，具体原因:', err)
            throw err
        }),
    )
}
</script>
<template>
    <mdui-dropdown trigger="contextmenu" open-on-pointer>
        <mdui-card
            variant="filled"
            slot="trigger"
            :data-tauri-drag-region="isDragMode"
            class="custom-countdown"
        >
            <component class="custom-countdown" :is="remote" />
        </mdui-card>
        <mdui-menu>
            <mdui-menu-item @click="isDragMode = !isDragMode">{{
                isDragMode ? '停止移动卡片' : '移动卡片'
            }}</mdui-menu-item>
            <mdui-menu-item @click="closeWidget(currentWindow.label)">删除卡片</mdui-menu-item>
            <mdui-divider></mdui-divider>
            <mdui-menu-item @click="showMainWindow?.()">全局设置</mdui-menu-item>
        </mdui-menu>
    </mdui-dropdown>
</template>
<style lang="css" scoped>
.custom-countdown {
    width: 100vh;
    position: fixed;
    height: 100vh;
    border-radius: var(--mdui-shape-corner-large);
}

.custom-countdown * {
    pointer-events: none;
}
</style>
