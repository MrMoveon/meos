'use strict'

import { app, BrowserWindow, screen } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let desktopWindow
// let child
// let cx = 100
// let timer = null
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
const desktopWindowUrl = process.env.NODE_ENV === 'development'
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
    show: false,
    transparent: true,
    frame: false
  })

  // mainWindow.setIgnoreMouseEvents(true)
  mainWindow.loadURL(winURL)
  desktopWindow = new BrowserWindow({
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
  desktopWindow.loadURL(desktopWindowUrl)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // 设置分辨率大小
  mainWindow.once('ready-to-show', () => {
    mainWindow.setPosition(0, 50)
    mainWindow.show()
  })
  desktopWindow.once('ready-to-show', () => {
    desktopWindow.setPosition(0, 100)
    desktopWindow.show()
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
