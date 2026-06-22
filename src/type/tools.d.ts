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
    ) => { success: boolean; msg: string }
    import: (file: string) => any
    importVue: (file: string) => any
}
