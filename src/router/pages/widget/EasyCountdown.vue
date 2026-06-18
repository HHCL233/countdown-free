<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useCardDataStore } from '../../../stores/cardData';
import { closeWidget } from '../../../utils/widget';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { useWindow } from "../../../utils/window";
import {
    isPermissionGranted,
    requestPermission,
    sendNotification,
} from '@tauri-apps/plugin-notification';

const showMainWindow = ref<() => Promise<void>>()

const initWindow = async () => {
    const res = await useWindow()
    showMainWindow.value = res.showWindow
}

initWindow()

const currentWindow = WebviewWindow.getCurrent()
const isDragMode = ref(false)
const cardData = useCardDataStore()

const deadLine = ref(0)
const remainingTime = ref("0秒")

const ready = ref(false)

const isStop = ref(false)

const countTimerFn = async (countTimerInterval: number) => {
    const aCardData = cardData.allCardData[currentWindow.label]
    deadLine.value = aCardData.param.deadline
    const nowTime = Date.now()
    const tempTime = Math.ceil((deadLine.value - nowTime) / 1000.0)
    console.log(tempTime < 0)
    if (tempTime < 0) {
        remainingTime.value = "0秒"
        isStop.value = true
        clearInterval(countTimerInterval)
        let permissionGranted = await isPermissionGranted();

        if (!permissionGranted) {
            const permission = await requestPermission();
            permissionGranted = permission === 'granted';
        }

        if (permissionGranted) {
            sendNotification({ title: '吉时已到！', body: `已到达 ${aCardData.param?.timetip ?? ''} 指定的时间。` });
        }
    }
    if (aCardData.param.briefTime) {
        if (tempTime >= (60 * 60 * 24)) {
            const day = Math.floor(tempTime / (60 * 60 * 24))
            remainingTime.value = `${String(day)}天`
        }
        else if (tempTime >= (60 * 60)) {
            const hour = Math.floor(tempTime / (60 * 60))
            remainingTime.value = `${String(hour)}小时`
        } else if (tempTime >= (60)) {
            const minute = Math.floor(tempTime / (60))
            remainingTime.value = `${String(minute)}分`
        } else {
            remainingTime.value = `${String(tempTime)}秒`
        }
    } else {
        if (tempTime >= (60 * 60 * 24)) {
            const leftSec2 = tempTime % (60 * 60 * 24);
            const leftSec = leftSec2 % 3600;
            const day = Math.floor(tempTime / (60 * 60 * 24))
            const hour = Math.floor(leftSec2 / (60 * 60))
            const minute = Math.floor(leftSec / (60))
            const second = Math.ceil(leftSec % (60))
            remainingTime.value = `${String(day).padStart(2, "0")}:${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`
        }
        else if (tempTime >= (60 * 60)) {
            const leftSec = tempTime % 3600;
            const hour = Math.floor(tempTime / (60 * 60))
            const minute = Math.floor(leftSec / (60))
            const second = Math.ceil(leftSec % (60))
            remainingTime.value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`
        } else if (tempTime >= (60)) {
            const minute = Math.floor(tempTime / (60))
            const second = Math.ceil(tempTime % (60))
            remainingTime.value = `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`
        } else {
            remainingTime.value = `00:${String(tempTime).padStart(2, "0")}`
        }
    }
}

console.log(currentWindow.label)
console.log(cardData.allCardData)

const stopWatch = watch(() => cardData?.allCardData[currentWindow.label], async (data) => {
    if (ready.value || !data) return;
    ready.value = true
    const countTimer = setInterval(async () => {
        await countTimerFn(countTimer)
    }, 250)
    await countTimerFn(countTimer)
    stopWatch()
}, { immediate: true })

</script>
<template>
    <mdui-dropdown trigger="contextmenu" open-on-pointer v-if="ready">
        <mdui-card variant="filled" slot="trigger" :data-tauri-drag-region="isDragMode" class="ez-countdown">
            <span class="ez-countdown-tip" v-if="!isStop">距离 {{
                cardData.allCardData[currentWindow.label]?.param?.timetip ?? '' }} 还有</span>
            <span class="ez-countdown-timeleft" v-if="!isStop">{{ remainingTime }}</span>
            <mdui-button class="ez-countdown-close-button" v-if="isStop"
                @click="closeWidget(currentWindow.label)">删除卡片</mdui-button>
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
.ez-countdown {
    width: 100vh;
    position: fixed;
    height: 100vh;
    border-radius: var(--mdui-shape-corner-large);
    padding: 24px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
}

.ez-countdown * {
    pointer-events: none;
}

.ez-countdown-close-button {
    pointer-events: all;
}

.ez-countdown-tip {
    font-size: 140%;
    position: absolute;
    top: 16px;
}

.ez-countdown-timeleft {
    font-size: 240%;
    flex: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.ez-countdown-unit {
    font-size: 140%;
}
</style>