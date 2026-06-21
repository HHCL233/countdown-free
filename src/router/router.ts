import { createWebHashHistory, createRouter } from 'vue-router'

import WelcomeView from './pages/WelcomeView.vue'
import EasyCountdown from './pages/widget/EasyCountdown.vue'
import SettingView from './pages/SettingView.vue'
import SettingHome from './pages/setting/SettingHome.vue'
import WelcomeStart from './pages/welcome/WelcomeStart.vue'
import WelcomeEnd from './pages/welcome/WelcomeEnd.vue'
import SettingAddCard from './pages/setting/SettingAddCard.vue'
import SettingCountdown from './pages/setting/SettingCountdown.vue'
import CircularCountdown from './pages/widget/CircularCountdown.vue'
import SettingAbout from './pages/setting/SettingAbout.vue'
import WidgetView from './pages/WidgetView.vue'
import CustomCountdown from './pages/widget/CustomCountdown.vue'
import SettingPlugin from './pages/setting/SettingPlugin.vue'

const routes = [
    { path: '/', redirect: '/welcome/0' },
    {
        path: '/welcome',
        component: WelcomeView,
        children: [
            {
                path: '0',
                component: WelcomeStart,
            },
            {
                path: '1',
                component: WelcomeEnd,
            },
        ],
    },
    {
        path: '/setting',
        component: SettingView,
        children: [
            {
                path: 'home',
                component: SettingHome,
                meta: {
                    menuName: '主页',
                    haveMenu: true,
                },
            },
            {
                path: 'countdown',
                component: SettingCountdown,
                meta: {
                    menuName: '倒计时',
                    haveMenu: true,
                },
            },
            {
                path: 'add-card',
                component: SettingAddCard,
                meta: {
                    menuName: '添加组件',
                    haveMenu: true,
                },
            },
            {
                path: 'plugin',
                component: SettingPlugin,
                meta: {
                    menuName: '插件',
                    haveMenu: true,
                },
            },
            {
                path: 'about',
                component: SettingAbout,
                meta: {
                    menuName: '关于',
                    haveMenu: true,
                },
            },
        ],
    },
    {
        name: 'widget',
        path: '/widget',
        component: WidgetView,
        children: [
            {
                path: '0',
                name: 'widgetEasyCountdown',
                component: EasyCountdown,
                meta: { widgetType: 0, showName: '基础倒计时', tooltip: '使用基础倒计时提醒自己' },
            },
            {
                path: '1',
                name: 'widgetCircularCountdown',
                component: CircularCountdown,
                meta: { widgetType: 1, showName: '环形倒计时', tooltip: '使用环形倒计时提醒自己' },
            },
            {
                path: '2',
                name: 'widgetCustom',
                component: CustomCountdown,
                meta: { widgetType: 2, showName: '', tooltip: '' },
            },
        ],
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
