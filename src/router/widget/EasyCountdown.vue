<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCardDataStore } from '../../stores/cardData';
import { closeWidget } from '../../utils/widget';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { useWindow } from "../../utils/window";
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
const timeUnit = ref("秒")
const remainingTime = ref(-1)

const countTimerFn = async (countTimerInterval: number) => {
    deadLine.value = cardData.allCardData[currentWindow.label].param.deadline
    const nowTime = Date.now()
    const tempTime = Math.ceil((deadLine.value - nowTime) / 1000.0)
    if (tempTime <= 0) {
        remainingTime.value = 0
        clearInterval(countTimerInterval)
        let permissionGranted = await isPermissionGranted();

        if (!permissionGranted) {
            const permission = await requestPermission();
            permissionGranted = permission === 'granted';
        }

        if (permissionGranted) {
            sendNotification({ title: '吉时已到！', body: '已到达指定的时间。' });
        }
    }
    if (tempTime >= (24 * 60 * 60)) {
        remainingTime.value = Math.ceil(tempTime / (24 * 60 * 60))
        timeUnit.value = '天'
    } else if (tempTime > (60 * 60)) {
        remainingTime.value = Math.ceil(tempTime / (60 * 60))
        timeUnit.value = '小时'
    } else if (tempTime >= (60)) {
        remainingTime.value = Math.ceil(tempTime / (60))
        timeUnit.value = '分钟'
    } else {
        remainingTime.value = tempTime
        timeUnit.value = '秒'
    }
}

const countTimer = setInterval(async () => {
    countTimerFn(countTimer)
}, 250)

onMounted(() => {
    deadLine.value = cardData.allCardData[currentWindow.label].param.deadline
    countTimerFn(countTimer)
})

console.log(currentWindow.label)
console.log(cardData.allCardData)


</script>
<template>
    <mdui-dropdown trigger="contextmenu" open-on-pointer>
        <mdui-card variant="filled" slot="trigger" :data-tauri-drag-region="isDragMode" class="ez-countdown">
            <span class="ez-countdown-tip" v-if="remainingTime != 0">距离 {{
                cardData.allCardData[currentWindow.label].param.timetip }} 还有</span>
            <span class="ez-countdown-timeleft" v-if="remainingTime != 0">{{ remainingTime }}</span>
            <span class="ez-countdown-unit" v-if="remainingTime != 0">{{ timeUnit }}</span>
            <mdui-button class="ez-countdown-close-button" v-if="remainingTime <= 0"
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
    font-size: 120%;
}

.ez-countdown-timeleft {
    font-size: 400%;
    flex: 1;
    text-align: center;
}

.ez-countdown-unit {
    font-size: 140%;
}
</style>