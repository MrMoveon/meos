'use strict'

import { app, BrowserWindow, screen, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let topButtonWindow

// let child
// let cx = 100
// let timer = null
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
const topButtonWindowUrl = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/desktop-top`
  : `file://${__dirname}/index.html#/desktop-top`
function createWindow () {
  /**
   * Initial window options
   */
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  console.log(height)
  console.log(width)
  mainWindow = new BrowserWindow({
    width,
    height: 400,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    },
    show: false
    // transparent: true,
    // frame: false
  })

  // mainWindow.setIgnoreMouseEvents(true)
  mainWindow.loadURL(winURL)
  topButtonWindow = new BrowserWindow({
    width,
    height: 25,
    parent: mainWindow,
    transparent: true,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  topButtonWindow.loadURL(topButtonWindowUrl)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // 设置显示 和 位置
  mainWindow.once('ready-to-show', () => {
    mainWindow.setPosition(0, 50)
    mainWindow.show()
  })
  topButtonWindow.once('ready-to-show', () => {
    topButtonWindow.setPosition(0, 100)
    topButtonWindow.show()
  })
  // 设置最小化后复原,让窗口始终保持在桌面显示
  mainWindow.on('minimize', () => {
    mainWindow.restore()
  })
  topButtonWindow.on('minimize', () => {
    topButtonWindow.restore()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
// 监听顶部开关窗口切换
ipcMain.on('desktopSwitch', (event, data) => {
  // 给桌面窗口发送切换状态
  if (data === 'meos') {
    mainWindow.show()
  }
  mainWindow.webContents.send('desktopSwitch', data)
})
ipcMain.on('desktopVisible', (event, data) => {
  if (data === 'hide') {
    mainWindow.hide()
  }
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
