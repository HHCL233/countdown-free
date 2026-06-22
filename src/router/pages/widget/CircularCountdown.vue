<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useCardDataStore } from '../../../stores/cardData'
import { closeWidget } from '../../../utils/widget'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { useWindow } from '../../../utils/window'
import {
    isPermissionGranted,
    requestPermission,
    sendNotification,
} from '@tauri-apps/plugin-notification'
import { hourMinuteSecond2Second, smallTimeHandling } from '../../../utils/time'

const showMainWindow = ref<() => Promise<void>>()

const initWindow = async () => {
    const res = await useWindow()
    showMainWindow.value = res.showWindow
}

initWindow()

const currentWindow = WebviewWindow.getCurrent()
const isDragMode = ref(false)
const cardData = useCardDataStore()
const currentCardData = computed(() => cardData?.allCardData[currentWindow.label])
const deadLine = ref(0)
const remainingTime = ref('0秒')
const currentTimestamp = ref(0)
const beginCurrentTimestamp = ref(0)

const ready = ref(false)

const isStop = ref(false)

const countTimerFn = async (countTimerInterval: number) => {
    const aCardData = currentCardData.value.param
    if (!aCardData?.hour || !aCardData?.minute || !aCardData?.second) return

    const nowTime = Date.now()
    currentTimestamp.value = nowTime
    const tempTime = Math.ceil((deadLine.value - nowTime) / 1000.0)
    if (tempTime < 0) {
        remainingTime.value = '0秒'
        isStop.value = true
        clearInterval(countTimerInterval)
        let permissionGranted = await isPermissionGranted()

        if (!permissionGranted) {
            const permission = await requestPermission()
            permissionGranted = permission === 'granted'
        }

        if (permissionGranted) {
            sendNotification({
                title: '吉时已到！',
                body: `已到达 ${aCardData.param?.timetip ?? ''} 指定的时间。`,
            })
        }
    }
    remainingTime.value = smallTimeHandling(tempTime, Boolean(aCardData?.param?.briefTime))
}

console.log(currentWindow.label)
console.log(cardData.allCardData)

const stopWatch = watch(
    currentCardData,
    async (data) => {
        if (ready.value || !data) return
        ready.value = true

        const aCardData = currentCardData.value.param
        if (!aCardData?.hour || !aCardData?.minute || !aCardData?.second) return

        deadLine.value =
            Date.now() +
            hourMinuteSecond2Second(aCardData?.hour, aCardData?.minute, aCardData?.second) * 1000
        beginCurrentTimestamp.value = Date.now()

        const countTimer = setInterval(async () => {
            await countTimerFn(countTimer)
        }, 250)
        await countTimerFn(countTimer)
        stopWatch()
    },
    { immediate: true, deep: true },
)
</script>
<template>
    <mdui-dropdown trigger="contextmenu" open-on-pointer v-if="ready">
        <mdui-card
            variant="filled"
            slot="trigger"
            :data-tauri-drag-region="isDragMode"
            class="ez-countdown"
        >
            <span class="ez-countdown-tip" v-if="!isStop"
                >距离 {{ currentCardData?.param?.timetip ?? '' }} 还有</span
            >
            <m3e-circular-progress-indicator
                class="ez-countdown-timeleft"
                v-if="!isStop"
                :value="currentTimestamp - beginCurrentTimestamp"
                :max="deadLine - beginCurrentTimestamp"
                >{{ remainingTime }}</m3e-circular-progress-indicator
            >
            <mdui-button
                class="ez-countdown-close-button"
                v-if="isStop"
                @click="closeWidget(currentWindow.label)"
                >删除卡片</mdui-button
            >
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
    position: absolute;
    top: 50%;
    transform: translateY(-25%) scale(2.25);
    height: 72px;
    width: 72px;
}

.ez-countdown-unit {
    font-size: 140%;
}
</style>
