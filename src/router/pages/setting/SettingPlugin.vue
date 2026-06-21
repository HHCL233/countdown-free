<script setup lang="ts">
import { ref } from 'vue'
const pluginsArray = ref(window.countdownFreeAPI.plugin)
</script>
<template>
    <div id="setting-plugin">
        <h1 class="setting-title">插件</h1>
        <div class="setting-plugin-info">
            <mdui-list>
                <mdui-collapse accordion>
                    <mdui-collapse-item v-for="plugin in pluginsArray">
                        <mdui-list-item slot="header" end-icon="arrow_drop_down">
                            {{ plugin.name }}
                            <span slot="description">{{ plugin.author }}</span>
                        </mdui-list-item>
                        <div class="collapse-item-content">
                            <mdui-list-item disabled>暂无操作</mdui-list-item>
                            <!--
                            <mdui-list-item>打开目录</mdui-list-item>
                            <mdui-list-item v-if="plugin.repository">打开仓库</mdui-list-item>
                            -->
                        </div>
                    </mdui-collapse-item>
                </mdui-collapse>
                <!--
                <mdui-collapse accordion>
                    <mdui-collapse-item v-for="license in licensesObject">
                        <mdui-list-item slot="header">{{ license.name }}</mdui-list-item>
                        <div class="collapse-item-content">
                            <mdui-list-item>{{ license.url }}</mdui-list-item>
                            <mdui-list-item>{{ license.content }}</mdui-list-item>
                        </div>
                    </mdui-collapse-item>
                </mdui-collapse>
                -->
            </mdui-list>
        </div>
    </div>
</template>
<style lang="css" scoped>
#setting-plugin {
}

.setting-title {
    margin: 0;
}

.setting-plugin-info {
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
