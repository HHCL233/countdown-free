import { DefineComponent } from "vue"

export interface OneCardData {
    width: number,
    height: number,
    x: number,
    y: number,
    widgetTypeId: number,
    param: {
        deadline: number,
        timetip: string,
        briefTime: boolean,
        startTimestamp: number,
        customWidget?: number,
        [type: string]: any
    }
}

export interface CardData {
    [type: string]: OneCardData
}

export interface customCardData {
    name: string,
    tooltip: string,
    component: string
}