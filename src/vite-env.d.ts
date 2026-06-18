/// <reference types="vite/client" />
import type { CardDataStore } from '@/stores/cardData'

interface Plugin {
  meta: {
    name: string,
    version: string,
    version_number: number,
    details: string
  },
  init: () => boolean,
}

interface Tools {
  getWidgetData: () => {
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
  },
  registerWidget: (widgetComponent: DefineComponent, widgetShowName: string) => { success: boolean, msg: string, path: string },
  import: (file: string) => any,
  importVue: (file: string) => any,
}
declare global {
  interface Window {
    countdownFreeAPI: {
      plugin: Plugin[],
      tools: Tools,
    };
  }
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
