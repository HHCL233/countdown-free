<script setup lang="ts">
import type { License } from '../../../type/license'

const props = defineProps<{
    license: License
}>()
</script>
<template>
    <mdui-collapse-item>
        <mdui-list-item slot="header" end-icon="arrow_drop_down">{{ license.name }}</mdui-list-item>
        <div class="collapse-item-content">
            <div>
                <mdui-list-item>{{ license.url }}</mdui-list-item>
                <mdui-list-item>{{ license.content }}</mdui-list-item>
            </div>
        </div>
    </mdui-collapse-item>
</template>
<style lang="css" scoped>
.collapse-item-content {
    margin-left: 2.5rem;
    white-space: pre-wrap;
}
</style>
