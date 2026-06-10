<script setup lang="ts">
import { CircularProgress } from 'mdui';
import { onMounted, ref } from 'vue';

const minute = ref(0)
const second = ref(0)
const isStartCountown = ref(false)
</script>
<template>
    <div id="setting-countdown">
        <h1 class="setting-title">倒计时</h1>
        <div class="setting-dashboard">
            <div class="setting-countdown-settime">
                <mdui-text-field label="分钟" name="minute" type="number" :value="String(minute).padStart(2, '0')"
                    @change="minute = $event.target.value" :disabled="isStartCountown"></mdui-text-field>
                <span class="setting-countdown-text">:</span>
                <mdui-text-field label="秒" name="second" type="number" :value="String(second).padStart(2, '0')"
                    @change="second = $event.target.value" :disabled="isStartCountown"></mdui-text-field>
            </div>
            <mdui-button @click="isStartCountown = !isStartCountown">{{ isStartCountown ? '停止' : '开始'
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
</style>