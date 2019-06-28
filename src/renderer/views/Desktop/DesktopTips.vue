<template>
  <div class="desktop-tips">
    <ul>
      <li @click="handle('lock')"><a-icon type="lock" theme='filled' /> 锁屏</li>
      <li @click="handle('sleep')"><a-icon type="bulb" theme='filled' /> 睡眠</li>
      <li @click="handle('timeClose')"><a-icon type="clock-circle" theme='filled'  /> 定时关机</li>
      <li @click="handle('restart')"><a-icon type="tablet"  theme='filled' /> 重启电脑</li>
      <li @click="handle('close')"><a-icon type="logout"  /> 关机</li>
    </ul>
  </div>
</template>

<script>
import {remote} from 'electron'
import {exec} from 'child_process'
const {BrowserWindow} = remote
export default {
  name: 'desktop-tips',
  data () {
    return {
      desktopType: 'meos'
    }
  },
  created () {

  },
  computed: {},
  methods: {
    handle (type) {
      // 锁屏
      if (type === 'lock') {
        exec('rundll32.exe user32.dll,LockWorkStation')
      }
      if (type === 'sleep') {
        exec('rundll32.exe powrprof.dll,SetSuspendState')
      }
      if (type === 'timeClose') {
        alert('定时关机')
      }
      if (type === 'restart') {
        exec('shutdown -r -t 0')
      }
      if (type === 'close') {
        exec('shutdown /s /t 0')
      }
      BrowserWindow.getFocusedWindow().hide()
    }
  }
}
</script>

<style lang="less">
.desktop-tips {
  background: rgba(0,0,0,0.3);
  border:1px solid rgba(255,255,255,0.1);
  box-shadow: 0 0 5px rgba(255,255,255,0.1);
  width: 100%;
  height: 130px;
  overflow: hidden;
  box-sizing: border-box;
  li{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 26px;
    font-size: 12px;
    color: #fff;
    padding-left: 10px;
    cursor: pointer;
    &:hover{
      background: rgba(105,117,212,0.8);
    }
    .anticon{
      font-size: 15px;
      margin-right: 5px;
      color: #cacaca;
    }
  }
}
</style>
