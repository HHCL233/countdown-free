<script setup lang="ts">
import { CircularProgress } from 'mdui';
import { onMounted, ref } from 'vue';
</script>
<template>
    <div id="setting-countdown">
        <h1 class="setting-title">倒计时</h1>
        <div class="setting-dashboard">
            <mdui-circular-progress ref="settingCountdownProgress" class="setting-countdown-progress" :value="50"
                :max="100"></mdui-circular-progress>
            <mdui-button>开始倒计时</mdui-button>
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

.setting-countdown-progress {}
</style>