<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '../../../stores/app'

const router = useRouter()
const appState = useAppStore()
</script>
<template>
    <div class="welcome-once">
        <h1 class="welcome-title">Welcome to {{ appState.appName }}!</h1>
        <p>从此开启你的倒计时之旅</p>
        <div class="operation">
            <mdui-button @click="router.push('/welcome/1')">继续</mdui-button>
        </div>
    </div>
</template>
<style lang="css" scoped>
#welcome {
    padding: 24px;
    box-sizing: border-box;
    height: 100%;
    overflow-x: hidden;
}

.welcome-once {
    height: 100%;
    position: relative;
    overflow-x: hidden;
}

.welcome-title {
    margin: 0;
}

.operation {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
    gap: 12px;
}
</style>
