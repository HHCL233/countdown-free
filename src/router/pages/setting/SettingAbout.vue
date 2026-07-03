<script setup lang="ts">
import licensesObject from '../../../assets/licenses/licenses.ts'
import LicenseCollapse from '../../../components/setting/about/LicenseCollapse.vue'
import { useAppStore } from '../../../stores/app.ts'

import { snackbar } from 'mdui/functions/snackbar.js'

const appState = useAppStore()

const devMode = () => {
    appState.state.isDev = !appState.state.isDev
    snackbar({
        message: `已${appState.state.isDev ? '启用' : '禁用'}开发者模式`,
    })
}
</script>
<template>
    <div id="setting-about">
        <h1 class="setting-title">关于</h1>
        <div class="setting-about-info">
            <mdui-list>
                <mdui-list-subheader>软件信息</mdui-list-subheader>
                <mdui-list-item
                    @click="devMode()"
                    :active="appState.state.isDev"
                    :description="appState.appVersion"
                    >{{ appState.appName }}</mdui-list-item
                >
                <mdui-list-subheader>开源许可证 (不分先后)</mdui-list-subheader>
                <mdui-collapse accordion>
                    <license-collapse v-for="license in licensesObject" :license="license" />
                </mdui-collapse>
            </mdui-list>
        </div>
    </div>
</template>
<style lang="css" scoped>
#setting-about {
}

.setting-title {
    margin: 0;
}

.setting-about-info {
    margin-top: 24px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
}
</style>
