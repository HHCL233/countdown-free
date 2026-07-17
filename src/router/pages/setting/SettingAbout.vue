<script setup lang="ts">
import licensesArray from '../../../assets/licenses/licenses.ts'
import type { ArrayElement } from '../../../type/uni'
import { useAppStore } from '../../../stores/app.ts'

import { snackbar } from 'mdui/functions/snackbar.js'
import { alert } from 'mdui/functions/alert.js'

const appState = useAppStore()

const devMode = () => {
    appState.state.isDev = !appState.state.isDev
    snackbar({
        message: `已${appState.state.isDev ? '启用' : '禁用'}开发者模式`,
    })
}

const showLicense = (licensesObject: ArrayElement<typeof licensesArray>) => {
    alert({
        headline: '许可信息',
        description: licensesObject.content,
        confirmText: '确定',
    })
}
</script>
<template>
    <div id="setting-about">
        <h1 class="setting-title">关于</h1>
        <mdui-list class="setting-about-info">
            <mdui-list-subheader class="setting-about-info-item">软件信息</mdui-list-subheader>
            <div>
                <mdui-list-item
                    class="setting-about-info-item"
                    @click="devMode()"
                    :active="appState.state.isDev"
                    :description="appState.appVersion"
                    >{{ appState.appName }}</mdui-list-item
                >
            </div>
            <mdui-list-subheader class="setting-about-info-item">开源许可证</mdui-list-subheader>
            <div>
                <mdui-list-item
                    v-for="license in licensesArray"
                    class="setting-about-info-item"
                    @click="showLicense(license)"
                    :description="`${license.url} (${license.license})`"
                    >{{ license.name }}</mdui-list-item
                >
            </div>
        </mdui-list>
    </div>
</template>
<style lang="css" scoped>
#setting-about {
}

.setting-about-info {
    margin-top: 24px;
    margin-bottom: 24px;
    display: grid;
}

.setting-about-info-item {
    flex-shrink: 0;
}
</style>
