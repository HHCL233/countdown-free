<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '../../../stores/app'

const router = useRouter()
const appState = useAppStore()
</script>
<template>
    <div class="welcome-once">
        <h1 class="welcome-title">设置完毕</h1>
        <p>体验激动人心的{{ appState.appName }}吧！</p>
        <div class="operation">
            <mdui-button @click="router.push('/setting/home')">开始</mdui-button>
            <mdui-button @click="router.push('/welcome/0')" variant="text">返回</mdui-button>
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
