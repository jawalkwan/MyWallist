import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import os from 'node:os'

// 判断是否为开发模式
const isDev = process.env.NODE_ENV === 'development' || process.defaultApp || /[\\/]electron[\\/]/.test(process.execPath)

// 获取应用根目录
const APP_ROOT = isDev 
  ? path.resolve(process.cwd())  // 开发模式：使用当前工作目录
  : path.dirname(process.execPath)  // 生产模式：使用可执行文件所在目录

export const MAIN_DIST = path.join(APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(APP_ROOT, 'public')
  : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 563,
    webPreferences: {
      preload: isDev 
        ? path.join(APP_ROOT, 'dist-electron', 'preload', 'index.js')
        : path.join(MAIN_DIST, 'preload', 'index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
  
  // 开发模式下打开开发者工具
  if (isDev) {
    win.webContents.openDevTools()
  }
}

// IPC 处理器 - 获取系统信息
ipcMain.handle('get-system-info', () => {
  return {
    electron: process.versions.electron,
    node: process.versions.node,
    platform: os.platform(),
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
