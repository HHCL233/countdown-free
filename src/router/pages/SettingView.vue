<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { PluginManager } from '../../utils/plugin';
import { useCardDataStore } from '../../stores/cardData';

const cardData = useCardDataStore()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
    const pluginManager = new PluginManager(cardData, router)
    await pluginManager.initPlugin()
})
</script>
<template>
    <div id="setting">
        <mdui-layout class="setting-layout">
            <mdui-navigation-drawer contained open class="setting-drawer">
                <mdui-list>
                    <mdui-list-item rounded
                        @click="router.push(`${router.currentRoute.value.matched[0].path}/${currentRoute!.path}`)"
                        v-for="currentRoute in router.currentRoute.value.matched[0].children"
                        :active="route.path == `${router.currentRoute.value.matched[0].path}/${currentRoute!.path}`">{{
                            currentRoute!.meta?.menuName ?? '' }}</mdui-list-item>
                </mdui-list>
            </mdui-navigation-drawer>
            <mdui-layout-main class="setting-main">
                <RouterView />
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
    overflow-x: hidden;
}

.setting-drawer {
    width: 16em;
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