/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface IShellAPI {
  openExternal(url: string): Promise<void>
}

interface IWindowControlAPI {
  minimize(): Promise<void>
  maximize(): Promise<void>
  close(): Promise<void>
  isMaximized(): Promise<boolean>
}

interface IElectronAPI {
  ipcRenderer: {
    on(channel: string, listener: (event: any, ...args: any[]) => void): void
    off(channel: string, listener?: (...args: any[]) => void): void
    send(channel: string, ...args: any[]): void
    invoke(channel: string, ...args: any[]): Promise<any>
  }
  shell: IShellAPI
  windowControl: IWindowControlAPI
}

declare global {
  interface Window {
    ipcRenderer: IElectronAPI['ipcRenderer']
    shell: IShellAPI
    windowControl: IWindowControlAPI
  }
}

export {}
