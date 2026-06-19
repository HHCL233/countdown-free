<script setup lang="ts">
import { watch, ref, defineAsyncComponent, computed } from 'vue';
import { useCardDataStore } from '../../../stores/cardData';
import { useWindow } from "../../../utils/window";
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { loadModule } from "vue3-sfc-loader"
import * as Vue from 'vue';
import { closeWidget } from '../../../utils/widget';


const cardDataStore = useCardDataStore()
const currentWindow = WebviewWindow.getCurrent()
const currentCardData = computed(() => cardDataStore?.allCardData[currentWindow.label])
const customCardData = computed(() => currentCardData?.value?.param?.customWidget)
const showMainWindow = ref<() => Promise<void>>()
const isDragMode = ref(false)

const remote = ref()
const name = ref("李四")

const initWindow = async () => {
    const res = await useWindow()
    showMainWindow.value = res.showWindow
}

initWindow()

const stopWatch = watch(currentCardData, async (data) => {
    load(cardDataStore?.customCardDatas[customCardData.value ?? 0]?.component)
    stopWatch()
},
    { deep: true })

const load = async (content: string) => {
    const options = {
        moduleCache: {
            vue: Vue
        },
        async getFile() {
            return content
        },
        addStyle(textContent: string) {
            const style = Object.assign(document.createElement('style'), { textContent })
            const ref = document.head.getElementsByTagName('style')[0] || null
            document.head.insertBefore(style, ref)
        },
    };

    // 加载远程组件
    remote.value = defineAsyncComponent(() => loadModule('custom-widget.vue', options))
}
</script>
<template>
    <mdui-dropdown trigger="contextmenu" open-on-pointer>
        <mdui-card variant="filled" slot="trigger" :data-tauri-drag-region="isDragMode" class="custom-countdown">
            <component class="custom-countdown" :is="remote" />
        </mdui-card>
        <mdui-menu>
            <mdui-menu-item @click="isDragMode = !isDragMode">{{ isDragMode ? '停止移动卡片' : '移动卡片' }}</mdui-menu-item>
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