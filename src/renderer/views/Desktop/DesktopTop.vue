<template>
  <div class="desktop-top">
    <ul class="desktop-top-left">
      <li>
        <a-icon type="sound" theme="filled"/>音乐
      </li>
      <li>
        <a-icon type="appstore" theme="filled"/>应用
      </li>
      <li>
        <a-icon type="appstore" theme="filled"/>游戏
      </li>
      <li>
        <a-icon type="video-camera" theme="filled"/>电影
      </li>
      
    </ul>
    <ul class="desktop-top-center">
      <li :class="{'is-active':desktopType==='window'?true:false}" @click="handleSwitch('window')">
        <a-icon type="windows" theme="filled"/>桌面
      </li>
      <li :class="{'is-active':desktopType==='meos'?true:false}" @click="handleSwitch('meos')">
        <a-icon type="compass" theme="filled"/>娱乐
      </li>
    </ul>
    <ul class="desktop-top-right">
      <li class="is-active">
        <a-icon type="calculator" theme="filled"/>计算器
      </li>
      <li class="is-active">
        <a-icon type="picture" theme="filled"/>截图
      </li>
      <li>
        <a-icon type="bg-colors"/>壁纸
      </li>
      <li @mouseup="handleShutdownDrop">
        <a-icon type="logout"/>关机
        <a-icon type="caret-down"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { ipcRenderer, remote } from 'electron'
// import TWEEN from '@tweenjs/tween.js'
const { BrowserWindow, screen } = remote
const { width } = screen.getPrimaryDisplay().workAreaSize

export default {
  name: 'desktop-top',
  data () {
    return {
      desktopType: 'meos',
      winId: null,
      winId2: null
    }
  },
  created () {
    var self = this
    ipcRenderer.send('getWindowId', 'tipsWindow')
    // 监听主进程返回当前窗口id,
    ipcRenderer.on('winId', (event, data) => {
      self.winId = data
    })
  },
  computed: {},
  methods: {
    handleSwitch (type) {
      this.desktopType = type
      ipcRenderer.send('desktopSwitch', type)
    },
    handleShutdownDrop () {
      // 获取tipswindow
      var tipsWind = BrowserWindow.fromId(this.winId)
      var bounds = { x: width - 130, y: 25, width: 130, height: 140 }
      // 设置窗口位置，大小
      ipcRenderer.send('setWinPosition', bounds)
      console.log(tipsWind.isVisible())

      if (tipsWind.isVisible()) {
        tipsWind.hide()
      } else {
        tipsWind.show()
      }
    }
  }
}
</script>

<style lang="less">
.desktop-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  color: #e0dfde;
  background: rgba(0, 0, 0, 0.2);
  font-family:'微软雅黑';
  li {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    font-size: 12px;
    text-shadow:1px 1px 3px #666;
    user-select: none;
    cursor: pointer;
    .anticon {
      margin-right: 5px;
      font-size: 15px;
    }
    &:hover{
       background: rgba(0, 0, 0, 0.1);
    }
  }
  &-left,
  &-center,
  &-right {
    height: 100%;
    display: flex;
    align-items: center;
  }
  &-center {
    height: 100%;
    display: flex;
    align-items: center;
    li {
      background: rgba(0, 0, 0, 0.1);
      &.is-active,&:hover {
        position: relative;
        background: rgba(0, 0, 0, 0.2);
        .anticon{
          color: #edbd25;
        }
        &:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          right: 0;
          height: 2px;
          background: #42d80e;
        }
      }
      &:hover{
        &:after{
          height: 0;
        }
        &.is-active{
          &:after{
          height: 2px;
        }
        }
      }
    }
    
  }
}
</style>
