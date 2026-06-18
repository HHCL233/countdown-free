<script setup lang="ts">
import { CircularProgress } from 'mdui';
import { onMounted, onUnmounted, ref } from 'vue';

const minute = ref(0)
const second = ref(0)
const setMinute = ref(0)
const setSecond = ref(0)
const isStartCountown = ref(false)
let countTimerInterval: number | null = null;


const countTimerFn = async () => {
    if (!countTimerInterval) return;
    const countTimerDelete = () => {
        if (!countTimerInterval) return;
        clearInterval(countTimerInterval)
        countTimerInterval = null
        isStartCountown.value = false
        return
    }
    if (second.value <= 0 && minute.value <= 0) {
        countTimerDelete()
        return
    }
    second.value -= 1
    if (second.value <= -1 && minute.value > 0) {
        second.value = 59
        minute.value -= 1
    }
}

const startCountown = () => {
    isStartCountown.value = true
    second.value = setSecond.value % 60
    minute.value = setMinute.value + Math.floor(setSecond.value / 60)
    if (countTimerInterval == null) {
        countTimerInterval = setInterval(() => countTimerFn(), 1000)
    } else {
        stopCountown()
    };
}

const stopCountown = () => {
    if (!countTimerInterval) return;
    clearInterval(countTimerInterval)
    countTimerInterval = null
    isStartCountown.value = false
}

onUnmounted(() => {
    if (!countTimerInterval) return;
    clearInterval(countTimerInterval)
    countTimerInterval = null
})
</script>
<template>
    <div id="setting-countdown">
        <h1 class="setting-title">倒计时</h1>
        <div class="setting-dashboard">
            <m3e-circular-progress-indicator class="setting-countdown-progress"
                :value="(Number(setMinute) * 60 + Number(setSecond)) - (second + minute * 60)"
                :max="(Number(setMinute) * 60 + Number(setSecond))" v-if="isStartCountown">{{
                    `${String(minute).padStart(2,
                        '0')}:${String(second).padStart(2, '0')}` }}</m3e-circular-progress-indicator>
            <div class="setting-countdown-settime" v-else>
                <mdui-text-field label="分钟" name="minute" type="number" :value="String(setMinute).padStart(2, '0')"
                    @change="setMinute = Number($event.target.value)" :disabled="isStartCountown"></mdui-text-field>
                <span class="setting-countdown-text">:</span>
                <mdui-text-field label="秒" name="second" type="number" :value="String(setSecond).padStart(2, '0')"
                    @change="setSecond = Number($event.target.value)" :disabled="isStartCountown"></mdui-text-field>
            </div>
            <mdui-button @click="startCountown()">{{ isStartCountown ? '停止' : '开始'
                }}倒计时</mdui-button>
        </div>
    </div>
</template>
<style lang="css" scoped>
#setting-countdown {
    position: relative;
    height: 100%;
}

.setting-title {
    margin: 0;
}

.setting-dashboard {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

.setting-countdown-settime {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}

.setting-countdown-text {
    font-size: 24px;
}

.setting-countdown-progress {
    height: 114px;
    width: 114px;
    aspect-ratio: 1/1;
    font-size: 24px;
    transform: scale(4);
}
</style>