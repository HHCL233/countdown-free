<script setup lang="ts">
</script>
<template>
    <div id="welcome">
        <router-view v-slot="{ Component }">
            <transition name="slide-fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
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
    transition: all 300ms cubic-bezier(0.2, 0, 0, 1);
}

.slide-fade-leave-active {
    transition: all 300ms cubic-bezier(0.2, 0, 1, 1);
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