<script setup lang="ts">
import { ref } from 'vue';
import { createNewWidget } from '../../../utils/widget';

const pages = ref('home')
</script>
<template>
    <div id="setting-add">
        <h1 class="setting-title">添加组件</h1>
        <div class="setting-add">
            <mdui-tooltip placement="bottom" content="使用基础倒计时提醒自己">
                <mdui-card clickable class="setting-add-card" @click="createNewWidget()">
                    <mdui-icon name='access_time' class="setting-add-card-icon"></mdui-icon>
                    <span>基础倒计时</span>
                </mdui-card>
            </mdui-tooltip>
            <mdui-tooltip placement="bottom" content="暂未开放">
                <mdui-card clickable class="setting-add-card" @click="createNewWidget()" disabled>
                    <mdui-icon name='shop' class="setting-add-card-icon"></mdui-icon>
                    <span>获取更多...</span>
                </mdui-card>
            </mdui-tooltip>
        </div>
    </div>
    <mdui-dialog class="add-card-dialog" :open="false">
        <span slot="headline">设置时间</span>
        <div slot="description">
            <div class="time-select">
            </div>
        </div>
        <mdui-button slot="action">关闭</mdui-button>
    </mdui-dialog>
</template>
<style lang="css" scoped>
#setting-add {}

.setting-title {
    margin: 0;
}

.setting-add {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.setting-add-card {
    margin-top: 24px;
    margin-bottom: 24px;
    width: 240px;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 24px;
    gap: 14px;
}

.setting-add-card-icon {
    font-size: 48px;
}

.time-select {
    font-size: 16px;
    user-select: none;
}

.time-select-slider {
    width: 100%;
}
</style>