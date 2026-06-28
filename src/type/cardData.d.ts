import { DefineComponent } from 'vue'

export interface OneCardData {
    width: number
    height: number
    x: number
    y: number
    widgetTypeId: number
    param: {
        [type: string]: any
    }
}

export type CardData = Record<string, OneCardData>

export interface CustomCardData {
    name: string
    tooltip: string
    component: string
}

export type AnyData = Record<string, any>

export interface WidgetConfigItem {
    name: string
    type: string
    showName: string
    isRequired: boolean
}

export type WidgetConfig = Record<
    number,
    {
        items: WidgetConfigItem[]
    }
>
