export interface IElectronAPI {
  ipcRenderer: {
    on(channel: string, listener: (event: any, ...args: any[]) => void): void
    off(channel: string, listener?: (...args: any[]) => void): void
    send(channel: string, ...args: any[]): void
    invoke(channel: string, ...args: any[]): Promise<any>
  }
}

export interface IShellAPI {
  openExternal(url: string): Promise<void>
}

declare global {
  interface Window {
    ipcRenderer: IElectronAPI['ipcRenderer']
    shell: IShellAPI
  }
}
