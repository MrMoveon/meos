<template>
    <div class="desktop-content">
       <div class="desktop-wrap"></div>
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
import Vue from 'vue'
import {Tooltip, Button} from 'ant-design-vue'
Vue.use(Tooltip)
Vue.use(Button)
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
      ]
    }
  },
  methods: {
    handle (e) {
      this.test = {background: '#CCC'}
    }
  }
}
</script>

<style lang="less">

.desktop-content{
  width: 100%;
  height: 100%;
  background:url(../../assets/images/bizhi/02.jpg) no-repeat;
  background-size: cover;
}
.desktop-wrap{
  height: calc(100% - 80px);
}
.desktop-menu{
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
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
