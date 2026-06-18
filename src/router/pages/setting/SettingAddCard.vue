<script setup lang="ts">
import { ref } from 'vue';
import { createNewWidget } from '../../../utils/widget';
import AddCard from '../../../components/AddCard.vue';
import { useCardDataStore } from '../../../stores/cardData.ts';

const timeSelectFrom = ref<HTMLFormElement | null>(null)
const addCardDialogIsOpen = ref(false)
const addWidgetType = ref(0)
const addCustomWidgetType = ref(0)
const cardDataStore = useCardDataStore()

const newCardSubmit = (async (event: SubmitEvent) => {
    if (!timeSelectFrom.value) return;
    event.preventDefault()
    const timeSelectData = new FormData(timeSelectFrom.value)

    const formObj = Object.fromEntries(timeSelectData.entries())
    const { hour, minute, second, timetip, brieftime } = formObj
    if (!hour || !minute || !timetip || !second) return;

    const customData: { [key: string]: any } = {}
    if (addWidgetType.value == 2) {
        customData.customWidget = addCustomWidgetType
    }
    await createNewWidget(addWidgetType.value, (Number(hour) * 60 * 60 + Number(minute) * 60 + Number(second)), String(timetip), Boolean(brieftime), customData)
    addCardDialogIsOpen.value = false
})

const openAddCardDialog = (widgetType: number, CustomWidgetType?: number) => {
    addWidgetType.value = widgetType
    addCardDialogIsOpen.value = true
    addCustomWidgetType.value = CustomWidgetType ?? 0
}
</script>
<template>
    <div id="setting-add">
        <h1 class="setting-title">添加组件</h1>
        <div class="setting-add">
            <AddCard name="基础倒计时" tooltip="使用基础倒计时提醒自己" @click="openAddCardDialog(0)" />
            <AddCard name="环形倒计时" tooltip="使用环形倒计时提醒自己" @click="openAddCardDialog(1)" />
            <AddCard v-for="customCardData in cardDataStore.customCardDatas" :name="customCardData.name"
                :tooltip="customCardData.tooltip"
                @click="openAddCardDialog(2, cardDataStore.customCardDatas.indexOf(customCardData))" />
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
        <div slot="description" class="add-card-dialog-content">
            <form class="time-select" id="time-select" @submit="newCardSubmit" ref="timeSelectFrom">
                <mdui-text-field label="小时" name="hour" type="number" clearable required></mdui-text-field>
                <mdui-text-field label="分钟" name="minute" type="number" clearable required></mdui-text-field>
                <mdui-text-field label="秒" name="second" type="number" clearable required></mdui-text-field>
                <mdui-text-field label="事件" name="timetip" clearable required></mdui-text-field>
                <div class="time-select-switch">
                    <mdui-switch name="brieftime"></mdui-switch>
                    <span class="time-select-switch-text">简略时间显示</span>
                </div>
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
    gap: 8px;
    margin-top: 24px;
    margin-bottom: 24px;
}

.setting-add-card {
    width: 240px;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 24px;
    gap: 8px;
}

.setting-add-card-icon {
    font-size: 48px;
}

.add-card-dialog-content {
    overflow-x: hidden;
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

.time-select-switch {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    margin-top: 4px;
    margin-bottom: 4px;
}

.time-select-switch-text {
    flex: 1;
}
</style>