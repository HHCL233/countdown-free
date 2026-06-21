<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    tooltip: {
        type: String,
        required: false,
    },
})
</script>
<template>
    <mdui-tooltip placement="bottom" :content="tooltip ?? ''">
        <mdui-card clickable class="setting-add-card">
            <mdui-icon name="access_time" class="setting-add-card-icon"></mdui-icon>
            <span>{{ name }}</span>
        </mdui-card>
    </mdui-tooltip>
</template>
<style scoped>
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
</style>
