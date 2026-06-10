<script setup lang="ts">
import { ref } from 'vue';
import { createNewWidget } from '../../../utils/widget';

const timeSelectFrom = ref<HTMLFormElement | null>(null)
const addCardDialogIsOpen = ref(false)

const newCardSubmit = (async (event: SubmitEvent) => {
    if (!timeSelectFrom.value) return;
    event.preventDefault()
    const timeSelectData = new FormData(timeSelectFrom.value)

    const hour = timeSelectData.get('hour')
    const minute = timeSelectData.get('minute')
    const second = timeSelectData.get('second')
    const timetip = timeSelectData.get('timetip')
    if (!hour || !minute || !timetip || !second) return;

    await createNewWidget(undefined, (Number(hour) * 60 * 60 + Number(minute) * 60 + Number(second)), String(timetip))
    console.log(String(timetip))
    addCardDialogIsOpen.value = false
})
</script>
<template>
    <div id="setting-add">
        <h1 class="setting-title">添加组件</h1>
        <div class="setting-add">
            <mdui-tooltip placement="bottom" content="使用基础倒计时提醒自己">
                <mdui-card clickable class="setting-add-card" @click="addCardDialogIsOpen = true">
                    <mdui-icon name='access_time' class="setting-add-card-icon"></mdui-icon>
                    <span>基础倒计时</span>
                </mdui-card>
            </mdui-tooltip>
            <mdui-tooltip placement="bottom" content="暂未开放">
                <mdui-card clickable class="setting-add-card" disabled>
                    <mdui-icon name='shop' class="setting-add-card-icon"></mdui-icon>
                    <span>获取更多...</span>
                </mdui-card>
            </mdui-tooltip>
        </div>
    </div>
    <mdui-dialog class="add-card-dialog" :open="addCardDialogIsOpen">
        <span slot="headline">添加组件</span>
        <div slot="description">
            <form class="time-select" id="time-select" @submit="newCardSubmit" ref="timeSelectFrom">
                <mdui-text-field label="小时" name="hour" type="number" clearable required></mdui-text-field>
                <mdui-text-field label="分钟" name="minute" type="number" clearable required></mdui-text-field>
                <mdui-text-field label="秒" name="second" type="number" clearable required></mdui-text-field>
                <mdui-text-field label="事件" name="timetip" clearable required></mdui-text-field>
            </form>
        </div>
        <mdui-button slot="action" type="reset" variant="text" form="time-select"
            @click="addCardDialogIsOpen = false">取消</mdui-button>
        <mdui-button slot="action" type="submit" variant="filled" form="time-select">添加</mdui-button>
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
    user-select: none;
    width: 480px;
    display: flex;
    flex-direction: column;
}

.time-select-slider {
    width: 100%;
}
</style>