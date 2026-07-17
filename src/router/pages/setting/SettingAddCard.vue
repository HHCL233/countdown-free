<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import { createNewWidget } from '../../../utils/widget'
import AddWidgetCard from '../../../components/setting/addCard/AddWidgetCard.vue'
import { useCardDataStore } from '../../../stores/cardData.ts'
import { AnyData } from '../../../type/cardData'
import { pick } from '../../../utils/obj.ts'
import { useNewWidgetStore } from '../../../stores/newWidget.ts'

const timeSelectFrom = ref<HTMLFormElement | null>(null)
const addCardDialogIsOpen = ref(false)
const addWidgetType = ref(0)
const addCustomWidgetType = ref(0)
const newWidgetStore = useNewWidgetStore()
const widgetConfig = computed(() => newWidgetStore.vanillaWidget)
const pluginWidgetConfig = computed(() => newWidgetStore.pluginWidget)

const newCardSubmit = async (event: SubmitEvent) => {
    if (!timeSelectFrom.value) return
    event.preventDefault()
    const timeSelectData = new FormData(timeSelectFrom.value)

    // 只留下需要的字段
    const formObj = Object.fromEntries(timeSelectData.entries())
    const needKeys = widgetConfig.value[addWidgetType.value].items.map((item) => item.name)
    const formKeys = pick(formObj, needKeys)

    const customData: AnyData = { ...formKeys }
    if (addWidgetType.value == 2) {
        customData._customWidget = {
            id: addCustomWidgetType,
            component: newWidgetStore.pluginWidget[addCustomWidgetType.value]?.component,
        }
    }

    await createNewWidget(addWidgetType.value, customData)
    await nextTick()
    addCardDialogIsOpen.value = false
}

const openAddCardDialog = (widgetType: number, customWidgetType?: number) => {
    addWidgetType.value = widgetType
    addCardDialogIsOpen.value = true
    addCustomWidgetType.value = customWidgetType ?? 0
}
</script>
<template>
    <div id="setting-add">
        <h1 class="setting-title">添加组件</h1>
        <div class="setting-add">
            <AddWidgetCard
                v-for="(vanillaWidgetData, index) in widgetConfig"
                :name="vanillaWidgetData.name"
                :tooltip="vanillaWidgetData.tooltip"
                v-show="!vanillaWidgetData.isHind"
                @click="openAddCardDialog(Number(index))"
            />
            <AddWidgetCard
                v-for="(customWidgetData, index) in pluginWidgetConfig"
                :name="customWidgetData.name"
                :tooltip="customWidgetData.tooltip"
                @click="openAddCardDialog(2, Number(index))"
            />
            <mdui-tooltip placement="bottom" content="暂未开放">
                <mdui-card clickable class="setting-add-card" disabled>
                    <mdui-icon name="shop" class="setting-add-card-icon"></mdui-icon>
                    <span>获取更多...</span>
                </mdui-card>
            </mdui-tooltip>
        </div>
    </div>
    <mdui-dialog class="add-card-dialog" :open="addCardDialogIsOpen">
        <span slot="headline">添加组件</span>
        <div slot="description" class="add-card-dialog-content">
            <form
                class="time-select"
                id="time-select"
                @submit.prevent="newCardSubmit"
                ref="timeSelectFrom"
            >
                <div class="time-select" v-if="addWidgetType != 2">
                    <mdui-text-field
                        :label="item.showName"
                        :name="item.name"
                        :type="item.type"
                        clearable
                        :required="item.isRequired"
                        v-for="item in widgetConfig[addWidgetType].items.filter(
                            (item) => item.type != 'boolean',
                        )"
                    ></mdui-text-field>
                    <div
                        class="time-select-switch"
                        v-for="item in widgetConfig[addWidgetType].items.filter(
                            (item) => item.type == 'boolean',
                        )"
                    >
                        <mdui-switch :name="item.name"></mdui-switch>
                        <span class="time-select-switch-text">{{ item.showName }}</span>
                    </div>
                </div>
                <div class="time-select" v-else>
                    <mdui-text-field
                        :label="item.showName"
                        :name="item.name"
                        :type="item.type"
                        clearable
                        :required="item.isRequired"
                        v-for="item in pluginWidgetConfig[addCustomWidgetType].items.filter(
                            (item) => item.type != 'boolean',
                        )"
                    ></mdui-text-field>
                    <div
                        class="time-select-switch"
                        v-for="item in pluginWidgetConfig[addCustomWidgetType].items.filter(
                            (item) => item.type == 'boolean',
                        )"
                    >
                        <mdui-switch :name="item.name"></mdui-switch>
                        <span class="time-select-switch-text">{{ item.showName }}</span>
                    </div>
                </div>
            </form>
        </div>
        <mdui-button
            slot="action"
            type="reset"
            variant="text"
            form="time-select"
            @click="addCardDialogIsOpen = false"
            >取消</mdui-button
        >
        <mdui-button slot="action" type="submit" variant="filled" form="time-select"
            >添加</mdui-button
        >
    </mdui-dialog>
</template>
<style lang="css" scoped>
.setting-add {
    display: grid;
    gap: 8px;
    margin-top: 24px;
    margin-bottom: 24px;
    grid-template-columns: repeat(auto-fill, 240px);
}

.setting-add-divider {
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
