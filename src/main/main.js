import {BrowserWindow, ipcMain, screen} from 'electron'
export default class Main {
  init () {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    this.createWin('mainWindow', {width, height: height}, '/', [0, 0])
    this.createWin('topButtonWindow', {
      width,
      height: 100,
      parent: this.mainWindow
    }, 'desktop-top', [0, 0])
    this.createWin('tipsWindow', {
      width: 130,
      height: 140,
      parent: this.topButtonWindow
    }, 'desktop-tips', [0, 25], 'hide')

    this.mainWindow.on('closed', () => {
      this.mainWindow = null
    })

    // 窗口最小化的时候触发，让窗口复原，始终保持在桌面显示
    this.mainWindow.on('minimize', () => {
      this.mainWindow.restore()
      this.topButtonWindow.restore()
    })
  }
  generateUrl (name) {
    let routeUrl = ''
    if (name.indexOf('http') > -1) {
      return name
    }
    if (name === '/') {
      routeUrl = process.env.NODE_ENV === 'development'
        ? `http://localhost:9080`
        : `file://${__dirname}/index.html`
    } else {
      routeUrl = process.env.NODE_ENV === 'development'
        ? `http://localhost:9080/#/${name}`
        : `file://${__dirname}/index.html#/${name}`
    }

    return routeUrl
  }
  /**
   *
   * @param {*} name 窗口id
   * @param {*} opt 窗口属性
   * @param {*} url 窗口url地址
   * @param {*} position 窗口的位置
   * @param {*} visible 窗口是否显示
   * @param {*} callback 窗口创建完成的回调函数
   */
  createWin (name, opt, url = '/', position = [0, 0], visible, callback) {
    let _opts = {
      width: 800,
      height: 600,
      transparent: true,
      frame: false,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    }

    let opts = Object.assign({}, _opts, opt)
    this[name] = new BrowserWindow(opts)
    var win = this[name]
    let routeUrl = this.generateUrl(url)
    win.loadURL(routeUrl)
    this.readyToShow(win, [...position], visible, callback)
  }
  readyToShow (win, position = [0, 0], visible = 'show', callback) {
    win.once('ready-to-show', () => {
      win.setPosition(...position)
      if (visible === 'show') {
        win.show()
      }
      callback && callback()
    })
  }
  getWinId (winName) {
    return this[winName].id
  }
  addEvent () {
    this.addEventDesktopSwitch()
    this.addEventDesktopVisible()
    this.addEventGetWindowId()
    this.addEventSetWinPosition()
  }
  // 监听顶部开关窗口切换
  addEventDesktopSwitch () {
    ipcMain.on('desktopSwitch', (event, data) => {
      // 给桌面窗口发送切换状态
      if (data === 'meos') {
        this.mainWindow.show()
      }
      this.mainWindow.webContents.send('desktopSwitch', data)
    })
  }
  // 设置桌面隐藏
  addEventDesktopVisible () {
    ipcMain.on('desktopVisible', (event, data) => {
      if (data === 'hide') {
        this.mainWindow.hide()
      }
    })
  }
  // 获取窗口的id
  addEventGetWindowId () {
    ipcMain.on('getWindowId', (event, data) => {
      if (this[data]) {
        event.sender.send('winId', this.getWinId(data))
      }
    })
  }
  // 设置窗口的位置
  addEventSetWinPosition () {
    ipcMain.on('setWinPosition', (event, data) => {
      // meosWindow['tipsWindow'].setPosition(...data)
      console.log(data)

      this['tipsWindow'].setBounds(data)
    })
  }
}
