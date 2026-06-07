import { createWebHashHistory, createRouter } from 'vue-router'

import WelcomeView from './pages/WelcomeView.vue'
import EasyCountdown from './widget/EasyCountdown.vue'
import SettingView from './pages/SettingView.vue'
import SettingHome from './pages/setting/SettingHome.vue'
import WelcomeStart from './pages/welcome/WelcomeStart.vue'
import WelcomeEnd from './pages/welcome/WelcomeEnd.vue'

const routes = [
    { path: '/', redirect: '/welcome/0', },
    {
        path: '/welcome', component: WelcomeView, children: [
            {
                path: '0',
                component: WelcomeStart,
            },
            {
                path: '1',
                component: WelcomeEnd,
            },
        ]
    },
    {
        path: '/setting', component: SettingView, children: [
            {
                path: 'home',
                component: SettingHome,
                meta: {
                    menuName: '主页',
                    haveMenu: true
                }
            },
        ]
    },
    { path: '/widget/0', component: EasyCountdown },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})