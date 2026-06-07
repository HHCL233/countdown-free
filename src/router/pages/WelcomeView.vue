<script setup lang="ts">
import { ref } from 'vue';
import { useWindow } from '../../utils/window';

const hideWindow = ref<() => Promise<void>>()

const initWindow = async () => {
    const res = await useWindow()
    hideWindow.value = res.hideWindow
}

initWindow()
</script>
<template>
    <div id="welcome">
        <Transition name="slide-fade" mode="out-in">
            <RouterView />
        </Transition>
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

.slide-fade-enter-active {
    transition: all 0.25s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.25s ease-in-out;
}

.slide-fade-enter-from {
    transform: translateX(320px);
    opacity: 0;
}


.slide-fade-leave-to {
    transform: translateX(-320px);
    opacity: 0;
}
</style>