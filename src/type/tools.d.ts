import { WidgetConfigItem } from './cardData'

export interface Tools {
    getWidgetData: () => {
        width: number
        height: number
        x: number
        y: number
        widgetTypeId: number
        param: {
            [type: string]: any
        }
    }
    registerWidget: (
        widgetComponent: DefineComponent,
        widgetShowName: string,
        widgetParam: WidgetConfigItem[],
    ) => { success: boolean; msg: string }
    import: (file: string, isInit: boolean) => any
    importVue: (file: string) => any
}
