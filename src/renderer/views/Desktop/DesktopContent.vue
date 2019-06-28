<template>
    <div class="desktop-content" :class="type">
      <div class="desktop-content-bg" style="background-image:url(../../../static/images/bizhi/02.jpg)">
        <div class="desktop-wrap">{{type}}</div>
      </div>
      <div class="desktop-menu">
          <ul class="desktop-menu-wrap">
            <li v-for="item in menu" :key="item.title">
              <a-tooltip placement="top" >
                <template slot="title">
                  <span>{{item.title}}</span>
                </template>
                <img :src="item.icon" alt="" srcset="">
              </a-tooltip>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'desktop-content',
  data () {
    return {
      menu: [
        {
          title: '我的电脑',
          icon: '../../../../static/images/icon/icon-home.png'
        },
        {
          title: '浏览器',
          icon: '../../../../static/images/icon/icon-browser.png'
        },
        {
          title: '应用中心',
          icon: '../../../../static/images/icon/App-Store.png'
        },
        {
          title: '文件管理',
          icon: '../../../../static/images/icon/icon-file.png'
        },
        {
          title: '日历',
          icon: '../../../../static/images/icon/icon_calendar.png'
        },
        {
          title: '桌面设置',
          icon: '../../../../static/images/icon/icon-system.png'
        }
      ],
      type: 'meos'
    }
  },
  created () {
    var self = this
    // 监听桌面顶部开关的切换
    ipcRenderer.on('desktopSwitch', (event, data) => {
      self.type = data
    })
  },
  mounted () {
    document.querySelector('.desktop-content-bg').addEventListener('transitionend', this.transitionend)
  },
  beforeDestroy () {
    document.querySelector('.desktop-content-bg').removeEventListener('transitionend', this.transitionend)
  },
  methods: {
    // 背景移动结束，隐藏窗口
    transitionend () {
      if (this.type === 'window') {
        ipcRenderer.send('desktopVisible', 'hide')
      }
    }
  }
}
</script>

<style lang="less">

.desktop-content{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &-bg{
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-repeat:no-repeat;
    background-position: center top;
    background-size: cover;
    transition: all .3s;
    // transition-delay: 1s;
    backface-visibility: hidden;
  }
  &.window{
    .desktop-menu{
      transform: translate3d(0,100%,0);
    }
    .desktop-content-bg{
      transform: translate3d(200%,0,0);
    }
  }
}
.desktop-wrap{
  position: relative;
  z-index: 2;
  height: calc(100% - 80px);
}
.desktop-menu{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .3s;
  // transition-delay: 1s;
  &-wrap{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin: 0 auto;
    background: rgba(0,0,0,0.4);
    li{
      cursor:pointer;
      margin-right: 10px;
      &:last-child{
        margin-right: 0;
      }
      &:hover{
        img{
          transform: scale(1.4)
        }
      }
    }
    img{
      width: 54px;
      height: 54px;
      transform: scale(1);
      transition: all .3s;
    }
  }
}
</style>
