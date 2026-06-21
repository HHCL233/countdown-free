export interface Tools {
    getWidgetData: () => {
        width: number
        height: number
        x: number
        y: number
        widgetTypeId: number
        param: {
            deadline: number
            timetip: string
            briefTime: boolean
            startTimestamp: number
            customWidget?: number
            [type: string]: any
        }
    }
    registerWidget: (
        widgetComponent: DefineComponent,
        widgetShowName: string,
    ) => { success: boolean; msg: string; path: string }
    import: (file: string) => any
    importVue: (file: string) => any
}
