<script setup lang="ts">
import { ref } from 'vue';
import { createNewWidget } from '../../../utils/widget';

const pages = ref('home')
</script>
<template>
    <div id="setting-home">
        <h1 class="setting-title">主页</h1>
        <div class="setting-suggest">
            <mdui-card clickable class="setting-suggest-card" @click="createNewWidget()">
                <mdui-icon name='auto_awesome' class="setting-suggest-card-icon"></mdui-icon>
                <span>尝试：新增组件</span>
            </mdui-card>
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