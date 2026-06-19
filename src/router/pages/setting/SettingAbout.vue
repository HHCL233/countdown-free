<script setup lang="ts">
import licensesObject from '../../../assets/licenses/licenses.ts'
</script>
<template>
    <div id="setting-about">
        <h1 class="setting-title">关于</h1>
        <div class="setting-about-info">
            <mdui-list>
                <mdui-list-subheader>软件信息</mdui-list-subheader>
                <mdui-list-item>CountdownFree</mdui-list-item>
                <mdui-list-subheader>开源许可证 (不分先后)</mdui-list-subheader>
                <mdui-collapse accordion>
                    <mdui-collapse-item v-for="license in licensesObject">
                        <mdui-list-item slot="header">{{ license.name }}</mdui-list-item>
                        <div class="collapse-item-content">
                            <mdui-list-item>{{ license.url }}</mdui-list-item>
                            <mdui-list-item>{{ license.content }}</mdui-list-item>
                        </div>
                    </mdui-collapse-item>
                </mdui-collapse>
            </mdui-list>
        </div>
    </div>
</template>
<style lang="css" scoped>
#setting-about {}

.setting-title {
    margin: 0;
}

.setting-about-info {
    margin-top: 24px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
}

.collapse-item-content {
    margin-left: 2.5rem;
    white-space: pre-wrap;
}
</style>