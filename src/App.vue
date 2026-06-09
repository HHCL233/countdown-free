<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useWindow } from "./utils/window";
import { useRoute } from "vue-router";
import { useCardDataStore } from "./stores/cardData";
import { useAppStore } from "./stores/app";
import { initDeepLinkCallback } from "./utils/deepLink";
// import { invoke } from "@tauri-apps/api/core";

const route = useRoute()
const cardData = useCardDataStore()
const appStore = useAppStore()


onMounted(async () => {
  await cardData.$tauri.start()
  await appStore.$tauri.start()
})

const closeWindow = ref<() => Promise<void>>()
const minimizeWindow = ref<() => Promise<void>>()

const initWindow = async () => {
  const res = await useWindow()
  closeWindow.value = res.closeWindow
  minimizeWindow.value = res.minimizeWindow
}

initWindow()
initDeepLinkCallback()
/*
async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsg.value = await invoke("greet", { name: name.value });
}
*/
</script>

<template>
  <mdui-card class="titlebar" data-tauri-drag-region v-if="(route.path).split('/')[1] != 'widget'">
    <mdui-button-icon icon="close" @click="closeWindow?.()"></mdui-button-icon>
    <mdui-button-icon icon="minimize" @click="minimizeWindow?.()"></mdui-button-icon>
    <span class="titlebar-title">CountdownFree</span>
  </mdui-card>
  <main class="container">
    <Transition name="slide-fade" mode="out-in">
      <RouterView />
    </Transition>
  </main>
</template>

<style scoped>
.titlebar {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  z-index: 5000;
}

.titlebar-title {
  flex: 1;
  padding-left: 16px;
  pointer-events: none;
}

.container {
  height: 100%;
  overflow-x: hidden;
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
<style>
html {
  background: transparent !important;
}

body {
  margin: 0;
  height: 100vh;
}

#app {
  border-radius: var(--mdui-shape-corner-large);
  background-color: rgb(var(--mdui-color-background));
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}

* {
  user-select: none;
  -webkit-user-select: none;
}
</style>