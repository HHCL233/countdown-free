<script setup lang="ts">
import { ref } from 'vue';
const pages = ref('home')
</script>
<template>
    <div id="setting-home">
        <h1 class="setting-title">主页</h1>
        <div class="setting-suggest">
        </div>
    </div>
</template>
<style lang="css" scoped>
#setting-home {}

.setting-title {
    margin: 0;
}

.setting-suggest {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.setting-suggest-card {
    margin-top: 24px;
    margin-bottom: 24px;
    width: 240px;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 24px;
    gap: 14px;
}

.setting-suggest-card-icon {
    font-size: 48px;
}
</style>