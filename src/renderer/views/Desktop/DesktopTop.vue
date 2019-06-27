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
      <li @click="handleShutdownDrop">
        <a-icon type="logout"/>关机
        <a-icon type="caret-down"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { remote } from 'electron'
import Vue from 'vue'
import { Icon } from 'ant-design-vue'
Vue.use(Icon)
const { Menu } = remote
const menuTpl = [
  {
    label: '锁屏',
    click () {}
  },
  {
    label: '睡眠',
    click () {}
  },
  {
    label: '关机',
    click () {}
  },
  {
    label: '重启电脑',
    click () {}
  },
  {
    label: '关机',
    click () {}
  }
]
const menu = Menu.buildFromTemplate(menuTpl)
export default {
  name: 'desktop-top',
  data () {
    return {
      desktopType: 'meos'
    }
  },
  computed: {},
  methods: {
    handleSwitch (type) {
      this.desktopType = type
    },
    handleShutdownDrop (type) {
      menu.popup({ window: remote.getCurrentWindow() })
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
      }
    }
    
  }
}
</style>
