<script setup lang="ts">
import { ref } from 'vue';

const pages = ref('home')
</script>
<template>
    <div id="setting">
        <mdui-layout class="setting-layout">
            <mdui-navigation-drawer contained open class="setting-drawer">
                <mdui-list>
                    <mdui-list-item rounded active>主页</mdui-list-item>
                </mdui-list>
            </mdui-navigation-drawer>
            <mdui-layout-main class="setting-main">
                <Transition name="slide-fade" mode="out-in">
                    <RouterView />
                </Transition>
            </mdui-layout-main>
        </mdui-layout>
    </div>
</template>
<style lang="css" scoped>
#setting {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    padding-left: 12px;
    padding-right: 12px;
}

.setting-layout {
    width: 100%;
    height: 100%;
}

.setting-main {
    margin: 1.5rem;
    box-sizing: border-box;
}

.setting-drawer {
    width: 16em;
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